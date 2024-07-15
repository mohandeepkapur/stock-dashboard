import React, {useEffect, useState} from 'react';
import SdApiClient from '../../sd-api-client/SdApiClient';
import '../../App.css'
import CandleChart from "../view/CandleChart";

// lambdas can be components as well... should be using this paradigm over classes
// re-renders only when new params provided through parent component - memoization
const CandleChartContainer = ({symbol, startDate, endDate}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [candleData, setCandleData] = useState(null);
    const [markVolData, setMarkVolData] = useState(null);

    // if new params provided, pull from api using them
    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(false);
            setErrorMessage('');
            debugger
            try {
                // make api call, convert to apex-chart compat. data
                const rawPriceData = await SdApiClient.fetchCandlestickChartData(symbol, startDate,
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

                console.log(JSON.stringify(apexOptMVData))
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

    if (loading) {
        return <div><h3>Loading data... </h3></div>
    } else if (error) {
        return <div><h3>Error loading data... : {errorMessage}</h3></div>
    } else {
        return (
            <CandleChart
                symbol={symbol}
                candleData={candleData}
                markVolData={markVolData}
            />
        );
    }

};

export default React.memo(CandleChartContainer);