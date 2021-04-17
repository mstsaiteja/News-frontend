import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css'

function Navbar(props){

	const {active, setSidebar} = props;

	const list = (
		<ul>
			<Link to="/"><li className={active==='home'?'active':''}>Home</li></Link>
			<Link to="/signup"><li className={active==='signup'?'active':''}>Signup</li></Link>
			<Link to="/login"><li className={active==='login'?'active':''}>Login</li></Link>
			<Link to="/about"><li className={active==='about'?'active':''}>About</li></Link>
		</ul>
	);

	return (
		<div id="navbar">
			<img src="logo.jpg" id="logo" alt='logo'/>
			{(active!=='dashboard')?list:null}
			{(active==='dashboard')?<div> <span id="dispname">{JSON.parse(localStorage.getItem('user')).name}</span><img src="menu.png" id="menu" alt='menu' title="options" onClick={()=>setSidebar((prev)=>!prev)}/></div>:null}
		</div>
	);
}

export default Navbar;