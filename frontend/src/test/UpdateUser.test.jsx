import { render, screen, fireEvent, waitFor, } from "@testing-library/react";
import UpdateUser from "../Pages/UpdateUser"; // Adjust the path if needed
import {describe, test, expect, beforeEach , vi } from "vitest";

// Mock the `fetch` API
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Profile updated successfully!" }),
    status: 200,
  })
);

describe("UpdateUser Component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear fetch mock before each test
  });
  
  test("renders update profile form", () => {
    render(<UpdateUser />);

    expect(screen.getByText("Update Profile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Old Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  test("submits the form successfully and displays success message", async () => {
    render(<UpdateUser />);

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Old Password"), { target: { value: "oldpassword123" } });
    fireEvent.change(screen.getByPlaceholderText("New Password"), { target: { value: "newpassword123" } });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/user", expect.any(Object));
      expect(screen.getByText("Profile updated successfully!")).toBeInTheDocument();
    });
  });

  test("displays an error message when the server returns an error", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: "Update failed" }),
        status: 400,
      })
    );

    render(<UpdateUser />);

    fireEvent.change(screen.getByPlaceholderText("Old Password"), { target: { value: "wrongoldpassword" } });
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(screen.getByText("Update failed")).toBeInTheDocument();
    });
  });
});
