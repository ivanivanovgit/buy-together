// CityList.js

import citiesData from "../../data/cities";
import { shuffleArray } from "../../utils/shuffleArray";
import { useEffect, useState } from "react";

function CityList({ phrases, param, region }) {
  const [cityPhrasePairs, setCityPhrasePairs] = useState([]);

  useEffect(() => {
    let filteredCities = [...citiesData];
    if (region) {
      filteredCities = citiesData.filter((city) => city.region === region);
    }
    const shuffledCities = shuffleArray(filteredCities, param);

    const shuffledPhrases = shuffleArray([...phrases], param);

    const pairs = shuffledCities.map((city, index) => ({
      city: city.city,
      phrase: shuffledPhrases[index % shuffledPhrases.length],
    }));

    setCityPhrasePairs(pairs);
  }, [phrases, param, region]);

  return (
    <div>
      {cityPhrasePairs
        .map((pair, index) => pair.phrase.replace("CITY", pair.city))
        .join(", ")}
    </div>
  );
}

export default CityList;
