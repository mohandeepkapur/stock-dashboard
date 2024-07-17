import React from 'react';
import ReactApexChart from 'react-apexcharts';

const InsiderTradingChart = ({symbol, itData, error, errorMessage, loading}) => {
    const options = {
        bar: {
            dataLabels:{hideOverflowingLabels:true}
        },
        chart: {
            type: 'candlestick',
            height: 350
        },
        tooltip: {
            theme: 'dark',
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                return '<div>' + data.name + '<div/>';
            }
        },
        title: {
            text: " Insider Trades: " + symbol,
            align: 'center'
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        yaxis: {
            title: {
                text: 'Log(Number of Shares Sold)',
            },
            labels: {
                formatter: function (val) {
                    return Intl.NumberFormat(
                        'en-US', {
                            notation: "compact",
                            maximumFractionDigits: 2
                        }).format(val);
                }
            }
        }
    };

    const renderChart = () => {
        if (loading) {
            return <div><h3>Loading data...</h3></div>;
        } else if (error) {
            return <div><h3>Error loading data... : {errorMessage}</h3></div>;
        } else {
            return (
                <div className={'flex-item'}>
                    <ReactApexChart
                        options={options}
                        series={[
                            {name: 'IT', type: 'column', data: itData}
                        ]}
                        type="bar"
                        height={350}
                    />
                </div>
            );
        }
    }

    return (renderChart());

}

export default React.memo(InsiderTradingChart);