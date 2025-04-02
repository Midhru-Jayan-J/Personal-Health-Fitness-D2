import { render, screen } from "@testing-library/react";
import About from "../components/About"; // Adjust path as needed

/* eslint-env jest */

// Add Jest global definitions
import "@testing-library/jest-dom";
import { expect } from "vitest";

describe("About Component", () => {
  it("renders About section with heading and description", () => {
    render(<About />);

    // Check for heading
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Why Choose Us?");

    // Check for paragraph content
    const paragraph = screen.getByText(
      /Our fitness programs are tailored to challenge your limits/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<About />);

    const expertTrainers = screen.getByText("Expert Advice");
    const modernEquipment = screen.getByText("Get your Exercises");
    const supportiveCommunity = screen.getByText("What you consume");

    expect(expertTrainers).toBeInTheDocument();
    expect(modernEquipment).toBeInTheDocument();
    expect(supportiveCommunity).toBeInTheDocument();
    expect(
      screen.getByText("Get to know about fitness using our AI Chat-man")
    ).toBeInTheDocument();

    expect(screen.getByText("Proper workout instructions")).toBeInTheDocument();

    expect(
      screen.getByText("Protein intake and BMI calculator")
    ).toBeInTheDocument();
  });
});
