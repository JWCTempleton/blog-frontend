import "./App.css";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

import { useEffect, useState } from "react";

function App() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((response) => {
      setAllBlogs(response);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((response) => {
      setAllBlogs(allBlogs.concat(response));
      setNewAuthor("");
      setNewTitle("");
      setNewUrl("");
    });
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:{" "}
        <input type="text" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author:{" "}
        <input type="text" value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        URL: <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div className="App">
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      )}{" "}
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
