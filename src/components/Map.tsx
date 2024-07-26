import React from "react";

const Map: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-4 md:mt-0 md:ml-4 flex-grow">
      <h2 className="text-xl font-bold mb-4">Total Nodes</h2>
      <div className="h-64">{/* Insert map visualization here */}</div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-600">Total Nodes: 15,123</p>
          <p className="text-gray-600">Average APY: 4.96%</p>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded">
          Become a Validator
        </button>
      </div>
    </div>
  );
};

export default Map;
