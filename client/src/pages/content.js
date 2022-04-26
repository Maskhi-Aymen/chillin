import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Article from '../components/content/Article';
import ReactLoading from "react-loading";
import { useState , useEffect } from 'react';
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47', 
    },
});

export default function Content({}) {
    const [data,setdata]=useState([]);
    const [isLoaded,setIsLoaded]=useState(false);
    const user= localStorage.getItem('user');
  
    useEffect(()=>{
      if(!isLoaded){
       fetch("http://localhost:8000/publication").then(response=>
         response.json()
         )
       .then(dataS=>{
         setIsLoaded(true)
         setdata(dataS)
         })
       .catch(err=>{
         console.log(err)
       })
       
     }
    },[])

    return (
        <div className='yellocard'>
        <div >
            {isLoaded ? ( < div >


                {data.filter((val) => {
              return val.published ;
            }).map((val, key) => {
                let c;
                c=0;
                for (let i = 0; i < val.pub_reactions.length; i++) {
                    if (val.pub_reactions[i] == user) {c=1 }
                  }
                return (<div key={val.pub_id} >
                  <Article
                        id={val.pub_id}
                        type={val.pub_type} 
                        auteur={val.pub_author}
                        url={val.pub_url}
                        datepub={val.pub_date}
                        description={val.pub_title}
                        moreinfo={val.pub_description}
                        reaction={c}
                        
                        />     </div>)
              })}


             </div> ) :
                        <ReactLoading
                  height={"150px"}
                  width={"150px"}
                  color={"#FFCAD4"}
                  className="loading"
                  type="bars"
             
                />
                        
                       }
                
            </div></div>
    );
}

