// import {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';

function Favorites({addOrRemoveFromFav,favorites}) {
    let token =  sessionStorage.getItem('token');
//   const [favorites, setFavorites] = useState([]); 
  
//  useEffect(() =>{
//     const favInLocal = localStorage.getItem('favs');
//     console.log(favInLocal);

//     if(favInLocal != null){
//       const favArr = JSON.parse(favInLocal);
//       console.log(favArr) ;  
//       setFavorites(favArr)
//     }

//  }, [])

  return (
     <> 
     {!token && <Navigate to={"/"} replace />}

     <h2>Favorites</h2>
    <div className='row ms-2'>
    {/*Basic Structure*/ }
    {!favorites.length && <div className='col-12 text-danger fw-bold fs-5'>You don't have any favorites yet!</div>}
    {
     favorites && favorites.map((oneMovie, index) => {
       return (
         <div className="col-3" key={index} style={{minWidth:"250px"}}>
         <div className="card my-4">
         <img src={oneMovie.imgURL} className="card-img-top" alt="poster"/>
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

export default Favorites