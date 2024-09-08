import { IconButton } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import { insertToCart, removeFromCart } from "../redux/action";
import { Store } from "../redux/reducers";
import countryReducer from "../redux/reducers/countryReducer";
import { Country } from "../redux/types";

function FavoriteIcon(country: Country) {
  const isInFav = useSelector((state: Store) =>
    state.countryReducer.cart.some((item) => item.name === country.name)
  );

  const dispatch = useDispatch();

  const handleButton = () => {
    if (isInFav) {
      dispatch(removeFromCart(country.name));
    } else {
      dispatch(insertToCart(country));
    }
  };

  return (
    <FavoriteBorderIcon
      onClick={handleButton}
      color={isInFav ? "primary" : "action"}
      className="favIcon"
    />
  );
}

export default FavoriteIcon;
