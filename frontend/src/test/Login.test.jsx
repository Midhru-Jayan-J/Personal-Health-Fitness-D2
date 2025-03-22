import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";

// Mock fetch globally
globalThis.fetch = vi.fn(async (url) => {
  if (url.includes("login")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "OTP sent" }),
    });
  } else if (url.includes("verify-otp")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: "test_token", message: "Login successful" }),
    });
  }
  return Promise.reject(new Error("Unknown API call"));
});

describe("Login Component", () => {
  it("renders login form correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send OTP" })).toBeInTheDocument();
  });

  it("allows user to input email and password", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("triggers fetch when Send OTP button is clicked", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const sendOtpButton = screen.getByRole("button", { name: "Send OTP" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", password: "password123" }),
      });
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("displays OTP input after login", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const sendOtpButton = screen.getByRole("button", { name: "Send OTP" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      expect(screen.getByText("Enter OTP")).toBeInTheDocument();
    });
  });

  it("triggers fetch when Verify OTP button is clicked", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate login step
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const sendOtpButton = screen.getByRole("button", { name: "Send OTP" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter OTP")).toBeInTheDocument();
    });

    // Simulate OTP step
    const otpInput = screen.getByPlaceholderText("Enter OTP");
    const verifyOtpButton = screen.getByRole("button", { name: "Verify OTP" });

    fireEvent.change(otpInput, { target: { value: "123456" } });
    fireEvent.click(verifyOtpButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", otp: "123456" }),
      });
    });

    expect(fetch).toHaveBeenCalledTimes(4);
  });
});
