import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest"; // Or "jest" if using Jest
import Footer from "../components/Footer"; // Adjust the path based on your project structure

describe("Footer Component", () => {
  test("renders the footer correctly", () => {
    render(<Footer />);

    // Check if the footer text is displayed
    expect(
      screen.getByText(/© 2025 Health Fitness. All Rights Reserved./i)
    ).toBeInTheDocument();
  });
});
