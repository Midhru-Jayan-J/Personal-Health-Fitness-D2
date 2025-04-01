import { useState } from "react";
import Hero1 from "../components/Hero1";
import Generator from "../components/Generator";
import Workout from "../components/Workout";
import { generateWorkout } from "../utils/functions";
import "../styles/Recommendation.css";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);

    // Smooth scroll to workout section
    setTimeout(() => {
      document
        .getElementById("workout")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white text-sm sm:text-base">
      <Hero1 />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout id="workout" workout={workout} />}
    </main>
  );
}

export default App;
