import React from 'react';
import '../styles/Programs.css';

import program_1 from '/src/assets/health_assets/program1.png';
import program_2 from '/src/assets/health_assets/program2.png';
import program_3 from '/src/assets/health_assets/program3.png';
import program_icon_1 from '/src/assets/health_assets/program_icon_1.png';
import program_icon_2 from '/src/assets/health_assets/program_icon_2.png';
import program_icon_3 from '/src/assets/health_assets/program_icon_3.png';

const Programs = () => {
  return (
    <div className='programs'>
      {/* Program 1 */}
      <div className="program">
        <img src={program_1} alt="Boxing" />
        <div className="caption">
          <img src={program_icon_1} alt="Boxing Icon" />
          <p>Boxing</p>
        </div>
      </div>

      {/* Program 2 */}
      <div className="program">
        <img src={program_2} alt="Weight Training" />
        <div className="caption">
          <img src={program_icon_2} alt="Weight Training Icon" />
          <p>Weight Training</p>
        </div>
      </div>

      {/* Program 3 */}
      <div className="program">
        <img src={program_3} alt="HIIT" />
        <div className="caption">
          <img src={program_icon_3} alt="HIIT Icon" />
          <p>HIIT</p>
        </div>
      </div>
    </div>
  );
}

export default Programs;
