import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider, useKeyPress,
  addEdge,  useNodesState,  useEdgesState,  useReactFlow,
  Controls,  Background,} from 'reactflow';
// import styled, { ThemeProvider } from 'styled-components';
import {SpecialNode} from './customNode'
import 'reactflow/dist/style.css';
import './graphModel.css'
import './graphModel.css';


const defaultEdges = [];
const defaultNodes = [];
const edgeOptions = {animated: true,style:{stroke:'white',},};
const connectionLineStyle = { stroke: 'white' };
let nodeId = 0;


function Flow() {

  const graphCanvas = useReactFlow();
  // collecting reactflow instance 
  const onClick = useCallback(() => { const id = `${++nodeId}`;
    const newNode = { id, data: {label: `Node ${id}`,},position: {x: Math.random() * 500, y: Math.random() * 500,},
      type:'special'
    };
    graphCanvas.addNodes(newNode);
  }, []);
/// Node tracking using reference useRef
let node = useRef(null)
// Right click context menu for adding nodes 
  let [nodeMenu,setNodeMenu] = useState("")
  let [menuPosition,setMenuPosition] = useState({top:'4rem',left:'5rem'})
  function escapeEvents () {setNodeMenu("");} // escaping all temp mode 

//Key Bindings Hooks useKeyPress
  let alt_a = useKeyPress('Alt+a');
  let escape = useKeyPress('Escape');
  let del = useKeyPress('Delete');
  useEffect(()=>{setNodeMenu(" newNodeActive")},[alt_a])
  useEffect(()=>{try{graphCanvas.deleteElements({nodes:[node.current]})}catch{}},[del])
  useEffect(()=>{escapeEvents()},[escape])


  // return actual component 
  return (
    <>
        <div style={menuPosition} onMouseLeave={escapeEvents} className={`newNodePopup${nodeMenu}`}>
          <div onClick={onClick}> Add New 0</div>
          <div> Add New 1</div>
          <div> Add New 2</div>
          <div> Add New 3</div>
        </div>
      <ReactFlow className='graph_container'
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={{special:SpecialNode}}
        fitView
        style={{}}
        connectionLineStyle={connectionLineStyle}
        onNodeClick={(e,n)=>{node.current=n}}
        onKey

        onPaneContextMenu={(event)=>{event.preventDefault();

          const rect = document.getElementsByClassName("graph_container")[0].getBoundingClientRect();

          setMenuPosition({left:`${event.clientX-rect.left}px`,top:`${event.clientY-rect.top}px`})
          setNodeMenu(" newNodeActive")
          
          ;}
        }
        onPaneClick={escapeEvents}
      ><Background color="#aaa" gap={16} />
      </ReactFlow>
    
    </>
  );
}

export default function () {
    return (

    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}