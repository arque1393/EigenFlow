import React, { useContext, useState } from "react";
import SignupWin from "./authentication";
import logo from './logo/logo.png'; 
import light_logo from './logo/llogo.png'; 
import { GoThreeBars } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
// import { Context } from "./mainContents/analysis";
import './login.css';


function TopBar(props){
    //    function on_click(e){
    //     e = document.getElementById(e);
    //     e.style.display = "block";
    //    }

    // const context = useContext(Context)
    const view_kernel=[]
    function set_theme(theme){
        document.getElementById("OuterMostBody").className = theme
        props.setTheme(theme)
    }

    let [mb0,open_mb0] =useState(false);
    let [mb1,open_mb1] =useState(false);
    let [mb2,open_mb2] =useState(false);
    let [mb3,open_mb3] =useState(false);
    let [slided,set_slided] =useState(false);
    let [login_on,set_login_on] =useState(false);




    return(
<div className="top">

    <SignupWin setAuth ={props.setAuth} login_on ={login_on} set_login_on={set_login_on}/>

    <div className="logo">
        <img src={props.theme==="light"?light_logo:logo}/>
        <h3><span className="danger">Eigen</span>Flow</h3>
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
                            <a className="dropdown-item" href="#">Cut </a>
                            <a className="dropdown-item" href="#">Copy</a>
                            <a className="dropdown-item" href="#">Past</a>
                        </div>
                        <hr style={{border:"solid 1px #aaaaff"}}/>
                        <a className="dropdown-item" href="#">Go to
                        {/* <div className="sub-drop">
                            <a className="dropdown-item" href="#">Data Gallery</a>
                            <a className="dropdown-item" href="#">Profile </a>
                            <a className="dropdown-item" href="#"> Back   +</a>
                         </div> */}
                        </a>
                        <a className="dropdown-item" href="#">Preference</a>
                        <div className="sub-dropdown-container">                       
                            <a className="dropdown-item" href="#">Themes</a>
                            <div className="sub-drop">
                                <a className="dropdown-item" onClick={()=>set_theme("dark")}>Dark</a>
                                <a className="dropdown-item" onClick={()=>set_theme("light")}>Light</a>
                                <a className="dropdown-item" href="#">Add Modr   +</a>
                            </div>
                        </div>
                </div>
            </div>
            <div  className="menu-content"  onMouseLeave={()=>open_mb1(false)}>
                <div id="mb1" className="menu-btn" onClick={()=>open_mb1(!mb1)}>View </div>
                <div id="drop1" className={`dropdown ${mb1?"opened":""}`}>
                    <div className="sub-dropdown-container"> 
                        <a className="dropdown-item" href="#">Ipython Shells </a>
                            <div className="sub-drop">
                                <a className="dropdown-item" onClick={()=>props.setMenuClick("config")}>Configure</a>
                                <a className="dropdown-item" >Show Active</a>
                                <a className="dropdown-item" href="#">Add New</a>
                            </div>
                    </div>
                    <a className="dropdown-item" href="#">Graphical Script  </a>
                    <a className="dropdown-item" href="#">Plot Tools </a>
                    <a className="dropdown-item" href="#">Directory </a>
                    <a className="dropdown-item" href="#">Code Editor</a>
                        {/* <div className="sub-drop">
                                <a className="dropdown-item" href="#">Dark</a>
                                <a className="dropdown-item" href="#">Light</a>
                                <a className="dropdown-item" href="#">Add Modr   +</a>
                            </div> */}
                    
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