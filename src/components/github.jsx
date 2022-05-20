import axios from "axios";

const {useState, useEffect}=require("react");

const getGithubuser=(q="albseb511")=>{
   return axios("https://api.github.com/search/users",
    {method:"GET",
     params:{
        q:q
    }
})
   
};

function Github(){
    // const [loading, setLoading]=useState();
    const [error, setError]=useState(false);
    const [data, setData]=useState([]);

    useEffect(()=>{
     
   getGithubuser("albseb")
   .then(res=>{
    setData(res.data)
        })
        .catch(err=>{
    setError(true)
    console.log(err)
        })
    },[])
console.log(data)
    return (
      <div>
            <h1>Github Users</h1>
        {data?.items?.map((item)=>(<GithubCard key={item.id}{...item}/>))}
      </div>
    );
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