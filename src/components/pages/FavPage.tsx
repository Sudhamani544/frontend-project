import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeFromCart } from "../../redux/action";
import { Store } from "../../redux/reducers/index";
import { Country } from "../../redux/types";

function FavPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: Store) => {
    return state.countryReducer.cart;
  });

  return (
    <div>
      {cart.map((country: Country) => {
        return (
          <div key={country.name}>
            <li className="favPage">
              <img
                src={country.flag}
                alt="flag"
                width="100px"
                height="60px"
              ></img>
              <Link
                to={`/Country/${country.name}`}
                style={{
                  margin: "1rem",
                }}
              >
                {country.name}
              </Link>
              <button
                onClick={() => dispatch(removeFromCart(country.name))}
                className="btnFavPage"
              >
                DELETE
              </button>
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default FavPage;
