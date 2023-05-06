import {Route, Routes } from "react-router-dom";
import React from "react";
import  Analysis  from "./mainContents/analysis"
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
            <Route path="/"  element={<Home/>} /> 
            <Route path="/analytics"  element={<TerminalContextProvider><Analysis/></TerminalContextProvider>}/>
            <Route path="/gallery"  element={<DataGallery/>} />
            <Route path="/scheduler"  element={<Schedule/>} />
            <Route path="/notebook"  element={<NoteBook/>} />
            <Route path="/history"  element={<History/>} />
            <Route path="/help"  element={<TerminalContextProvider><HelpPage auth={props.auth}/></TerminalContextProvider>}/>
        </Routes> 
        </>

    );

}
export default MainContent;