from twelvedata import TDClient
from twelvedata.exceptions import TwelveDataError, BadRequestError, InternalServerError, InvalidApiKeyError
from datetime import datetime
from src.model.stock_dashboard_model_interface import StockDashboardModel

class StockDashboardTDModel(StockDashboardModel):
    """
    Implementation of StockDashboardModel with TwelveData's Stock API.
    """

    def __init__(self):
        self.td_client = None

    def connect(self, apikey: str):

        try:
            # read from a dir instead
            self.td_client = TDClient(apikey=apikey)
            # manner of checking apikey validity below is wasteful - forcing error
            a = self.td_client.price(symbol='TRP:TSX').as_json()
        except InvalidApiKeyError:
            raise ValueError(f"Invalid api key...")

    def obs_price_time_series(self, symbol: str, start_date: str, end_date: str, interval: str):

        if interval == "autointerval":
            interval = self._decide_interval(start_date, end_date)

        try:
            price_ts = (
                self.td_client.time_series(
                    symbol = symbol,
                    start_date = start_date,
                    end_date = end_date,
                    interval=interval,
                    outputsize=5000,
                    timezone="America/New_York"
                ).as_json()
            )
        except BadRequestError:
            raise ValueError("No data for given parameters...")
        except InternalServerError:
            raise RuntimeError("Upstream server failure...")
        except TwelveDataError as e:
            if "run out of API credits" in str(e):
                raise ValueError("Dashboard ran out of api credits for THIS minute... ")
            raise ValueError("INVALID INPUT...")

        return price_ts

    def obs_insider_trades(self, symbol: str, start_date: str, end_date: str):

        try:
            unfil_it = (
                self.td_client.get_insider_transactions(symbol=symbol).as_json()
            )
        except BadRequestError:
            raise ValueError("No data for given parameters...")
        except InternalServerError:
            raise RuntimeError("Upstream server failure...")
        except TwelveDataError as e:
            if "run out of API credits" in str(e):
                raise ValueError("Dashboard ran out of api credits for THIS minute... ")
            raise ValueError("INVALID INPUT...")

        sd = datetime.strptime(start_date, '%Y-%m-%d')
        ed = datetime.strptime(end_date, '%Y-%m-%d')
        fil_it = []
        for item in unfil_it['insider_transactions']:
            item_date = datetime.strptime(item['date_reported'], '%Y-%m-%d')
            if sd <= item_date <= ed:
                fil_it.append(item)

        return fil_it

    def _decide_interval(self, start_date: str, end_date: str):
        """
        Choose interval given date-range for largest # of returned bars <= threshold.
        """

        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        total_minutes = (end - start).total_seconds() / 60

        # in min
        intervals = {
            '1min': 1, '5min': 5, '15min': 15, '30min': 30, '45min': 45,
            '1h': 60, '2h': 120, '4h': 240, '1day': 420, '1week': 2940,
            '1month': 11760
        }

        for interval_name, interval_in_min in sorted(intervals.items(), key=lambda x: x[1]):
            num_data_points = total_minutes / interval_in_min
            if num_data_points <= 2500: # 2500
                return interval_name

        raise ValueError("Shouldn't be reached...") # change

    def _td_exception_handling(self, func, *args, **kwargs):
        """
        Centralizing Exception Handling for each Model method, since every TD API call
        triggers the same four exception types for the same four reasons.
        """
        pass
