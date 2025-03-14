import { render } from "@testing-library/react";
import { MostViewedArticles } from "../components/MostViewedArticles";

describe("Most Viewed Article", () => {
  test("renders MopstViewedArticle component without crashing", () => {
    render(<MostViewedArticles day={1} />);
  });

  test("Renders MopstViewedArticle component with all the props", () => {
    render(<MostViewedArticles day={1} type="sidebar" />);
  });
});
