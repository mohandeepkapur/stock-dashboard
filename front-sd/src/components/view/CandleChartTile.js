import React, {Component} from 'react';
import CandleChartContainer from '../logic/CandleChartContainer';
import SubmitButtonContainer from '../logic/SubmitButtonContainer';
import InputBox from '../logic/InputBox';
import InsiderTradingGridContainer from '../logic/InsiderTradingGridContainer';
import InsiderTradingChartContainer from "../logic/InsiderTradingChartContainer";

/**
 * Renders interactive Candlestick chart tile (all components: input box, buttons, chart).
 */
export default class CandleChartTile extends Component {
    render() {
        const {
            symbol,
            startDate,
            endDate,
            chartInputData,
            setSymbolAsInput,
            setStartDateAsInput,
            setEndDateAsInput,
            sendUserInputToChart,
            sendRangeInputToChart
        } = this.props;

        return (
            <div>
                <div className='flex-container-center'>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'1 Day'}
                                               onClick={() => sendRangeInputToChart('1day')}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'1 Week'}
                                               onClick={() => sendRangeInputToChart('week')}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'1 Month'}
                                               onClick={() => sendRangeInputToChart('month')}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'1 Yr'}
                                               onClick={() => sendRangeInputToChart('1yr')}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'5 Yr'}
                                               onClick={() => sendRangeInputToChart('5yr')}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'10 Yr'}
                                               onClick={() => sendRangeInputToChart('10yr')}/>
                    </div>
                </div>
                <div className='flex-container-center'>
                    <div className='flex-item'>
                        <CandleChartContainer
                            symbol={chartInputData.symbol}
                            startDate={chartInputData.startDate}
                            endDate={chartInputData.endDate}
                        />
                    </div>
                </div>
                {/*<div className={'flex-container-center'}>*/}
                {/*    <h4 style={{width: '100%', textAlign: 'center', color: 'black'}}>*/}
                {/*        /!*not just symbol, rt updates then*!/*/}
                {/*        Insider Trading for {chartInputData.symbol}*/}
                {/*    </h4>*/}
                {/*    <div className={'flex-item'}>*/}
                {/*        <InsiderTradingChartContainer symbol={chartInputData.symbol}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='flex-container-center'>
                    <div style={{width: '100%', textAlign: 'center', color: 'black'}}>
                        Please provide symbol in ticker:exchange format, and dates in yyyy-mm-dd
                        format.
                    </div>
                    <div className='flex-item'>
                        Symbol: <InputBox value={symbol} onChange={setSymbolAsInput}/>
                    </div>
                    <div className='flex-item'>
                        Start Date: <InputBox value={startDate} onChange={setStartDateAsInput}/>
                    </div>
                    <div className='flex-item'>
                        End Date: <InputBox value={endDate} onChange={setEndDateAsInput}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'Submit'} onClick={sendUserInputToChart}/>
                    </div>
                </div>
            </div>
        );
    }
}