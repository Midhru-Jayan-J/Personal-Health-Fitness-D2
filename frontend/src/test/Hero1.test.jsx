import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Hero1 from "../components/Hero1";
import { vi } from "vitest";

vi.mock("./Button", () => ({
  default: ({ func, text }) => <button onClick={func}>{text}</button>,
}));

describe("Hero1 Component", () => {
  test("renders Hero1 component correctly", () => {
    render(<Hero1 />);

    expect(screen.getByText(/MAKA-/)).toBeInTheDocument();
    expect(screen.getByText(/APP/)).toBeInTheDocument();
    expect(
      screen.getByText(/An ultimate personal health and fitness tracker!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Accept & Begin/i)).toBeInTheDocument();
  });

  test("button click navigates to #generate", () => {
    render(<Hero1 />);

    const button = screen.getByText("Accept & Begin");

    window.location.href = ""; // Mock location change
    fireEvent.click(button);

    expect(window.location.href).toBe("http://localhost:3000/#generate");
  });
});
