import React, {Component, memo, useEffect, useState} from 'react';
import SdApiClient from '../../sd-api-client/SdApiClient';
import ReactApexChart from 'react-apexcharts';
import '../../App.css'
import response from "assert";
import CandleChart from '../view/CandleChart';

// lambdas can be components as well... should be using this paradigm over classes
// re-renders only when new params provided through parent component - memoization
const CandleChartContainer = ({symbol, startDate, endDate}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [candleData, setCandleData] = useState(null);
    const [options, setOptions] = useState({
                                               options: {
                                                   // three configs bellow common to all funcs
                                                   chart: {
                                                       type: 'candlestick',
                                                       height: 350
                                                   },
                                                   tooltip : {
                                                       theme:'dark'
                                                   },
                                                   title: {
                                                       text: symbol + " OHLC Price & MV Time-Series ",
                                                       align: 'center'
                                                   },
                                                   xaxis: {
                                                       type: 'datetime',
                                                       labels: {
                                                           datetimeUTC:false
                                                       }
                                                   },
                                                   colors: ['#7CB285', '#C2D8DC', '#fc3114'],
                                                   // sep configs for sep funcs
                                                   yaxis: [{
                                                       title: {
                                                           text: 'USD',
                                                       },
                                                       labels: {
                                                           formatter: function (val) {
                                                               return "$" + Intl.NumberFormat(
                                                                   'en-US', {
                                                                       notation: "compact",
                                                                       maximumFractionDigits: 2
                                                                   }).format(val);
                                                           }
                                                       }

                                                   }, {
                                                       opposite: true,
                                                       title: {
                                                           text: 'Market Volume'
                                                       },
                                                       labels: {
                                                           formatter: function (val) {
                                                               return Intl.NumberFormat('en-US', {
                                                                   notation: "compact",
                                                                   maximumFractionDigits: 2
                                                               }).format(val);
                                                           }
                                                       },
                                                       min: 0
                                                   }]
                                               }
                                           });

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
                const rawPriceData = await SdApiClient.fetchCandlestickChartData(symbol,
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
            <div>
                <div className={'flex-item'}>
                    <ReactApexChart
                        options={options.options}
                        series={
                            [
                                // {data: candleData}
                                {name: 'OHLC Price', type: 'candlestick', data: candleData},
                                {name: 'Market Volume', type: 'area', data: markVolData}
                            ]
                        }
                        type="candlestick" height={350}
                    />

                </div>
            </div>
        );
    }

};

/**
 * var options = {
 *           series: [{
 *           data: seriesData
 *         }]
 *         },
 *    ^ imp is passing through [{data: }] <- this d .series
 */

export default React.memo(CandleChartContainer);
