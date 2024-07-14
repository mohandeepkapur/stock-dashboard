import React, { Component } from 'react';
import AppHeader from './components/view/AppHeader'
import CandleChartTileContainer from './components/logic/CandleChartTileContainer';
import './App.css'

export default class App extends Component {

  render() {
    return (
      // is app responsible for assigning locations to each component - yes - or is it children actlly?
      /*
        <div className="App-header"> // assigns location to app-header on webpage
          <AppHeader />
        </div>
        vs
        className="app-header" being in AppHeader class
      */
      // child components responsible for their internal styling
      // yes app should place everything
      // child should concern its own style -> split App-header into App-header-style and App-header-loc

      // prop is like a struct -> contains any number of field:value combos, infinite length

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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // func or class -> a single component w/ many pieces that can be rendered
// function App() {
//   // state of component rep by consts
//   const [helloData, setHelloData] = useState(null); // init helloData to null, 2nd param used to update var
//   const [counterOneData, setCounterOneData] = useState(null);
//   const [counterTwoData, setCounterTwoData] = useState(null);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/api/hello')
//       .then(response => { // lambdas executed when callback func triggered - everything is event-driven for GUIs
//         setHelloData(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the data!', error);
//       });
//   }, []);

//   // callback to update counterOneData
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/counter/one'); // receiving a myObj in return (like struct)
//         console.log('Fetched counterOne data:', response.data.number);
//         setCounterOneData(response.data.number);
//       } catch (error) { // catching generic error is bad
//         console.error('There was an error fetching the data!', error);
//       }
//     }
//     const intervalId = setInterval(fetchData, 5000); // timed callback
//     fetchData(); // run fetchData immed to prevent 5s delay at init, introduced above
//     return () => clearInterval(intervalId); // runs when comp no longer rendered (how to do that)
//   }, []);

//   // callback for counterTwo
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/counter/two'); // receiving a myObj in return (like struct)
//         console.log('Fetched counterTwo data:', response.data.number);
//         setCounterTwoData(response.data.number);
//       } catch (error) {
//         console.error('There was an error fetching the data!', error);
//       }
//     }
//     const intervalId = setInterval(fetchData, 5000); // timed callback
//     fetchData(); // run fetchData immed to prevent 5s delay at init, introduced above
//     return () => clearInterval(intervalId); // runs when comp no longer rendered (how to do that)
//   }, []);



//   // what is rendered!
//   // everytime callback triggered, component re-rendered
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{helloData ? helloData.message : 'Loading hello data...'}</p>
//         <p>{counterOneData ? `The number is ${counterOneData}` : 'Loading counterOne data...'}</p>
//         <p>{counterTwoData ? `The number is ${counterTwoData}` : 'Loading counterTwo data...'}</p>
//       </header>
//     </div>
//   );
// }

// export default App;
