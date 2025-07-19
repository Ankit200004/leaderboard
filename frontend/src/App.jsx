import { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import History from "./components/History";

export default function App() {
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState("leaderboard");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🏆 Leaderboard System
        </h1>

        {/* Toggle Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded w-1/2 ${
              activeTab === "leaderboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded w-1/2 ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            History
          </button>
        </div>

        {/* Conditional Rendering */}
        <div className="mt-6">
          {activeTab === "leaderboard" ? (
            <Leaderboard refresh={refresh} setRefresh={setRefresh} />
          ) : (
            <History />
          )}
        </div>
      </div>
    </div>
  );
}
