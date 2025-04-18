const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const API_KEY = process.env.OPENROUTER_API_KEY; // update your .env key name accordingly

app.use(express.static('public'));

app.get('/api/insult', async (req, res) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324',
        messages: [
          {
            role: 'user',
            content: 'Insult me in a funny and stupid way. Just one sentence.',
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000', // if deployed, use your real domain
          'X-Title': 'InsultsApp',
        },
      }
    );

    const insult = response.data.choices[0].message.content;
    res.send(insult);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Couldn't generate insult 😓");
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
