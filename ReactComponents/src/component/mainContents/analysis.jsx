import * as React from 'react';
import Editor from '@monaco-editor/react'
import {DockLayout} from 'rc-dock';
import '../dockLayout.css';
import './analysis.css';
import {BiSave,BiTable} from "react-icons/bi"
import {AiOutlineFolderOpen,AiOutlineDotChart,AiOutlineLineChart,
  AiOutlineBarChart,AiOutlineAreaChart,AiOutlinePieChart} from "react-icons/ai";
import {GrGraphQl} from "react-icons/gr";
import {GoSync} from "react-icons/go";
import {BsFillPlayFill} from "react-icons/bs";
import {VscDebugAll,VscNewFile,VscDebugLineByLine,VscDebugRestart} from "react-icons/vsc";

function getTheme(){
  return document.getElementById("OuterMostBody").className
}

class Analysis extends React.Component {
  count = 0;  // General Variable
  
  solution = {title:'Solution Explorer', content: (<div><h1>Tab1 Tab</h1></div>),closable:true,};// Solution Component
  newEditorTab() { /*method*/ 
    return { id: `this.newEditorTab${++this.count}`, title: 'new file', closable:true,
      content: (<Editor height="100vh" width="100%" theme={`vs-${document.getElementById("OuterMostBody").className}`} defaultLanguage='python' style={{top:"20px"}}/>),};
  }
  codeEditor={
    tabs: [this.newEditorTab(), this.newEditorTab()],
    panelLock: {
      minWidth: 200,
      panelExtra: (panelData, context) => (
        <button className='add-new-tab-btn' onClick={() => context.dockMove(this.newEditorTab(), panelData, 'middle')}>
          add </button>
      )
    }
  }  



  shortcuts={
    tabs:[
      { 
        id:"shortcuts",
        title:'Shortcuts', 
        content: (
          <>
          <h6>General</h6>
            <div className='shortcuts-ctrl'>
            <div className='btn'><span className='icon'><BiSave/></span></div>
            <div className='btn'><span className='icon'><AiOutlineFolderOpen/></span></div>
            <div className='btn'><span className='icon'><VscNewFile/></span></div>
            <div className='btn'><span className='icon'><GoSync/></span></div>
            <div className='btn'><span className='icon'><BiTable/></span></div>          

          </div>
          <h6>Code</h6>
          <div className='shortcuts-ctrl'>
            <div className='btn'><span className='icon'><BsFillPlayFill/></span></div>
            <div className='btn'><span className='icon'><VscDebugLineByLine/></span></div>
            <div className='btn'><span className='icon'><VscDebugAll/></span></div>
            <div className='btn'><span className='icon'><VscDebugRestart/></span></div>          
          </div>
          <h6> Diagrams </h6>
          <div className='shortcuts-ctrl'>
          <div className='btn'><span className='icon'><AiOutlineDotChart/></span></div>
          <div className='btn'><span className='icon'><AiOutlineLineChart/></span></div>
          <div className='btn'><span className='icon'><AiOutlineBarChart/></span></div>
          <div className='btn'><span className='icon'><AiOutlineAreaChart/></span></div>            
          <div className='btn'><span className='icon'><AiOutlinePieChart/></span></div>            
          <div className='btn'><span className='icon'><GrGraphQl/></span></div>            
          </div></>),  
          closable:true,
         
      }],
      
  }








  
   console= {
    tabs:[
      { 
        id:"console",
        title:'Console', 
        content: (
          <div>
            <p>[1]: Type Your Command </p><br/>
            <p>[2]: </p>
          </div>),  
          closable:true,
      },{ 
        id:"log",
        title:'Error Log', 
        content: (
          <div>
            <p>......Log Information ........ </p><br/>
            <p>......Log Information ........ </p><br/>
            <p>......Log Information ........ </p><br/>         
          </div>),  
          closable:true,
      },
  ],
    size:60
  }
   Tools={
    tabs:[
      { 
        id:"Tools",
        title:'Tools', 
        content: (
          <div>
            <h3>Tools</h3>
            <p>Make it easy</p>
          </div>),  
          closable:true,
      }]
  
  }

  
  
 layout={
    dockbox : {
      mode :"horizontal",
      children:[    
        {
          mode: "vertical",          
          children:[
            {
              mode: "horizontal",         
              children:[
                {tabs:[{id:"directort",title:"Directory Tree",content:(<p> Label 1</p>)} ],size:40},
                this.codeEditor,
                {mode: "vertical",children:[this.shortcuts,this.Tools,],size:45,},
              ]
            },
            this.console,
          ],
        },
        {
          mode:'vertical',size:35,
          tabs:[{...this.solution, id:"solution"}],
        },
      ]
    }
  }









  



  render() {  
    return (
      <DockLayout defaultLayout={this.layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}} theme="dark"/>
    );
  }
}

export default Analysis;
