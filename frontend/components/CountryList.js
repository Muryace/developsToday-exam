import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/countries`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country/${country.countryCode}`}>
              <a>{country.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
