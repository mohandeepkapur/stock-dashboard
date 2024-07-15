import React, {Component} from 'react';
import CandleChartContainer from '../logic/CandleChartContainer';
import SubmitButtonContainer from '../logic/SubmitButtonContainer';
import InputBox from '../logic/InputBox';

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
                        {/*whenever submit button pressed, new data passed to CCC*/}
                        <CandleChartContainer
                            symbol={chartInputData.symbol}
                            startDate={chartInputData.startDate}
                            endDate={chartInputData.endDate}
                        />
                    </div>
                </div>
                <div className='flex-container-center'>
                    <div style={{width: '100%', textAlign: 'center', color: 'white'}}>
                        Please provide symbol in ticker:exchange format, and dates in yyyy-mm-dd
                        format.
                    </div>
                    <div className='flex-item'>
                        symbol <InputBox value={symbol} onChange={setSymbolAsInput}/>
                    </div>
                    <div className='flex-item'>
                        start date <InputBox value={startDate} onChange={setStartDateAsInput}/>
                    </div>
                    <div className='flex-item'>
                        end date <InputBox value={endDate} onChange={setEndDateAsInput}/>
                    </div>
                    <div className='flex-item'>
                        <SubmitButtonContainer label={'Submit'} onClick={sendUserInputToChart}/>
                    </div>
                </div>
            </div>
        );
    }
}