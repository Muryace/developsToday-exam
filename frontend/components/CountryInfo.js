import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CountryInfo = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [loading, setLoading] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/country/${countryCode}`
        );
        const data = await response.json();
        setCountryInfo(data);
      } catch (error) {
        console.error('Error fetching country info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!countryInfo) {
    return <div>No data available</div>;
  }

  return (
    <div>
        <h1>{countryInfo.population.country}</h1>
      <Image
        src={countryInfo.flagUrl.flag}
        alt={`Flag of ${countryInfo.population.country}`}
        width={100}
        height={60}
      />
      <h2>Border Countries:</h2>
      <ul>
        {countryInfo.borders.map((borderCountry) => (
          <li key={borderCountry.countryCode}>
            <Link href={`/country/${borderCountry.countryCode}`}>
              <a>{borderCountry.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h2>Population Over Time</h2>
    </div>
  );
};

export default CountryInfo;
