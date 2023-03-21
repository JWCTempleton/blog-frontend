const styles = {
  margin: "2rem auto",
  padding: "2rem",
  border: "1px solid black",
  borderRadius: "6px",
  width: "16rem",
};

const BlogCard = ({ blog }) => (
  <div style={styles}>
    <p>{blog.title}</p>
    <p>{blog.author}</p>
    <p>
      <a href={blog.url}>{blog.url}</a>
    </p>
    <p>{blog.likes}</p>
  </div>
);

export default BlogCard;
