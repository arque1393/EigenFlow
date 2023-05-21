import React, {useState} from "react"
import { NavLink } from "react-router-dom";
import { TbChartHistogram } from 'react-icons/tb';
import { FaBook,FaHome,FaHistory,FaCogs,FaQuestionCircle,FaInfoCircle } from 'react-icons/fa';
import { BsDatabaseFill } from 'react-icons/bs';
import { AiFillSchedule } from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';
import {MdGroups} from 'react-icons/md'
function SideBar(){
    const [lest_shrink,set_left_shrink] = useState(true)
    return (
       
 <div className={`aside ${lest_shrink?"shrink":""}`}>
    <div className="hamburger-right" onClick={()=> {set_left_shrink(!lest_shrink)}}>
        <span className="icon"><GoThreeBars/></span>        
    </div>    
    <div className="sidebar">
                <NavLink  activeClassName="active" to="base/" >
                    <span className="icon"><FaHome/></span>
                    <h6> Home </h6>
                </NavLink>
                <NavLink to="base/analytics" >
                    <span className="icon"><TbChartHistogram/></span>
                    <h6> Analytics </h6>
                </NavLink>
                <NavLink to="base/gallery" >
                    <span className="icon"><BsDatabaseFill/></span>
                    <h6> Data Gallery </h6>
                </NavLink>
                <NavLink  to="base/teams" >
                    <span className="icon"><MdGroups/></span>
                    <h6> Home </h6>
                </NavLink>
                <NavLink to="base/scheduler" >
                    <span className="icon"><AiFillSchedule/></span>
                    <h6> Task Schedular </h6>
                </NavLink>
                <NavLink to="base/notebook" >
                    <span className="icon"><FaBook/></span>
                    <h6> Note Book </h6>
                </NavLink>
                <NavLink to="base/history" >
                    <span className="icon"><FaHistory/></span>
                    <h6> Histroy </h6>
                </NavLink>
                <NavLink to="base/help" >
                    <span className="icon"><FaQuestionCircle/></span>
                    <h6> Help </h6>
                </NavLink>
                <NavLink to="base/about" >
                    <span className="icon"><FaInfoCircle/></span>
                    <h6> Help </h6>
                </NavLink>        
        </div>
</div> );

}
export default SideBar;