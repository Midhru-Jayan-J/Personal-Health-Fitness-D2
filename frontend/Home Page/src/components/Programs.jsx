import React from 'react';
import '../styles/Programs.css';

const Programs = () => {
  return (
    <div className='programs'>
        <div className="program">
            <img src={program_1} alt="Boxing"/>
            <div className="caption">
               <img src={program_icon_1} alt="Boxing Icon"/>
               <p>Boxing</p>
            </div>
        </div>
        <div className="program">
            <img src={program_2} alt="Weight Training"/>
            <div className="caption">
               <img src={program_icon_2} alt="Weight Training Icon"/>
               <p>Weight Training</p>
            </div>
        </div>
        <div className="program">
            <img src={program_3} alt="HIIT"/>
            <div className="caption">
               <img src={program_icon_3} alt="HIIT Icon"/>
               <p>HIIT</p>
            </div>
        </div>
    </div>
  );
}

export default Programs;
