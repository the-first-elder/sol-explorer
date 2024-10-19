import React, { useState, useEffect } from "react";

// Interface for collection data
interface TopCollection {
  name: string;
  floorPrice: number;
  volumeAll: number; // Renamed volume to volumeAll to match your interface
  transactions?: number; // Optional field if it exists in the data
}

const TopNFTCollections: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topCollection, setTopCollection] = useState<TopCollection[]>([]);

  // Fetch function (commented out for development)
  /*
  const fetchTop = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    // Define the interface for the API response
    interface Collection {
      name: string;
      floorPrice: number;
      volumeAll: number;
    }

    interface PopularCollectionsResponse {
      collections: Collection[];
    }

    try {
      // Adjust this according to how the `tallalTest` API works
      const response = await tallalTest.getMarketplacePopular_collections();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: PopularCollectionsResponse = await response.json();
      setTopCollection(data.collections); // Update state with fetched data
    } catch (error: any) {
      setError('Failed to fetch data.'); // Set error state if there's an error
    } finally {
      setLoading(false); // Always set loading to false after fetch attempt
    }
  };
  */

  // Fetch data when component mounts (commented out for development)
  /*
  useEffect(() => {
    fetchTop();
  }, []);
  */

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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">1</td>
            <td className="border p-2" colSpan={3}>Still in development</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopNFTCollections;
