import React, {useState} from 'react';
import CandleChartTile from '../view/CandleChartTile';

/**
 * Interactive tile that contains linked buttons, input boxes, and price/mv time-series chart.
 */
const CandleChartTileContainer = () => {
    const [symbol, setSymbol] = useState('AAPL');
    const [startDate, setStartDate] = useState(getDateRange('1yr').startDate);
    const [endDate, setEndDate] = useState(getDateRange('1yr').endDate);

    const [chartInputData, setChartInputData] =
        useState({symbol: 'AAPL', startDate: startDate, endDate: endDate}); //init

    const setSymbolAsInput = (value) => {
        setSymbol(value);
    }

    const setStartDateAsInput = (value) => {
        setStartDate(value);
    }

    const setEndDateAsInput = (value) => {
        setEndDate(value);
    }

    const sendUserInputToChart = () => {
        if (!symbol || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }
        setChartInputData({symbol, startDate, endDate});
        console.log("updated chartInputData state... " + JSON.stringify(chartInputData));
    }

    const sendRangeInputToChart = (range) => {

        if (!symbol) {
            alert("Please input a symbol first.");
            return;
        }

        const startDate = getDateRange(range).startDate;
        const endDate = getDateRange(range).endDate;

        // changing chart input state will force chartcont to re-render -> new api call
        setStartDate(startDate);
        setEndDate(endDate);
        setChartInputData({symbol: symbol, startDate: startDate, endDate: endDate});
    }

    function getDateRange(option) {
        const today = new Date();
        let startDate;
        let endDate = new Date(today); // default end date is today

        switch (option) {
            case '1day':
                // td spef?
                startDate = new Date();
                startDate.setDate(today.getDate() - 1);
                if (startDate.getDay() === 6) {
                    startDate.setDate(startDate.getDate() - 1);
                } else if (startDate.getDay() === 0) { // Sunday
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
                throw new Error('Invalid option');
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
        <CandleChartTile
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

export default CandleChartTileContainer;