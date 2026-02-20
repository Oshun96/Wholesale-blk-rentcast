const express = require('express');
const app = express();

app.get('/api/rentcast', async (req, res) => {
  const { city, state, limit = 20 } = req.query;
  
  let url = 'https://api.rentcast.io/v1/listings/sale?';
  
  if (city && state) {
    url += `city=${encodeURIComponent(city)}&state=${state}&limit=${limit}`;
  } else {
    url += `state=TX&limit=${limit}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': process.env.RENTCAST_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from RentCast', details: error.message });
  }
});

app.listen(3000, () => console.log('BLK Wholesale API running'));
