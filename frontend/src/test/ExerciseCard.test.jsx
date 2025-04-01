import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseCard from "../components/ExerciseCard";
import { vi, describe, test, expect } from "vitest";

describe("ExerciseCard Component", () => {
  const mockExercise = {
    name: "push_up",
    type: "strength",
    muscles: ["chest", "triceps"],
    description: "Start in a plank___Lower your body___Push back up",
    reps: "10-15",
    rest: "30 sec",
    tempo: "1-1-1",
    unit: "reps",
  };

  test("renders exercise name correctly", () => {
    render(<ExerciseCard exercise={mockExercise} i={0} />);
    expect(screen.getByText(/push up/i)).toBeInTheDocument(); // Case insensitive check
  });

  test("renders muscle groups correctly", () => {
    render(<ExerciseCard exercise={mockExercise} i={0} />);
    expect(screen.getByText(/chest & triceps/i)).toBeInTheDocument(); // Case insensitive check
  });

  test("renders exercise details correctly", () => {
    render(<ExerciseCard exercise={mockExercise} i={0} />);
    expect(screen.getByText("10-15")).toBeInTheDocument();
    expect(screen.getByText("30 sec")).toBeInTheDocument();
    expect(screen.getByText("1-1-1")).toBeInTheDocument();
  });

  test("renders description steps correctly", () => {
    render(<ExerciseCard exercise={mockExercise} i={0} />);
    expect(screen.getByText("Start in a plank")).toBeInTheDocument();
    expect(screen.getByText("Lower your body")).toBeInTheDocument();
    expect(screen.getByText("Push back up")).toBeInTheDocument();
  });

  test("increments sets completed when button is clicked", () => {
    render(<ExerciseCard exercise={mockExercise} i={0} />);
    const button = screen.getByText("Sets completed").closest("button");

    fireEvent.click(button);
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
  });
});
