// Libraries
import {Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';

// Components
import List from './components/List';
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './components/Details';
import Results from './components/Results';
import Favorites from './components/Favorites';

//Styles
import './css/App.css'
import './css/bootstrap.min.css';



function App() {

  const [favorites, setFavorites] = useState([]); 
  
  useEffect(() =>{
     const favInLocal = localStorage.getItem('favs');
     console.log(favInLocal);
 
     if(favInLocal != null){
       const favArr = JSON.parse(favInLocal);
       console.log(favArr) ;  
       setFavorites(favArr)
     }
 
  }, [])
 


const addOrRemoveFromFav = (e) => {
  
  const favMovies =  localStorage.getItem('favs');
  
  let tempMovieFavs;
  
  if(favMovies === null) {
    tempMovieFavs = [];
  } else {
    tempMovieFavs = JSON.parse(favMovies);
  }
  
  console.log(tempMovieFavs);

  const btn = e.currentTarget; 
  const parent = btn.parentElement;
  const imgURL = parent.querySelector('img').getAttribute('src');
  const title = parent.querySelector('h5').innerText; 
  const overview = parent.querySelector('p').innerText; 
  const id = btn.dataset["movieId"];


  
  if(btn.className === "favourite-btn"){
    btn.className = "favourite-btnActive";
  } else {
    btn.className = "favourite-btn";
  
  }

  const movieData  = {
    imgURL, title, overview, id
  }
 
  let isMovieInArr = tempMovieFavs.find((oneMovie) => {
    return oneMovie.id === movieData.id 
  });

  if(!isMovieInArr){
    tempMovieFavs.push(movieData);
    localStorage.setItem('favs', JSON.stringify(tempMovieFavs));
    setFavorites(tempMovieFavs)
    console.log('Movie was added');


  } else {
    let moviesLeft = tempMovieFavs.filter(oneMovie =>{
      return oneMovie.id !== movieData.id
    });
    localStorage.setItem('favs', JSON.stringify(moviesLeft));
    setFavorites(moviesLeft)
     console.log('Movie was removed');
  
  }

 
}
  return (
    <div>
    <Header favorites={favorites} />
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/list" element={<List addOrRemoveFromFav={addOrRemoveFromFav}   />} />
    <Route path="/details" element={<Details/>}/>
    <Route path="/results" element={<Results addOrRemoveFromFav={addOrRemoveFromFav} />}/>
    <Route path="/favorites" element={<Favorites addOrRemoveFromFav={addOrRemoveFromFav} favorites={favorites}/>}/>

    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
