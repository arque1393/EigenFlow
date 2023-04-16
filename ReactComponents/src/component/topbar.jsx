import React, { useState } from "react";
import logo from './logo/logo.png'; 
import { GoThreeBars } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import './loginPage.css';


function TopBar(){
//    function on_click(e){
//     e = document.getElementById(e);
//     e.style.display = "block";
//    }

let [mb0,open_mb0] =useState(false);
let [mb1,open_mb1] =useState(false);
let [mb2,open_mb2] =useState(false);
let [mb3,open_mb3] =useState(false);
let [slided,set_slided] =useState(false);
let [login_on,set_login_on] =useState(false);

    return(
<div className="top">

    
    <div className={`login_back_container ${login_on?"login_show":""}`} onClick={(e)=>{e.preventDefault();
    if(e.target.className==="login_back_container login_show")
        set_login_on(false)}}> 
        <div className="login-back">
           
            <div className="title-text">
            <div className="title login">Login Form</div>
            <div className="title signup">Signup Form</div>
            </div>
            <div className="form-container">
            <div className="slide-controls">
             
                <div  className="slide login">Login</div>
                <div className="slide signup">Signup</div>
                <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
                <form action="#" className="login">
                <div className="field">
                    <input name="username" type="text" placeholder="Username or Email" required/>
                </div>
                <div className="field">
                    <input name="password" type="password" placeholder="Password" required/>
                </div>
                <div className="pass-link"><a href="#">Forgot password?</a></div>
                <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Login"/>
                </div>
                <div className="signup-link">Not a member? <a href="">Signup now</a></div>
                </form>
                <form action="#" className="signup">
                <div className="field">
                    <input type="text" placeholder="Username" required/>
                </div>
                <div className="field">
                    <input type="text" placeholder="Email Address" required/>
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" required/>
                </div>
                <div className="field">
                    <input type="password" placeholder="Confirm password" required/>
                </div>
                <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" value="Signup"/>
                </div>
                </form>
            </div>
            </div>
            </div>
        </div>
    <div className="logo">
        <img src={logo}/>
        <h2><span className="danger">Eigen</span>Flow</h2>
    </div>

    <div className="hamburger" onClick={()=>set_slided(!slided)}><GoThreeBars/>
    </div>
    <div className =  {`right-bar ${slided?"slided":""}`}>
        <span className="menu">
            <div className="menu-content"  onMouseLeave={()=>open_mb0(false)}>
                <div id="mb0"className="menu-btn" onClick={()=>open_mb0(!mb0)}> Edit</div>
                    <div id="drop0" className={`dropdown ${mb0?"opened":""}`}>
                        <div className="basic_efit" style={{background:"none",display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                            <a className="dropdown-item" href="#">Undo</a>
                            <a className="dropdown-item" href="#">Redo</a>
                            <a className="dropdown-item" href="#">Cut</a>
                            <a className="dropdown-item" href="#">Copy</a>
                            <a className="dropdown-item" href="#">Past</a>
                        </div>
                        <hr style={{border:"solid 1px #aaaaff"}}/>
                        <a className="dropdown-item" href="#">Go to</a>
                        <a className="dropdown-item" href="#">Preference</a>
                </div>
            </div>
            <div  className="menu-content"  onMouseLeave={()=>open_mb1(false)}>
                <div id="mb1" className="menu-btn" onClick={()=>open_mb1(!mb1)}>View </div>
                <div id="drop1" className={`dropdown ${mb1?"opened":""}`}>
                    <a className="dropdown-item" href="#">Plot Tools </a>
                    <a className="dropdown-item" href="#">Directory </a>
                    <a className="dropdown-item" href="#">Code Editor </a>
                    <a className="dropdown-item" href="#">Data Display</a>
                    <a className="dropdown-item" href="#">Shortcuts</a>
                </div>

            </div>
            <div  className="menu-content"  onMouseLeave={()=>open_mb2(false)}>
                <div id="mb2" className="menu-btn" onClick={()=>open_mb2(!mb2)}>Workspace </div>
                <div id="drop2" className={`dropdown ${mb2?"opened":""}`}>
                    <a className="dropdown-item" href = "#gggg">                    
                        Lock WorkSpace
                        </a> 
                    <a className="dropdown-item" href = "#gggg">Load Default</a>
                    <a className="dropdown-item" href = "#gggg">Workspace 1</a>
                    <a className="dropdown-item" href = "#gggg">Workspace 2</a>
                    <a className="dropdown-item" href = "#gggg">Custum workspace</a>
                </div>
            </div>
            <div className="menu-content"  onMouseLeave={()=>open_mb3(false)}>
                <div id="mb3" className="menu-btn" onClick={()=>open_mb3(!mb3)}> Explore</div>
                <div id="drop3" className={`dropdown ${mb3?"opened":""}`}>
                    <a className="dropdown-item" href="#GG">Item1</a>
                    <a className="dropdown-item" href="#GG">Item2</a>
                    <a className="dropdown-item" href="#GG">Item3</a>
                </div>
            </div>
        </span>
        <div className="UserBtn" onClick={()=>set_login_on(true)}>
            <span className="user-logo"><FaUserCircle/></span>
        </div>
    </div>
</div>

    );
}
export default TopBar;