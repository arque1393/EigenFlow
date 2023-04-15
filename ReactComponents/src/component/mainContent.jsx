import {Route, Routes } from "react-router-dom";
import React from "react";
import  Analysis  from "./mainContents/analysis"
import  Help  from "./mainContents/help"
import  Home     from "./mainContents/home"
import  Schedule  from "./mainContents/schedule"
import  DataGalary    from "./mainContents/galary"
import  History   from "./mainContents/history"
import  NoteBook  from "./mainContents/notebook"
import Demo from "./basic";
function MainContent(){
    return(
        <>
         <Routes>
            <Route path="/"  element={<Home/>} /> 
            <Route path="/analytics"  element={<Demo/>} />
            <Route path="/galary"  element={<Analysis/>} />
            <Route path="/scheduler"  element={<Schedule/>} />
            <Route path="/notebook"  element={<NoteBook/>} />
            <Route path="/history"  element={<History/>} />
            <Route path="/help"  element={<Help/>} />

        </Routes> 
        </>

    );

}
export default MainContent;