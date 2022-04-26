import React, { Component } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import  '../../assets/styles/profile.css'

export default function Header({text}) {
    
        return (
            <div id="home">  
                <h1 className="header-h1">{text}</h1>
            </div>
        )
    
}
