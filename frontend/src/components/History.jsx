import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/history")
      .then((res) => setHistory(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Claim History</h2>
      <ul className="list-disc list-inside space-y-1">
        {history.map((h) => (
          <li key={h._id}>
            {h.userId.name} claimed <strong>{h.pointsClaimed}</strong> points on{" "}
            {new Date(h.claimedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
