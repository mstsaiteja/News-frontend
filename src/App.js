import React, { useState } from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';

function App(){

	const [active, setActive] = useState();

    const [newAccount, setNewAccount] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [logged, setLogged] = useState(localStorage.getItem('user')?true:false);

    return (
        <Router>
            <Route path="/" render={()=><Navbar active={active} setActive={setActive}
            setSidebar={setSidebar}/>}/>
            <Switch>
                <Route path="/" exact render={()=>
                    <Home setActive={setActive}  logged={logged}/>}/>
                <Route path="/signup" render={()=>
                    <Signup setNewAccount={setNewAccount} setActive={setActive} 
                    logged={logged}/>}/>
                <Route path="/login" render={()=>
                    <Login newAccount={newAccount} setNewAccount={setNewAccount} 
                    setActive={setActive}  logged={logged} setLogged={setLogged}/>}/>
                <Route path="/about" render={()=>
                    <About setActive={setActive} logged={logged}/>}/>
                <Route path="/dashboard" render={()=>
                    <Dashboard setActive={setActive}  logged={logged} setLogged={setLogged} sidebar={sidebar} setSidebar={setSidebar}/>}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Router>
    );
}

export default App;