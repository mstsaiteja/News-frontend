import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import News from './News';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../stylesheets/Dashboard.css';

function Dashboard(props) {
    const {setActive, sidebar, setSidebar, logged, setLogged} = props;

    const [news, setNews] = useState([]);
    const [result, setResult] = useState(true);
    const [firstRender, setFirstRender] = useState(true);

    const [headlines, setHeadlines] = useState({
        country: 'in',
        category: 'general',
        keywords: ''
    });

    const [everything, setEverything] = useState({
        from: '',
        to: '',
        sortBy: '',
        language: '',
        keywords: []
    });

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(async()=>{
        setActive('dashboard');
        const res = await axios.post('http://localhost:5000/verify',user);
        const verified = res.data;
        verified?setLogged(true):setLogged(false);
    },[]);

    useEffect(()=> {
        const url = `https://newsapi.org/v2/top-headlines?q=${
            headlines.keywords}&country=${headlines.country}&category=${headlines.category}&pageSize=100&apiKey=9e9ff16a12b9486faf63b915b105bcd6`;

        axios.get(url)
        .then((res)=>{
            if((res.data.status=="ok")&&(res.data.totalResults)){
                setResult(true);
                setNews(res.data.articles);
            }else setResult(false);
        })
        .catch((err)=>{
            setResult(false);
        })
        .finally(()=>{setFirstRender(false)})
    },[headlines])

    useEffect(()=> {
        const url = `https://newsapi.org/v2/everything?q=${
            everything.keywords.join('%20OR%20')}&from=${everything.from}&to=${everything.to}&sortBy=${everything.sortBy}&language=${everything.language}&pageSize=100&apiKey=9e9ff16a12b9486faf63b915b105bcd6`;

        if(!firstRender){
            axios.get(url)
            .then((res)=>{
                if((res.data.status=="ok")&&(res.data.totalResults)){
                    setResult(true);
                    setNews(res.data.articles);
                }else setResult(false);
            })
            .catch((err)=>{
                setResult(false);
            })
        }
    },[everything])

    if(logged){
        if(result){
            if(news.length){
                return (
                    <div id="dashboard">
                        {news.map((data,index)=>{
                            return (data.content)?<News data={data.title} 
                            date={data.publishedAt.slice(0,10)} url={data.url} image={data.urlToImage} key={index}/>:null
                        })}
                        {sidebar?<Sidebar setLogged={setLogged} setActive={setActive}setSidebar={setSidebar}
                        setHeadlines={setHeadlines} setEverything={setEverything}/>:null}
                    </div>
                )
            }else{
                return(
                    <div>
                        <div id="load">Loading...!</div>
                        {sidebar?<Sidebar setLogged={setLogged} setActive={setActive}  setSidebar={setSidebar} setHeadlines={setHeadlines} 
                        setEverything={setEverything}/>:null}
                    </div>
                )
            }
        }else{
            return (
                <div>
                    <div id="empty">Oops..!<br/>No Results</div>
                    {sidebar?<Sidebar setLogged={setLogged} setActive={setActive}
                    setSidebar={setSidebar} setHeadlines={setHeadlines}/>:null}
                </div>
            )
        } 
    }
    else{
        return <Redirect to='/login' />;
    }
}

export default Dashboard;