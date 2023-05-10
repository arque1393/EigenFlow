// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   useReactFlow,
//   Controls,
//   Background,
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import './graphModel.css'

// let nodeId=0;
// const defaultNodes =[{
//       id:"id0009",
//       position: {
//         x: 10,
//         y: 10,
//       },
//       data: {
//         label: `Nodeeerv`,
//       },}
//     ] ;
// const defaultEdges = [];
// const edgeOptions = { animated: true,  style: { stroke: 'white',},};

// function DataFlowGraph(props){
//     let [nodeMenu,setNodeMenu] = useState("")
//     function escapeEvents () {setNodeMenu("");} 

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



//       const handleKeyPress = useCallback((event) => {
//         console.log(event.key)
//         if (event.altKey === true ) {
//         event.preventDefault()
//           switch(event.key){
//             case "a": setNodeMenu(" newNodeActive");break;
//             case "C":;
//           }
//         }
//         if(event.key==="Escape"){
//           escapeEvents()
//         }
//       }, []);  
//       useEffect(() => {
//         document.addEventListener('keydown', handleKeyPress);
//         return () => {document.removeEventListener('keydown', handleKeyPress);};
//       }, [handleKeyPress]);




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

