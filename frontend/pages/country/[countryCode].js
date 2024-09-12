import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import PopulationChart from '../../components/PopulationChart';

const CountryInfo = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
        {countryInfo.borders.map((borderCountry) => {
          const borderCode = borderCountry.countryCode;
          const borderName = borderCountry.commonName;
          return (
            <li key={borderCode}>
              <Link href={`/country/${borderCode}`}>
                <a>{borderName}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <h2>Population Over Time</h2>
      <PopulationChart data={countryInfo.population.populationCounts} />
    </div>
  );
};

export default CountryInfo;
