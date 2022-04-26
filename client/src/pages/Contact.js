import React ,{useState}from 'react';
import logo from '../assets/images/logo.png';
import '../assets/styles/contact.css';
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";


export default function Contact() {
  const [reponse, setreponse] = useState('');
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleAffiche = () => {
    setOpen(false)
   setOpenAlert(true)
 };
   
	const handlesend = async () => {
    
      const user=localStorage.getItem('user');
		await fetch(`http://127.0.0.1:8000/messages`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			"message_content":document.getElementById("message").value,
			"message_user":user,
			}),
		  }).then((res)=>res.json()).then((data)=>{
        setreponse(data)
        handleAffiche()
        setTimeout(() => window.location.reload(true),1000)  
      })
  
	};
  return (
    <div className='yellocard'>
<div class="containerContactUs">
		<div class="contact-box">
			<div class="right">
				<h2>Contact Us</h2>
				<textarea placeholder="Message" class="field" id="message" cols={30}></textarea>
				<button class="btn" onClick={handlesend}>Send</button>
			</div><div class="left">
               <div className="info-wrap w-100 p-lg-5 p-4 img">

                    <img src={logo} id='logoContact' />
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address:</span> ENSI
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Phone:</span>
                          <a href="tel://123456789">+21650554984</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Email:</span>
                          <a href="mailto:info@yoursite.com">
                            aymen.maskhi@ensi-uma.tn
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text pl-3">
                     <p className="mb-4">
                      We're open for any suggestion or just to have a chat
                    </p>
                      </div>
                      </div>
                      </div>

            </div>
			
		</div>
	</div>
  <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} style={{ backgroundColor:"#F4ACB7"}}>
            {reponse}
          </Alert>
        </Snackbar>
  </div>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*
    const text=document.getElementById("message").value
    if(isLoaded){
		fetch(`http://127.0.0.1:8000/messages`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			"message_content":text,
			"message_user":11,
			}),
		  }).then((res)=>res.json).then((data)=>{
        alert(data)
        window.location.reload(true)
      })
    }
*/