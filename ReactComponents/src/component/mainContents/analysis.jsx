import * as React from 'react';
import Editor,{useMonaco} from '@monaco-editor/react'
import Terminal from './terminal';
import {DockLayout} from 'rc-dock';
import axios from 'axios';
import '../dockLayout.css';
import './analysis.css';
import {BiSave,BiTable} from "react-icons/bi"
import {AiOutlineFolderOpen,AiOutlineDotChart,AiOutlineLineChart,
  AiOutlineBarChart,AiOutlineAreaChart,AiOutlinePieChart} from "react-icons/ai";
import {GrGraphQl,GrClose} from "react-icons/gr";
import {GoSync} from "react-icons/go";
import {FiUpload} from "react-icons/fi";
import {BsFillPlayFill} from "react-icons/bs";
import {VscDebugAll,VscNewFile,VscDebugLineByLine,VscDebugRestart} from "react-icons/vsc";

const Context = React.createContext();

function getTheme(){
  return document.getElementById("OuterMostBody").className
}

class Analysis extends React.Component {
  constructor() {
        super();
        this.state={console:{output :[],error:[]},editor:{"2":"989\naegsdg"},saved_dock_layout:null};
        this.tempPath="";
        this.editorRef = React.createRef(null);
        this.monacoRef = React.createRef(null);
        this.editors={}
        this.count = 0;  // General Variable  
        this.solution = {title:'Solution Explorer', content: (<div><h1>Tab1 Tab</h1></div>),closable:true,};// Solution Component
        
        this.codeEditor={
          id:"codeEditor",
          tabs: [],
          panelLock: {
            minWidth: 200,
          }

        }  
        this.shortcuts={tabs:[{ id:"shortcuts",title:'Shortcuts', 
              content: (<>
                <h6>General</h6>
                  <div className='shortcuts-ctrl'>
                  <div className='btn' onClick={()=>this.showValue()}><span className='icon'><BiSave/></span></div>
                  <div className='btn'><span className='icon'><AiOutlineFolderOpen/></span></div>
                  <div className='btn' onClick={()=>this.addTab(`file${++this.count}`,'')}><span className='icon'><VscNewFile/></span></div>
                  <div className='btn'><span className='icon'><GoSync/></span></div>
                  <div className='btn'><span className='icon'><BiTable/></span></div>          
                  <div className='btn'><span className='icon'><FiUpload/></span></div>       
                </div>
                <h6>Code</h6>
                <div className='shortcuts-ctrl'>
                  <div className='btn' onClick={()=>this.execute()}><span className='icon'><BsFillPlayFill/></span></div>
                  <div className='btn'><span className='icon'><VscDebugLineByLine/></span></div>
                  <div className='btn' onClick={()=>this.debug()}><span className='icon'><VscDebugAll/></span></div>
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
                </div></>),  closable:true,}],}
        this.console= { tabs:[{ 
              id:"console",title:'Console', 
              content: (
                <Context.Consumer>
                  {(context) => (
                      <div className='TERMINALX'>
                          {context.console_output.map( 
                            (item, i) => ( <div className='outline'>
                                <div style={{marginRight:"5px"}}>Out[{i}]: </div> 
                                <div style={{whiteSpace:'pre'}}>{item}</div>
                            </div>))}
                      </div> 
                  )}
                </Context.Consumer>                
              ), closable:true,},

            { id:"log",
              title:'Error Log', 
              content: (
                <Context.Consumer>
                  {(context) => (
                      <div>
                          {context.console_error.map( 
                            (item, i) => ( <>
                                <div>Error[{i}]</div> 
                                <div>{item}</div>
                            </>))}
                      </div> 
                  )}
              </Context.Consumer>  
              
              ),  
                closable:true,
            },
              
            {id:"terminal",
            title:'Terminal', 
            content: (<Terminal/>)
            }  
              
              ],size:60
        }



        this.Tools={tabs:[{ id:"Tools",title:'Tools', 
              content: (<div><h3>Tools</h3><p>Make it easy</p></div>),  
              closable:true,}]}
      this.layout={
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
      
      }

  getRef = (r) => {
    this.dockLayout = r;
  };


  add_output(out){
    let state = this.state
    if(out.result.output){
      state.console.output.push(out.result.output);
      this.setState(state);
    }
    else{
      state.console.error.push(out.result.error);
      this.setState(state);
    }

  }

  handleEditorDidMount(editor, monaco) {    
    monaco.editor.setTheme(`vs-${document.getElementById("OuterMostBody").className}`);
    this.editorRef.current=editor;
    this.monacoRef.current=monaco;
    
    this.editors[`${this.tempPath}`]=editor
    console.log(this.editors)
  }

  execute(){
    if(this.editorRef.current){
      const code = this.editorRef.current.getValue()
      const url="https://eigen-flow.onrender.com/api/execute_raw/"
      axios.post(url, {   
        raw_code:code,
      })
      .then((res)=>this.add_output(res.data))
      .catch(function (error) {
        console.log(error);
      });
    }
   
  }


  debug() {
    let tab = this.dockLayout.find('codeEditor').tabs[0]
    console.log(tab)
  }



  addTab = (path,code) => {
    this.tempPath=path;
    this.dockLayout.dockMove(this.newEditorTab(path,code), 'codeEditor', 'middle');
  };
  newEditorTab(path, code) { /*method*/ 
    return { id:path ,closable:true,
      title:(<><div className='editor-tab-title' onClick={()=>{this.editorRef.current=this.editors[path]}}>
        {path}</div>

       
      </>),
      content: (

      <Editor  height="100vh" width="100%" theme="myTheme" defaultLanguage='python' style={{top:"20px"}} 
      onChange={(a,b)=>console.log(a,b)}
      path={path}
      onMount={(editor, monaco)=>this.handleEditorDidMount(editor, monaco)}/> 
      // )}    
      // </Context.Consumer>
      ),};
  }
  componentWillUnmount()
  {

 
  }
  componentDidMount()
  {
    // if(this.state.saved_dock_layout){this.dockLayout.loadLayout(this.state.saved_dock_layout);
    // console.log("dfhdj")}
    // console.log("Mounted")
    // console.log(this.state.saved_dock_layout)
    // let tab = document.getElementById()
    document.querySelector(".dock-tab-close-btn").addEventListener("fdg",(e)=>this.console.log(e))
  }
  render() {  
    
    return (
      <Context.Provider value={{console_output:this.state.console.output,console_error:this.state.console.error,value:"This is great\n\niam also"}}>

        <DockLayout ref={this.getRef} defaultLayout={this.layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}} theme="dark"/>
      </Context.Provider>
    );
  }
}

export default Analysis;
