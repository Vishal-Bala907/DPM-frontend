import React from "react";
import { Navbar, Footer } from "../components";
import { DateDetails } from "../components/view-data/normaluser";

const ViewDateDataPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DateDetails />
      </main>

      <Footer />
    </div>
  );
};

export default ViewDateDataPage;
