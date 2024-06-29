import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography'

const Logo = () => {
  return (
    <div 
        style={{
            display: "flex", 
            marginRight: "auto", 
            alignItems: "center", 
            gap: "8px"
        }}
        >
            <Link to={"/"}>
                <img 
                src="openai-logo.png" 
                alt="openai" width={"30px"} 
                height={"30px"} 
                className='image-inverted'
                />
                <Typography 
                sx={{
                    display: {md: 'block', sm: 'none', xs: 'none'},
                     marginRight: "auto", 
                     fontWeight: "800", 
                     textShadow: "2px 2px #000"
                }}
                >
                    <span style={{fontSize: "20px"}}>Chat</span>Bot
                </Typography>
            </Link>


    </div>
  )
}

export default Logo;