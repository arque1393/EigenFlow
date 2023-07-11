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
            <div className="title"><h4>Dark Worrier Data</h4></div>
            <div className="project_card">
                <div className="progress"><div className="circle"><h6>66</h6></div></div>
                <div className="progress">
                    <div className="rectangle"/>
                    <div className="rectangle"/>
                    <div className="rectangle"/>
                    <div className="rectangle"/>
                </div>
            </div>
            <div>
                <div>Project ID :  mmmmmmmm</div>
                <div>Domain :    mmmmmmmm</div>
                <div>Client ID :  mmmmmmmm</div>
                <div>Client Name :   mmmmmmmm</div>
                <div>Progress Rate :  mmmmmmmm</div>
                <div>Initiate Date:   mmmmmmmm</div>
                <div>Target End Date :  mmmmmmmm</div>
                <div>Total Workers:  mmmmmmmm</div>
            </div>
        </div>
        <div className="Notification">
            <h3>Notifications</h3>
            <div className="notification_field">
                <div className="notification">You are assign to Task 114. check your task.</div>
                <div className="notification">You are assign to Task 114. check your task.</div>
                <div className="notification">You are assign to Task 114. check your task.</div>
            </div>
        </div>



    </div>
    );
}
export default Home;