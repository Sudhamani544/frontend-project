import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { AllActions } from "../action";
import { Country } from "../types";

type DefaultState = {
  cart: Country[];
  countries: Country[];
  country: Country | null;
  asc: boolean;
  error: any;
};

const defaultState: DefaultState = {
  cart: [],
  countries: [],
  country: null,
  asc: true,
  error: null,
};

const countryReducer = (
  state = defaultState,
  action: AllActions
): DefaultState => {
  //action = {type: "action type",payload: {...}}
  //state = {cart: []}
  switch (action.type) {
    case "INSERT_COUNTRY":
      const incomingCountry = action.payload; // country object
      const incomingName = incomingCountry.name;
      // existCountry will be a country object, or undefined if nothing matches the condition
      const existCountry = state.cart.find((country) => {
        if (incomingName === country.name) {
          return true;
        }
        return false;
      });
      if (existCountry) {
        return state;
      } else {
        return {
          ...state,
          cart: [...state.cart, incomingCountry],
        };
      }

    case "REMOVE_COUNTRY":
      const getCountry = action.payload; // country name
      return {
        ...state,
        cart: [...state.cart.filter((country) => getCountry !== country.name)],
      };

    case "FETCH_COUNTRIES_LIST":
      const countriesPayload = action.payload;
      return {
        ...state,
        countries: countriesPayload,
      };

    case "FETCH_ONE_COUNTRY":
      const countryData = action.payload[0];
      return {
        ...state,
        country: countryData,
      };
    case "FETCH_ERROR":
      const errorFromPayload = action.payload;
      return {
        ...state,
        error: errorFromPayload,
      };
    case "SORT_TABLE_BY":
      const { sortby, asc } = action.payload;
      const sortedData = state.countries.sort((a, b) => {
        const nameA = a[sortby];
        const nameB = b[sortby];
        if (asc) {
          state.asc = false;

          return nameA > nameB ? 1 : -1;
        } else {
          state.asc = true;

          return nameA > nameB ? -1 : 1;
        }
      });
      return {
        ...state,
        countries: [...sortedData],
      };

    default:
      return state;
  }
};

export default countryReducer;
