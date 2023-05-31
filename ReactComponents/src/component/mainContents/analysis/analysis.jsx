import * as React from 'react';

import Editor from '@monaco-editor/react'
import IPythonShell from './terminal/ipythonShell';
import DirectoryTree from './directory_tree/directory';
import {DockLayout} from 'rc-dock';
import axios from 'axios';
import DataFlowGraph from './DataFlowGraph/graphModel';
import '../dockLayout.css';
import './analysis.css';
import {TiFlowSwitch} from 'react-icons/ti'
import {BiSave,BiTable} from "react-icons/bi"
import {AiOutlineFolderOpen,AiOutlineDotChart,AiOutlineLineChart,
  AiOutlineBarChart,AiOutlineAreaChart,AiOutlinePieChart} from "react-icons/ai";
import {GrGraphQl} from "react-icons/gr";
import {GoSync} from "react-icons/go";
import {FiUpload} from "react-icons/fi";
import {BsFillPlayFill,BsTerminalPlus} from "react-icons/bs";
import {VscDebugAll,VscNewFile,VscDebugLineByLine,VscDebugRestart} from "react-icons/vsc";
// import {RiTerminalBoxFill} from "react-icons/ri"
const Context = React.createContext();
class Analysis extends React.Component {
  constructor() {
        super();
        this.state={console:{output :[],error:[]},editor:{"2":"989\naegsdg"},saved_dock_layout:null};
        this.tempPath="";
        this.editorRef = React.createRef(null);
        this.monacoRef = React.createRef(null);
        this.windowWidth = React.createRef(window.innerWidth);
        this.tabRef= React.createRef(null)
        this.editors={}
        this.tabs={}
        this.count = 0;  // General Variable  
        this.shell_id_count=0
        this.editor_panel={id:"editor_panel",tabs: [],panelLock: {minWidth: 200,}}  
        this.layout={}
        this.shortcuts={tabs:[{ id:"shortcuts",title:'Shortcuts', 
              content: (<>
                <p style={{fontSize:13}}>General</p>
                  <div className='shortcuts-ctrl'>
                  <div className='btn' onClick={()=>this.save("filename")}><span className='icon'><BiSave/></span></div>
                  <div className='btn'><span className='icon'><AiOutlineFolderOpen/></span></div>
                  <div className='btn' onClick={()=>this.addTab(`file${++this.count}`,'')}><span className='icon'><VscNewFile/></span></div>
                  <div className='btn'><span className='icon'><GoSync/></span></div>
                  <div className='btn' onClick={()=>this.addDataFlowGraphEditor(`path${this.count}`)}><span className='icon'><TiFlowSwitch/></span></div>
                  <div className='btn'><span className='icon'><BiTable/></span></div>          
                  <div className='btn'><span className='icon'><FiUpload/></span></div>       
                </div>
                <p style={{fontSize:13}}>Code</p>
                <div className='shortcuts-ctrl'>
                  <div className='btn' onClick={()=>this.execute()}><span className='icon'><BsFillPlayFill/></span></div>
                  <div className='btn' onClick={()=>this.addShell()}><span className='icon'><BsTerminalPlus/></span></div>  
                  <div className='btn'><span className='icon'><VscDebugLineByLine/></span></div>
                  <div className='btn' onClick={()=>this.debug()}><span className='icon'><VscDebugAll/></span></div>
                  <div className='btn'><span className='icon'><VscDebugRestart/></span></div>  
                  

                </div>
                <p style={{fontSize:13}}> Diagrams </p>
                <div className='shortcuts-ctrl'>
                <div className='btn'><span className='icon'><AiOutlineDotChart/></span></div>
                <div className='btn'><span className='icon'><AiOutlineLineChart/></span></div>
                <div className='btn'><span className='icon'><AiOutlineBarChart/></span></div>
                <div className='btn'><span className='icon'><AiOutlineAreaChart/></span></div>            
                <div className='btn'><span className='icon'><AiOutlinePieChart/></span></div>            
                <div className='btn'><span className='icon'><GrGraphQl/></span></div>            
                </div></>),  closable:true,}],}
              
        this.console= {
            id:"console",
            tabs:[{ 
              id:"console",title:'Console', 
              content: (
                <Context.Consumer>
                  {(context) => (
                    <div className='TERMINALX'>
                      {context.console_output.map((item, i) => ( <div className='outline'>
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
                    <div>{context.console_error.map( 
                      (item,i)=>(<><div>Error[{i}]</div>
                      <div>{item}</div></>))}</div> 
                  )}
              </Context.Consumer>),closable:true,
            },
            // { id:"ipythonShell",
            //   title:'IPython', 
            //   content: (<IPythonShell/>),
            //   closable:true
            // }
              ],size:60, panelLock: true
        }
        this.Tools={tabs:[{ id:"Tools",title:'Tools', 
              content: (<div><h3>Tools</h3><p>Make it easy</p></div>),  
              closable:true,}]}
      this.desktopLayout={
          dockbox : {
            // content:(<div>Hello</div>),
            mode :"horizontal",
            children:[    
              {
                mode: "vertical",          
                children:[
                  { mode: "horizontal",         
                    children:[  
                      {tabs:[{id:"directoryTree",title:"Directory",content:(<DirectoryTree/>)} ],size:40},
                      this.editor_panel,]
                  },this.console,
                ],
              },
              {mode: "vertical",children:[this.shortcuts,this.Tools,],size:35,},
            ],

          },
   
      }
      this.mobileLayout = {
        dockbox : {
          mode :"vertical",
          children:[    
            { mode: "horizontal",          
              children:[
                this.editor_panel,
                {...this.shortcuts,size:20}
              ],size:450
            },
            { mode: "horizontal",children:[
              {tabs:[{id:"directoryTree",title:"Directory",content:(<DirectoryTree/>)} ],size:'50%'},
              this.Tools,]
              ,size:'20%',
            },     
            {...this.console,size:'20%'}   
          ]
        }
      }
    }
  getRef = (r) => {this.dockLayout = r;};
  save(){}
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
  onLayoutChange = (newLayout, currentTabId, direction) => {
    switch(direction){
      case 'remove':
        delete this.editors[currentTabId];
        break;
      case 'active':
        this.editorRef.current = this.editors[currentTabId]
        break;
      case 'middle':case 'float':
        this.tabRef.current=this.dockLayout.find(currentTabId);break;
      default:
        console.log(direction)
    }
  }
  handleEditorDidMount(editor, monaco) {    
    monaco.editor.setTheme(`vs-${document.getElementById("OuterMostBody").className}`);
    this.editorRef.current=editor;
    this.monacoRef.current=monaco;
    
    this.editors[`${this.tempPath}`]=editor
  }
  execute(){
    if(this.editorRef.current){
      const code = this.editorRef.current.getValue()
      const url="https://eigen-flow.onrender.com/api/code/exe_raw"
      // const url="https://eigen-flow.onrender.com/api/code/exe_raw"
      axios.post(url, {code:code,})
      .then((res)=>this.add_output(res.data))
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  addTab = (path,code) => {
    this.tempPath=path;
    this.dockLayout.dockMove(this.newEditorTab(path,code), 'editor_panel', 'middle');
  };
  addShell = () => {
    const shell_id = this.shell_id_count++
    this.dockLayout.dockMove(this.newShellTab(`${shell_id}`), 'editor_panel', 'middle');
  };
  newEditorTab(path, code) { /*method*/ 
    return { id:path ,closable:true,title:path,
      content: ( <Editor  height="100vh" width="100%" theme="myTheme" defaultLanguage='python' path={path}
      style={{top:"20px"}} onMount={(editor, monaco)=>this.handleEditorDidMount(editor, monaco)}/>),};
  }
  newShellTab(shell_id){
    return  { id:shell_id ,closable:true,title:"IPython",
      content: (<IPythonShell id={shell_id}/>),};
  }
  addDataFlowGraphEditor(path,default_graph){
    this.tempPath=path;
    this.dockLayout.dockMove(this.newDataFlowGraphEditorTab(path,default_graph), 'editor_panel', 'middle');
  }
  newDataFlowGraphEditorTab(path,default_graph = null){
    return {
      id:path,closable:true,title:`G:${path}`,
      content:(<DataFlowGraph/>)
    }
  }
  componentWillUnmount(){}
  componentWillMount(){
    if(window.innerWidth>700) this.layout = this.desktopLayout
    else this.layout = this.mobileLayout
  }
  render() {  
    return (
      <Context.Provider value={{console_output:this.state.console.output,console_error:this.state.console.error,value:"This is great\n\niam also"}}>
        <DockLayout ref={this.getRef} defaultLayout={this.layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}} theme="dark"
        onLayoutChange={this.onLayoutChange}/>
      </Context.Provider>
    );
  }
}
export default Analysis;
