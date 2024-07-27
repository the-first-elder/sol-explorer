/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

// Define the Validator interface with only the required fields
interface Validator {
  name: string;
  account: string;
  total_score: number;
}

const Validators: React.FC = () => {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchValidators();
  }, []);

  const fetchValidators = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/api/v1/validators/mainnet.json?order=score&limit=6', {
        headers: {
          'Token': 'WKbLWvVjERoQ5utRzC842fZN', // Make sure to replace with your actual token
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read response text for debugging
        throw new Error(`Error: ${response.status} ${response.statusText}. Response: ${errorText}`);
      }

      const data: Validator[] = await response.json();
      setValidators(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Validators</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Account</th>
              <th className="border p-2">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {validators.map((validator, index) => (
              <tr key={index}>
                <td className="border p-2">{validator.name}</td>
                <td className="border p-2">{validator.account}</td>
                <td className="border p-2">{validator.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 text-center">
        <button className="bg-blue-600 text-white p-2 rounded">More Validators</button>
      </div>
    </div>
  );
};

export default Validators;
