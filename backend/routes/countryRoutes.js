const express = require('express');
const { fetchAvailableCountries, fetchCountryInfo } = require('../controllers/countryController');

const router = express.Router();

router.get('/countries', fetchAvailableCountries);
router.get('/country/:countryCode', fetchCountryInfo);

module.exports = router;
