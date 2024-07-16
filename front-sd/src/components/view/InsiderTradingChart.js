import React from 'react';
import ReactApexChart from 'react-apexcharts';

const InsiderTradingChart = ({symbol, itData}) => {
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
        yaxis: {
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
        }
    };

    return (
        <div className={'flex-item'}>
            <ReactApexChart
                options={options}
                series={[
                    {name: 'Ins Trad', type: 'bar', data: itData}
                ]}
                type="bar"
                height={350}
            />
        </div>
    );
}

export default InsiderTradingChart;
