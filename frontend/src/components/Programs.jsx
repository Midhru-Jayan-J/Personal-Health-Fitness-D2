import React from "react";
import "../styles/Programs.css";

import program1 from "../assets/health_assets/program1.png";
import program2 from "../assets/health_assets/program2.png";
import program3 from "../assets/health_assets/program3.png";

import programIcon1 from "../assets/health_assets/program_icon_1.png";
import programIcon2 from "../assets/health_assets/program_icon_2.png";
import programIcon3 from "../assets/health_assets/program_icon_3.png";

const Programs = () => {
  return (
    <section className="programs">
      <div className="program">
        <img src={program1} alt="Program 1" />
        <div className="program-overlay">
          <img className="program-icon" src={programIcon1} alt="Program Icon 1" />
        </div>
        <h3>Boxing</h3>
      </div>

      <div className="program">
        <img src={program2} alt="Program 2" />
        <div className="program-overlay">
          <img className="program-icon" src={programIcon2} alt="Program Icon 2" />
        </div>
        <h3>Weight Training</h3>
      </div>

      <div className="program">
        <img src={program3} alt="Program 3" />
        <div className="program-overlay">
          <img className="program-icon" src={programIcon3} alt="Program Icon 3" />
        </div>
        <h3>Cardio</h3>
      </div>
    </section>
  );
};

export default Programs;
