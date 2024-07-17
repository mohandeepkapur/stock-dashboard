import React, {useEffect, useState} from 'react';
import SdApiClient from "../../sd-api-client/SdApiClient";
import InsiderTradingChart from "../view/InsiderTradingChart";

/**
 * Container for Insider Training Chart. Holds functionality such as SD API queries
 * and transforming received data to Apex-Grid Compatible format. Delegates rendering.
 *
 * @param symbol            The ticker:exchange symbol to fetch data for.
 * @param startDate         The start date in yyyy-mm-dd format.
 * @param endDate           The end date in yyyy-mm-dd format.
 * @returns {Element}       The Insider Trading Chart given above params.
 * @constructor
 */
const InsiderTradingChartContainer = ({symbol, startDate, endDate}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [itData, setITData] = useState(null);

    useEffect(() => {
        /**
         * Fetches Insider Trading (shares sold) data from SD API and transforms data to
         * Apex-Grid Compatible format.
         * @returns {Promise<void>}
         */
        const fetchITData = async () => {
            setLoading(true);
            setError(false);
            setErrorMessage('');

            try {
                const sd_client = new SdApiClient();
                const rawITData = await sd_client.fetchInsiderTradingData(symbol,
                                                                          startDate,
                                                                          endDate);

                let apexOptITData = rawITData.map(item => ({
                    x: new Date(item.date_reported),
                    y: [takeSafeLog(item.shares)],
                    name: [item.full_name],
                    position: [item.position],
                    value: [item.value]
                }));

                setITData(apexOptITData)
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchITData();
    }, [symbol, startDate, endDate]);

    /**
     * Takes safe log of given input (prevents Inf issues when shares is 0).
     * Logarithm is taken to prevent outlier sells from making average sells miniscule
     * on Apex grid chart and thus preventing user from interacting with those data points!
     *
     * @param shares            shares sold
     * @returns {number}        log of shares
     */
    function takeSafeLog(shares) {
        if (shares <= 1) {
            return 0;
        }
        return Math.log10(shares);
    }

    return (
        <InsiderTradingChart
            symbol={symbol}
            itData={itData}
            error={error}
            errorMessage={errorMessage}
            loading={loading}
        />
    );

}

export default React.memo(InsiderTradingChartContainer);