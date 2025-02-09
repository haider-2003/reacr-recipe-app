import "./Recipe.css";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/config";

function Recipe() {
  let { id } = useParams();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("could not fetch that recipe");
        }
      });
    return () => unsub();
  }, [id]);
  
  const handleClick = (e) => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "some things completletys diffrent ",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update ne</button>
        </>
      )}
    </div>
  );
}

export default Recipe;
