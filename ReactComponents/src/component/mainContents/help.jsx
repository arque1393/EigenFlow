
import React, { useState }  from "react";
import axios from "axios";
// {useEffect,useState}
// import GraphModel from './modelGraph'
import ReactFlowProvider from 'reactflow';
import DataFlowGraph from './DataFlowGraph/graphModel';


function HelpPage(props){

    return(<>
    <h1>Help Desk </h1>
    <h4>Using For Test Perpuses</h4>
    {/* <ReactFlowProvider> */}
      <DataFlowGraph/>
    {/* </ReactFlowProvider>     */}
    {/* <GraphModel/> */}
    </>
    );
}
export default HelpPage;

// import React from 'react';
// import ReactFlow from 'reactflow';

// import 'reactflow/dist/style.css';

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];



// export default function help() {
//   return (
//     <div>
// <button>DDDDDD</button>
// <button>DDDDDD</button>
// <button>DDDDDD</button>
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlow nodes={initialNodes} edges={initialEdges} />
//     </div>
//     </div>
//   );
// }

// function helpPage(){
// return (
//   // <ReactFlowProvider>
//   <help/>
//   // </ReactFlowProvider>
//   // <h1>ffff</h1>
// )

// }