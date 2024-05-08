// Hooks
import { useLocation } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useState, useEffect } from "react";

// styles
import "./Search.css";

// components
import RecipeList from "../../components/RecipeList";

function Search() {
  const quertString = useLocation().search;
  const queryParams = new URLSearchParams(quertString);
  const query = queryParams.get("q");

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return; 
    console.log(query); // Log the query value
    setIsPending(true);
    const fetchRecipe = async () => {
      try {
        const snapShot = await projectFirestore
          .collection("recipes")
          .where("title", "==", query)
          .get();
        console.log(snapShot); // Log the snapshot
        const recipeData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(recipeData); // Log the data (which is undefined here)
        setIsPending(false);
        setRecipe(recipeData);
      } catch (error) {
        console.log(error.message);
        setIsPending(false);
        setError(error.message);
      }
    };
    fetchRecipe();
  }, [query])
  
  return (
    <div>
      <h2 className="page-title">Recipe including</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading"> loading...</p>}
      {recipe && <RecipeList recipes={recipe} />}
    </div>
  );
}

export default Search;
