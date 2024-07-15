from quart import Quart, jsonify, Response
from quart.wrappers.response import ResponseBody, DataBody
from quart_cors import cors
from quart import request
from quart import abort
from src.model.stock_dashboard_td_model import StockDashboardTDModel

# in back-sd, run python3 -m src.server.sd_server

sd_server = Quart(__name__)
sd_server = cors(sd_server)

@sd_server.route('/sd-api/price-time-series', methods=['GET'])
async def provide_price_time_series():
    """
    Provides OHLC and Market Volume time-series data for given symbol, date-range and interval.
    """

    symbol = request.args.get('symbol')
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    interval = request.args.get('interval')

    try:
        resp = sd_model.obs_price_time_series(
            symbol=symbol.strip(),
            start_date=start_date.strip(),
            end_date=end_date.strip(),
            interval=interval.strip()
        )
    except ValueError as e:
        abort(400, str(e)) # setStatus causes
    except IOError as e:
        # upstream server's fault
        abort(502, str(e))

    return jsonify(resp)

@sd_server.route('/sd-api/indicator-time-series', methods=['GET'])
async def provide_indicator_time_series():
    """
    Provides Indicator time-series for given symbol, date-range, interval and indicator.
    """
    #
    # symbol = request.args.get('symbol')
    # start_date = request.args.get('startDate')
    # end_date = request.args.get('endDate')
    # interval = request.args.get('interval')
    # indicator = request.args.get('indicator')
    #
    # resp = sd_model.obs_tech_ind_time_series(
    #     symbol=symbol.strip(),
    #     start_date=start_date.strip(),
    #     end_date=end_date.strip(),
    #     interval=interval.strip(),
    #     indicator=indicator.strip()
    # )

    return jsonify(resp)

if __name__ == '__main__':
    sd_model = StockDashboardTDModel()
    try:
        sd_model.connect(apikey="2a27db5e2ffd4034a6407a67784a485f")
        sd_server.run(debug=True)
    except ValueError as e:
        print(e)