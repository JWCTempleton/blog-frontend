import "./App.css";
import blogService from "./services/blogs";
import { useEffect, useState } from "react";

function App() {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((response) => {
      setAllBlogs(response);
    });
  }, []);

  console.log("blogs", allBlogs);
  return (
    <div className="App">
      <h1>Blogs</h1>
    </div>
  );
}

export default App;
