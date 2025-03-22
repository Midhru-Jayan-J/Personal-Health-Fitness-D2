import React from "react";
import { render, screen } from "@testing-library/react";
import Programs from "../components/Programs"; // Adjust the path based on your project structure

describe("Programs Component", () => {
  test("renders all programs correctly", () => {
    render(<Programs />);

    // Check if all program names are displayed
    expect(screen.getByRole("heading", { name: /Boxing/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Weight Training/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Cardio/i })).toBeInTheDocument();

    // Check if all images are rendered
    expect(screen.getByAltText("Program 1")).toBeInTheDocument();
    expect(screen.getByAltText("Program 2")).toBeInTheDocument();
    expect(screen.getByAltText("Program 3")).toBeInTheDocument();

    // Check if all program icons are rendered
    expect(screen.getByAltText("Program Icon 1")).toBeInTheDocument();
    expect(screen.getByAltText("Program Icon 2")).toBeInTheDocument();
    expect(screen.getByAltText("Program Icon 3")).toBeInTheDocument();
  });
});
