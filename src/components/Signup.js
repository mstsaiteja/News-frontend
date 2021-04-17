import React,{useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
import '../stylesheets/Signup.css';

const error_msgs = [
    'All fields must be filled',
    'Both passwords should be matched',
    'Password should be atleast 6 characters',
    'User name already exists'
]

function Signup(props){

    const [user, setUser] = useState({
        name : '',
        username: '',
        pass : '',
        cpass : ''
    });

    const [error0, setError0] = useState(false);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const {setActive, setNewAccount, logged} = props;

    useEffect(() => {
        setActive('signup');
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        });
    }

    const handleValidate = async(e) => {
        e.preventDefault();
        const {name, username, pass, cpass} = user;
        let access = true;
        setError0(false);setError1(false);
        setError2(false);setError3(false);
        if(!name || !username || !pass || !cpass) {
            setError0(true);access=false;}
        if(pass!==cpass){
            setError1(true);access=false;}
        if(pass.length < 6){
            setError2(true);access=false;}
        if(access){
            const res = await axios.post('http://localhost:5000/signup',user);
            if(res.data) setError3(true)
            else {setRedirect(true);setNewAccount(true);}
        }
    };

    if(logged)
        return <Redirect to='/dashboard'/>

    return (
        <div>
            <form onSubmit={handleValidate} method="POST" id="signup">
                <i className="material-icons" id="person">person</i>
                <div>
                    <label htmlFor='name'>Full Name</label><br/>
                    <input type='text' id='name' name='name' placeholder="name"
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='username'>User Name</label><br/>
                    <input type='text' id='username' name='username' placeholder="user name"
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='pass'>Password</label><br/>
                    <input type='password' id='pass' name='pass' placeholder='password'
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='cpass'>Confirm Password</label><br/>
                    <input type='password' id='cpass' name='cpass' placeholder='re-enter password' onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <input type="submit" id="submit"/>
                </div>
                <div>Already have an account? <Link to='/login' id="link" onClick={()=>setActive('login')}>login</Link></div>
            </form>
            <Message active={error0} setActive={setError0} msg={error_msgs[0]}/>
            <Message active={error1} setActive={setError1} msg={error_msgs[1]}/>
            <Message active={error2} setActive={setError2} msg={error_msgs[2]}/>
            <Message active={error3} setActive={setError3} msg={error_msgs[3]}/>
            {redirect?<Redirect to='/login'/>:null}
        </div>
    );
}

export default Signup;