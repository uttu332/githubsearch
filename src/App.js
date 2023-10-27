import {useState} from "react"
import './App.css';

function App() {
  const API_URL="https://api.github.com";
  const fetchResults=async(query)=>{
    try{
      const response = await fetch(`${API_URL}/search/users?q=${query}`)
      const json=await response.json()
      return json.items || []
    }catch(e){
      throw new Error(e)
    }

  }
  const [query,setQuery]=useState('')
  const [result,setResult]=useState([])
  const onSearchChange=(event)=>{
    setQuery(event.target.value)
  }
  const onSearchSubmit=async(event)=>{
    event.preventDefault()
    const result=await fetchResults(query)
    setResult(result)
  }
  
  return (
    <div className="App">
      <main className="main">
        <h2>Github User</h2>
        <Form 
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        value={query}/>
        <h3>Results</h3>
        <div id="results">
          <div>
            {
              result.map((user)=>(
                <User 
                 key={user.login}
                 avatar={user.avatar_url}
                 url={user.html_url}
                 username={user.username}
                />
              ))
            }
          </div>

        </div>

      </main>
    </div>
    
  );
  
}
function User({avatar,url,username}){
  return(
    <div className="user">
      <img src={avatar} alt="images" width="50" height="50"/>
      <a href={url} target="_blank" rel="noopener noreferrer">{username}
      </a>
    </div>
  )
}
function Form({onChange,onSubmit,value}){
  return(
    <form className="search-form" onSubmit={onSubmit}>
      <input id="search" type="text" placeholder="Enter email or username" onChange={onChange} value={value}>
      </input>
      <button type="submit">Search</button>
    </form>
  )
}
export default App;
