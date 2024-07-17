import React, {useState} from 'react';
import ChartTile from '../view/ChartTile';

/**
 * Interactive Tile that links together SubmitButtons and InputBoxes to
 * Candlestick and Insider Trading chart.
 */
const ChartTileContainer = () => {
    const [symbol, setSymbol] = useState('AAPL');
    const [startDate, setStartDate] = useState(getDateRange('1yr').startDate);
    const [endDate, setEndDate] = useState(getDateRange('1yr').endDate);
    const [chartInputData, setChartInputData] =
        useState({symbol: 'AAPL', startDate: startDate, endDate: endDate}); //init

    /**
     * Callback that changes symbol state based on what is currently written in text-box.
     * @param value   User input for symbol
     */
    const setSymbolAsInput = (value) => {
        setSymbol(value);
    }

    /**
     * Callback that changes start date state based on what is currently written in text-box.
     * @param value   User input for start date
     */
    const setStartDateAsInput = (value) => {
        setStartDate(value);
    }

    /**
     * Callback that changes end date state based on what is currently written in text-box.
     * @param value   User input for end date
     */
    const setEndDateAsInput = (value) => {
        setEndDate(value);
    }

    /**
     * Triggers when user presses "Submit", changes state of fields that determine chart state.
     */
    const sendUserInputToChart = () => {
        if (!symbol || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }
        setChartInputData({symbol, startDate, endDate});
    }

    /**
     * Triggers when user presses date-buttons, changes state of fields that determine chart state.
     * Depending on button-press, start and end-date interval sent to charts will be different.
     * Interval based on current date. 1D provides last trading day.
     * @param range             time-interval user chose
     */
    const sendRangeInputToChart = (range) => {

        if (!symbol) {
            alert("Please input a symbol first.");
            return;
        }

        const startDate = getDateRange(range).startDate;
        const endDate = getDateRange(range).endDate;

        // *** changing chart input state will force charts to re-render -> new api calls
        setStartDate(startDate);
        setEndDate(endDate);
        setChartInputData({symbol: symbol, startDate: startDate, endDate: endDate});
    }

    /**
     * Given interval, determines start and end dates beginning from current day
     * that match interval.
     *
     * @param interval                                          time-interval
     * @returns {{endDate: string, startDate: string}}          resulting start and end dates
     */
    function getDateRange(interval) {
        const today = new Date();
        let startDate;
        let endDate = new Date(today);

        switch (interval) {
            case '1day':
                startDate = new Date();
                startDate.setDate(today.getDate() - 1);
                if (startDate.getDay() === 6) {
                    startDate.setDate(startDate.getDate() - 1);
                } else if (startDate.getDay() === 0) {
                    startDate.setDate(startDate.getDate() - 2);
                }
                break;
            case 'week':
                startDate = new Date();
                startDate.setDate(today.getDate() - 7);
                break;
            case 'month':
                startDate = new Date();
                startDate.setMonth(today.getMonth() - 1);
                break;
            case '1yr':
                startDate = new Date();
                startDate.setFullYear(today.getFullYear() - 1);
                break;
            case '5yr':
                startDate = new Date();
                startDate.setFullYear(today.getFullYear() - 5);
                break;
            case '10yr':
                startDate = new Date();
                startDate.setFullYear(today.getFullYear() - 10);
                break;
            default:
                throw new Error('Invalid interval');
        }

        const format = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            startDate: format(startDate),
            endDate: format(endDate),
        };
    }

    return (
        <ChartTile
            symbol={symbol}
            startDate={startDate}
            endDate={endDate}
            chartInputData={chartInputData}
            setSymbolAsInput={setSymbolAsInput}
            setStartDateAsInput={setStartDateAsInput}
            setEndDateAsInput={setEndDateAsInput}
            sendUserInputToChart={sendUserInputToChart}
            sendRangeInputToChart={sendRangeInputToChart}
        />
    );
}

export default ChartTileContainer;