import {AiOutlineCaretDown} from "react-icons/ai"
import {FaSearch} from "react-icons/fa"
import './home.css'
function Home(){
    return(<div className="contentX">


        <div className="ProjectContent">
            <div className='TeamField'>
                <h6>Team Title</h6> 
                <span className='icon'><AiOutlineCaretDown/></span>
            </div>
            <div className="projects_items">
                <div className="p_item">Project 1</div>
                <div className="p_item">Project 1</div>
                <div className="p_item">Project 1</div>
                <div className="p_item">Project 1</div>
            </div>
            <div className="searchBar">
                <span className="icon"><FaSearch/></span>
                <input placeholder="Search"/>
            </div>
        </div>
        <div className="Description">
            
        <div className="project_item">
            <div className="title"><h4>Dark Worrier Data</h4></div>
            <div className="progress">      
                <div className="circle"><h6>H</h6></div>
                <div className="number"><h6>42%</h6></div>
        </div>
        </div>
        </div>

        <div className="Notification">qq</div>



    </div>
    );
}
export default Home;