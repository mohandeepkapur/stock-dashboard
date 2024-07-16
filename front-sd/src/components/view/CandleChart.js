import React from 'react';
import ReactApexChart from 'react-apexcharts';

/**
 * Renders Candlestick Chart w/ MV bars. Component responsible for config.
 */
const CandleChart = ({symbol, candleData, markVolData}) => {
    const options = {
        // three configs bellow common to all funcs
        chart: {
            type: 'candlestick',
            height: 350
        },
        tooltip: {
            theme: 'dark',
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

    return (
        <div className={'flex-item'}>
            <ReactApexChart
                options={options}
                series={[
                    {name: 'OHLC', type: 'candlestick', data: candleData},
                    {name: 'Market Volume', type: 'bar', data: markVolData}
                ]}
                type="candlestick"
                height={350}
            />
        </div>
    );
}

export default React.memo(CandleChart);