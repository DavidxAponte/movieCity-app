import {useEffect, useState} from 'react';
import axios from 'axios';
import {Navigate, Link} from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

function Results({addOrRemoveFromFav}) {
let token =  sessionStorage.getItem('token');

let query =  new URLSearchParams(window.location.search);
let keyword = query.get('keyword');
console.log("This is the keyword captured by results", keyword)

const [movieResults, setMovieResults] = useState(false);

useEffect(() =>{
const endPoint = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=fb731fc3f2883f705038abd4d530a1b1&language=en-US&page=1&include_adult=false`;

axios.get(endPoint)
.then(res => {
  const apiData =  res.data;

  console.log("apidata" , apiData)
  
  setMovieResults(apiData.results);

  if(apiData.results.length === 0){
    swAlert(<h2>There are no results</h2>)
  }

})
.catch(err =>{
    console.log(err);
    swAlert(<h3>{`${err.message}, please try again later`}</h3>);
  })
}, [keyword])

console.log(movieResults);

  return (
    <>
    {!token && <Navigate to={"/"} replace />}
    {movieResults.length === 0 && <h3>There are no results</h3>}
    <div className='row ms-2'>
     {/*Basic Structure*/ }

     {
       movieResults && movieResults.map((oneMovie, index) => {
        return (
          <div className="col-3" key={index} style={{minWidth:"250px"}}>
          <div className="card my-4">
          <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="poster"/>
          <button className="favourite-btn" onClick={addOrRemoveFromFav} data-movie-id={oneMovie.id}>🖤</button> 
          <div className="card-body">
          <h5 className="card-title">{oneMovie.title}</h5>
          <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
          <Link to={`/details?movieID=${oneMovie.id}`} className="btn btn-primary">View Detail</Link>
          </div>
          </div>
          </div>
        )
       })
     }

     

       
      </div>
    
    </>
    
  )
}

export default Results