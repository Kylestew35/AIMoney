'use client'
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Good day! I'm the AIMoney financial assistant. Can I help you on your financial journey?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setMessage('');
    setMessages((messages) => [...messages, { role: 'user', content: message }, { role: 'assistant', content: '' }]);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [...messages, { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." }]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSearch = async (event, value) => {
    if (value.length > 2) {
      const response = await fetch(`https://finnhub.io/api/v1/search?q=${value}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`);
      const data = await response.json();
      setSearchResults(data.result);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelect = async (event, value) => {
    if (value) {
      const quoteResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${value.symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`);
      const quoteData = await quoteResponse.json();
      setSelectedCompany({ ...value, ...quoteData });
    } else {
      setSelectedCompany(null);
    }
  };

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: 'black' }}>
      <Box position="fixed" bottom={32} right={32} width="400px" height="600px" border="1px solid gold" p={2} bgcolor="rgba(0, 0, 0, 0.9)" borderRadius={8} boxShadow={3} display="flex" flexDirection="column" zIndex={1000} sx={{ '@media (max-width: 1200px)': { width: '350px', height: '500px' }, '@media (max-width: 900px)': { width: '300px', height: '450px' }, '@media (max-width: 600px)': { width: '250px', height: '400px', bottom: '80px' }, '@media (max-width: 400px)': { width: '200px', height: '350px', bottom: '100px' } }}>
        <Stack direction={'column'} spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
          {messages.map((message, index) => (
            <Box key={index} display="flex" justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>
              <Box bgcolor={message.role === 'assistant' ? 'gold' : 'gray'} color="black" borderRadius={16} p={3}>
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2} mt={2}>
          <TextField label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} sx={{ bgcolor: 'white', borderRadius: '8px' }} />
          <Button variant="contained" onClick={sendMessage} sx={{ bgcolor: 'gold', color: 'black' }}>Send</Button>
        </Stack>
      </Box>

      <Box position="absolute" top={100} left={16} right={448} display="flex" flexDirection="column" alignItems="center" sx={{ '@media (max-width: 600px)': { alignItems: 'flex-start', right: 16 } }}>
        <Autocomplete freeSolo options={searchResults} getOptionLabel={(option) => `${option.description} (${option.symbol})`} onInputChange={handleSearch} onChange={handleSelect} renderInput={(params) => <TextField {...params} label="Search for a ticker symbol or company" fullWidth variant="outlined" sx={{ mb: 2, width: '500px', bgcolor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gold' }, '&:hover fieldset': { borderColor: 'gold' }, '&.Mui-focused fieldset': { borderColor: 'gold' } } }} />} />
        {selectedCompany && (
          <Box mt={2} width="100%" p={2} border="1px solid gold" borderRadius={4} bgcolor="black" color="gold">
            <Typography variant="h6">{selectedCompany.description} ({selectedCompany.symbol})</Typography>
            <Typography>Current Price: {selectedCompany.c}</Typography>
            <Typography>High Price: {selectedCompany.h}</Typography>
            <Typography>Low Price: {selectedCompany.l}</Typography>
            <Typography>Open Price: {selectedCompany.o}</Typography>
            <Typography>Previous Close Price: {selectedCompany.pc}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
