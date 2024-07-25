import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3002;

app.use(cors());

app.use(express.json());

app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get('https://api.vk.com/method/wall.get', {
      params: {
        owner_id: '-ponarth',
        domain: 'ponarth',
        count: 10,
        access_token: '386e0c85386e0c85386e0c85fe3b77fa743386e386e0c855ef1e75df3dabd817dbb743c',
        v: '5.131'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
