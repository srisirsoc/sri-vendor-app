import React from 'react';
import "./style.css";

const Loader = ({ height = "min-h-[70vh]" }) => {
  return (
    <div className={`flex justify-center items-center ${height}`} >
      <div className='flex items-center gap-2 justify-center h-auto'>
        <div className='loader'></div>
      </div>
    </div>
  )
}

export default Loader;