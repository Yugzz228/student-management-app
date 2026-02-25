import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import DataFetcher from './components/hook-example';


function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log("App component mounted.");

    return ()=>{}; //clean up function
  },[count]);

  return <div>

  <p>Hello from App.jsx</p>
  <p>Count: {count}</p>
  <button onClick={() => setCount(count + 1)}>Increment</button>

  <input type="text" placeholder='type something' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
  <p>input text is: {inputValue}</p> 

  <DataFetcher />


  </div>

}

export default App
