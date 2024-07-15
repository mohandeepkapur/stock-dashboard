import functools

from twelvedata import TDClient
from twelvedata.exceptions import TwelveDataError, BadRequestError, InternalServerError, InvalidApiKeyError
from datetime import datetime, timedelta
from src.model.stock_dashboard_model_interface import StockDashboardModel

class StockDashboardTDModel(StockDashboardModel):
    """
    Implementation of StockDashboardModel with TwelveData's Stock API.
    """

    def __init__(self):
        self.td_client = None

    def connect(self, apikey: str):
        try:
            self.td_client = TDClient(apikey=apikey) # read from a dir instead
            # manner of checking apikey below is wasteful
            # a = self.td_client.price(symbol='TRP:TSX').as_json() # need .as_json() for VE to be triggered?
        except InvalidApiKeyError as e:
            raise ValueError(f"Invalid api key...")

    def obs_price_time_series(self, symbol: str, start_date: str, end_date: str, interval: str):
        print(start_date)
        print(end_date)
        try:
            if interval == "autointerval":
                interval = self._decide_interval(start_date, end_date)

            price_ts = self.td_client.time_series(
                symbol = symbol,
                start_date = start_date,
                end_date = end_date,
                interval=interval,
                outputsize=5000,
                timezone="America/New_York"
            ).as_json()
        except (TwelveDataError, BadRequestError) as e:
            raise ValueError(f"Invalid values passed: {e}")
        except InternalServerError as e:
            raise IOError(f"Upstream server failure: {e}")
        return price_ts

    def obs_tech_ind_time_series(self, symbol: str, start_date: str, end_date: str, interval: str, indicator: str):
        pass

    def _decide_interval(self, start_date: str, end_date: str):
        """
        Choose interval given date-range for largest # of returned bars <= 500.
        """

        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        total_minutes = (end - start).total_seconds() / 60

        # in min
        intervals = {
            '1min': 1,
            '5min': 5,
            '15min': 15,
            '30min': 30,
            '45min': 45,
            '1h': 60,
            '2h': 120,
            '4h': 240,
            '1day': 420,
            '1week': 2940,
            '1month': 11760
        }

        for interval_name, interval_in_min in sorted(intervals.items(), key=lambda x: x[1]):
            num_data_points = total_minutes / interval_in_min
            if num_data_points <= 2500: # 2500
                return interval_name

        raise ValueError("Invalid date-range...") # change

# # decorator used bc 12data api throws same set of errors for any call
# # issue - must fix
# def _catch_td_api_errors(method):
#     @functools.wraps(method)
#     def catch_errors(*args, **kwargs):
#         try:
#             return method(*args, **kwargs)
#         except (TwelveDataError, BadRequestError) as e:
#             raise ValueError(f"Invalid values passed: {e}")
#         except InternalServerError as e:
#             raise IOError(f"Upstream server failure: {e}")
#     return catch_errors