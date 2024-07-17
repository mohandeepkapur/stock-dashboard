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
                const sd_client = new SdApiClient();
                const rawITData = await sd_client.fetchInsiderTradingData(symbol,
                                                                          startDate,
                                                                          endDate);

                let apexOptITData = rawITData.map(item => ({
                    x: new Date(item.date_reported),
                    y: [takeSafeLog(item.shares)],
                    name: [item.full_name],
                    position: [item.position],
                    value: [item.value]
                }));

                setITData(apexOptITData)
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchITData();
    }, [symbol, startDate, endDate]);

    function takeSafeLog(shares) {
        if (shares <= 1) {
            return 0;
        }
        return Math.log10(shares);
    }

    return (
        <InsiderTradingChart
            symbol={symbol}
            itData={itData}
            error={error}
            errorMessage={errorMessage}
            loading={loading}
        />
    );

}

export default React.memo(InsiderTradingChartContainer);