from abc import ABC, abstractmethod

# from Java world - prefer strict interfaces
# all sub-classes must impl abs class methods
class StockDataModelInterface(ABC):
    """
    Dates expected in Y-M-D format.
    """

    # extra layer to retrieve rt-price inc latency
    @abstractmethod
    def obs_realtime_price(self, symbol: str):
        pass
    
    @abstractmethod
    def obs_realtime_quote(self, symbol: str):
        pass

    # return json, good for any frontend?
    @abstractmethod
    def obs_price_history(self, symbol: str, start_date: str, end_date: str, interval: int):
        """
        depending on range given, change interval of each data-pt
        for ex, day range, bar for every 10 min
        year range, bar for every 1 day
        ^ should this be job of model? I'd say controller

        return data in easily-rendered format
        """
        pass

    @abstractmethod
    def obs_trend_lines(self, symbol: str, start_date: str, end_date: str):
        """
        provides functions to overlay on price data
        """
        pass

    @abstractmethod
    def which_trend(self, symbol: str, start_date: str, end_date: str):
        """
        classifies historical price data as one of n trends
        """
        pass

    @abstractmethod
    def obs_insider_trading(self, symbol: str, start_date: str, end_date: str):
        """

        """
        pass

    @abstractmethod
    def obs_news(self, symbol: str):
        """
        return json of headlines+URLs related to input company
        from pre-det websites -> []
        """
        pass

    @abstractmethod
    def obs_stocks():
        """
        all stock:exchange combos model can report on
        """
        pass





'''
What can my model do?

obs_stock_history()


'''
