import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white p-4 flex flex-col md:flex-row items-center justify-between w-full">
      <div className="flex flex-wrap items-center gap-4">
        <a href="#" className="hover:underline">
          READ
        </a>
        <a href="#" className="hover:underline">
          BUILD
        </a>
        <a href="#" className="hover:underline">
          FOLLOW
        </a>
        <a href="#" className="hover:underline">
          LEGAL
        </a>
      </div>
      <div className="mt-2 md:mt-0">
        <p>Status: Online</p>
        <p>Availability: 99.99%</p>
        <p>Downtime: 32s (0.01%)</p>
      </div>
    </footer>
  );
};

export default Footer;
