# Russian hosting options

Research date: 2026-07-31.

## Non-negotiable requirements

- Site files, logs, form backend, mail processing and any personal-data storage must stay in Russia.
- No Cloudflare Worker, foreign CDN, Google Fonts, foreign analytics or Telegram delivery of form payloads.
- Automatic SSL renewal.
- PHP support for a same-origin form handler.
- SSH/SFTP or another predictable deployment path.
- Backups and a reversible DNS cutover.

## Option 01 — REG.RU virtual hosting — clearest default

- Officially states that virtual hosting is located in Moscow, Russia.
- PHP, SSH, automatic backups and free SSL options are available.
- SSL certificates hosted at REG.RU can be automatically reissued and installed without manual replacement.
- Suitable plan class: `Host-A` or higher because the static-only `Host-Lite` does not include PHP.
- Strength: the physical location of virtual hosting is stated explicitly, and the site does not need VPS administration.
- Risk: confirm the exact SSL product and renewal terms in the order before payment; REG.RU offers several certificate types with different commercial conditions.

## Option 02 — Beget virtual hosting / Russian Beget Cloud

- Virtual hosting includes free SSL, SSH/SFTP, mail and a 30-day test period.
- Russian Beget Cloud regions are available in Saint Petersburg and Moscow; Beget also advertises infrastructure aligned with 152-FZ.
- For the simplest operation, test virtual hosting first.
- Strength: convenient panel, good fit for static HTML + PHP and existing domain mail.
- Risk: before ordering shared hosting under the strict no-foreign requirement, obtain written confirmation that the exact hosting account and backups are placed only in the Russian region. If this cannot be confirmed, choose a Beget Cloud/VPS resource explicitly created in `ru1` or `ru2`.

## Option 03 — Timeweb virtual hosting

- Supports PHP, SSH/SFTP, free Let's Encrypt, daily backups and a 10-day test.
- Let's Encrypt is automatically installed and renewed two weeks before expiry.
- Strength: strong backup policy and easy trial migration.
- Risk: Timeweb operates infrastructure in several countries; require written confirmation and contract wording that the selected hosting, backups and mail stay in Russia. For formal protected infrastructure, Timeweb has a separate 152-FZ server offering, which is likely excessive for this site.

## Director recommendation

- Start by requesting a test account and written Russian-location confirmation from REG.RU and Beget.
- If both confirm the complete data and backup path in Russia, prefer Beget for panel convenience or REG.RU for the clearest published virtual-hosting location.
- Do not buy a VPS only for this static site unless shared hosting cannot provide the required location guarantee.

## Target data flow

1. Browser submits the form to `https://mbm-trans.ru/lead.php`.
2. PHP validates fields, rate-limits requests and rejects bots.
3. The handler sends the request to a corporate mailbox hosted in Russia.
4. The handler stores no payload by default; if an audit log is required, it stores only the minimum data for a documented retention period.
5. No personal data is included in third-party notifications or analytics.

## Migration sequence

1. Finish and verify locally.
2. Push the approved branch to GitHub only after the user's command.
3. Create a protected temporary preview on the chosen Russian host.
4. Verify all pages, form delivery, logs, SSL, redirects and mobile behavior.
5. Lower DNS TTL before cutover if appropriate.
6. Switch DNS only after explicit approval.
7. Keep the old hosting and Git tag available during the rollback window.
