import React, { useState, useEffect } from "react";

// Update the interface to match the expected data structure
interface TopCollection {
  name: string;
  floorPrice: number;
  volumeAll: number; // Renamed volume to volumeAll to match your interface
  transactions: number; // Add this field if it exists in the data
}

const TopNFTCollections: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topCollection, setTopCollection] = useState<TopCollection[]>([]);

  // Fetch function
  const fetchTop = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    // Define the interface for the API response
    interface Collection {
      name: string;
      floorPrice: number;
      volumeAll: number;
      transactions: number; // Ensure this is included if your API provides it
    }

    interface PopularCollectionsResponse {
      collections: Collection[];
    }

    async function fetchPopularCollections(): Promise<PopularCollectionsResponse> {
      try {
        const response = await fetch('https://api-mainnet.magiceden.dev/v2/marketplace/popular_collections');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: PopularCollectionsResponse = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching popular collections:', error);
        throw error;
      }
    }

    try {
      const data = await fetchPopularCollections();
      setTopCollection(data.collections); // Update state with fetched data
    } catch (error) {
      setError('Failed to fetch data.'); // Set error state if there's an error
    } finally {
      setLoading(false); // Always set loading to false after fetch attempt
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchTop();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Top NFT Collections</h2>

      {/* Display loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

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
          {topCollection.map((collection, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{collection.name}</td>
              <td className="border p-2">{collection.volumeAll}</td>
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
