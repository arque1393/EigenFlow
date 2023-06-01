// export default function({data}){
//     return(<></>)
// }

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {AiFillCaretRight,AiFillCaretDown} from "react-icons/ai"
import "./tree.css";

const Tree = ({ data = [] }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;

  return (
    <li className="d-tree-node border-0">
      <div className="d-flex" onClick={(e) => setChildVisiblity(!childVisible)}>
        {hasChild && (
          <span className={`d-tree-toggler ${childVisible?"active":"active"}`}>
           {
            childVisible?<AiFillCaretDown/>:<AiFillCaretRight/>
           } 
          </span>
        )}

        <div className="d-tree-head">
          <i className={`mr-1 ${node.icon}`}> </i>
          {node.label}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;