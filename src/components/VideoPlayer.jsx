import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current.play());
    }
  }, [streamUrl]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "100%", height: "auto", marginTop: "20px" }}
    ></video>
  );
};

export default VideoPlayer;
