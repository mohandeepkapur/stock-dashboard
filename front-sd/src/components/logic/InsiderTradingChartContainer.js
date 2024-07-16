import React, {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {AgGridReact} from "ag-grid-react";
import SdApiClient from "../../sd-api-client/SdApiClient";
import CandleChart from "../view/CandleChart";
import InsiderTradingChart from "../view/InsiderTradingChart";

const InsiderTradingChartContainer = ({symbol, startDate, endDate}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [itData, setITData] = useState(null);

    useEffect(() => {
        const fetchITData = async () => {
            setLoading(true);
            setError(false);
            setErrorMessage('');

            try {
                // const rawITData = await SdApiClient.fetchInsiderTradingData(symbol, startDate, endDate);
                //
                // let apexOptITData = rawITData.map(item => ({
                //     x: new Date(item.date_reported),
                //     y: [parseFloat(item.shares)]
                // }));

            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchITData();
    }, [symbol, startDate, endDate]);

    if (loading) {
        return <div><h3>Loading data... </h3></div>
    } else if (error) {
        return <div><h3>Error loading data... : {errorMessage}</h3></div>
    } else {
        return (
            <InsiderTradingChart
                symbol={symbol}
                itData={itData}
            />
        );
    }

}

export default InsiderTradingChartContainer;
