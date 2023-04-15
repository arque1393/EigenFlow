import React, { useState } from "react";
import logo from './logo/logo.png'; 
import { GoThreeBars } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';


function TopBar(){
//    function on_click(e){
//     e = document.getElementById(e);
//     e.style.display = "block";
//    }

let [mb0,open_mb0] =useState(false);
let [mb1,open_mb1] =useState(false);
let [mb2,open_mb2] =useState(false);
let [mb3,open_mb3] =useState(false);

    return(
<div className="top">
    <div className="logo">
        <img src={logo}/>
        <h2><span className="danger">Eigen</span>Flow</h2>
    </div>
    <input type="checkbox" id="right-check"/>
    <label for="right-check" className="hamburger"><GoThreeBars/>
    </label>
    <div className =  "right-bar">
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
                        {/* <input type="checkbox" id="workspace_lock" default="true"/>
                        <label for="workspace_lock">Lock WorkSpace</label>*/}
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
        <label for="close_login" className="UserBtn">
            <span className="user-logo"><FaUserCircle/></span>
        </label>
    </div>
</div>

    );
}
export default TopBar;