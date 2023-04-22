import React,{useState} from 'react';
import "rc-dock/dist/rc-dock.css";
import SideBar from './component/sidebar'
import TopBar from './component/topbar'
import MainContent from './component/mainContent'
import './App.css';



    


function App() {
  let [theme,setTheme] =useState(false);


  return (
    <div className="App" >
      <TopBar theme={theme} setTheme={setTheme}/>
      <div className='container'>
        <SideBar/>
      <div className='Main'><MainContent theme={theme}/></div>
      </div>
    </div>
  );
}





// function App() {
//   return (
//     <div className="App">
//     
   
//     </div>
//   );
// }

export default App;
