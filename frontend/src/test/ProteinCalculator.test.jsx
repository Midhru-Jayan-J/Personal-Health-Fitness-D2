import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ProteinCalculator from "../Pages/ProteinCalculator";

describe("ProteinCalculator Component", () => {
  test("renders correctly", () => {
    render(<ProteinCalculator />);

    expect(screen.getByText(/BMI & Protein Calculator/i)).toBeInTheDocument();
    const calculateButtons = screen.getAllByText("Calculate BMI");
    const calculateButton = calculateButtons[0]; // If you want the first button
  });

  test("calculates BMI correctly", () => {
    render(<ProteinCalculator />);

    const heightInput = screen.getByPlaceholderText("Height (cm)");
    const weightInput = screen.getByPlaceholderText("Weight (kg)");
    const calculateButton = screen.getByRole("button", {
      name: "Calculate BMI",
    });

    fireEvent.change(heightInput, { target: { value: "170" } });
    fireEvent.change(weightInput, { target: { value: "65" } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/Your BMI: 22.5/i)).toBeInTheDocument();
    expect(screen.getByText(/Category: Normal weight/i)).toBeInTheDocument();
  });

  // import { render, screen, fireEvent } from '@testing-library/react';

  
});
