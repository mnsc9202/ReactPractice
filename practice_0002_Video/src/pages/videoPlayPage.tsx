import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "../component/videoPlayer";
import { videoListType } from "../type";

export default function VideoPlayPage() {
  /*---------- info ----------*/
  const navigate = useNavigate(); // navi
  const locationState: videoListType | null = useLocation().state; // 페이지 이동시 전달받은 정보
  const videoRef = useRef<HTMLVideoElement>(null); // video 참조

  /*---------- render ----------*/
  // "/videoPlay" 로 바로진입시 "/"로 돌아가기
  useEffect(() => {
    if (locationState === null) {
      navigate("/", { replace: true });
    }
  }, [locationState, navigate]);

  if (!locationState) return null;

  return (
    <div className="w-full h-[100vh] relative flex items-center justify-center">
      {/* 동영상 */}
      <VideoPlayer videoRef={videoRef} videoInfo={locationState} />
    </div>
  );
}
