import {useEffect } from "react";
import useFetch from "../hooks/use-fetch";


  const fetchPosts=()=>{
        return fetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json());
    };

    
const DataFetcher=()=>{
    const {data,loading,error,fn}=useFetch(fetchPosts);

    useEffect(()=>{
        console.log("DataFetcher component mounted");
        fn();   
    },[]);

    return <div>
        <h1>Data Fetcher</h1>
        <button onClick={fn}>Fetch Posts</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <pre>{JSON.stringify(data,null,2)}</pre>}
    </div>

};

export default DataFetcher;