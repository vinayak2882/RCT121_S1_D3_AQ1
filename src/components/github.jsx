
import axios from "axios";

const {useState, useEffect}=require("react");

const getGithubuser=(q="vinayak2882", page=1)=>{
   return axios("https://api.github.com/search/users",
    {method:"GET",
     params:{
        q,
        per_page:5,
        page
    }
})
   
};

function Github(){
    const [loading, setLoading]=useState();
    const [error, setError]=useState(false);
    const [query, setQuery]=useState("masai")
    const [data, setData]=useState([]);
    const [page, setpage]=useState(1);


    useEffect(()=>{
     setLoading(true);
   getGithubuser(query,page)
   .then(res=>{
       setLoading(false)
    setData(res.data)
    setError(false)
        })
        .catch(err=>{
            setLoading(false)
    setError(true)
    console.log(err)
        })
    },[query,page])


    const handleClick =(query)=>setQuery(query)
    // const handlepageChange= (page)=>setpage(page)
console.log(data)
    return (
      <div>
            <h1>Github Users</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error...</div>}
            <SearchBox handleClick={handleClick}/>
        {data?.items?.map((item)=>(<GithubCard key={item.id}{...item}/>))}
     <div>
         <button disabled={page===1} onClick={()=>setpage(page-1)}>Prev</button>
         <button onClick={()=>setpage(page+1)}>Next</button>
     </div>
      </div>
       
    );
    }

    const SearchBox = ({handleClick})=>{
        const [text,settext] =useState("");
        return (
            <div>
                <input type="text" value={text} onChange={e=>settext(e.target.value)}/>
                <button onClick={()=>handleClick(text)}>Search</button>
            </div>
        )
    }
    const GithubCard=({avatar_url,login})=>{
        return (
            <div style={{display:"flex",gap:"2rem"}}>
                <img style={{width:"100px"}} src={avatar_url} alt={login}/>
                <div>{login}</div>
                
            </div>
        )
    };

// }

export default Github