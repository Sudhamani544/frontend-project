import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addThemeColor, getCountries, sortTableBy } from "../../redux/action";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowDownward";
import { Store } from "../../redux/reducers";
import { Country } from "../../redux/types";
import FavoriteIcon from "../FavoriteIcon";
import DataTable from "../generictable/DataTable";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();

  const asc = useSelector((state: Store) => {
    return state.countryReducer.asc;
  });

  const [searchInput, setSearchInput] = useState<string>("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const sortData = (e: any) => {
    if (e.target.innerHTML === "Population") {
      dispatch(sortTableBy("population", asc));
    } else if (e.target.innerHTML === "Region") {
      dispatch(sortTableBy("region", asc));
    } else {
      dispatch(sortTableBy("name", asc));
    }
  };

  const columns = [
    {
      label: "FLAG",
      renderContent: (country: Country) => {
        return (
          <img src={country.flag} alt="flag" width="100px" height="60px"></img>
        );
      },
    },

    {
      label: <button onClick={sortData}>Name</button>,
      renderContent: (country: Country) => {
        return <Link to={`/Country/${country.name}`}>{country.name}</Link>;
      },
    },
    {
      label: <button onClick={sortData}>Population</button>,
      renderContent: (country: Country) => {
        return country.population;
      },
    },
    {
      label: <button onClick={sortData}>Region</button>,
      renderContent: (country: Country) => {
        return country.region;
      },
    },
    {
      label: "LANGUAGE",
      renderContent: (country: Country) => {
        return country.languages.map((language) => language.name);
      },
    },
    {
      label: "ADD FAVORITE",
      renderContent: (country: Country) => <FavoriteIcon {...country} />,
    },
  ];

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  // const [error, countries] = useCountries(
  //   "https://restcountries.eu/rest/v2/all"
  // );
  const countries: Country[] = useSelector((state: Store) => {
    return state.countryReducer.countries;
  });

  const themeColor = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    let themeColors;
    if (e.currentTarget.value === "dark") {
      themeColors = {
        bgcolor: "#082032",
        color: "white",
        value: e.currentTarget.value,
        link: "#9E9EFF",
        darkLight: "themeDark",
      };
    } else {
      themeColors = {
        bgcolor: "white",
        color: "black",
        value: e.currentTarget.value,
        link: "blue",
        darkLight: "themeLight",
      };
    }
    dispatch(addThemeColor(themeColors));
  };

  const updateThemeColor = useSelector((state: Store) => {
    return state.themeReducer.themeColor;
  });

  return (
    <div className={updateThemeColor.darkLight}>
      <NavBar
        inputData={searchInput}
        setInputData={inputHandler}
        themeColor={themeColor}
        theme={updateThemeColor.value}
      />
      <DataTable<Country>
        items={countries.filter((country) =>
          country.name.toLowerCase().startsWith(searchInput.toLowerCase())
        )}
        columns={columns}
      />
    </div>
  );
}

export default HomePage;
