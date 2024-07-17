# Stock Dashboard

Current Functionality:
 - Given symbol and date-range, the ability to view, zoom in/out, toggle between OHLC/MV AND Insider Trading data for symbols within TwelveData API's free-plan scope.
 - Given date-range, Dashboard decides optimal candle-width to ensure an un-cluttered UI. This behavior can be changed easily to provide user with full control over the width.

Missing:
- TwelveData Python SDK doesn't support querying technical indicator functions. Would need to connect frontend directly to TwelveData api URL, which breaks third-party api abstraction design decision.

Notes:
- Gaps displayed in the 1 week and 1 month intervals are due to no trading data being available through API (weekends or holidays).

# How to use:

1. Free API key needed by Twelve Data. Write into first line of back-sd/apikey.txt
2. To set up SD Server: In back-sd/ run the command: `python3 -m src.server.sd_server`. Use the URL provided to link SdApiClient to the server if different than default one in place.
3. To set up React front-end: in front-sd, run the command: `npm start`

# Try it on:
- AAPL (Apple Inc)
- QQQ (Invesco QQQ Trust)
- ABML (American Battery Metals Corporation)
- TRP:TSX (TC Energy Corp)
- 7203:JPX (Toyota Motor Corporation)
- SLBEN:Euronext (Sport Lisboa e Benfica - Futebol, SAD)

# Dependencies 
Included in `front-sd/src/package.json` and `back-sd/src/requirements.txt`.
