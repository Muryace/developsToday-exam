import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/countries`)
      .then((response) => setCountries(response?.data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div>
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
