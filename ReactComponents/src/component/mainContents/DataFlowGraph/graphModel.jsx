import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './graphModel.css'



// function DataFlowGraph(props){
    // let [nodeMenu,setNodeMenu] = useState("")
    // function escapeEvents () {setNodeMenu("");} 

//     // const reactFlowInstance = useReactFlow(); 
//     // const onClick = useCallback(() => {
//     //   const id = `${++nodeId}`;
//     //   const newNode = {
//     //     id:id,
//     //     position: {
//     //       x: 10,
//     //       y: 10,
//     //     },
//     //     data: {
//     //       label: `Node ${id}`,
//     //     },
//     //   };
//     //   reactFlowInstance.addNodes(newNode);
//     // }, []);



      // const handleKeyPress = useCallback((event) => {
      //   console.log(event.key)
      //   if (event.altKey === true ) {
      //   event.preventDefault()
      //     switch(event.key){
      //       case "a": setNodeMenu(" newNodeActive");break;
      //       case "C":;
      //     }
      //   }
      //   if(event.key==="Escape"){
      //     escapeEvents()
      //   }
      // }, []);  
      // useEffect(() => {
      //   document.addEventListener('keydown', handleKeyPress);
      //   return () => {document.removeEventListener('keydown', handleKeyPress);};
      // }, [handleKeyPress]);




//       return(<>
        
        
//             <div onMouseLeave={escapeEvents} className={`newNodePopup${nodeMenu}`}>
//               {/* <div onClick={onClick}> Add New 0</div> */}
//               <div> Add New 1</div>
//               <div> Add New 2</div>
//               <div> Add New 3</div>
//             </div>

//         <div className='DATA_FLOW_GRAPH_EDITOR'>
//             <ReactFlow style={{ width: '100vw', height: '100vh' }}  defaultNodes={defaultNodes}
//             defaultEdges={defaultEdges}
//             defaultEdgeOptions={edgeOptions}
//             fitView><Background/><Controls/></ReactFlow>
//         </div>
//         </>
//         )
//     }
// export default DataFlowGraph;











import './graphModel.css';
const defaultEdges = [];
const defaultNodes = [];
const edgeOptions = {animated: true,style:{stroke:'white',},};
const connectionLineStyle = { stroke: 'white' };
let nodeId = 0;


function Flow() {

  let [nodeMenu,setNodeMenu] = useState("")
  function escapeEvents () {setNodeMenu("");} 


  const handleKeyPress = useCallback((event) => {
    console.log(event.key)
    if (event.altKey === true ) {
    event.preventDefault()
      switch(event.key){
        case "a": setNodeMenu(" newNodeActive");break;
        case "C":;
      }
    }
    if(event.key==="Escape"){
      escapeEvents()
    }
  }, []);  
  const handleRightClick = useCallback((event)=>{
    if(event.type === "contextmenu"){
      event.preventDefault();
      console.log("RightClick done")
    }
  })
  useEffect(() => {
    try{
      document.getElementsByClassName['FlowWindow'][0].addEventListener('keydown', handleKeyPress);

    }
    catch{}
    // document.addEventListener('contextmenu',handleRightClick)
    return () => {document.removeEventListener('keydown', handleKeyPress);
    // document.removeEventListener('contectmenu',handleRightClick);
  };
  }, [handleKeyPress]);






  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id, data: {label: `Node ${id}`,},
      position: {x: Math.random() * 500, y: Math.random() * 500,},
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <>
        <div onMouseLeave={escapeEvents} className={`newNodePopup${nodeMenu}`}>
           <div onClick={onClick}> Add New 0</div>
           <div> Add New 1</div>
           <div> Add New 2</div>
           <div> Add New 3</div>
        </div>
      <ReactFlow 
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        fitView
        style={{}}
        connectionLineStyle={connectionLineStyle}

        onPaneContextMenu={(event)=>{event.preventDefault();
          setNodeMenu(" newNodeActive");}
        }
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