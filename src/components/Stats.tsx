import React, { useState, useEffect } from "react";

const Stats: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const apiKey = "ocw995bjfTnmRgm3npxgYiyC";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-mainnet.magiceden.dev/v2/collections",
          {
            method: "GET",
            mode: "no-cors",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {JSON.stringify(data, null, 2)}
      </h2>
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
