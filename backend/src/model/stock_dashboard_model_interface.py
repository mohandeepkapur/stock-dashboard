from abc import ABC, abstractmethod
class StockDashboardModel(ABC):
    """
    Interface for StockDashboardModel. Documentation to allow Model to work with any
    third-party API.
    """

    @abstractmethod
    def connect(self):
        """
        Connect to relevant API using API Key stored in Backend.

        :raise ValueError: for invalid API key
        :raise FileNotFoundError: if file-path to apikey invalid
        """
        pass

    @abstractmethod
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
        pass

    @abstractmethod
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
        pass