import React,{useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
import '../stylesheets/Login.css';

const success_msgs = [
    'New Account Created'
]

const error_msgs = [
    'All fields must be filled',
    'Invalid User name',
    'Invalid Password'
]

function Login(props){

    const {setActive, logged, setLogged} = props;
    const [newAccount, setNewAccount] = [props.newAccount, props.setNewAccount];

    const [user, setUser] = useState({
        username: '',
        pass: ''
    })

    const [error0, setError0] = useState(false);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setActive('login');
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const handleValidate = async(e) => {
        e.preventDefault();
        const {username, pass} = user;
        setError0(false);setError1(false);setError2(false);
        if(!username || !pass) setError0(true);
        else {
            const res = await axios.post('http://localhost:5000/login',user);
            const {fuser,fpass,logger} = res.data;
            if(fuser){
                if(!fpass) setError2(true)
                else {
                    localStorage.setItem('user',JSON.stringify(logger));
                    setLogged(true);
                    setRedirect(true);
                }
            }
            else setError1(true);
        }
    };

    if(logged)
        return <Redirect to='/dashboard'/>

    return (
        <div>
            <form onSubmit={handleValidate} method="POST" id="login">
                <i className="material-icons" id="person">person</i>
                <div>
                    <label htmlFor='user'>User Name</label><br/>
                    <input type='text' id='username' name='username' placeholder="user name"
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='pass'>Password</label><br/>
                    <input type='password' id='pass' name='pass' placeholder='password'
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <input type="submit" id="submit"/>
                </div>
                <div>Don't have an account? <Link to='/signup' id="link" onClick={()=>setActive('signup')}>signup</Link></div>
            </form>
            <Message active={newAccount} setActive={setNewAccount} msg={success_msgs[0]} success={true}/>
            <Message active={error0} setActive={setError0} msg={error_msgs[0]}/>
            <Message active={error1} setActive={setError1} msg={error_msgs[1]}/>
            <Message active={error2} setActive={setError2} msg={error_msgs[2]}/>
            {redirect?<Redirect to='/dashboard'/>:null}
        </div>
    );
}

export default Login;