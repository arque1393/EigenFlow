import {Route, Routes } from "react-router-dom";
import React from "react";
import  Analysis  from "./mainContents/analysis/analysis"
import  HelpPage  from "./mainContents/help"
import  Home     from "./mainContents/home"
import  Schedule  from "./mainContents/schedule"
import  DataGallery    from "./mainContents/gallery"
import  History   from "./mainContents/history"
import  NoteBook  from "./mainContents/notebook"
// import Demo from "./basic";
import  {TerminalContextProvider} from "react-terminal"

function MainContent(props){
    return(
        <>
         <Routes>
            <Route path="base/"  element={<Home/>} /> 
            <Route path="base/analytics"  element={<TerminalContextProvider><Analysis/></TerminalContextProvider>}/>
            <Route path="base/gallery"  element={<DataGallery/>} />
            <Route path="base/scheduler"  element={<Schedule/>} />
            <Route path="base/notebook"  element={<NoteBook/>} />
            <Route path="base/history"  element={<History/>} />
            <Route path="base/help"  element={<TerminalContextProvider><HelpPage auth={props.auth}/></TerminalContextProvider>}/>
        </Routes> 
        </>

    );

}
export default MainContent;