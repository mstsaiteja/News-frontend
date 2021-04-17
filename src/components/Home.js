import React,{useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../stylesheets/Home.css';

function Home(props){

    const {setActive, logged} = props;

    useEffect(() => {
        setActive('home');
    },[]);

    if(logged)
        return <Redirect to='/dashboard'/>

    return (
        <div id="display">
            <h1>Your News<br/>Your Language<br/>Never Miss a Thing!</h1>
            <Link to="/signup"><button id="start" onClick={()=>setActive('signup')}>Get Started!</button></Link>
        </div>
    );
}

export default Home;