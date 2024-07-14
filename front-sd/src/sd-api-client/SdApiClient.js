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
        try {
            console.log('Connection attempted... ');
            // provides Response obj
            const response = await fetch(
                `http://127.0.0.1:5000/sd-api/price-time-series?
                        &symbol=${symbol}
                        &startDate=${startDate}
                        &endDate=${endDate}
                        &interval=${interval}`
            );
            const candleData = await response.json();
            console.log('Candle data received... ');
            return candleData;
        } catch (error) {
            console.error('Error fetching candle data:' , error);
            throw error;
        }
    }

    /**
     *
     * @returns {Promise<void>}
     */
    static async fetchIndicatorChartData(symbol, startDate, endDate, interval, indicator){
        try {
            console.log('Connection attempted... ');
            // provides Response obj
            const response = await fetch(
                `http://127.0.0.1:5000/sd-api/indicator-time-series?
                        &symbol=${symbol}
                        &startDate=${startDate}
                        &endDate=${endDate}
                        &interval=${interval}
                        &indicator=${indicator}`
            );
            const candleData = await response.json();
            console.log('Candle data received... ');
            return candleData;
        } catch (error) {
            console.error('Error fetching candle data:' , error);
            throw error;
        }
    }
}
