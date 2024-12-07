import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [totalSupply, setTotalSupply] = useState("");
  const [circulatingSupply, setCirculatingSupply] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTotalSupply = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/totalSupply");
      const data = await response.json(); // Parse JSON response
      if (data.totalSupply) {
        setTotalSupply(data.totalSupply); // Set formatted total supply
      } else {
        setTotalSupply("Error fetching total supply.");
      }
    } catch (error) {
      setTotalSupply("Error fetching total supply.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCirculatingSupply = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/circulatingSupply");
      const data = await response.text(); // Get plain text response
      setCirculatingSupply(data);
    } catch (error) {
      setCirculatingSupply("Error fetching circulating supply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="h-screen items-center bg-gray-100">
        <div className="max-w-screen-xl mx-auto h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h1 className="text-6xl font-geist-sans text-black">
                Utopos Smart Contract Project API
              </h1>
              <p className="text-geist-mono mt-8 text-gray-500">
                A simple API for the Utopos Project to get started with UTOP smart contracts on the Polygon network.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-8 text-black">
              {/* Total Supply */}
              <div className="bg-white shadow hover:shadow-xl px-4 py-6 flex flex-col space-y-3">
                <h3 className="font-bold text-xl">Total Supply</h3>
                <p className="text-sm opacity-80">
                  {loading ? "Loading..." : totalSupply || "Click Request to fetch total supply."}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={fetchTotalSupply}
                    className="hover:bg-gray-800 bg-gray-200 text-black hover:text-white text-md font-geist-sans px-6 py-1 rounded-full"
                  >
                    Request
                  </button>
                </div>
              </div>

              {/* Circulating Supply */}
              <div className="bg-white shadow hover:shadow-xl px-4 py-6 flex flex-col space-y-3">
                <h3 className="font-bold text-xl">Circulating Supply</h3>
                <p className="text-sm opacity-80">
                  {loading ? "Loading..." : circulatingSupply || "Click Request to fetch circulating supply."}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={fetchCirculatingSupply}
                    className="hover:bg-gray-800 bg-gray-200 text-black hover:text-white text-md font-geist-sans px-6 py-1 rounded-full"
                  >
                    Request
                  </button>
                </div>
              </div>

              <div className="bg-white shadow hover:shadow-xl px-4 py-6 flex flex-col space-y-3">
                <h3 className="font-bold text-xl">Token Holders</h3>
                <p className="text-sm opacity-80">
                  Get the list of UTOP token holders.
                </p>
                <div className="mt-auto">
                  <Link href="/docs" className="hover:bg-gray-800 bg-gray-200 text-black hover:text-white text-md font-geist-sans px-6 py-1 rounded-full">Request
                  </Link>
                  </div>
              </div>
              <div className="bg-white shadow hover:shadow-xl px-4 py-6 flex flex-col space-y-3">
                <h3 className="font-bold text-xl">Token Meta Data</h3>
                <p className="text-sm opacity-80">
                  Get the metadata of the UTOP token.
                  (name, symbol, decimals, totalSupply)
                </p> 
                <div className="mt-auto">
                  <Link href="/docs" className="hover:bg-gray-800 bg-gray-200 text-black hover:text-white text-md font-geist-sans px-6 py-1 rounded-full">Request
                  </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
