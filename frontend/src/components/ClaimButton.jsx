import axios from "axios";

export default function ClaimButton({ selectedUser, onClaim }) {
  const claimPoints = async () => {
    if (!selectedUser) return alert("Select a user first");

    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/claim/${selectedUser}`
      );
      onClaim(res.data);
      alert(`${res.data.user.name} earned ${res.data.pointsClaimed} points!`);
    } catch (err) {
      console.error("Claim failed", err);
      alert("Failed to claim points. Try again.");
    }
  };

  return (
    <button
      className="bg-green-500 text-white px-6 py-2 rounded"
      onClick={claimPoints}
    >
      Claim Points
    </button>
  );
}
