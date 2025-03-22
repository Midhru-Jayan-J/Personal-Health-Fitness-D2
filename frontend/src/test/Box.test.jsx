import React from "react";
import { render, screen } from "@testing-library/react";
import Box from "../components/Box"; // Adjust the path based on your project structure
import i1 from "../assets/i1.jpg";

describe("Box Component", () => {
  test("renders the Box component correctly", () => {
    render(<Box type="Strength Training" level={2} />);
    
    // Check if the type is displayed
    expect(screen.getByText(/Strength Training/i)).toBeInTheDocument();

    // Check if the difficulty level text is present
    expect(screen.getByText(/Difficulty Level/i)).toBeInTheDocument();

    // Check if the progress bar exists
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Check if the button is displayed
    expect(screen.getByRole("button", { name: /Begin Training Plan/i })).toBeInTheDocument();

    // Check if the image is rendered correctly
    const img = screen.getByRole("img", { name: /Strength Training/i });
    expect(img).toHaveAttribute("src", i1);
  });
});

export default Box;
