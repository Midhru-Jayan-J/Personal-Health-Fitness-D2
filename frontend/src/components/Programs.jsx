import React from "react";
import "../styles/Programs.css";

import program1 from "../assets/health_assets/program1.png";
import program2 from "../assets/health_assets/program2.png";
import program3 from "../assets/health_assets/program3.png";

const Programs = () => {
  return (
    <div className="programs">
      <div className="program">
        <img src={program1} alt="Program 1" />
        <div className="program-overlay"></div>
      </div>

      <div className="program">
        <img src={program2} alt="Program 2" />
        <div className="program-overlay"></div>
      </div>

      <div className="program">
        <img src={program3} alt="Program 3" />
        <div className="program-overlay"></div>
      </div>
    </div>
  );
};

export default Programs;
