import { Box, Avatar, Typography, Button, IconButton } from '@mui/material'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import red from '@mui/material/colors/red'
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io'
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: 'user' | 'assistant';
  content: string;
}
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", {id: "deletechats"})
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", {id: "deletechats"})
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats Failed", {id: "deletechats"})
      
    }
  };

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", {id: "loadchats"});
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfuly Loaded Chats", {id: "loadchats"});
      }).catch(err => {
        console.log(err);
        toast.error("Loading Failed", {id: "loadchats"});
      });
    }
  }, [auth]);

  useEffect(() => {
    if(!auth?.user) {
      return navigate("/login");
    }
 
  }, [])
  
  return (
    <Box sx={{display: 'flex', flex: 1, width: '100%', height: '100%', marginTop: 3, gap: 3}}>
      <Box sx={{display: {md: 'flex', sm: 'none', xs: 'none' }, flex: 0.2, flexDirection: 'column'}}>
        <Box sx={{display: 'flex', width: '100%', height: '60vh', bgcolor: '#2f2f2f', borderRadius: 5, flexDirection: 'column', mx: 3}}>
          <Avatar sx={{mx: 'auto', marginY: 2, bgcolor: 'white', color: 'black', fontWeight: 700}}>
            {auth?.user?.name[0] }{auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{mx: 'auto', fontFamily: 'work sans'}}>You are talking to a chatbot.</Typography>
          <Typography sx={{mx: 'auto', fontFamily: 'work sans', marginY: 4, padding: 3}}>How can I help you today?</Typography>
          <Button onClick={handleDeleteChats} sx={{width: '200px', marginY: 'auto', color: 'white', fontWeight: '700', borderRadius: 3, marginX: 'auto', bgcolor: red[300], ":hover": {bgcolor: red.A400}}}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{display: "flex", flex: {md: 0.8, xs: 1, sm: 1}, flexDirection: 'column', paddingX: 3}}>
        <Typography sx={{textAlign: 'center', fontSize: '40px', color: 'white', marginBottom: 2, mx: 'auto', fontWeight: '600'}}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{width: '100%', height: '60vh', borderRadius: 3, mx: 'auto', display: 'flex', flexDirection: 'column', overflow: 'scroll', overflowX: 'hidden', overflowY: 'auto', scrollBehavior: 'smooth'}}>
          {chatMessages.map((chat, index) => (
            // @ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index}/>
          ) )}
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{width: '100%', borderRadius: 8, backgroundColor: '#2f2f2f', display: 'flex', margin: 'auto', marginTop: '8px'}}>
          <input ref={inputRef} type="text" style={{width: '100%', backgroundColor: 'transparent', padding: '30px', border: 'none', outline: 'none', color: 'white', fontSize: '20px'}} />
          <IconButton type="submit" sx={{marginLeft: 'auto', color: 'white', mx: 1}}>
            <IoMdSend />
          </IconButton>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;