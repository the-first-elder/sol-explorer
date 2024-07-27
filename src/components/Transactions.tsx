import React, { useState } from "react";

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Transactions");

  const transactions = [
    {
      time: "7s ago",
      type: "TransferSui",
      txID: "1KL...",
      transfers: "0x...7d7",
      amount: "477.06 SUI",
      gas: "15.51",
    },
    {
      time: "26s ago",
      type: "TransferObj",
      txID: "0e2...5Ve",
      transfers: "0x...d8b",
      amount: "683.90 SUI",
      gas: "11.35",
    },
    // Add more transactions here
  ];

  //   const epochs: [] = [
  //     // Add epoch data here
  //   ];

  //   const checkpoints: [] = [
  //     // Add checkpoint data here
  //   ];

  const renderTableContent = () => {
    switch (activeTab) {
      case "Transactions":
        return transactions.map((tx, index) => (
          <tr key={index}>
            <td className="border p-2">{tx.time}</td>
            <td className="border p-2">{tx.type}</td>
            <td className="border p-2">{tx.txID}</td>
            <td className="border p-2">{tx.transfers}</td>
            <td className="border p-2">{tx.amount}</td>
            <td className="border p-2">{tx.gas}</td>
          </tr>
        ));
      case "Epochs":
      // return epochs.map((epoch, index) => (
      //   <tr key={index}>
      //     {/* <td className="border p-2">{epoch.time}</td>
      //     <td className="border p-2">{epoch.event}</td> */}
      //   </tr>
      // ));
      case "Checkpoints":
      // return checkpoints.map((checkpoint, index) => (
      //   <tr key={index}>
      //     {/* <td className="border p-2">{checkpoint.time}</td>
      //     <td className="border p-2">{checkpoint.details}</td> */}
      //   </tr>
      // ));
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="flex space-x-4">
          <button
            className={`p-2 ${
              activeTab === "Transactions"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("Transactions")}
          >
            Transactions
          </button>
          <button
            className={`p-2 ${
              activeTab === "Epochs"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("Epochs")}
          >
            Epochs
          </button>
          <button
            className={`p-2 ${
              activeTab === "Checkpoints"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("Checkpoints")}
          >
            Checkpoints
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Time</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Tx ID</th>
            <th className="border p-2">Transfers</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Gas</th>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </table>
    </div>
  );
};

export default Transactions;
