import axios from 'axios';
import {Link,Navigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import swAlert from '@sweetalert/with-react';




function List({addOrRemoveFromFav}) {
   let token =  sessionStorage.getItem('token');
    
   const [movieList, setMovieList] = useState([]);


   useEffect(() => {

    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=fb731fc3f2883f705038abd4d530a1b1&language=en-US&page=1';
    axios.get(endPoint)
    .then(res => {
      const apiData = res.data;
      setMovieList(apiData.results);
    })
    .catch(err =>{
      console.log(err);
      swAlert(<h3>{`${err.message}, please try again later`}</h3>);
    })

   }, [setMovieList]);

  //  console.log(movieList);

    return (
      <>

      {!token && <Navigate to={"/"} replace />}

    

      <div className='row ms-2'>
     {/*Basic Structure*/ }

     {
       movieList.map((oneMovie, index) => {
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
    );
}



export default List;
