import React,{useState} from 'react';
import "rc-dock/dist/rc-dock.css";
import SideBar from './component/sidebar'
import TopBar from './component/topbar'
import MainContent from './component/mainContent'
import './App.css';



    


function App() {
  let [theme,setTheme] =useState(false);
  let [auth,setAuth] =useState(null);


  return (
    <div className="App" >
 
      <TopBar theme={theme} setTheme={setTheme} setAuth={setAuth}/>
      <div className='container'>
          <SideBar/>
          <div className='Main'><MainContent theme={theme} auth={auth} setAuth={setAuth}  /></div>
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
