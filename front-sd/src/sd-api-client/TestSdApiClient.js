import SdApiClient from "./SdApiClient.js";

class TestSdApiClient {
    static async runTest(symbol, startDate, endDate, indicator) {
        try {
            const data = await SdApiClient.fetchCandlestickChartData(symbol, startDate, endDate,
                                                                     indicator);
            const chartData = data.map(item => ({
                x: new Date(item.datetime),
                y: [
                    parseFloat(item.open),
                    parseFloat(item.high),
                    parseFloat(item.low),
                    parseFloat(item.close)
                ]
            }));
            console.log(chartData)
        } catch (error) {
            console.error('Test failed:', error);
        }
    }
}

TestSdApiClient.runTest('AAPL', '2023-01-01', '2023-06-30', '1min');