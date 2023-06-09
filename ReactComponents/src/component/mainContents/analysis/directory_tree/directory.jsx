// import { useState } from "react";
// function DirectoryTree(){
//     let [isConnected,setIsConnected] = useState(false)
//     return(<div className="directory-tree-area" style={dirTreeStyle}>
//         {/* {isConnected} */}
//         <div style={btnStyle}>Connect Drive</div>
//     </div>)
// }


// const dirTreeStyle={
//     position:'relative',
//     minHeight:'100%',minWidth:'100%',display: 'flex',
//     justifyContent: 'center',alignItems: 'center'
// }
// const btnStyle={position:'relative',backgroundColor:"#3f3fa4",
// maxWidth:'fit-content',borderRadius:10,padding:'2px 5px' }
// export default DirectoryTree

import React from "react";
import Tree from "./tree";

const treeData = [
  {
    key: "0",
    label: "Files",
    icon: "fa fa-folder",
    title: "Files Folder",
    children: [
      {
        key: "0-0",
        label: "File 1-1",
        icon: "fa fa-folder",
        title: "Files Folder",
        children: [
          {
            key: "0-1-1",
            label: "File-0-1.doc",
            icon: "fa fa-file",
            title: "Files Folder",
          },
          {
            key: "0-1-2",
            label: "File-0-2.doc",
            icon: "fa fa-file",
            title: "Files Folder",
          },
          {
            key: "0-1-3",
            label: "File-0-3.doc",
            icon: "fa fa-file",
            title: "Files Folder",
          },
          {
            key: "0-1-4",
            label: "File-0-4.doc",
            icon: "fa fa-file",
            title: "Files Folder",
          },
        ],
      },
    ],
  },
  {
    key: "1",
    label: "Desktop",
    icon: "fa fa-desktop",
    title: "Desktop Folder",
    children: [
      {
        key: "1-0",
        label: "File1.doc",
        icon: "fa fa-file",
        title: "Files Folder",
      },
      {
        key: "0-0",
        label: "documennt-2.doc",
        icon: "fa fa-file",
        title: "Files Folder",
      },
    ],
  },
  {
    key: "2",
    label: "Downloads",
    icon: "fa fa-download",
    title: "Downloads Folder",
    children: [],
  },
];

const TreeList = () => {
  return (
    <>
      <div className="row">
        <div className="col text-center">
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">
                <Tree data={treeData} />
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default TreeList;