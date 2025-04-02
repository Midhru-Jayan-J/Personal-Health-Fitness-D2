import React from "react";
import { render, screen } from "@testing-library/react";
import Programs from "../components/Programs"; // Adjust the path based on your project structure

describe("Programs Component", () => {
  test("renders all programs correctly", () => {
    render(<Programs />);

    // Check if all images are rendered
    expect(screen.getByAltText("Program 1")).toBeInTheDocument();
    expect(screen.getByAltText("Program 2")).toBeInTheDocument();
    expect(screen.getByAltText("Program 3")).toBeInTheDocument();
  });
});
