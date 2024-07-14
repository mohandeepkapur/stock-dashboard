
import React, {Component, memo, useEffect, useState} from 'react';
import SdApiClient from '../../sd-api-client/SdApiClient';
import ReactApexChart from 'react-apexcharts';
import '../../App.css'
import response from "assert";
import CandleChart from '../view/CandleChart';

// lambdas can be components as well... should be using this paradigm over classes
// re-renders only when new params provided through parent component - memoization
const CandleChartContainer = ({ symbol, startDate, endDate }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [candleData, setCandleData] = useState(null);
    const [options, setOptions] = useState({options: {
            chart: {
                type: 'candlestick',
                height: 350
            },
            title: {
                text: 'CandleStick Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        }});

    const [markVolData, setMarkVolData] = useState(null);
    // const [areaOptions] = useState( {optionsBar: {
    //         chart: {
    //             height: 160,
    //             type: 'bar',
    //             brush: {
    //                 enabled: true,
    //                 target: 'candles'
    //             },
    //             selection: {
    //                 enabled: true,
    //                 xaxis: {
    //                     min: new Date('20 Jan 2017').getTime(),
    //                     max: new Date('10 Dec 2017').getTime()
    //                 },
    //                 fill: {
    //                     color: '#ccc',
    //                     opacity: 0.4
    //                 },
    //                 stroke: {
    //                     color: '#0D47A1',
    //                 }
    //             },
    //         },
    //         dataLabels: {
    //             enabled: false
    //         },
    //         plotOptions: {
    //             bar: {
    //                 columnWidth: '80%',
    //                 colors: {
    //                     ranges: [{
    //                         from: -1000,
    //                         to: 0,
    //                         color: '#F15B46'
    //                     }, {
    //                         from: 1,
    //                         to: 10000,
    //                         color: '#FEB019'
    //                     }],
    //
    //                 },
    //             }
    //         }}});



    // if new params provided, pull from api using them
    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(false);
            setErrorMessage('');
            try {
                // make api call, convert to apex-chart compat. data
                const rawPriceData = await SdApiClient.fetchCandlestickChartData(symbol,
                                                                                 startDate,
                                                                                 endDate,
                                                                                 'autointerval');
                const apexChartData = rawPriceData.map(item => ({
                    x: new Date(item.datetime),
                    y: [parseFloat(item.open), parseFloat(item.high),
                        parseFloat(item.low), parseFloat(item.close)]
                }));
                const apexBarChartData = rawPriceData.map(item => ({
                    x: new Date(item.datetime),
                    y: [parseFloat(item.volume) / 10000000]
                }));
                console.log(JSON.stringify(apexBarChartData))
                setCandleData(apexChartData);
                setMarkVolData(apexBarChartData);
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
                        options={ options }
                        series={
                                [
                                    // {data: candleData}
                                    {name: 'Candlestick', type: 'candlestick', data: candleData},
                                    //{name: 'Market Volume', type: 'area', data: markVolData}
                                ]
                               }
                        type="candlestick" height={ 350 }
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
