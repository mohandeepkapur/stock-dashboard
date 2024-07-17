import React from 'react';
import ReactApexChart from 'react-apexcharts';

/**
 * Renders Insider Trading Chart.
 *
 * @param symbol                Stock that is being displayed.
 * @param error                 If error encountered when trying to fetch and process OHLC/MV data.
 * @param errorMessage          Relevant error message for above.
 * @param loading               Whether chart data still being fetched or not.
 * @param itData                Insider Trading data (Shares Sold) to be rendered.
 * @returns {Element}
 * @constructor
 */
const InsiderTradingChart = ({symbol, itData, error, errorMessage, loading}) => {
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        tooltip: {
            theme: 'dark',
            custom: function ({series, seriesIndex, dataPointIndex, w}) {
                let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                let shares = Intl.NumberFormat(
                    'en-US', {
                        notation: "compact",
                        maximumFractionDigits: 4
                    }).format(Math.round(Math.pow(data.y, 10)))
                let value = Intl.NumberFormat(
                    'en-US', {
                        notation: "compact",
                        maximumFractionDigits: 4
                    }).format(data.value)

                return `
                  <div>
                    <div>Name: ${data.name}</div>
                    <div>Shares sold: ${shares}</div>
                    <div>Value: ${value}</div>
                    <div>Position: ${data.position}</div>
                  </div>
                `;
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
        },
        dataLabels: {
            enabled: false
        }
    };

    /**
     * Renders Chart and Error and Loading messages.
     * @returns {Element}
     */
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
                            {name: 'Shares Sold', type: 'bar', data: itData}
                        ]}
                        type="candlestick" // intentional misclassif for UI
                        height={350}
                    />
                </div>
            );
        }
    }

    return (renderChart());

}

export default React.memo(InsiderTradingChart);