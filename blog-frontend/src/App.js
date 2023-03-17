import "./App.css";
import blogService from "./services/blogs";
import { useEffect, useState } from "react";

function App() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((response) => {
      setAllBlogs(response);
    });
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    console.log(newTitle, newUrl);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:{" "}
        <input type="text" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        URL: <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

  return (
    <div className="App">
      <h1>Blogs</h1>
      {blogForm()}
      {allBlogs.map((blog) => {
        return (
          <div key={blog.title} style={{ margin: "3rem" }}>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
