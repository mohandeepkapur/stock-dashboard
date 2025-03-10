import React, {useEffect, useState} from 'react';
import SdApiClient from '../../sd-api-client/SdApiClient';
import '../../App.css'
import CandleChart from "../view/CandleChart";

/**
 * Container for Candlestick (OHLC) + Market Volume Chart. Holds functionality such as SD API
 * queries and transforming received data to Apex-Grid Compatible format. Delegates rendering.
 *
 * @param symbol            The ticker:exchange symbol to fetch data for.
 * @param startDate         The start date in yyyy-mm-dd format.
 * @param endDate           The end date in yyyy-mm-dd format.
 * @returns {Element}       The OHLC/MV Chart given above params.
 * @constructor
 */
const CandleChartContainer = ({symbol, startDate, endDate}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [candleData, setCandleData] = useState(null);
    const [markVolData, setMarkVolData] = useState(null);

    useEffect(() => {

        /**
         * Fetches OHLC and MV data from SD API and transforms data to Apex-Grid Compatible format.
         *
         * @returns {Promise<void>}
         */
        const fetchChartData = async () => {
            setLoading(true);
            setError(false);
            setErrorMessage('');
            // debugger
            try {
                // make api call, convert to apex-chart compat. data
                const sd_client = new SdApiClient();
                const rawPriceData = await sd_client.fetchCandlestickChartData(symbol,
                                                                               startDate,
                                                                               endDate,
                                                                               'autointerval');
                let apexOptPriceData = rawPriceData.map(item => ({
                    x: new Date(item.datetime),
                    y: [parseFloat(item.open), parseFloat(item.high),
                        parseFloat(item.low), parseFloat(item.close)]
                }));
                apexOptPriceData = apexOptPriceData.reverse();

                let apexOptMVData = rawPriceData.map(item => ({
                    x: new Date(item.datetime),
                    y: [parseFloat(item.volume)]
                }));
                apexOptMVData = apexOptMVData.reverse();

                setCandleData(apexOptPriceData);
                setMarkVolData(apexOptMVData);
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchChartData();
    }, [symbol, startDate, endDate]);

    return (
        <CandleChart
            symbol={symbol}
            candleData={candleData}
            markVolData={markVolData}
            error={error}
            errorMessage={errorMessage}
            loading={loading}
        />
    );

};

export default React.memo(CandleChartContainer);