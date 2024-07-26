import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Transactions from "./components/Transactions";
import Validators from "./components/Validators";
import Stats from "./components/Stats";
import Map from "./components/Map";
import TopNFTCollections from "./components/TopNFTCollections";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <Stats />
          <Transactions />
          <Map />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <Validators />
          <TopNFTCollections />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
