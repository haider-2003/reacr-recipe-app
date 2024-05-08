import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
// styles
import "./Home.css";
// components
import RecipeList from "../../components/RecipeList";

function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
          throw new Error("no recipes found");
        } else {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          setData(result);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);
  return (
    <div className="home">
      {/* {error && <p className="error">{error}</p>} */}
      {isPending && <p className="loading">loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;
