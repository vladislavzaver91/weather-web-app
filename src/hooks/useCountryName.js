import iso3166 from 'iso-3166-1';

export const useCountryName = countryCode => {
    const countryData = iso3166.whereAlpha2(countryCode);
    return countryData ? countryData.country : countryCode;
};