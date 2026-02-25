import { useState } from "react";

const useFetch=(cb)=>{

    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const fn=async(...args)=>{
        setLoading(true);
        setError(null);        
        try{
            const res=await cb(...args);
            setData(res);
        }catch(err){
            setError(err);
            window.alert("Error fetching data");
        }
        finally{
            setLoading(false);
        }
        
    };
     
    return {data,loading,error,fn};
};  


export default useFetch;