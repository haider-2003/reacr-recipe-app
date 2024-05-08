import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
import Trashcan from "../assets/Trashcan.svg";
import { projectFirestore } from "../firebase/config";


// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">no recipes...</div>;
  }
  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make..</p>
          <div>{recipe.method.substring(0, 100)} ...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
          <img
            className="delete"
            src={Trashcan}
            onClick={() => {
              handleClick(recipe.id);
            }}
            alt="trash-icon"
          />
        </div>
      ))}
    </div>
  );
}
