import React, { Component } from 'react';
import AppHeader from './components/view/AppHeader'
import CandleChartTileContainer from './components/logic/CandleChartTileContainer';
import './App.css'

/**
 * Main method for UI/UX.
 */
export default class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="app-header-loc">
                    <AppHeader/>
                </div>
                <div>
                    <CandleChartTileContainer/>
                </div>
            </div>
        );
    }
}