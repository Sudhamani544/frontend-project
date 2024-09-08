import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import { alpha, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { Store } from "../redux/reducers";
import FavPage from "./pages/FavPage";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
}));

type NavBarProps = {
  setInputData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputData: string;
  theme: string;
  themeColor: (e: React.FormEvent<HTMLSelectElement>) => void;
};
function NavBar({ setInputData, inputData, themeColor, theme }: NavBarProps) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    event.preventDefault();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state: Store) => {
    return state.countryReducer.cart;
  });

  const classes = useStyles();
  return (
    <div className="sticky">
      <nav className="navBar">
        <div className="themeSelect">
          Theme
          <select value={theme} onChange={themeColor}>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </div>
        <InputBase
          className={classes.search}
          onChange={setInputData}
          value={inputData}
          placeholder="Search…"
          style={{ padding: "10px" }}
        />
        <IconButton aria-label="show favorites" color="inherit">
          <Badge badgeContent={cart.length} color="secondary">
            <FavoriteIcon
              color="action"
              fontSize="large"
              onClick={toggleDrawer(true)}
            />
          </Badge>
          <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
            <ul className="padSearchDrawer">
              {cart.length ? <FavPage /> : "   cart is empty   "}
            </ul>
          </Drawer>
        </IconButton>
      </nav>
    </div>
  );
}

export default NavBar;
