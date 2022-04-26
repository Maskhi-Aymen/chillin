import React from 'react';
import {Link} from "react-router-dom";
import error from '../assets/images/404.png'

function Error404() {
    return (
        <div style={styles}>
            <div>
                <img src={error} width='300px'style={ {filter: "drop-shadow(8px 8px 10px gray)contrast(300%) brightness(350%)"}} alt="404"/>
                <Link to="/"  style={{display: 'inline-Block', marginTop: 30}}>Go Back
                    Home</Link>
            </div>
        </div>
    );
};

const styles = {
    maxWidth: "100px",
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: 30
};

export default Error404;