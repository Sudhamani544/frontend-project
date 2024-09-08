// This hook is used to fetch one specific country
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getOneCountry } from "../redux/action";
import { Store } from "../redux/reducers";

const useCountry = (countryName: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneCountry(countryName));
  }, [dispatch]);

  const country = useSelector((state: Store) => {
    return state.countryReducer.country;
  });

  const fetchError = useSelector((state: Store) => {
    return state.countryReducer.error;
  });

  return [fetchError, country];
};

//   const [country, setCountry] = useState([]);
//   const [error, setError] = useState("");
//   const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
//   useEffect(() => {
//     const getCountry = async () => {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setCountry(data);
//       } catch (error) {
//         setError(error);
//       }
//     };
//     getCountry();
//   }, [url]);
//   return [error, country];
// };

export default useCountry;
