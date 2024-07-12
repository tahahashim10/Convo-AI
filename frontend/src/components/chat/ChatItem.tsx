import { Box, Avatar, Typography } from '@mui/material';
import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
  if(message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if(
    str.includes("=") || 
    str.includes(";") || 
    str.includes("[") || 
    str.includes("[") || 
    str.includes("]") || 
    str.includes("{") || 
    str.includes("}") || 
    str.includes("#") || 
    str.includes("//")) {
    return true;
  }
  return false;
}

function getLanguageFromBlock(str: string) {
  const firstLine = str.split('\n')[0];
  return firstLine;
}

const ChatItem = ({content, role}: {content: string, role: "user" | "assistant";}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "assistant" ? ( 
  
    <Box sx={{display: 'flex', padding: 2, bgcolor: '#004d5612', marginY: 2, gap: 2, borderRadius: 2, my: 1}}>
        <Avatar sx={{marginLeft: '0'}}>
            <img src="openai-logo.png" alt="openai" width={'30px'}/>
        </Avatar>
        <Box>
          {!messageBlocks && (<Typography sx={{fontSize: '20px'}}>{content}</Typography>)}
          {messageBlocks && 
            messageBlocks.length && 
            messageBlocks.map((block) => 
              isCodeBlock(block) ? ( 
                <SyntaxHighlighter style={coldarkDark} language={getLanguageFromBlock(block)}>
                  {block}
                </SyntaxHighlighter> 
              ) : ( 
                <Typography sx={{fontSize: '20px'}}>{block}</Typography>))}
        </Box>
    </Box> 
  ) : ( 
    <Box sx={{display: 'flex', padding: 2, bgcolor: '#004d56', gap: 2, borderRadius: 2}}>
        <Avatar sx={{marginLeft: '0', bgcolor: 'black', color: 'white'}}>
            {auth?.user?.name[0] }{auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Box>
          {!messageBlocks && (<Typography sx={{fontSize: '20px'}}>{content}</Typography>)}
          {messageBlocks && 
            messageBlocks.length && 
            messageBlocks.map((block) => 
              isCodeBlock(block) ? ( 
                <SyntaxHighlighter style={coldarkDark} language={getLanguageFromBlock(block)}>
                  {block}
                </SyntaxHighlighter> 
              ) : ( 
                <Typography sx={{fontSize: '20px'}}>{block}</Typography>))}
        </Box>
    </Box>

  )
}

export default ChatItem;