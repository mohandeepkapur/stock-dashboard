from quart import Quart, jsonify
from quart_cors import cors
from quart import request
from src.model.stock_dashboard_td_model import StockDashboardTDModel

sd_server = cors(Quart(__name__), allow_origin="*")

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
        resp = {'sd_server_error' : str(e)}
    except RuntimeError as e:
        resp = {'sd_server_error' : str(e)}

    return jsonify(resp)

@sd_server.route('/sd-api/insider-trades', methods=['GET'])
async def provide_insider_trades():
    """
    Provides Insider Trades for given symbol and date range.
    """

    symbol = request.args.get('symbol')
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')

    try:
        print("tried to run model method.. running")
        resp = sd_model.obs_insider_trades(
            symbol=symbol.strip(),
            start_date=start_date.strip(),
            end_date=end_date.strip()
        )
    except ValueError as e:
        resp = {'sd_server_error' : str(e)}
    except RuntimeError as e:
        resp = {'sd_server_error' : str(e)}

    return jsonify(resp)

if __name__ == '__main__':
    sd_model = StockDashboardTDModel()
    try:
        sd_model.connect()
        sd_server.run(debug=True)
    except ValueError as e:
        print(e)
    except FileNotFoundError as e:
        print(str(e))