const axios = require('axios');
const DATE_NAGER_API = process.env.DATE_NAGER_API;
const COUNTRIES_NOW_API = process.env.COUNTRIES_NOW_API;

exports.getAvailableCountries = async () => {
  try {
    const response = await axios.get(`${DATE_NAGER_API}/AvailableCountries`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

exports.getCountryInfo = async (countryCode) => {
  const [borderResponse, flagResponse] = await Promise.all([
    axios.get(`${DATE_NAGER_API}/CountryInfo/${countryCode}`),
    axios.post(`${COUNTRIES_NOW_API}/countries/flag/images`, {
      iso2: countryCode,
    }),
  ]);

  const { name } = flagResponse?.data?.data;

  const [populationResponse] = await Promise.all([
    axios.post(`${COUNTRIES_NOW_API}/countries/population`, {
      country: name.toLowerCase(),
    }),
  ]);

  return {
    borders: borderResponse?.data?.borders,
    population: populationResponse?.data?.data,
    flagUrl: flagResponse?.data?.data,
  };
};
