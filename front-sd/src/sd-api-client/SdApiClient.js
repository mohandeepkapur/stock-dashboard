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
        // debugger
        if (!response.ok) {
            let message;
            console.log(response.status)
            if (response.status === 400) {
                // create more custom error messages
                message = "Invalid params OR Dashboard unable to find requested data...";
            } else if (response.status === 502) {
                message = "Third-party API supporting dashboard has failed..."
            }
            throw new Error(message);
        }
        return await response.json();
    }

    static async fetchInsiderTradingData(symbol, startDate, endDate) {
        console.log('Connection attempted... insider trading server func... ');

    }
}