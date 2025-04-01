import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { describe, test, expect } from "vitest";

describe("Navbar Component", () => {
  test("renders the navbar correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Protein Calculator")).toBeInTheDocument();
    expect(screen.getByText("Workout Plan")).toBeInTheDocument();
    expect(screen.getByText("Update Profile")).toBeInTheDocument();
    expect(screen.getByText("Chat-Man")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("logout button clears token and reloads page", () => {
    localStorage.setItem("token", "test_token");
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(window.location.reload());
  });
});
