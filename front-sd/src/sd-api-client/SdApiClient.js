/**
 * API Client to talk to sd server.
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
            throw new Error("s" + response.status);
        }
        return await response.json();
    }

}
