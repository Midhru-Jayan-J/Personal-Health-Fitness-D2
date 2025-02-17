import PropTypes from 'prop-types';
import { Progress, Button } from 'antd';
import './Box.css'
// import { Link } from 'react-router-dom';
import i1 from '../assets/i1.jpg'
const Box = ({ type, level }) => {

    
  return (

    <div className="card bg-white text-black">
  <figure>
    <img
      src={i1}
      alt={type} />
  </figure>
  <div className="card-body">
    <p className="card-title text-center text-4xl font-extrabold uppercase text-black">{type}</p>
    <p>Difficulty Level</p>
    <Progress steps={3} percent={33*level+1} size={[20, 30]} />
    <div className="card-actions justify-end">
    <Button type="primary">Begin Training Plan</Button>
    </div>
  </div>
</div>
  )
}
Box.propTypes = {
  type: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default Box;

