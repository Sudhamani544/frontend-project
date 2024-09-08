import React from "react";
import { useParams, Link } from "react-router-dom";
import useCountry from "../../custom-hooks/useCountry";
import CountryPageList from "../CountryPageList";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneCountry } from "../../redux/action";
import { Store } from "../../redux/reducers";
import { Country } from "../../redux/types";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

function CountryPage() {
  const dispatch = useDispatch();
  // const { sumParams } = useParams<{ sumParams: string }>();
  const { countryName } = useParams<{ countryName: string }>();
  // const [error, country] = useCountry(countryName);

  // const countryString = JSON.stringify(country);
  // const countryArray = JSON.parse(countryString);

  useEffect(() => {
    dispatch(getOneCountry(countryName));
  }, [dispatch]);

  const country = useSelector((state: Store) => {
    return state.countryReducer.country;
  });

  return (
    <div className="countryPage">
      {/* <h1 style={{ textAlign: "center" }}>{countryName.toUpperCase()}</h1> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            width: "25%",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <CardHeader title={countryName.toUpperCase()} />
          <CardMedia
            component="img"
            height="140"
            image={country?.flag}
            alt="country flag"
          />
          <CountryPageList
            listName="Other Names"
            listItems={country?.altSpellings}
          />
          <CountryPageList
            listName="Region"
            listItems={[country?.region] as string[]}
          />
          <CountryPageList listName="Borders" listItems={country?.borders} />
          <CountryPageList
            listName="Currencies"
            listItems={country?.currencies.map((currency) => currency.name)}
          />
          <CountryPageList
            listName="Languages"
            listItems={country?.languages.map((language) => language.name)}
          />
          <CardActions style={{ alignItems: "center" }}>
            <Button size="small" variant="contained" color="primary">
              <Link
                to={`/`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  alignItems: "center",
                }}
              >
                back
              </Link>
            </Button>
          </CardActions>
        </Card>
      </div>
      );
    </div>
  );
}
export default CountryPage;
