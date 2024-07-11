import { Box, Avatar, Typography } from '@mui/material';
import React from 'react'
import { useAuth } from '../../context/AuthContext';

const ChatItem = ({content, role}: {content: string, role: "user" | "assistant";}) => {
  const auth = useAuth();
  return role == "assistant" ? ( 
  
    <Box sx={{display: 'flex', padding: 2, bgcolor: '#004d5612', marginY: 2, gap: 2}}>
        <Avatar sx={{marginLeft: '0'}}>
            <img src="openai-logo.png" alt="openai" width={'30px'}/>
        </Avatar>
        <Box><Typography fontSize={'20px'}>{content}</Typography></Box>
    </Box> 
  ) : ( 
    <Box sx={{display: 'flex', padding: 2, bgcolor: '#004d56', gap: 2}}>
        <Avatar sx={{marginLeft: '0', bgcolor: 'black', color: 'white'}}>
            {auth?.user?.name[0] }{auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Box><Typography fontSize={'20px'}>{content}</Typography></Box>
    </Box>

  )
}

export default ChatItem