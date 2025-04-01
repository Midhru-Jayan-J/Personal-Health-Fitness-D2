import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero"; // Adjust path based on your project structure

describe("Hero Component", () => {
  test("renders the hero section correctly", () => {
    render(<Hero />);

    // Check if the heading is displayed
    expect(
      screen.getByRole("heading", { name: /Welcome to MAKA Fitness/i })
    ).toBeInTheDocument();

    // Check if the paragraph text is displayed
    expect(
      screen.getByText(
        /Achieve your fitness goals with expert training and guidance./i
      )
    ).toBeInTheDocument();

    // Check if the "Get Started" button is displayed
  });
});
