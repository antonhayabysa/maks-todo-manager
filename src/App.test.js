import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import Todo from "../src/сomponents/todo/Todo";

test("loading tasks from API", async () => {
  render(<App />);

  const todoItems = await waitFor(() => screen.findAllByRole("checkbox"), {
    timeout: 5000,
  });

  expect(todoItems).toHaveLength(10);
});

test("adding a new task", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Add TODO title");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "new task" } });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText("new task")).toBeInTheDocument();
  });
});

test("search functionality", async () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText("Search");

  fireEvent.change(searchInput, { target: { value: "qui" } });

  const matchingItems = await screen.findAllByText(/qui/i);

  expect(matchingItems.length).toBeGreaterThan(0);
});

test("Todo component renders correctly", () => {
  const mockProps = {
    title: "Test Todo",
    completed: false,
    selected: false,
    toggleComplete: jest.fn(),
    toggleSelect: jest.fn(),
  };

  render(<Todo {...mockProps} />);

  expect(screen.getByText("Test Todo")).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("Todo checkbox reflects completed state", () => {
  const mockProps = {
    title: "Test Todo Completed",
    completed: true,
    selected: false,
    toggleComplete: jest.fn(),
    toggleSelect: jest.fn(),
  };

  render(<Todo {...mockProps} />);

  expect(screen.getByText("Test Todo Completed")).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).toBeChecked();
});
