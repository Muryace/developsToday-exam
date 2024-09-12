require('dotenv').config();
const cors = require('cors');
const express = require('express');
const countryRoutes = require('./routes/countryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', countryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
