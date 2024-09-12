const { getAvailableCountries, getCountryInfo } = require('../services/countryService');

exports.fetchAvailableCountries = async (req, res) => {
  try {
    const countries = await getAvailableCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

exports.fetchCountryInfo = async (req, res) => {
  try {
    const { countryCode } = req.params;
    const countryInfo = await getCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country information' });
  }
};
