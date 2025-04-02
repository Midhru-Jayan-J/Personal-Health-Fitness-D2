import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, beforeEach, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import UpdateUser from "../Pages/UpdateUser";

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Profile updated successfully!" }),
    status: 200,
  })
);

describe("UpdateUser Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders the component correctly", () => {
    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });

  test("updates input values correctly", () => {
    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");
  });

  test("submits form and makes an API call", async () => {
    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Old Password"), {
      target: { value: "oldpass123" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "newpass123" },
    });

    fireEvent.click(screen.getByText("Update"));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/user",
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });
});
