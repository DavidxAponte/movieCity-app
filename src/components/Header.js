import {Link} from 'react-router-dom';
import {useRef} from 'react';

//components
import Search from "./Search";

function Header({favorites}){
  
  let isCollapsed =  false;

  const btnCollapse = useRef(),
  listCollapse = useRef();

  const collapseHandler = (e) =>{

    if(!isCollapsed){
      btnCollapse.current.className = "navbar-toggler navbar-dark";
      listCollapse.current.className = "navbar-collapse collapse show justify-content-end";
      isCollapsed = true;
    } else{
      btnCollapse.current.className = "navbar-toggler collapsed navbar-dark";
      listCollapse.current.className = "navbar-collapse collapse justify-content-end";
      isCollapsed = false;
    }
    
  }

    return (
  <header>
  <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
  <Link to='/' className="navbar-brand text-light">MovieCity</Link>
  <button className="navbar-toggler collapsed navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" ref={btnCollapse} onClick={collapseHandler}>
  <span className="navbar-toggler-icon"></span>
  </button>
  <div className="navbar-collapse collapse justify-content-end" id="navbarNavAltMarkup" ref={listCollapse}>
  <div className="navbar-nav">
  <Link to='/' className="nav-link active text-light" aria-current="page">Home</Link>
  <Link to='list' className="nav-link text-light" >List</Link>
  <Link to="favorites" className="nav-link text-light">Favorites</Link>
  <Link to="favorites" className="nav-link text-light fw-bold">{favorites.length > 0 && favorites.length }</Link>
  <Search />
  </div>
  </div>
  </div>
  </nav>
  </header>


    );
}

export default Header;
