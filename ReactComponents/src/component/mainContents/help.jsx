
import React, { useState }  from "react";
import axios from "axios";
// {useEffect,useState}



function HelpPage(props){
  let [reg_data,set_reg_data] = useState([])
  let [signin_data,set_signin_data] = useState([])
  function signin(){
        const url =  "http://127.0.0.1:8000/auth/signin/";
        axios.post(url, {           
            email: 'ilab.kabir@gmail.com',
            password:'122356'
          })
          .then(function (res) {
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    function signup(){
        const url =  "http://127.0.0.1:8000/auth/signup/";
        axios.post(url, {   
            username:"khalid201x" ,       
            email: 'nlab.khalid@gmail.com',
            password:'qwerfdsa'
          })
          .then(function (res) {
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function signout(){
      const url =  "http://127.0.0.1:8000/auth/signout/";
      axios.get(url).then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return(<>
    <h1>Help Desk </h1>
    <h4>Using For Test Perpuses</h4>
    {/* <button onClick={signin}>Sign In</button>
    <div>{signin_data}</div>

    <button onClick={signup}>Register</button>
    <div>{reg_data
        }</div>
    <button onClick={signout}>Logout</button>
    <div>{reg_data
        }</div> */}
        <div onClick={()=>console.log(props.auth)}>
          zz
        </div>

    
    {/* <button onClick={postData}>send Data</button> */}
    </>
    );
}
export default HelpPage;