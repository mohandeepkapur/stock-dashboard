import React, { useEffect, useState } from 'react'; //lu
import axios from 'axios';

// func -> a single component w/ many pieces that can be rendered
function App() {
  // state of component rep by consts
  const [helloData, setHelloData] = useState(null); // init helloData to null, 2nd param used to update var
  const [counterOneData, setCounterOneData] = useState(null);
  const [counterTwoData, setCounterTwoData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/hello')
      .then(response => { // lambdas executed when callback func triggered - everything is event-driven for GUIs
        setHelloData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // callback to update counterOneData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/counter/one'); // receiving a myObj in return (like struct)
        console.log('Fetched counterOne data:', response.data.number);
        setCounterOneData(response.data.number);
      } catch (error) { // catching generic error is bad
        console.error('There was an error fetching the data!', error);
      }
    }
    const intervalId = setInterval(fetchData, 5000); // timed callback
    fetchData(); // run fetchData immed to prevent 5s delay at init, introduced above
    return () => clearInterval(intervalId); // runs when comp no longer rendered (how to do that)
  }, []);

  // callback for counterTwo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/counter/two'); // receiving a myObj in return (like struct)
        console.log('Fetched counterTwo data:', response.data.number);
        setCounterTwoData(response.data.number);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    }
    const intervalId = setInterval(fetchData, 5000); // timed callback
    fetchData(); // run fetchData immed to prevent 5s delay at init, introduced above
    return () => clearInterval(intervalId); // runs when comp no longer rendered (how to do that)
  }, []);



  // what is rendered!
  // everytime callback triggered, component re-rendered
  return (
    <div className="App">
      <header className="App-header">
        <p>{helloData ? helloData.message : 'Loading hello data...'}</p>
        <p>{counterOneData ? `The number is ${counterOneData}` : 'Loading counterOne data...'}</p>
        <p>{counterTwoData ? `The number is ${counterTwoData}` : 'Loading counterTwo data...'}</p>
      </header>
    </div>
  );
}

export default App;
