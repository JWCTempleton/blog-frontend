import { useState } from "react";

const styles = {
  margin: "2rem auto",
  padding: "2rem",
  border: "1px solid black",
  borderRadius: "6px",
  width: "16rem",
};

const BlogCard = ({ blog, handleLikes }) => {
  const [cardOpen, setCardOpen] = useState(false);

  const displayCard = () => {
    if (cardOpen === true) {
      return (
        <div style={styles}>
          <p>
            {blog.title}{" "}
            <button onClick={() => setCardOpen(false)}>Hide</button>
          </p>
          <p>{blog.author}</p>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <p>{blog.likes}</p>
          <p>Created by: {blog.user.name}</p>
          <button onClick={handleLikes}>Like</button>
        </div>
      );
    } else if (cardOpen === false) {
      return (
        <div style={styles}>
          <p>
            {blog.title}, {blog.author}{" "}
            <button onClick={() => setCardOpen(true)}>Show</button>{" "}
          </p>
        </div>
      );
    }
  };
  return displayCard();
};

export default BlogCard;
