import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

export default function Search() {

 const navigate = useNavigate();

  const submitHandler = (e) =>{
    e.preventDefault();
    const keyword = e.currentTarget.search.value.trim();
    
    if(keyword.length === 0){
        swAlert(<h5>You have to type a keyword</h5>)
       
    } else if(keyword.length < 2){
        swAlert(<h5>You have to type two or more characters</h5>)
    } else{
      navigate(`/results?keyword=${keyword}`,  { replace: true });
      e.currentTarget.search.value= "";
      window.location.reload();
    }

    // console.log(keyword)

  }

  return (
    <>
    
   <form className="d-flex" role="search" onSubmit={submitHandler}>
<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
    <button className="btn btn-outline-light" type="submit">Search</button>
  </form>
  </>
  ) 
}


