import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

describe("<Blog/>", () => {
  let container;
  const blog = {
    id: "testId",
    title: "test title",
    author: "test author",
    url: "test.url",
    likes: 3,
  };

  const handleLike = vi.fn();
  const handleRemove = vi.fn();

  beforeEach(() => {
    container = render(
      <Blog
        handleLike={handleLike}
        handleRemove={handleRemove}
        key={blog.id}
        blog={blog}
      />,
    ).container;
  });

  test("renders its children", async () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("test title");
  });

  test("after clicking the button, children are displayed", async () => {
    const div = container.querySelector(".togglableContent");

    expect(div).toHaveStyle("display: none");

    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    expect(div).not.toHaveStyle("display: none");
  });

  test("after clicking the like button, counter goes up twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Like");
    await user.click(button);

    expect(handleLike.mock.calls).toHaveLength(1);

    await user.click(button);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});

describe("<CreateBlog/>", () => {
  let container;

  const handleCreate = vi.fn();

  /*   beforeEach(() => {
    container = render(
      <CreateBlog handleCreate={handleCreate}  />
    ).container
  }) */

  test("after clicking the button, create blog is called correctly", async () => {
    const user = userEvent.setup();

    render(<CreateBlog handleCreate={handleCreate} />);

    const inputUrl = screen.getByPlaceholderText("url here");
    const inputTitle = screen.getByPlaceholderText("title here");
    const inputAuthor = screen.getByPlaceholderText("author here");
    const button = screen.getByText("Create");

    await user.type(inputUrl, "url to show");
    await user.type(inputTitle, "title");
    await user.type(inputAuthor, "author");

    await user.click(button);

    console.log(handleCreate.mock.calls);

    expect(handleCreate.mock.calls).toHaveLength(1);
    expect(handleCreate.mock.calls[0][0].url).toBe("url to show");
    expect(handleCreate.mock.calls[0][0].title).toBe("title");
    expect(handleCreate.mock.calls[0][0].author).toBe("author");
  });
});
