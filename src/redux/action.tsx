import { Dispatch } from "redux";
import { Country, ThemeColors } from "./types";

const INSERT_COUNTRY = "INSERT_COUNTRY";
const REMOVE_COUNTRY = "REMOVE_COUNTRY";
const THEME_COLOR = "THEME_COLOR";
const SORT_TABLE_BY = "SORT_TABLE_BY";
const FETCH_COUNTRIES_LIST = "FETCH_COUNTRIES_LIST";
const FETCH_ONE_COUNTRY = "FETCH_ONE_COUNTRY";
const FETCH_ERROR = "FETCH_ERROR";

// country paramater is a country object
export const insertToCart = (country: Country) => {
  return {
    type: INSERT_COUNTRY,
    payload: country,
  };
};

//cart is an array of object: [{name: "", languages: , }, {}, {}]
export const removeFromCart = (countryName: string) => {
  return {
    type: REMOVE_COUNTRY,
    payload: countryName,
  };
};

export const addThemeColor = (themeColors: ThemeColors) => {
  return {
    type: THEME_COLOR,
    payload: themeColors,
  };
};

export const sortTableBy = (
  sortby: "population" | "region" | "name",
  asc: boolean
) => {
  return {
    type: SORT_TABLE_BY,
    payload: { sortby, asc },
  };
};
//redux-thunk to fetch data using async, this thunk is called in CountryTableContainer
export const getCountries = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const data = await fetch("https://restcountries-v2.herokuapp.com/all");
      const countriesList = (await data.json()) as Country[];
      dispatch(fetchCountriesList(countriesList));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

//delivering thunk to the reducer
export const fetchCountriesList = (data: Country[]) => {
  return {
    type: FETCH_COUNTRIES_LIST,
    payload: data,
  };
};

export const getOneCountry = (countryName: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const data = await fetch(
        `https://restcountries-v2.herokuapp.com/country/${countryName}`
      );
      const country = (await data.json()) as Country[];
      console.log("hey", country);
      dispatch(fetchOneCountry(country));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

export const fetchOneCountry = (data: Country[]) => {
  return {
    type: FETCH_ONE_COUNTRY,
    payload: data,
  };
};

export const fetchError = (error: any) => {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
};

// utilitytype
// type FetchError = ReturnType<typeof fetchError>;
// type FetchCountriesList = ReturnType<typeof fetchCountriesList>;
// type FetchOneCountry = ReturnType<typeof fetchOneCountry>;
// type AddThemeColor = ReturnType<typeof addThemeColor>;
// type InsertToCart = ReturnType<typeof insertToCart>;
// type RemoveFromCart = ReturnType<typeof removeFromCart>;
// type SortTableBy = ReturnType<typeof sortTableBy>;

//literaltype
type FetchError = {
  type: typeof FETCH_ERROR;
  payload: any;
};

type FetchCountriesList = {
  type: typeof FETCH_COUNTRIES_LIST;
  payload: Country[];
};

type FetchOneCountry = {
  type: typeof FETCH_ONE_COUNTRY;
  payload: Country[];
};

export type AddThemeColor = {
  type: "THEME_COLOR";
  payload: ThemeColors;
};

type InsertToCart = {
  type: "INSERT_COUNTRY";
  payload: Country;
};

type RemoveFromCart = {
  type: "REMOVE_COUNTRY";
  payload: string;
};

type SortTableBy = {
  type: "SORT_TABLE_BY";
  payload: {
    sortby: "population" | "name" | "region";
    asc: boolean;
  };
};

export type AllActions =
  | FetchError
  | FetchCountriesList
  | FetchOneCountry
  | AddThemeColor
  | InsertToCart
  | RemoveFromCart
  | SortTableBy;
