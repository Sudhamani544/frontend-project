import { AddThemeColor } from "../action";
export type DefaultState = {
  themeColor: ThemeColor;
};

export type ThemeColor = {
  bgcolor: string;
  color: string;
  value: string;
  link: string;
  darkLight: string;
};

const defaultState: DefaultState = {
  themeColor: {
    bgcolor: "white",
    color: "black",
    value: "light",
    link: "blue",
    darkLight: "themeLight",
  },
};

const themeReducer = (
  state = defaultState,
  action: AddThemeColor
): DefaultState => {
  switch (action.type) {
    case "THEME_COLOR":
      const colors = action.payload; //colors object
      return {
        ...state,
        themeColor: colors,
      };

    default:
      return state;
  }
};

export default themeReducer;
