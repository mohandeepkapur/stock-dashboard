# Stock Dashboard

Current Functionality:
 - Given symbol and date-range, the ability to view, zoom in/out, toggle between OHLC and MV data for symbols within TwelveData API's free-plan scope.
 - Given date-range, Dashboard decides optimal candle-width to ensure an un-cluttered UI. This behavior can be changed easily to provide user with full control over the width.

Missing:
- TwelveData Python SDK doesn't support querying technical indicator functions. Would need to connect frontend directly to TwelveData api URL, which breaks third-party api abstraction design decision.

To Be Done:
- Create custom http errors in backend, to allow for more descriptive/varied error descriptions for user.

# How to use:
To set up SD-Server:
in back-sd, run the command: `python3 -m src.server.sd_server`. Use the URL provided by the "Running on"

To set up React front-end:
in front-sd, run the command: `npm start`


# Dependencies 
Included in `front-sd/src/package.json` and `back-sd/src/requirements.txt`.