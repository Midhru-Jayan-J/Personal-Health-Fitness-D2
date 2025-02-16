import React from 'react'
import './Programs.css'
import program_1 from '../../assets/health_assets/program1.png'
import program_2 from '../../assets/health_assets/program2.png'
import program_3 from '../../assets/health_assets/program3.png'
import program_icon_1 from '../../assets/health_assets/program_icon_1.png'
import program_icon_2 from '../../assets/health_assets/program_icon_2.png'
import program_icon_3 from '../../assets/health_assets/program_icon_3.png'

const Programs = () => {
  return (
    <div className='programs'>
        <div className="program">
            <img src={program_1} alt="Boxing"/>
            <div className="caption">
               <img src="" alt=""/>
               <p>Boxing</p>
            </div>
        </div>
        <div className="program">
            <img src={program_2} alt="Weight Training"/>
        </div>
        <div className="program">
            <img src={program_3} alt="HIIT"/>
        </div>
      
    </div>
  )
}

export default Programs
