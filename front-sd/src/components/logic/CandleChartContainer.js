import React, {useEffect, useState} from 'react';
import SdApiClient from '../../sd-api-client/SdApiClient';
import '../../App.css'
import CandleChart from "../view/CandleChart";

/**
 * Container for Candlestick Chart, holds its functionality.
 */
const CandleChartContainer = ({symbol, startDate, endDate}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [candleData, setCandleData] = useState(null);
    const [markVolData, setMarkVolData] = useState(null);

    useEffect(() => {
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
        console.log("useEffect in CandleChart triggered")
        fetchChartData();
    }, [symbol, startDate, endDate]);


    return(
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