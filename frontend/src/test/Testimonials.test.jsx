import { render, screen } from "@testing-library/react";
import Testimonials from "../components/Testimonials"; // Adjust the path if needed

describe("Testimonials Component", () => {
  test("renders the testimonials section", () => {
    render(<Testimonials />);

    // Check if the main heading is present
    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument();

    // Check if testimonials are displayed
    expect(screen.getByText(/This gym has changed my life!/i)).toBeInTheDocument();
    expect(screen.getByText(/Best fitness programs I have ever attended!/i)).toBeInTheDocument();

    // Check if client names are present
    expect(screen.getByText("- Alex")).toBeInTheDocument();
    expect(screen.getByText("- Sarah")).toBeInTheDocument();
  });
});

export default Testimonials;
