// This hook is used to fetch all countries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../redux/action";
import { Store } from "../redux/reducers";

const useCountries = (url: string) => {
  const dispatch = useDispatch();
  //redux state
  const countries = useSelector((state: Store) => {
    return state.countryReducer.countries;
  });

  const fetchError = useSelector((state: Store) => {
    return state.countryReducer.error;
  });

  useEffect(() => {
    //     fetch(url).then().catch
    dispatch(getCountries());
  }, [dispatch]);

  return [fetchError, countries];
};
// const useCountries = (url) => {
//   const [countries, setCountries] = useState([]);
//   const [errors, setError] = useState("");

//   useEffect(() => {
//     const getCountries = async () => {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setCountries(data);
//       } catch (error) {
//         setError(error);
//       }
//     };
//     getCountries();
//   }, [url]);

//   return [errors, countries];
// };

// export default useCountries;
