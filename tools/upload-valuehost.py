#!/usr/bin/env python3
"""Upload a verified static release to an isolated ValueHost FTP directory."""

from __future__ import annotations

import argparse
import ftplib
import getpass
import sys
import time
from pathlib import Path, PurePosixPath


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="Local release directory")
    parser.add_argument("remote", help="Isolated directory below the FTP root")
    parser.add_argument("--host", default="mbm-trans.ru")
    parser.add_argument("--user", default="mbm102_revo")
    parser.add_argument("--timeout", type=int, default=90)
    parser.add_argument("--retries", type=int, default=5)
    return parser.parse_args()


def ensure_remote_directory(ftp: ftplib.FTP, directory: PurePosixPath) -> None:
    ftp.cwd("/")
    for part in directory.parts:
        if part == "/":
            continue
        try:
            ftp.cwd(part)
        except ftplib.error_perm:
            ftp.mkd(part)
            ftp.cwd(part)


def connect(args: argparse.Namespace, password: str) -> ftplib.FTP:
    ftp = ftplib.FTP()
    ftp.encoding = "utf-8"
    ftp.connect(args.host, 21, timeout=args.timeout)
    ftp.login(args.user, password)
    ftp.set_pasv(True)
    return ftp


def close_quietly(ftp: ftplib.FTP | None) -> None:
    if ftp is None:
        return
    try:
        ftp.close()
    except OSError:
        pass


def remote_size(ftp: ftplib.FTP, path: PurePosixPath) -> int | None:
    try:
        ftp.voidcmd("TYPE I")
        return ftp.size("/" + str(path))
    except ftplib.error_perm:
        return None


def main() -> int:
    args = parse_args()
    source = args.source.expanduser().resolve()
    if not source.is_dir() or not (source / "index.html").is_file():
        print(f"Release directory is invalid: {source}", file=sys.stderr)
        return 2

    remote_root = PurePosixPath(args.remote.strip("/"))
    if not remote_root.parts or any(part in {".", ".."} for part in remote_root.parts):
        print("Remote directory must be a safe relative path", file=sys.stderr)
        return 2

    files = sorted(path for path in source.rglob("*") if path.is_file())
    password = getpass.getpass(f"FTP password for {args.user}@{args.host}: ")

    ftp: ftplib.FTP | None = None
    uploaded = 0
    skipped = 0
    print(f"Preparing {len(files)} files for /{remote_root}/")

    try:
        for index, local_path in enumerate(files, start=1):
            relative = PurePosixPath(*local_path.relative_to(source).parts)
            remote_path = remote_root / relative
            remote_parent = remote_path.parent

            for attempt in range(1, args.retries + 2):
                try:
                    if ftp is None:
                        ftp = connect(args, password)
                        print("Connected.")

                    ensure_remote_directory(ftp, remote_parent)
                    if remote_size(ftp, remote_path) == local_path.stat().st_size:
                        skipped += 1
                    else:
                        ftp.cwd("/" + str(remote_parent))
                        with local_path.open("rb") as handle:
                            ftp.storbinary(
                                f"STOR {relative.name}",
                                handle,
                                blocksize=64 * 1024,
                            )
                        uploaded += 1
                    break
                except ftplib.all_errors as exc:
                    close_quietly(ftp)
                    ftp = None
                    if attempt > args.retries:
                        raise RuntimeError(
                            f"Upload failed for {relative} after {attempt} attempts"
                        ) from exc
                    wait_seconds = min(attempt * 2, 10)
                    print(
                        f"Retry {attempt}/{args.retries} for {relative} "
                        f"after {type(exc).__name__}"
                    )
                    time.sleep(wait_seconds)

            if index == len(files) or index % 20 == 0:
                print(
                    f"Checked {index}/{len(files)} "
                    f"(uploaded {uploaded}, skipped {skipped})"
                )

        if ftp is None:
            ftp = connect(args, password)
        ftp.cwd("/" + str(remote_root))
        if "index.html" not in ftp.nlst():
            raise RuntimeError("Remote verification failed: index.html is missing")
    finally:
        close_quietly(ftp)

    print(
        f"UPLOAD_OK /{remote_root}/ "
        f"(uploaded {uploaded}, skipped {skipped})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
