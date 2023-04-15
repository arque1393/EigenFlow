import React from 'react';
import DockLayout from 'rc-dock'
import "rc-dock/dist/rc-dock.css";
import Demo from "./component/basic"

import SideBar from './component/sidebar'
import TopBar from './component/topbar'
import MainContent from './component/mainContent'
import './App.css';



    


function App() {
  return (
    <div className="App">
      <TopBar/>
      <div className='container'>
        <SideBar/>
      <div className='Main'><MainContent/></div>
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
