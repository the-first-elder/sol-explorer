import React from "react";

const Stats: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">32.71K</p>
          <p className="text-gray-600">Median Gas Fee</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">382.29K</p>
          <p className="text-gray-600">Gas Fee Max</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">31.42K</p>
          <p className="text-gray-600">Storage Price</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">17.18K</p>
          <p className="text-gray-600">Gas Fee Min</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
