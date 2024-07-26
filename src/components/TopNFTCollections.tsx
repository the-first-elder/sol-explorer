import React from "react";

const TopNFTCollections: React.FC = () => {
  const collections = [
    {
      name: "BoredApe",
      volume: "3,299",
      floorPrice: "234.13",
      transactions: "172.2M",
    },
    {
      name: "goblintown.wtf",
      volume: "1,278",
      floorPrice: "164.48",
      transactions: "16.92M",
    },
    {
      name: "Moonbirds",
      volume: "1,080",
      floorPrice: "188.36",
      transactions: "10.61M",
    },
    // Add more collections here
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Top NFT Collections</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Volume</th>
            <th className="border p-2">Floor Price</th>
            <th className="border p-2">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{collection.name}</td>
              <td className="border p-2">{collection.volume}</td>
              <td className="border p-2">{collection.floorPrice}</td>
              <td className="border p-2">{collection.transactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopNFTCollections;
