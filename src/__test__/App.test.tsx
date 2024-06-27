import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect'; // For the toBeInTheDocument

describe("App Component", () => {
  test('renders App component without crashing', () => {
    render(<App />);
  });

  // test("renders MostViewedArticles component with correct heading for Today's Most Popular Articles", () => {
  //   render(<App />);
  //   const todayHeading = screen.getByText((content, element) => element?.tagName.toLowerCase() === 'h1' && content.startsWith("Today's"));
  //   expect(todayHeading).toBeInTheDocument();
  // });

  // test('renders MostViewedArticles component with correct heading for Past week', async() => {
  //   render(<App />);
  //   const pastWeekHeading = await screen.findByText("Past week");
  //   expect(pastWeekHeading).toBeInTheDocument();
  // });

});
