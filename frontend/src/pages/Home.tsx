import { Box, useMediaQuery, useTheme } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TypingAnim from '../components/typer/TypingAnim'
import Footer from '../components/footer/Footer';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  // Define your images
  const images = ["chat.png", "chat2.png", "chat3.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentImageIndex, images.length]);

  return (
    <Box width={'100%'} height={'100%'}>
      <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', mx: 'auto', mt: 3}}>
        <Box sx={{marginY: 10, marginTop: 0}}><TypingAnim/></Box>
        <Box sx={{display: 'flex', width: '100%', marginX: 'auto'}}>
          <img src={images[currentImageIndex]} alt="chatbot" style={{display: 'flex', margin: 'auto', width: isBelowMd ? '80%' : '60%', borderRadius: 20, boxShadow: '-5px -5px 105px #64f3d5', marginTop: 20, marginBottom: 20, transition: 'all 0.5s ease'}} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

