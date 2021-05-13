import {useState, useEffect} from 'react';
import axios from 'axios';
import '../stylesheets/Tracker.css';

function Tracker(props){

    const {setSidebarState} = props;

    const [globalcases, setGlobalcases] = useState({});
    const [countrycases, setCountrycases] = useState({});

    const [country, setCountry] = useState("India");

    useEffect(()=>{
        axios.get("https://api.covid19api.com/summary")
        .then((res)=>{
            setGlobalcases(res.data.Global);
        })
    },[])
    
    useEffect(() => {
        axios.get("https://api.covid19api.com/summary")
        .then((res)=>{
            const cases = res.data.Countries;
            const countrycase = cases.find((data)=> data.Country===country)
            setCountrycases(countrycase);
        })
    },[country]);

    return (<div id='tracker'>
        <div><img src="corona.jpg" id="coronaimg"/></div>
        <div id="caseshead">Covid Cases<div><i className="material-icons" id="close" onClick={()=>setSidebarState("")}>close</i></div></div>
        <div id="countrylist">
            <span>
                <label htmlFor="country">Country:</label>
                <select id="country" onChange={(e)=>setCountry(e.target.value)}>
                    <option value="India">India</option>
                    <option value="United States of America">United States of America</option>
                    <option value="Australia">Australia</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="China">China</option>
                    <option value="Germany">Germany</option>
                    <option value="Egypt">Egypt</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Japan">Japan</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Russian Federation">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>    
                    <option value="Singapore">Singapore</option>
                    <option value="South Africa">South Africa</option>
                </select>
            </span>
        </div>
        <div id="globalcases">
            <span>Global</span><br/><br/>
            New Confirmed : {globalcases.NewConfirmed} <br/><br/>
            Total Confirmed : {globalcases.TotalConfirmed} <br/><br/>
            New Deaths : {globalcases.NewDeaths} <br/><br/>
            Total Deaths : {globalcases.TotalDeaths} <br/><br/>
            New Recovered : {globalcases.NewRecovered} <br/><br/>
            Total Recovered : {globalcases.TotalRecovered} <br/><br/>
        </div>
        <div id="countrycases">
            <span>{country}</span><br/><br/>
            New Confirmed : {countrycases.NewConfirmed} <br/><br/>
            Total Confirmed : {countrycases.TotalConfirmed} <br/><br/>
            New Deaths : {countrycases.NewDeaths} <br/><br/>
            Total Deaths : {countrycases.TotalDeaths} <br/><br/>
            New Recovered : {countrycases.NewRecovered} <br/><br/>
            Total Recovered : {countrycases.TotalRecovered} <br/><br/>
        </div>
    </div>)
}   

export default Tracker;