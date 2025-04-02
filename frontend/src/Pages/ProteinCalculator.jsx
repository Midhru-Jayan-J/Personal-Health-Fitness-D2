import { useState, useMemo } from "react";
import "../styles/ProteinCalculator.css";

const ProteinCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [proteinNeeded, setProteinNeeded] = useState(null);
  const [selectedFood, setSelectedFood] = useState("");
  const [requiredAmount, setRequiredAmount] = useState(null);

  const proteinFoods = useMemo(
    () => ({
      paneer: { protein: 18.3, name: "Paneer" },
      chicken: { protein: 27, name: "Chicken Breast" },
      eggs: { protein: 13, name: "Eggs" },
      tofu: { protein: 8, name: "Tofu" },
      lentils: { protein: 9, name: "Lentils" },
      almonds: { protein: 21.15, name: "Almonds" },
      greekYogurt: { protein: 10, name: "Greek Yogurt" },
      salmon: { protein: 22, name: "Salmon" },
      quinoa: { protein: 4.4, name: "Quinoa" },
      chickpeas: { protein: 15, name: "Chickpeas" },
    }),
    []
  );

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      calculateProteinNeeds(bmiValue, weight);
    }
  };

  const calculateProteinNeeds = (bmiValue, weightKg) => {
    const proteinMultiplier =
      bmiValue < 18.5 ? 2.0 : bmiValue < 25 ? 1.8 : bmiValue < 30 ? 1.6 : 1.4;

    const dailyProtein = (weightKg * proteinMultiplier).toFixed(1);
    setProteinNeeded(dailyProtein);
  };

  const calculateRequiredAmount = (food) => {
    if (proteinNeeded && food) {
      const required = (
        (proteinNeeded / proteinFoods[food].protein) *
        100
      ).toFixed(0);
      setRequiredAmount(required);
    }
  };

  const handleFoodChange = (e) => {
    const food = e.target.value;
    setSelectedFood(food);
    calculateRequiredAmount(food);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "#64B5F6" };
    if (bmi < 25) return { category: "Normal weight", color: "#4CAF50" };
    if (bmi < 30) return { category: "Overweight", color: "#FFC107" };
    return { category: "Obese", color: "#FF5252" };
  };

  const mailHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: `This amount will provide your daily protein need of ${proteinNeeded}g`,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="protein-calculator">
      <h2>BMI & Protein Calculator</h2>

      <div className="calculator-section">
        <h3>Calculate BMI</h3>
        <div className="input-group">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height (cm)"
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
          />
          <button onClick={calculateBMI}>Calculate BMI</button>
        </div>

        {bmi && (
          <div className="results">
            <h4>Your BMI: {bmi}</h4>
            <p style={{ color: getBMICategory(bmi).color }}>
              Category: {getBMICategory(bmi).category}
            </p>
            {proteinNeeded && (
              <p className="protein-needed">
                Daily Protein Need: {proteinNeeded}g
              </p>
            )}
          </div>
        )}
      </div>

      {proteinNeeded && (
        <div className="calculator-section">
          <h3>Calculate Required Food Amount</h3>
          <div className="input-group">
            <select
              value={selectedFood}
              onChange={handleFoodChange}
              className="food-select"
            >
              <option value="">Select Food</option>
              {Object.entries(proteinFoods).map(([key, food]) => (
                <option key={key} value={key}>
                  {food.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFood && requiredAmount && (
            <div className="food-result">
              <div className="food-info">
                <h4>{proteinFoods[selectedFood].name}</h4>
                <p className="protein-content">
                  {proteinFoods[selectedFood].protein}g protein per 100g
                </p>
              </div>
              <div className="required-amount">
                <h4>Required Amount</h4>
                <p className="amount">{requiredAmount}g</p>
                <p className="suggestion">
                  This amount will provide your daily protein need of{" "}
                  {proteinNeeded}g
                </p>
              </div>
              <button onClick={mailHandler}>Mail This?</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProteinCalculator;
