#!/usr/bin/env python3
"""Upload a verified static release to an isolated ValueHost FTP directory."""

from __future__ import annotations

import argparse
import ftplib
import getpass
import sys
from pathlib import Path, PurePosixPath


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="Local release directory")
    parser.add_argument("remote", help="Isolated directory below the FTP root")
    parser.add_argument("--host", default="mbm-trans.ru")
    parser.add_argument("--user", default="mbm102_revo")
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

    with ftplib.FTP() as ftp:
        ftp.encoding = "utf-8"
        ftp.connect(args.host, 21, timeout=30)
        ftp.login(args.user, password)
        ftp.set_pasv(True)
        print(f"Connected. Uploading {len(files)} files to /{remote_root}/")

        ensured: set[PurePosixPath] = set()
        for index, local_path in enumerate(files, start=1):
            relative = PurePosixPath(*local_path.relative_to(source).parts)
            remote_parent = remote_root / relative.parent
            if remote_parent not in ensured:
                ensure_remote_directory(ftp, remote_parent)
                ensured.add(remote_parent)
            else:
                ftp.cwd("/" + str(remote_parent))

            with local_path.open("rb") as handle:
                ftp.storbinary(f"STOR {relative.name}", handle, blocksize=128 * 1024)

            if index == len(files) or index % 20 == 0:
                print(f"Uploaded {index}/{len(files)}")

        ftp.cwd("/" + str(remote_root))
        if "index.html" not in ftp.nlst():
            raise RuntimeError("Remote verification failed: index.html is missing")

    print(f"UPLOAD_OK /{remote_root}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
