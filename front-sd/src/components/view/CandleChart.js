import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';

export default class CandleChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: props.chartData
            }],
            options: {
                chart: {
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: this.props.symbol,
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
            },
        };
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series}
                                    type="candlestick" height={350}/>
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }

}
