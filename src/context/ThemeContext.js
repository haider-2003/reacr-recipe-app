import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CAHNGE_COLOR":
      return { ...state, color: action.payload };
    case "CAHNGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58249c",
    mode: "light",
  });
  const changeColor = (color) => {
    dispatch({ type: "CAHNGE_COLOR", payload: color });
  };
  const changeMode = (mode) => {
    dispatch({ type: "CAHNGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
