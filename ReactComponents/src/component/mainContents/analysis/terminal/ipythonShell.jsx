import { useRef, useState } from 'react';
import axios from 'axios';
import './ipythonShell.css'

function IPythonShell(props){
    const uid="Unknown" // Get From redux when i will use that
    const shell_id = props.id
    let [input,setInput] = useState("")
    const inpRef = useRef();
    let [prevList, setPrevList] = useState([])
    // let [isDone,setIsDone] = useState(false)
    //   const url="https://eigen-flow.onrender.com/api/code/exe_ipy"
    const url='http://127.0.0.1:8000/api/code/exe_ipy'
    return(
        <div className='TERMINALX' onClick={()=>inpRef.current.focus()}>
            <div className="output">
                {
                   prevList.map( 
                        (item, i) => ( 
                        <div className='terminal_out_item'>
                            <div className='inline'>
                               <div className="prompt">
                                In[{i}]: </div>
                               <div className="content">{item.in}</div>
                            </div> 
                            <div className='outline'>
                                <div className="prompt">Out[{i}]: </div>
                                <div className="content">{item.out}</div>
                            </div>
                        </div>)
                    )
                }
            </div>

            <div className='inline'>
            <div className="prompt">In[{prevList.length}]:</div>
            <input type='text' value={input} ref={inpRef}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{
                let output1=""
                if(e.key==="Enter"){
                    let newOutput=prevList;
                    if(input === "clear"){ 
                
                        setPrevList([]);
                        setInput("") ;
                    }
                    else if(!input.trim().length){
                        
                    }
                    else {
                        
                        axios.post(url,{
                            codelines:input,
                            cred: {
                              uid:uid,
                              shell_id: shell_id
                            }
                          })
                          .then((res)=>{
                            if(res.data.result.return)//{
                                output1=res.data.result.return
                                // outPrompt=false}
                            else 
                                output1=res.data.result.output
                                console.log(output1)
                            newOutput.push(
                                {in:input,  
                                out:output1}
                                
                                
                            )
                            setPrevList(newOutput);
                            setInput("") ;
                            })
                          .catch(function (error) {
                            console.log(error);
                          });
                    }
                    
                  
                    return;
                }
            }}/>
            </div>

            <div className='blank'></div>
        </div>
    )
}

export default IPythonShell;