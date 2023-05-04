import * as React from 'react';
import Editor,{useMonaco} from '@monaco-editor/react'
import {DockLayout} from 'rc-dock';
import axios from 'axios';
import '../dockLayout.css';
import './analysis.css';
import {BiSave,BiTable} from "react-icons/bi"
import {AiOutlineFolderOpen,AiOutlineDotChart,AiOutlineLineChart,
  AiOutlineBarChart,AiOutlineAreaChart,AiOutlinePieChart} from "react-icons/ai";
import {GrGraphQl} from "react-icons/gr";
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
        this.myRef = React.createRef(null);
        this.state={console_output :[],console_error:[]};

        this.count = 0;  // General Variable  
        this.solution = {title:'Solution Explorer', content: (<div><h1>Tab1 Tab</h1></div>),closable:true,};// Solution Component
        this.current_editor=null;
        this.codeEditor={
          tabs: [this.newEditorTab(), this.newEditorTab()],
          panelLock: {
            minWidth: 200,
            panelExtra: (panelData, context) => (
              <button className='add-new-tab-btn' onClick={() => context.dockMove(this.newEditorTab(), panelData, 'middle')}>
                add </button>
            )
          }
        }  
        this.shortcuts={tabs:[{ id:"shortcuts",title:'Shortcuts', 
              content: (<>
                <h6>General</h6>
                  <div className='shortcuts-ctrl'>
                  <div className='btn' onClick={()=>this.showValue()}><span className='icon'><BiSave/></span></div>
                  <div className='btn'><span className='icon'><AiOutlineFolderOpen/></span></div>
                  <div className='btn'><span className='icon'><VscNewFile/></span></div>
                  <div className='btn'><span className='icon'><GoSync/></span></div>
                  <div className='btn'><span className='icon'><BiTable/></span></div>          
                  <div className='btn'><span className='icon'><FiUpload/></span></div>       
                </div>
                <h6>Code</h6>
                <div className='shortcuts-ctrl'>
                  <div className='btn' onClick={()=>this.execute()}><span className='icon'><BsFillPlayFill/></span></div>
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
                </div></>),  closable:true,}],}
        this.console= { tabs:[{ 
              id:"console",title:'Console', 
              content: (
                <Context.Consumer>
                  {(context) => (
                      <div>
                          {context.console_output.map( 
                            (item, i) => ( <>
                                <div>Out[{i}]</div> 
                                <div>{item}</div>
                            </>))}
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
                closable:true,},],size:60
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

  add_output(out){
    let state = this.state
    if(out.result.output){
      state.console_output.push(out.result.output);
      this.setState(state);
    }
    else{
      state.console_error.push(out.result.error);
      this.setState(state);
    }

  }

  handleEditorDidMount(editor, monaco) {
    this.current_editor = editor
    monaco.editor.setTheme(`vs-${document.getElementById("OuterMostBody").className}`);
    this.myRef.current=editor
    console.log(this.myRef.current)
  }
  showValue() {
    console.log(this.myRef.current.getValue())
  }
  execute(){
    const code = this.myRef.current.getValue()
    const url="http://127.0.0.1:8000/auth/execute_raw/"
    axios.post(url, {   
      raw_code:code,
     })
    .then((res)=>this.add_output(res.data))
    .catch(function (error) {
      console.log(error);
    });
  }
  newEditorTab() { /*method*/ 
    return { id: `this.newEditorTab${++this.count}`, title: 'new file', closable:true,
      content: (<Editor height="100vh" width="100%" theme="myTheme" /*{`vs-${document.getElementById("OuterMostBody").className}`} */defaultLanguage='python' style={{top:"20px"}} onMount={(editor, monaco)=>this.handleEditorDidMount(editor, monaco)}/>),};
  }
  









  



  render() {  
    return (
      <Context.Provider value={{console_output:this.state.console_output,console_error:this.state.console_error}}>

        <DockLayout defaultLayout={this.layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}} theme="dark"/>
      </Context.Provider>
    );
  }
}

export default Analysis;
