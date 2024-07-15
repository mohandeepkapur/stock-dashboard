/**
 *
 */
export default class SdApiClient {
    /**
     *
     * @param symbol
     * @param startDate
     * @param endDate
     * @param interval
     * @returns {Promise<any>}
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
            throw new Error(response.status);
        }
        return await response.json();
    }

    /**
     *
     * @returns {Promise<void>}
     */
    static async fetchIndicatorChartData(symbol, startDate, endDate, interval, indicator){
    }

}
