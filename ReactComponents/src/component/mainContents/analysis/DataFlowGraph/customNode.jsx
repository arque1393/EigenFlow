import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function SpecialNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="specialNode classNode">
        <Handle className="NodePointer" id='a' type="target" position={Position.Left} isConnectable={isConnectable} style={{top:'30px'}}/>
        <Handle className="NodePointer" id='b' type="target" position={Position.Left} isConnectable={isConnectable} style={{top:'60px'}}/>
        <Handle className="NodePointer" id= 'c' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:'20px'}} />
        <Handle className="NodePointer" id= 'd' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:'40px'}} />
        <Handle className="NodePointer" id= 'e' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:'60px'}} />

      <div className='subRow'>
        Demo Method
      </div>    

      <div className='subRow'>
        Demo Method 2
      </div>    

      <div className='subRow'>
        Demo Method 3
      </div>

    </div>
  );
}
function CustomNode(){
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

}


function DataReader({ data, isConnectable }){
  return(<>
  <div className="specialNode instanceNode">
  <Handle className="NodePointer" id= 'c' type="source" position={Position.Right} isConnectable={isConnectable}  />
<Handle className="NodePointer" id='a' type="target" position={Position.Left} isConnectable={isConnectable} />

Read Data Frame 

</div>
</>)
}





function TrainTestSplit({ data, isConnectable }){
  return(<>
  <div className="specialNode functionNode" style={{height:75}}>
<Handle className="NodePointer" id= 'e' type="target" position={Position.Left} isConnectable={isConnectable}  />
<Handle className="NodePointer" id='a' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:15}}/>
<Handle className="NodePointer" id='b' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:30}}/>
<Handle className="NodePointer" id='c' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:45}}/>
<Handle className="NodePointer" id='d' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:60}}/>

<div style={{position:'relative',top:'25%'}}>Train Test Split </div>

</div>
</>)
}
export default CustomNode;
export { SpecialNode,DataReader,TrainTestSplit};
