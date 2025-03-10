import React from 'react';
import ReactApexChart from 'react-apexcharts';

/**
 * Renders Candlestick + Market Volume Chart.
 *
 * @param symbol                Stock that is being displayed.
 * @param error                 If error encountered when trying to fetch and process OHLC/MV data.
 * @param errorMessage          Relevant error message for above.
 * @param loading               Whether chart data still being fetched or not.
 * @param candleData            OHLC data to be rendered.
 * @param markVolData           MV data to be rendered.
 * @returns {*}                 Candlestick/MV chart or Error or Loading message
 * @constructor
 */
const CandleChart = ({symbol, error, errorMessage, loading, candleData, markVolData}) => {
    const options = {
        // three configs bellow common to all funcs
        chart: {
            type: 'candlestick',
            height: 350
        },
        tooltip: {
            theme: 'dark'
        },
        title: {
            text: " OHLC and MV Time-Series: " + symbol,
            align: 'center'
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
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
    };

    /**
     * Renders Chart or Error or Loading message.
     * @returns {Element}       Candlestick/MV chart or Error or Loading message
     */
    const renderChart = () => {
        if (loading) {
            return <div><h3>Loading data... </h3></div>
        } else if (error) {
            return <div><h3>Error loading data... : {errorMessage}</h3></div>
        } else {
            return (
                <ReactApexChart
                    options={options}
                    series={[
                        {name: 'OHLC', type: 'candlestick', data: candleData},
                        {name: 'Market Volume', type: 'bar', data: markVolData}
                    ]}
                    type="candlestick"
                    height={350}
                />
            );
        }
    }

    return (
        renderChart()
    );
}

export default React.memo(CandleChart);