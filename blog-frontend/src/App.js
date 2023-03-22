import "./App.css";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogCard from "./components/BlogCard";
import Toggleable from "./components/Toggleable";

import { useEffect, useState } from "react";

function App() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setAllBlogs(allBlogs.concat(returnedBlog));
    });
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

  const handleLikes = (id) => {
    const blog = allBlogs.find((blog) => blog.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, changedBlog)
      .then((response) => {
        console.log("response", response);

        setAllBlogs(
          allBlogs.map((blog) =>
            blog.id !== id ? blog : { ...response, user: changedBlog.user }
          )
        );
      })
      .catch((error) => {
        setErrorMessage(`Blog '${blog.title}' was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

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
          <Toggleable buttonLabel={"New Blog"}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
        </div>
      )}{" "}
      {allBlogs.map((blog) => {
        return (
          <BlogCard
            key={blog.id}
            blog={blog}
            handleLikes={() => handleLikes(blog.id)}
            user={user}
          />
        );
      })}
    </div>
  );
}

export default App;
