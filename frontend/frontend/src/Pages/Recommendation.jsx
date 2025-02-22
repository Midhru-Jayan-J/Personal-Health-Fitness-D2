// import  { useState } from 'react';
import Box from '../components/Box';
import './recommendation.css';

const Recommendation = () => {
    const typeHeader = ["Beginner",'Intermediate','Advanced'];

    return(
    <div className='card'>
<div className="carousel w-full">
  <div id="item1" className="carousel-item">
    <Box type={typeHeader[0]} level={1}/>
  </div>
  <div id="item2" className="carousel-item">
    <Box type={typeHeader[1]} level={2}/>
  </div>
  <div id="item3" className="carousel-item">
    <Box type={typeHeader[2]} level={3}/>
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
</div>
</div>
)}

export default Recommendation