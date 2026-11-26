# national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/bexjeh/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/bexjeh/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A working national statistics site for the fictional Republic of Caldoria, built for the make.fun "Make the best national statistics site" bounty. Seven linked pages — home dashboard, population, economy, labour, prices, regions, and methods & sources — with hand-drawn SVG charts (GDP, population, unemployment, inflation, regional comparisons), sortable and filterable tables, a working year selector, site search, CSV downloads, and a release calendar. All figures are invented but internally consistent (regional populations add to the 8.42 million national total; sector shares add to 100%), each with its source and year. Plain static files, no build step, no network requests, and responsive down to phone width.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 — or open `app/index.html` through any static server. To build the make.fun output: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=feheg61h&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
