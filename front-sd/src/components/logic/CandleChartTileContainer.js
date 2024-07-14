import React, {Component} from 'react';
import CandleChartTile from '../view/CandleChartTile';

// whenever callback triggered, component state changes <- react re-renders component

export default class CandleChartTileContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            startDate: '',
            endDate: '',
            chartInputData: {symbol:'AAPL', startDate:'2020-02-02', endDate:'2021-02-02'} //init
        };
    }

    // controls state of input box
    setSymbolAsInput = (value) => {
        this.setState({symbol: value});
    }

    // controls state of input box
    setStartDateAsInput = (value) => {
        this.setState({startDate: value});
    }

    // controls state of input box
    setEndDateAsInput = (value) => {
        this.setState({endDate: value});
    }

    sendUserInputToChart = () => {
        const {symbol, startDate, endDate} = this.state;
        if (!symbol || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }
        this.setState({
                          chartInputData: {symbol:symbol, startDate:startDate, endDate:endDate}
                      });
        console.log("updated chartInputData state... " + JSON.stringify(this.state.chartInputData));
    }

    // FINISH
    sendRangeInputToChart = (range) => {
        const {symbol, startDate, endDate} = this.state;

        if (!symbol) {
            alert("Please input a symbol first.");
            return;
        }
        // update startDate and endDate depending on range input

        this.setState({
                          chartInputData: {symbol, startDate, endDate}
                      });
    }

    render() {
        const {symbol, startDate, endDate, chartInputData} = this.state;
        return (
            <CandleChartTile
                symbol={symbol}
                startDate={startDate}
                endDate={endDate}
                chartInputData={chartInputData}
                setSymbolAsInput={this.setSymbolAsInput}
                setStartDateAsInput={this.setStartDateAsInput}
                setEndDateAsInput={this.setEndDateAsInput}
                sendUserInputToChart={this.sendUserInputToChart}
                sendRangeInputToChart={this.sendRangeInputToChart}
            />
        );
    }
}