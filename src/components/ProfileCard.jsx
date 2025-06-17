function ProfileCard({ profile }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 mb-6 w-full max-w-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-3 text-indigo-400">{profile.name}</h3>
      <p className="mb-2 text-gray-300">{profile.bio}</p>
      <p className="text-sm text-gray-400 mb-1">Interests: {profile.interests.join(", ")}</p>
      <p className="text-sm text-gray-400">Famous Quote: "{profile.quotes[0]}"</p>
    </div>
  );
}

export default ProfileCard;
