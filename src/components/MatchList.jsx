import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import matchesData from "../data/matches.json";

const MatchList = () => {
  const [selectedStream, setSelectedStream] = useState(null);

  useEffect(() => {
    if (matchesData.length > 0 && !selectedStream) {
      setSelectedStream(matchesData[0].stream);
    }
  }, [selectedStream]);

  return (
    <div>
      <h2>Live Matches</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {matchesData.map((match) => (
          <li key={match.id}>
            <button onClick={() => setSelectedStream(match.stream)}>
              {match.title}
            </button>
          </li>
        ))}
      </ul>

      {selectedStream && <VideoPlayer streamUrl={selectedStream} />}
    </div>
  );
};

export default MatchList;
