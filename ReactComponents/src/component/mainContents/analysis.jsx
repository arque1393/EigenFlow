import * as React from 'react';
import {DockLayout} from 'rc-dock';
import './basic.css'
// import DragStore from 'react-draggable';
import { FiMinimize2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { CgMaximizeAlt } from 'react-icons/cg';

let solution = {
  title:'Solution Explorer', 
  content: (
    <div>
      <h1>Tab1 Tab</h1>
    </div>),  
    closable:true,
}
let editorTab={
  title:'Solution Explorer', 
  content: (
    <div>
      <p>Writw or edit Your Code </p>
    </div>),  
}


let count = 0;
function newTab() {
  return {
    id: `newtab${++count}`,
    title: 'New Tab',
    content: (
      <div>
        <p>Write Your code here</p>
      </div>),
    closable:true,
  };
}
let codeEditor={
  tabs: [newTab(), newTab()],
  panelLock: {
    minWidth: 200,
    panelExtra: (panelData, context) => (
      <button className='add-new-tab-btn'
              onClick={() => context.dockMove(newTab(), panelData, 'middle')}>
        add
      </button>
    )
  }
}

const console= {
  tabs:[
    { 
      id:"console",
      title:'Console', 
      content: (
        <div>
          <p1>[1]: Type Your Command </p1><br/>
          <p1>[2]: </p1>
        </div>),  
        closable:true,
    },{ 
      id:"log",
      title:'Error Log', 
      content: (
        <div>
          <p1>......Log Information ........ </p1><br/>
          <p1>......Log Information ........ </p1><br/>
          <p1>......Log Information ........ </p1><br/>         
        </div>),  
        closable:true,
    },
],
  size:60
}

    
const shortcuts={
  tabs:[
    { 
      id:"shortcuts",
      title:'Shortcuts', 
      content: (
        <div>
          <h3>Shortcuts</h3>
          <p>Make it easy</p>
        </div>),  
        closable:true,
    }]
}
const Tools={
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










const layout={
  dockbox : {
    mode :"horizontal",
    children:[    
      {
        mode: "vertical",
        // size: 1200,
        children:[
          {
            mode: "horizontal",         
            children:[
              {
                tabs:[{id:"directort",title:"Directory Tree",content:(<p> Label 1</p>)} ],
                size:40
              },
              codeEditor,
              {
                mode: "vertical",         
                children:[
                    shortcuts,
                    Tools,
                ],
                size:80,
              }
            ]
          },
         console,
        ],
      },
      {
        mode:'vertical',
        tabs:[{...solution, id:"solution"}],
        size:35
      },
    ]
  }
}

class Analysis extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}} theme="dark"/>
    );
  }
}

export default Analysis;
