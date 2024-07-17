/**
 * Frontend API Client to talk to sd server.
 */
export default class SdApiClient {

    /**
     * Fetches both OHLC and Market Volume data.
     */
    async fetchCandlestickChartData(symbol, startDate, endDate, interval) {
        console.log('CCData Connection attempted... ');
        let resp_json;
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/sd-api/price-time-series?
                    &symbol=${symbol}
                    &startDate=${startDate}
                    &endDate=${endDate}
                    &interval=${interval}`
            );
            resp_json = await response.json();
        } catch (error) {
            throw new Error("Couldn't connect to dashboard server... ")
        }

        this.#throwIfRespIsError(resp_json);
        return resp_json;
    }

    /**
     * Fetches Insider trading data.
     */
    async fetchInsiderTradingData(symbol, startDate, endDate) {
        console.log('CCData Connection attempted... ');
        let resp_json;
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/sd-api/insider-trades?
                    &symbol=${symbol}
                    &startDate=${startDate}
                    &endDate=${endDate}`
            );
            resp_json = await response.json();
        } catch (error) {
            throw new Error("Couldn't connect to dashboard server... ")
        }

        this.#throwIfRespIsError(resp_json);
        return resp_json;
    }

    #throwIfRespIsError(response) {
        console.log("server received error " + JSON.stringify(response));
        if (Object.keys(response).includes('sd_server_error')) {
            throw Error(response.sd_server_error);
        }
    }

}