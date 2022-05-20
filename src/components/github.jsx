import axios from "axios";

const {useState, useEffect}=require("react");

const getGithubuser=(q)=>{
   return axios("https://api.github.com/search/users",
    {method:"GET", params:{q:q}})
   
}

function Github(){
    // const [loading, setLoading]=useState();
    const [error, setError]=useState(false);
    const [data, setData]=useState([]);

    useEffect(()=>{
     
   getGithubuser("vinayak2882")
   .then(res=>{
    setData(res.data)
        })
        .catch(err=>{
    setError(error)
    console.log(err)
        })
    })

    return (
      <div>
            <h1>Github Users</h1>
        {data?.items?.map/((items)=>(<GithubCard{...items}/>))}
      </div>
    )

    const GithubCard=({avatar,name})=>{
        return (
            <div style={{display:"flex",gap:"2rem"}}>
                <img src={avatar} alt={name}/>
                <div>{name}</div>
            </div>
        )
    }

}

export default Github