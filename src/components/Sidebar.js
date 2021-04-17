import React,{useState,useRef} from 'react';
import axios from 'axios';
import Filter from './Filter';
import '../stylesheets/Sidebar.css'

function ChangeName(props){

    const {setSidebarState, setSidebar} = props;

    const nameRef = useRef();
    const warnRef = useRef();

    const user = JSON.parse(localStorage.getItem('user'));

    const change = () => {
        const value = nameRef.current.value;
        if(value){
            const newuser = {...user, name: value}
            axios.post("http://localhost:5000/change/name",newuser)
            .then((res)=>{
                localStorage.setItem('user',JSON.stringify(newuser))
                alert("Name Successfully updated...!")
                setSidebarState("");
                setSidebar(false);
            })
        }else{
            warnRef.current.style.display = "inline";
            setTimeout(()=>{
                warnRef.current.style.display = "none";
            },1000);
        }
    }
    return (
        <div id="changename">
            <div id="type">
                <span>Change Name</span>
            </div>
            <div id="changenameoptions">
                <div>
                    <label htmlFor="currname">Current Name: </label>
                    <input type="text" id="currname" value={user.name}/>
                </div><br/><br/>
                <div>
                    <label htmlFor="newname">New Name: </label>
                    <input type="text" ref={nameRef} id="newname"/>
                    <span id="req" ref={warnRef}>(*Required)</span>
                </div>
            </div>
            

            <div id="buttons">
                <button id="remove" onClick={()=>{setSidebarState("")}}>Cancel</button>
                <button id="search" onClick={change}>Change</button>
            </div>
        </div>
    )
}

function ChangePassword(props){

    const {setSidebarState, setSidebar} = props;

    const oldpassRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();
    const warnRef = useRef();
    const warn1Ref = useRef();
    const warn2Ref = useRef();

    const user = JSON.parse(localStorage.getItem('user'));

    const change = () => {
        const pass1 = passRef.current.value;
        const pass2 = cpassRef.current.value;
        if(pass1!==pass2){
            warn2Ref.current.style.display = "inline";
            setTimeout(()=>{
                warn2Ref.current.style.display = "none";
            },1000);
        }else if(pass1.length<5){
            warn1Ref.current.style.display = "inline";
            setTimeout(()=>{
                warn1Ref.current.style.display = "none";
            },1000);
        }else{
            const oldpass = oldpassRef.current.value;
            const newuser = {...user, password: oldpass, newpass: pass1};
            axios.post("http://localhost:5000/change/password",newuser)
            .then((res)=>{
                if(res.data.flag){
                    localStorage.setItem('user',JSON.stringify(res.data.user));
                    alert("Password Successfully updated...!")
                    setSidebarState("");
                    setSidebar(false);
                }else{
                    warnRef.current.style.display = "inline";
                    setTimeout(()=>{
                        warnRef.current.style.display = "none";
                    },1000);
                }
            })
        }
    }
    return (
        <div id="changepassword">
            <div id="type">
                <span>Change Password</span>
            </div>
            <div id="changepassoptions">
                <div>
                    <label htmlFor="currpass">Current Password: </label>
                    <input type="password" ref={oldpassRef} id="currpass"/>
                    <span id="req" ref={warnRef}>(*Incorrect)</span>
                </div><br/><br/>
                <div>
                    <label htmlFor="newpass">New Password: </label>
                    <input type="password" ref={passRef} id="newpass"/>
                    <span id="req1" ref={warn1Ref}>(*Atleast 5 letters)</span>
                </div><br/><br/>
                <div>
                    <label htmlFor="cnewpass">Confirm Password: </label>
                    <input type="password" ref={cpassRef} id="cnewpass"/>
                    <span id="req2" ref={warn2Ref}>(*Passwords unequal)</span>
                </div>
            </div>

            <div id="buttons">
                <button id="remove" onClick={()=>{setSidebarState("")}}>Cancel</button>
                <button id="search" onClick={change}>Change</button>
            </div>
        </div>
    )
}

function Sidebar(props) {

    const {setActive, setLogged, setSidebar, setHeadlines, setEverything} = props;

    const [sidebarState, setSidebarState] = useState("");

    const logout = () => {
        setLogged(false);
        setActive('login');
        localStorage.removeItem('user');
    }

    return (
        <div>
            <ul id="sidebar">
                <li id="heading">Dashboard</li>
                <li className={sidebarState==="filter"?"sideactive":null} onClick={()=>{;
                    setSidebarState("filter");
                    }
                }>Filter</li>
                <li className={sidebarState==="name"?"sideactive":null} onClick={()=> {
                    setSidebarState("name");
                }}>Change Name</li>
                <li className={sidebarState==="password"?"sideactive":null} onClick={()=> {
                    setSidebarState("password");
                }}>Change Password</li> 
                <li onClick={logout}>Log Out</li>
            </ul>
            {sidebarState==="filter"?<Filter setSidebarState={setSidebarState} 
            setHeadlines={setHeadlines} setSidebar={setSidebar} 
            setEverything={setEverything}/>:null}
            {sidebarState==="name"?<ChangeName setSidebar={setSidebar} 
            setSidebarState={setSidebarState}/>:null}
            {sidebarState==="password"?<ChangePassword setSidebar={setSidebar} setSidebarState={setSidebarState}/>:null}
        </div>
    )
}

export default Sidebar;