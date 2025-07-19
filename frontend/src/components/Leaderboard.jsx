import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard({ refresh, setRefresh }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://leaderboard-backend-za6x.onrender.com/api/users/leaderboard"
      )
      .then((res) => setLeaders(res.data));
  }, [refresh]);

  const handleClaim = async (userId) => {
    try {
      const response = await axios.post(
        `https://leaderboard-backend-za6x.onrender.com/api/users/claim/${userId}`
      );
      console.log("Claim response:", response.data);

      // 🔄 Trigger re-fetch from parent
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  if (leaders.length === 0) return <p>Loading leaderboard...</p>;

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  const podiumColors = [
    "from-yellow-300 to-yellow-500",
    "from-gray-300 to-gray-500",
    "from-orange-300 to-orange-500",
  ];
  const podiumEmojis = ["🥇", "🥈", "🥉"];

  return (
    <div className="bg-gradient-to-tr from-orange-100 to-yellow-50 p-6 rounded-3xl shadow-2xl max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">
          🏆 Weekly Contribution Ranking
        </h2>
        <div className="flex justify-center items-end gap-8">
          {top3.map((u, i) => (
            <div
              key={u._id}
              onClick={() => handleClaim(u._id)}
              className={`cursor-pointer flex flex-col items-center transition-transform duration-300 ${
                i === 0
                  ? "scale-110"
                  : i === 1
                  ? "translate-y-4"
                  : "translate-y-8"
              } bg-gradient-to-tr ${
                podiumColors[i]
              } p-4 rounded-xl shadow-md w-24 hover:scale-105`}
            >
              <img
                src={`https://i.pravatar.cc/100?u=${u.name}`}
                className="w-16 h-16 rounded-full border-4 border-white"
              />
              <p className="mt-2 font-semibold text-center text-white text-sm">
                {u.name}
              </p>
              <p className="text-white font-bold text-sm">
                {u.totalPoints.toLocaleString()} pts
              </p>
              <p className="text-xl">{podiumEmojis[i]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-inner">
        <h3 className="font-semibold text-lg text-gray-700 mb-4">
          🎖️ Other Rankings
        </h3>
        <div className="divide-y">
          {rest.map((u, i) => (
            <div
              key={u._id}
              onClick={() => handleClaim(u._id)}
              className="flex items-center justify-between py-3 cursor-pointer hover:bg-yellow-100 px-2 rounded"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-semibold w-5">{i + 4}</span>
                <img
                  src={`https://i.pravatar.cc/50?u=${u.name}`}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-gray-800 font-medium">{u.name}</span>
              </div>
              <div className="text-yellow-600 font-semibold">
                {u.totalPoints.toLocaleString()} 🏆
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
