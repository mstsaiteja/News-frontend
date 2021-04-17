import React,{useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheets/About.css';

function About(props){

    const {setActive, logged} = props;

    useEffect(() => {
        setActive('about');
    },[]);

    if(logged)
        return <Redirect to='/dashboard'/>

    return (
        <div id="About">
            This is a News website<br/><br/>
            It displays top-headlines for a particular Country<br/><br/>
            You can also search news related to a particuler topic between respective dates<br/><br/>
            It also has multi language feature<br/><br/>
            Initially displays top-headlines from India<br/><br/>
            Used News api for fetching data<br/><br/>
            Build this website using React for front-end, Nodejs for back-end and MongoDb as Database
        </div>
    );
}

export default About;