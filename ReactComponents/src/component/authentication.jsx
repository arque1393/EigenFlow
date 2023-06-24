
import React,{useState} from "react";
import axios from "axios";

function SignupWin(props){
    let [slide,set_slide] = useState("");
    let [authError, setAuthError] = useState("")
    
    function set_auth(data){
        props.setAuth(data)
    }
    function loginSubmit(event){
        event.preventDefault()
        const data = { 
            email:event.target[0].value,
            password:event.target[1].value
        }
        const url =  "http://127.0.0.1:8000/api/auth/signin/";
        axios.post(url, data)
          .then(function (res) {     
            set_auth(res.data);
            // props.setAuth(res.data);
          })
          .catch(function (error) {
            setAuthError(error);
          });
          props.set_login_on(false)
    }
    function signupSubmit(event){
        event.preventDefault()
        const url =  "http://127.0.0.1:8000/api/auth/signup/";
        const username   =event.target[0].value
        const email  =event.target[1].value
        const password1  = event.target[2].value
        const password2  = event.target[3].value
        if(password1!==password2)
        {
            setAuthError("Password Missmatch")
            return
        }
        axios.post(url, {   
            username:username,
            email:email,
            password:password1
           })
          .then(function (res) {
            console.log(res.data);
          })
          .catch(function (error) {
            setAuthError(error);
          });

          props.set_login_on(false)
        
        // 
        // 
        // 
        // 

    }
    return (
        <div className={`login_back_container ${props.login_on?"login_show":""}`} onClick={(e)=>{
            if(e.target.className==="login_back_container login_show")
                props.set_login_on(false)}}> 
                <div className="login-back">
                    <div className="form-outer">
                    <div className={`form-inner${slide}`}>
                        <form onSubmit={loginSubmit} className="login">
                        <div className="title"> Sign In </div>
                        <div className="field">
                            <input name="email" type="email" placeholder="Email ID" required/>
                        </div>
                        <div className="field">
                            <input name="password" type="password" placeholder="Password" required/>
                        </div>
                        <div className="pass-link"><a href="#">Forgot password?</a></div>
                        <div className="error">
                            {authError}
                        </div>
                        <div className="field">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Login"/>
                        </div>
                        <div className="signup-link">Not a member?</div>
                        <div onClick = {()=>set_slide(" slide1")}className="btnx">Signup -> </div>
                        </form>
                        <form onSubmit={signupSubmit} className="signup">
                        <div className="title"> Sign Up </div>
                        <div className="field">
                            <input type="text" placeholder="Username" required/>
                        </div>
                        <div className="field">
                            <input type="email" placeholder="Email Address" required/>
                        </div>
                        <div className="field">
                            <input type="password" placeholder="Password" required/>
                        </div>
                        <div className="field">
                            <input type="password" placeholder="Confirm password" required/>
                        </div>
                        <div className="error">
                            {authError}
                        </div>
                        <div className="field">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Signup"/>
                        </div>
                        <div onClick={()=>set_slide("")} className="btnx">  {'<-'} Signin</div>
        
                        </form>
                    </div>
                    </div>
                </div>
                </div>
    )
}

export default SignupWin;