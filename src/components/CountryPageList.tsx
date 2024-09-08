import React from "react";

import { Collapse } from "@material-ui/core/";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core";
import CardActions from "@mui/material/CardActions";
// import { CardActions } from "material-ui";

const useStyles = makeStyles({
  root: {
    padding: "0px",
    display: "flex",
    justifyContent: "space-between",
  },
});

type CountryPageListProps = {
  listName: string;
  listItems: string[] | undefined;
};
function CountryPageList({ listName, listItems }: CountryPageListProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <CardActions className={classes.root}>
      <div onClick={handleClick}>
        <button
          style={{
            border: "none",
            backgroundColor: "inherit",
          }}
        >
          <List
            sx={{
              width: "10rem",
              // maxWidth: 360,
              bgcolor: "background.paper",
              p: "0",
            }}
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              onClick={handleClick}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary={listName.toLowerCase()} />

              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 0 }}
                  style={{ display: "flex", flexFlow: "column" }}
                  // className={classes.body}
                >
                  {listItems?.map((item) => (
                    <ListItemText primary={item} />
                  ))}
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </button>
      </div>
    </CardActions>
  );
}

export default CountryPageList;
