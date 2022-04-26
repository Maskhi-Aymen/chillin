import  React , {useState ,useEffect} from "react";
import PlayList from "./playlist";
import ReactLoading from 'react-loading';

export default function PlayLists(){
    const [datapl,setdatapl]=useState([]);
    const [isLoaded,setIsLoaded]=useState(false);
  
    useEffect(()=>{
      if(!isLoaded){
       fetch("http://localhost:8000/playlist").then(response=>
         response.json()
         )
       .then(data=>{
         setIsLoaded(true)
         setdatapl(data)
         })
       .catch(err=>{
         console.log(err)
       })
       
     }
    });

	return (
		<div >
        {isLoaded ? (<div>


			{datapl.map((playlist) => (
        <div key={playlist.pl_id} >
				<PlayList
					PLid={playlist.pl_id}
          PLname={playlist.pl_name}
          PLimg={playlist.pl_imgurl}
          id={playlist.pl_id}
          
				/></div>
			))}</div>):<ReactLoading
                  height={"150px"}
                  width={"150px"}
                  color={"#FFCAD4"}
                  className="loading"
                  type="bars"
             
                /> }
		</div>
	);
};

