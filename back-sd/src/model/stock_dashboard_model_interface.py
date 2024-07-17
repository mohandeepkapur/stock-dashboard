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
        :raise ValueError:      for invalid params
        :raise RuntimeError:    if unable to retrieve necessary data
        :return JSON:           The historical OHLC and MV data
                                in JSON, keys 'datetime', 'open', 'high', 'low', 'close', 'volume'
        """
        pass

    @abstractmethod
    def obs_insider_trades(self, symbol: str, start_date: str, end_date: str):
        pass


    # methods for additional features below:
    # @abstractmethod
    # def obs_tech_ind_time_series(self, symbol: str, start_date: str, end_date: str, ind: str):
    #     """
    #     Provides technical indicator time-series data for a given symbol in JSON format.
    #     """
    #     pass

    # @abstractmethod
    # def obs_realtime_price(self, symbol: str):
    #     pass
    
    # @abstractmethod
    # def obs_realtime_quote(self, symbol: str):
    #     pass

    # @abstractmethod
    # def obs_trend_lines(self, symbol: str, start_date: str, end_date: str):
    #     pass

    # @abstractmethod
    # def which_trend(self, symbol: str, start_date: str, end_date: str):
    #     pass

    # @abstractmethod
    # def obs_news(self, symbol: str):
    #     pass

    # @abstractmethod
    # def obs_stocks(self):
    #     """
    #     Provides all stock:exchange combos model can report on in JSON format.
    #     """
    #     pass