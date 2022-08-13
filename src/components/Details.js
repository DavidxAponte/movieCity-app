import axios from 'axios';
import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

function Details(){
    let token = sessionStorage.getItem('token');

    let query =  new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');


    const [movieDetail, setMovieDetail] = useState(false);

  
    useEffect(() =>{
      const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=fb731fc3f2883f705038abd4d530a1b1&language=en-US`;

      axios.get(endPoint)
      .then(res => {
        const apiData = res.data;
        setMovieDetail(apiData);
      })
      .catch(err => {
        console.log("This is the error:", err);
        swAlert(<h3>{`${err.message}, please try again later`}</h3>);
      })


    },[movieID])

    console.log("This is the movie detail", movieDetail);
    

    return (
      <>
    {!token && <Navigate to={"/"} replace />}


    {!movieDetail && <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
      
     { 
     movieDetail &&
     <>

     <div className="card mb-3" >
     <div className="row g-0">
     <div className="col-md-4">
    <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} alt="poster"  className="card-img-top" />
     </div>
     <div className="col-md-8">
      <div className="card-body">
        <h2 className="card-title">{movieDetail.title}</h2>
        <h5>Release Date: <span style={{fontWeight:"normal"}}>{movieDetail.release_date}</span></h5>
        <h5>Genres</h5>
        <ul>
              {
    movieDetail.genres.length > 1  ? movieDetail.genres.map((oneGenre, idx) => {
                return <li key={idx}>{oneGenre.name}</li>
              })  : "Not Found"
              }
          </ul>
        <h5>Overview:</h5>
        <p className="card-text">{
        movieDetail.overview ?  movieDetail.overview :  "Not found" }</p>
        <h5>Country: <span style={{fontWeight:"normal"}}>{

 movieDetail.production_countries[0] ?  movieDetail.production_countries[0].name : "Not found"
          }</span></h5>

          <h5>Company: <span style={{fontWeight:"normal"}}>{

movieDetail.production_companies[0] ? movieDetail.production_companies[0].name : "Not found"

          }</span></h5>
          <h5>Rating: <span style={{fontWeight:"normal"}}>{
          movieDetail.vote_average
          }</span></h5> 
       </div>
      </div>
    </div>
   </div>

      </>
         }

       </>  
    );
}

export default Details;
