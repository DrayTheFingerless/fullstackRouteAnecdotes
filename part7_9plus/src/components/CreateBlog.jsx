import { useState } from "react";

const CreateBlog = ({ handleCreate }) => {
  const [url, newURL] = useState(null);
  const [title, newTitle] = useState(null);
  const [author, newAuthor] = useState(null);

  const addBlog = (event) => {
    event.preventDefault();
    handleCreate({
      url: url,
      title: title,
      author: author,
    });

    newURL("");
    newTitle("");
    newAuthor("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        URL
        <input
          placeholder="url here"
          data-testid="urlField"
          id="url-input"
          type="text"
          name="URL"
          onChange={({ target }) => newURL(target.value)}
        />
      </div>
      <div>
        Title
        <input
          placeholder="title here"
          data-testid="titleField"
          id="title-input"
          type="text"
          name="Title"
          onChange={({ target }) => newTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          placeholder="author here"
          data-testid="authorField"
          id="author-input"
          type="text"
          name="Author"
          onChange={({ target }) => newAuthor(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlog;
