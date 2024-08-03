import React, { useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";

// Define the type for node data
interface NodeData {
  featureSet: number;
  gossip: string;
  pubkey: string;
  pubsub?: string;
  rpc?: string;
  shredVersion: number;
  tpu: string;
  tpuForwards?: string;
  tpuForwardsQuic?: string;
  tpuQuic?: string;
  version: string;
}

const Map: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]); // State with type for node data

  const fetchNodes = async () => {
    try {
      const connection = new Connection(
        "https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb"
      );

      // Fetch the cluster nodes
      const nodesData = await connection.getClusterNodes();

      // Map fetched data to match NodeData structure
      const formattedNodes: NodeData[] = nodesData.map((node) => ({
        featureSet: node.featureSet,
        gossip: node.gossip,
        pubkey: node.pubkey,
        pubsub: node.pubsub || "N/A", // Handle optional fields
        rpc: node.rpc || "N/A",
      }));

      // Store formatted nodes in state
      setNodes(formattedNodes);
    } catch (error) {
      console.error("Failed to fetch cluster nodes:", error);
    }
  };

  useEffect(() => {
    fetchNodes(); // Fetch nodes on component mount
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4 md:mt-0 md:ml-4 flex-grow">
      <h2 className="text-xl font-bold mb-4">Total Nodes</h2>
      <div className="overflow-auto max-h-64">
        {/* Table to display node data */}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Feature Set</th>
              <th className="py-2 px-4 border-b border-gray-200">Gossip</th>
              <th className="py-2 px-4 border-b border-gray-200">Public Key</th>
              <th className="py-2 px-4 border-b border-gray-200">PubSub</th>
              <th className="py-2 px-4 border-b border-gray-200">RPC</th>

            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{node.featureSet}</td>
                <td className="py-2 px-4 border-b border-gray-200">{node.gossip}</td>
                <td className="py-2 px-4 border-b border-gray-200">{node.pubkey}</td>
                <td className="py-2 px-4 border-b border-gray-200">{node.pubsub}</td>
                <td className="py-2 px-4 border-b border-gray-200">{node.rpc}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-600">Total Nodes: {nodes.length}</p>
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
