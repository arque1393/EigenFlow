import * as React from 'react';
import {DockLayout} from 'rc-dock';
import './dockLayout.css'
// import DragStore from 'react-draggable';
import { FiMinimize2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { CgMaximizeAlt } from 'react-icons/cg';

const groups = {
  'close-all': {
    floatable: true,
    closable: true,
    panelExtra: (panelData, context) => {

      let buttons = [];
      if (panelData.parent.mode !== 'window') {
        buttons.push(
          <span className='my-panel-extra-btn' key='maximize'
                title={panelData.parent.mode === 'maximize' ? 'Restore' : 'Maximize'}
                onClick={() => context.dockMove(panelData, null, 'maximize')}>
          {panelData.parent.mode === 'maximize' ? <FiMinimize2/> : <CgMaximizeAlt/>}
          </span>
        )
 
      }
      buttons.push(
        <span className='my-panel-extra-btn' key='close' title='Close'
              onClick={() => context.dockMove(panelData, null, 'remove')}>
          <AiOutlineClose/>
        </span>
      )
      return <div>{buttons}</div>
    }
  }
};
const jsxTab = {
  id: 'jsxTab',
  title: 'jsx',
  closable: true,
  content: (<h1>GGGGGGGGGGGggg</h1>
  )
};
const htmlTab = {
  id: 'htmlTab',
  title: 'html',
  closable: true,
  content: <h1>I am great</h1>
};

let tab1 = {
  title:'Tab1 adf', 
  content: (
    <div>
      <p>Custom component can be added to panel's title bar.</p>
      <p>This panel has a custom maximize button and a close all button</p>
    </div>),
  closable: true,
  group: 'close-all'
};
const layout={
  dockbox : {
    mode :"horizontal",
    children:[{
      tabs:[{...tab1, id: 't1'},{...tab1, id: 't2'}, {...tab1, id: 't3'},{...tab1, id: 't4'},{...tab1, id: 't5'},{...jsxTab, group: 'close-all'}],}
    ]
  }
}
class Demo extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={layout} groups={groups} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

// ReactDOM.render(<Demo/>, document.getElementById('app'));


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


export default Demo;