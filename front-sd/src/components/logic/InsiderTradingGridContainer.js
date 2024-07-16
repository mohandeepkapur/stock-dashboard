import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css";
import SdApiClient from "../../sd-api-client/SdApiClient"; // Optional Theme applied to the Data Grid

const InsiderTradingGridContainer = ({symbol}) => {
    // Row Data: The data to be displayed.
    /*
    name:
    position:
    date reported:
    is_direct
    shares
    value
    description
     */
    const [rowData, setRowData] = useState([
                                               {name: "Bob", position: "Goodman"}
                                           ]);

    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs, setColumnDefs] = useState([
                                               {headerName: "Name", field: "name"},
                                               {headerName: "Position", field: "position"},
                                               {headerName: "Date Reported", field: "date_reported"},
                                               {headerName: "Direct", field: "is_direct"},
                                               {headerName: "Shares", field: "shares"},
                                               {headerName: "Values",field: "values"},
                                               {headerName: "Description", field: "description"}
                                           ]);
    return (
        <div
            className="ag-theme-alpine" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
            <AgGridReact columnDefs={columnDefs} rowData={rowData}/>
        </div>
    );
}

export default InsiderTradingGridContainer;