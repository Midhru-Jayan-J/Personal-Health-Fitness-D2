import { render, screen } from "@testing-library/react";
import About from "../components/About"; // Adjust path as needed

/* eslint-env jest */

// Add Jest global definitions
import "@testing-library/jest-dom";

describe("About Component", () => {
  it("renders About section with heading and description", () => {
    render(<About />);
    
    // Check for heading
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Why Choose Us?");

    // Check for paragraph content
    const paragraph = screen.getByText(/Our fitness programs are tailored to challenge your limits/i);
    expect(paragraph).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<About />);
    
    // Check for all cards
    const expertTrainers = screen.getByText("Expert Trainers");
    const modernEquipment = screen.getByText("Modern Equipment");
    const supportiveCommunity = screen.getByText("Supportive Community");

    expect(expertTrainers).toBeInTheDocument();
    expect(modernEquipment).toBeInTheDocument();
    expect(supportiveCommunity).toBeInTheDocument();
  });
});
