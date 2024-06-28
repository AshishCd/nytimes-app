import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("App Component", () => {
  test("renders App component without crashing", () => {
    render(<App />);
  });

  test("renders the correct headings", () => {
    render(<App />);
    expect(
      screen.getByText("Today's Most Popular Articles")
    ).toBeInTheDocument();
    expect(screen.getByText("Past Week")).toBeInTheDocument();
  });
});
