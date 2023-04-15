import React, {useState} from "react"
import { NavLink } from "react-router-dom";
import { TbChartHistogram } from 'react-icons/tb';
import { FaBook,FaHome,FaHistory,FaCogs,FaQuestionCircle } from 'react-icons/fa';
import { BsDatabaseFill } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { GoThreeBars } from 'react-icons/go';

function SideBar(){
    const [lest_shrink,set_left_shrink] = useState(true)
    return (
       
 <div className={`aside ${lest_shrink?"shrink":""}`}>
    <div className="hamburger-right" onClick={()=> {set_left_shrink(!lest_shrink)}}>
        <span className="icon"><GoThreeBars/></span>        
    </div>    
    <div className="sidebar">
                <NavLink  activeClassName="active" to="/" >
                    <span className="icon"><FaHome/></span>
                    <h5> Home </h5>
                </NavLink>
                <NavLink to="analytics" >
                    <span className="icon"><TbChartHistogram/></span>
                    <h5> Analytics </h5>
                </NavLink>
                <NavLink to="galary" >
                    <span className="icon"><BsDatabaseFill/></span>
                    <h5> Data Galary </h5>
                </NavLink>

                <NavLink to="scheduler" >
                    <span className="icon"><IoMdEye/></span>
                    <h5> Task Schedular </h5>
                </NavLink>
                <NavLink to="notebook" >
                    <span className="icon"><FaBook/></span>
                    <h5> Note Book </h5>
                </NavLink>
                <NavLink to="history" >
                    <span className="icon"><FaHistory/></span>
                    <h5> Histroy </h5>
                </NavLink>
                <a  activeClassName="inactive" to="#" >
                    <span className="icon"><FaCogs/></span>
                    <h5> Extension </h5>
                </a>
                <NavLink to="help" >
                    <span className="icon"><FaQuestionCircle/></span>
                    <h5> Help </h5>
                </NavLink>        
             
        </div>
</div> );

}
export default SideBar;