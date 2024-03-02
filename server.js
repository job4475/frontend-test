// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Proxy endpoint
app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://api.line.me/v2/bot/message/push', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eZFEdeBGRoWQ53p25up6X48uy847wp9Vzf2gB6jR6aKa8+kyr84Ft0OwPMUJxL+d0+ELxvrfvO9u8dfA9rBC9o6hldgd6psENzKpc8+44/vB2LJyK0z78GYe/wmNCnYRa61zLi7iK3wChueC/Hkv/QdB04t89/1O/w1cDnyilFU='
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
