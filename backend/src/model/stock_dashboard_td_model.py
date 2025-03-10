from twelvedata import TDClient
from twelvedata.exceptions import TwelveDataError, BadRequestError, InternalServerError, InvalidApiKeyError
from datetime import datetime
from src.model.stock_dashboard_model_interface import StockDashboardModel
from dotenv import load_dotenv
import os

load_dotenv()

class StockDashboardTDModel(StockDashboardModel):
    """
    Implementation of StockDashboardModel with TwelveData's Stock API.
    """


    def __init__(self):
        self.td_client = None

    def connect(self):
        """
        Connect to relevant API using API Key stored in Backend.

        :raise ValueError: for invalid API key
        """

        try:
            self.td_client = TDClient(apikey=os.getenv('TWELVE_DATA_API_KEY'))
            self.td_client.price(symbol='TRP:TSX').execute() # checks api key validity
        except InvalidApiKeyError:
            raise ValueError(f"Invalid api key...")
        
    def obs_price_time_series(self, symbol: str, start_date: str, end_date: str, interval: str):
        """
        Provides historical OHLC (Open, High, Low, Close) and MV (Market Volume) time-series data
        in JSON format.

        :param symbol:          The ticker and exchange symbol for the stock.
        :param start_date:      The start date for the time series in yyyy-mm-dd format.
        :param end_date:        The end date for the time series in yyyy-mm-dd format.
        :param interval:        Any integer followed with "min, hr, day, week, month".
                                "autointerval" selection exists as well, to let model decide
                                interval based on date-range and bandwidth of API.
        :return JSON:           The historical OHLC and MV data
                                in JSON, keys 'datetime', 'open', 'high', 'low', 'close', 'volume'.
        :raise ValueError:      For either params in invalid format
                                or whether no data available for those params.
        :raise RunTimeError:    For whether third-party API credit limit reached
                                or failure on API's end.
        """

        start_datetime, end_datetime = self._check_and_convert_dates(start_date, end_date)

        if interval == "autointerval":
            interval = self._decide_interval(start_datetime, end_datetime)

        price_ts = (
            self._td_exception_handling(
                self.td_client.time_series,
                symbol = symbol,
                start_date = start_date,
                end_date = end_date,
                interval=interval,
                outputsize=5000, # max output size
                timezone="America/New_York"
            )
        )

        return price_ts

    def obs_insider_trades(self, symbol: str, start_date: str, end_date: str):
        """
        Provides historical Insider Trading data (# of company shares sold by internal folks
        in prominent positions) in JSON format.

        :param symbol:          The ticker and exchange symbol for the stock.
        :param start_date:      The start date for the time series in yyyy-mm-dd format.
        :param end_date:        The end date for the time series in yyyy-mm-dd format.
        :return JSON:           The historical Insider Trading data
                                in JSON, keys 'full_name', 'is_direct', 'position', 'shares',
                                              'value', 'date_reported', 'description'.
        :raise ValueError:      For either params in invalid format
                                or whether no data available for those params.
        :raise RunTimeError:    For whether third-party API credit limit reached
                                or failure on API's end.
        """

        start_datetime, end_datetime = self._check_and_convert_dates(start_date, end_date)

        unfil_it = (
            self._td_exception_handling(
                self.td_client.get_insider_transactions,
                symbol=symbol
            )
        )

        fil_it = []
        for item in unfil_it['insider_transactions']:
            item_date = datetime.strptime(item['date_reported'], '%Y-%m-%d')
            if start_datetime <= item_date <= end_datetime:
                fil_it.append(item)

        return fil_it

    def _check_and_convert_dates(self, start_date: str, end_date: str):
        """
        Ensures dates are correctly formatted and dates and interval are sensible (for ex:
        start date must be before end date).

        :param start_date:          start date
        :param end_date:            end date
        :return:                    start and end dates in datetime format
        :raise ValueError:          if either start/end date are not in valid format,
                                    or if range or dates aren't sensible.
        """

        try:
            start_datetime = datetime.strptime(start_date, '%Y-%m-%d')
            end_datetime = datetime.strptime(end_date, '%Y-%m-%d')
        except ValueError as e:
            raise ValueError("Invalid Input...")

        if start_datetime < datetime(year=1900, month=1, day=1) or end_datetime > datetime.now():
            raise ValueError("Invalid Input...")

        if end_datetime <= start_datetime:
            raise ValueError("Invalid Input...")

        return start_datetime, end_datetime

    def _decide_interval(self, start_date: datetime, end_date: datetime):
        """
        Choose interval given date-range for largest # of returned bars <= threshold.

        :param start_date:  start date of interval
        :param end_date:    end date of interval
        :raise ValueError:  if somehow given timespan cannot be rendered w/ "threshold" datapoints
        """

        total_minutes = (end_date - start_date).total_seconds() / 60

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

        try:
            result = func(*args, **kwargs).as_json()
            return result
        except BadRequestError:
            raise ValueError("No data for given parameters...")
        except InternalServerError:
            raise RuntimeError("Upstream server failure...")
        except TwelveDataError as e:
            if "run out of API credits" in str(e):
                raise RuntimeError("Dashboard ran out of api credits for current minute... ")
            raise ValueError("Invalid Input...")
