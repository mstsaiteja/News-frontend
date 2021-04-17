import React,{useState, useRef} from 'react';
import '../stylesheets/Filter.css';

function Keyword(props){
    const {word} = props;

    return (
        <div id="word">
            {word} 
        </div>
    )
}

function Filter(props) {

    const {setSidebarState,setSidebar, setHeadlines, setEverything} = props;

    const [state, setState] = useState(true);

    const headCountryRef = useRef();
    const headCategoryRef = useRef();
    const headKeywordsRef = useRef();

    const state1 = (
        <form id="headlines">
            <div><span>
                <label htmlFor="country">Country:</label>
                <select id="country" ref={headCountryRef} name="country">
                    <option value="in">India</option>
                    <option value="fr">France</option>
                    <option value="us">United States of America</option>
                    <option value="au">Australia</option>
                    <option value="ch">Switzerland</option>
                    <option value="cn">China</option>
                    <option value="de">Germany</option>
                    <option value="eg">Egypt</option>
                    <option value="fr">France</option>
                    <option value="gb">United Kingdom</option>
                    <option value="jp">Japan</option>
                    <option value="kr">Korea</option>
                    <option value="nz">New Zealand</option>
                    <option value="pt">Portugal</option>
                    <option value="ru">Russia</option>
                    <option value="sa">Saudi Arabia</option>    
                    <option value="sg">Singapore</option>
                    <option value="za">South Africa</option>

                </select>
            </span>
            <span>
                <label htmlFor="category">Category:</label>
                <select id="category" ref={headCategoryRef} name="category">
                    <option value="general">General</option>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                </select>
            </span></div>
            
            <div>
                <label htmlFor="keywords">Keyword:</label>
                <input type="text" ref={headKeywordsRef} id="keywords" name="keywords" />
            </div>
        </form>
    );

    const [newKeywords, setNewKeywords] = useState([]);

    const fromRef = useRef();
    const toRef = useRef();
    const sortbyRef = useRef();
    const languageRef = useRef();
    const warn = useRef();

    const addKeyword = (e) => {
        const value = headKeywordsRef.current.value;
        if(value){
            setNewKeywords((prev)=>[...prev,value]);
        }
        headKeywordsRef.current.value = "";
    }

    const clearLastKeyword = (e) => {
        setNewKeywords((prev)=> prev.slice(0,prev.length-1));
    }

    const clearAllKeywords = (e) => {
        setNewKeywords([]);
    }

    const state2 = (
        <form id="everything">
            <div>
                <label htmlFor="sortby">Sort By:</label>
                <select id="sortby" name="sortby" ref={sortbyRef}>
                    <option value="publishedAt">Newest</option>
                    <option value="popularity">Popularity</option>
                    <option value="relavency">Relavency</option>
                </select>
                <label htmlFor="language">Language:</label>
                <select id="language" name="language" ref={languageRef}>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="zh">Chineese</option>
                </select>
            </div>
            <span>
                <label htmlFor="fromdate">From:</label>
                <input type="date" id="fromdate" ref={fromRef} name="from"/>
            </span>
            <span>
                <label htmlFor="todate">To:</label>
                <input type="date" id="todate" ref={toRef} name="to"/>
            </span>
            
            <div>
                <label htmlFor="keywords">Keywords:</label>
                <span id="warn" ref={warn}>(*Atleast 1 keyword)</span> <br/>
                <input type="text" ref={headKeywordsRef} id="keywords" name="keywords" />
                <button id="add" type="button" onClick={addKeyword}>Add</button>
                <button type="button" onClick={clearLastKeyword}>Clear Last</button>
                <button type="button" onClick={clearAllKeywords}>Clear All</button>
            </div>
            <div id="words">
                {newKeywords.map((value,index)=>
                    <Keyword word={value} key={index}/>
                )}
            </div>
        </form>
        
    )

    const search = ()=> {
        if(state){
            setHeadlines({
                country: headCountryRef.current.value,
                category: headCategoryRef.current.value,
                keywords: headKeywordsRef.current.value
            });
            setSidebarState("");
            setSidebar(false);
        }else{
            if(newKeywords.length){
                setEverything({
                    from: fromRef.current.value,
                    to: toRef.current.value,
                    sortBy: sortbyRef.current.value,
                    language: languageRef.current.value,
                    keywords: newKeywords
                });
                setSidebarState("");
                setSidebar(false);
            }else{
                warn.current.style.display = "inline";
                setTimeout(()=>{
                    warn.current.style.display = "none";
                },1500);
            }
        }
    }

    return (
        <div id="filter">
            <div id="type">
                <div className={state?"filteractive":null} onClick={()=>setState(true)}>Headlines</div> 
                <div className={state?null:"filteractive"} onClick={()=>setState(false)}>Everything</div>
            </div>
            {state?state1:state2}
            <div id="buttons">
                <button id="remove" onClick={()=>{setSidebarState("")}}>Cancel</button>
                <button id="search" onClick={search}>Search</button>
            </div>
        </div>
    );
}

export default Filter;