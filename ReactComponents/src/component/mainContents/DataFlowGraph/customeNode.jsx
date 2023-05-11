import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="specialNode">
      <Handle id='a' type="target" position={Position.Top} isConnectable={isConnectable} />
        <Handle id='b' type="target" position={Position.Left} isConnectable={isConnectable} />
        <Handle id= 'c' type="source" position={Position.Right} isConnectable={isConnectable} />
        <Handle id= 'd' type="source" position={Position.Right} isConnectable={isConnectable} style={{top:'20px'}} />

      <div className='subRow'>
        This Is 1
      </div>    

      <div className='subRow'>
      This Is 2
      </div>    

      <div className='subRow'>
      This Is 3
      </div>

    </div>
  );
}

export default TextUpdaterNode;
