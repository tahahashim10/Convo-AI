import { Box, Avatar, Typography, Button } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const auth = useAuth();
  return (
    <Box sx={{display: 'flex', flex: 1, width: '100%', height: '100%', marginTop: 3, gap: 3}}>
      <Box sx={{display: {md: 'flex', sm: 'none', xs: 'none' }}}>
        <Box sx={{display: 'flex', width: '100%', height: '60vh', bgcolor: 'rgb(17, 29, 39)', borderRadius: 5, flexDirection: 'column', mx: 3}}>
          <Avatar sx={{mx: 'auto', marginY: 2, bgcolor: 'white', color: 'black', fontWeight: 700}}>
            {auth?.user?.name[0] }{auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{mx: 'auto', fontFamily: 'work sans'}}>You Are Talking to a ChatBot</Typography>
          <Typography sx={{mx: 'auto', fontFamily: 'work sans', marginY: 4, padding: 3}}>How can I help you today?</Typography>
          <Button></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat