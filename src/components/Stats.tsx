/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

// Define the Statistics interface to represent the shape of data
interface Statistics {
  median: number;
  max: number;
  min: number;
  solPrice: number;
}

const Stats: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null); // Change to single Statistics object
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Fetch data from both APIs and update state
  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch requests for both APIs
      const pingThingStatsRequest = await fetch(
        '/api/api/v1/ping-thing-stats/mainnet.json?interval=3',
        {
          headers: {
            'Token': 'WKbLWvVjERoQ5utRzC842fZN',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(pingThingStatsRequest)

      const solPricesRequest = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-17w5cCm13c4r6KUnKjZFKXak',
        },
      });

      // Wait for both requests to resolve
      const [pingThingStatsResponse, solPricesResponse] = await Promise.all([
        pingThingStatsRequest,
        solPricesRequest,
      ]);

      // Check for errors in pingThingStatsResponse
      if (!pingThingStatsResponse.ok) {
        const errorText = await pingThingStatsResponse.text();
        throw new Error(
          `Error fetching ping-thing stats: ${pingThingStatsResponse.status} ${pingThingStatsResponse.statusText}. Response: ${errorText}`
        );
      }

      // Check for errors in solPricesResponse
      if (!solPricesResponse.ok) {
        const errorText = await solPricesResponse.text();
        throw new Error(
          `Error fetching sol prices: ${solPricesResponse.status} ${solPricesResponse.statusText}. Response: ${errorText}`
        );
      }

      // Parse JSON responses
      const pingThingStatsData = await pingThingStatsResponse.json();
      const solPricesData = await solPricesResponse.json();

      // Assume both data objects have relevant fields to map to Statistics
      const newStatistics: Statistics = {
        median: pingThingStatsData[0].median,
        max: pingThingStatsData[0].max,
        min: pingThingStatsData[0].min,
        solPrice: solPricesData.solana.usd,
      };

      console.log({max: pingThingStatsData.max})
      // Update state with the new statistics
      setStatistics(newStatistics);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {statistics && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{statistics.median}</p>
            <p className="text-gray-600">Median Gas Fee</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{statistics.max}</p>
            <p className="text-gray-600">Gas Fee Max</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">${statistics.solPrice}</p>
            <p className="text-gray-600">Solana Price in $</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{statistics.min}</p>
            <p className="text-gray-600">Gas Fee Min</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
