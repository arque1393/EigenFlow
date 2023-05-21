import { useState } from "react";
function DirectoryTree(){
    let [isConnected,setIsConnected] = useState(false)
    return(<div className="directory-tree-area" style={dirTreeStyle}>
        {/* {isConnected} */}
        <div style={btnStyle}>Connect Drive</div>
    </div>)
}


const dirTreeStyle={
    position:'relative',
    minHeight:'100%',minWidth:'100%',display: 'flex',
    justifyContent: 'center',alignItems: 'center'
}
const btnStyle={position:'relative',backgroundColor:"#3f3fa4",
maxWidth:'fit-content',borderRadius:10,padding:'2px 5px' }
export default DirectoryTree