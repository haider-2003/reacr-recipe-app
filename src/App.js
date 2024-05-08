// routing
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme.js";

// pages & components
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home/Home.js";
import Create from "./pages/Create/Create.js";
import Recipe from "./pages/recipe/Recipe.js";
import Search from "./pages/search/Search.js";
import ThemeSelector from "./components/ThemeSelector.js";

//styles
import "./App.css";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
