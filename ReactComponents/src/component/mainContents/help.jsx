import axios from "axios";
import React  from "react";

// {useEffect,useState}



function HelpPage(){
  
    function fecthApiData(){
        axios.get("http://127.0.0.1:8000/auth/")
        .then((response) => {
           return  response.data;
        }).then((data) => {
            console.log(data)
        });
    }
    
    // const fecthApiData = async (url) => {
    //     try {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log(data);} 
    //     catch (error) {console.log(error);}
    // };
    // useEffect(()=>{fecthApiData(url)},[])
    return(<>
    <h1>Help Desk </h1>
    <h4>Using For Test Perpuses</h4>
    <button onClick={fecthApiData}>Get Data</button>
    
    {/* <button onClick={postData}>send Data</button> */}
    </>
    );
}
export default HelpPage;