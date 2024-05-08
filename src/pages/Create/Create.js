// styles
import "./Create.css";
import { useState, useRef } from "react";
import { projectFirestore } from "../../firebase/config";
import { useHistory } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCoockingTime] = useState("");
  const [newingredients, setNewIngredients] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientsInput = useRef("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newingredients.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredients("");
    ingredientsInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredients(e.target.value)}
              value={newingredients}
              ref={ingredientsInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>current ingredients</p>
        {ingredients.map((ing) => (
          <em key={ing}>{ing}, </em>
        ))}
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCoockingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Create;
