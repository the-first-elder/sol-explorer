import React from 'react';

const Validators: React.FC = () => {
  const validators = [
    { rank: 1, name: 'Jump Crypto', stake: '9.22M', reward: '601.40' },
    { rank: 2, name: 'Blockdaemon', stake: '8.25M', reward: '524.17' },
    { rank: 3, name: 'Kraken', stake: '7.85M', reward: '513.65' },
    { rank: 4, name: 'Coinbase', stake: '4.55M', reward: '345.64' },
    { rank: 5, name: 'al2s', stake: '3.96M', reward: '233.47' },
    { rank: 6, name: 'Figment', stake: '2.84M', reward: '156.23' },
    // Add more validators here
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Top Validators</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Rank</th>
            <th className="border p-2">Validator</th>
            <th className="border p-2">Stake</th>
            <th className="border p-2">Last Epoch Reward</th>
          </tr>
        </thead>
        <tbody>
          {validators.map((validator) => (
            <tr key={validator.rank}>
              <td className="border p-2">{validator.rank}</td>
              <td className="border p-2">{validator.name}</td>
              <td className="border p-2">{validator.stake}</td>
              <td className="border p-2">{validator.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        <button className="bg-blue-600 text-white p-2 rounded">More Validators</button>
      </div>
    </div>
  );
};

export default Validators;
