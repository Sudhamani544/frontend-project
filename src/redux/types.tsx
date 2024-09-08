export type Country = {
  name: string;
  region: string;
  flag: string;
  borders: string[];
  population: number;
  languages: Language[];
  altSpellings: string[];
  currencies: Currencies[];
};

export type Language = {
  name: string;
  nativeName: string;
};

export type Currencies = {
  name: string;
};

export type ThemeColors = {
  bgcolor: string;
  color: string;
  value: string;
  link: string;
  darkLight: string;
};
