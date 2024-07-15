/**
 * Frontend API Client to talk to sd server.
 */
export default class SdApiClient {
    /**
     * Fetches both OHLC and Market Volume data.
     */
    static async fetchCandlestickChartData(symbol, startDate, endDate, interval) {
        console.log('Connection attempted... '); // tc
        const response = await fetch( // ALWAYS provides Response obj
            `http://127.0.0.1:5000/sd-api/price-time-series?
                    &symbol=${symbol}
                    &startDate=${startDate}
                    &endDate=${endDate}
                    &interval=${interval}`
        );
        debugger
        if (!response.ok) {
            let message;
            if (response.status === 400){
                message = "API credit usage must refresh, please wait... OR "
                          + "Bad input... OR not possible for API to pull data...";
            }
            throw new Error(message);
        }
        return await response.json();
    }

}
