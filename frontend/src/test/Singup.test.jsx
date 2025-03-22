import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../Pages/Signup"; // Adjust path as needed

globalThis.fetch = vi.fn(); // Mock fetch

// Move navigateMock to the top
const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

describe("Signup Component", () => {
  beforeEach(() => {
    navigateMock.mockClear(); // Reset mock calls
    fetch.mockClear();
  });

  it("renders all input fields correctly", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("shows an alert if passwords do not match", async () => {
    window.alert = vi.fn(); // Mock alert

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "Test1234" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "Tes1234" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Male" } });
    fireEvent.change(screen.getByTestId("dob"), { target: { value: "2000-01-01" } });

    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Passwords do not match");
    });
  });

  it("submits the form successfully and navigates to login", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User registered successfully" }),
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "Test1234" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "Test1234" } });
    fireEvent.change(screen.getByTestId("dob"), { target: { value: "2000-01-01" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Male" } });
    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/signup", expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });


});
