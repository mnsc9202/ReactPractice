import { useCallback, useEffect, useState } from "react";
import { screenSizeType, videoListType } from "../type";
import VideoControllBar from "./videoControllBar";
import { useNavigate } from "react-router-dom";
import { setSessionStorageVideoIndex } from "../util";

// asset
import videoCloseBtn from "../assets/videoPlay/videoCloseBtn.png";

// props
type VideoPlayerProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoInfo: videoListType;
};

export default function VideoPlayer({ videoRef, videoInfo }: VideoPlayerProps) {
  /*---------- info ----------*/
  const navigate = useNavigate(); // navi
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0); // 동영상 진행 시간
  const videoTotalTime: number = videoRef.current?.duration || 0; // 동영상 전체 시간
  const [isVisibleVideoController, setIsVisibleVideoController] =
    useState<boolean>(false); // 동영상 컨트롤러 표시여부

  /*---------- 화면크기 ----------*/
  // 화면크기
  const [screenSize, setScreenSize] = useState<screenSizeType>("full");
  // 화면크기 버튼 클릭시
  const onScreenSizeBtnClick = useCallback(() => {
    setScreenSize((prev: screenSizeType) =>
      prev === "full" ? "notFull" : "full"
    );
  }, []);

  /*---------- func ----------*/
  // 동영상 진행시간 업데이트 함수
  const updateVideoPlayTime = useCallback(() => {
    if (videoRef.current) {
      // 이벤트
      videoRef.current.addEventListener("timeupdate", () => {
        // 재생시간 업데이트
        videoRef.current && setVideoCurrentTime(videoRef.current.currentTime);
      });

      // 동영상 재생
      const videoPlayPromise: Promise<void> = videoRef.current.play();
      if (videoPlayPromise !== undefined) {
        videoPlayPromise
          .then(() => {})
          .catch((reason: string) => {
            // 새로고침시 자동재생 차단되므로 플레이버튼 표시
            setIsVisibleVideoController(true);
          });
      }
    }
  }, [videoRef]);

  // 동영상 닫기 버튼 클릭시
  const onVideoCloseBtnClick = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setSessionStorageVideoIndex(videoInfo.index); // 시청한 동영상 index 저장
    navigate("/", { replace: true });
  }, [navigate, videoInfo.index, videoRef]);

  // 동영상 컨트롤러 표시여부
  const onToggleVisibleVideoController = useCallback(() => {
    setIsVisibleVideoController((prev: boolean) => !prev);
  }, []);

  /*---------- render ----------*/
  // 동영상 진행시간 업데이트
  useEffect(() => {
    updateVideoPlayTime();
  }, [updateVideoPlayTime]);

  return (
    // container
    <div
      className="relative"
      style={{
        width: screenSize === "full" ? "100%" : "80%",
        height: screenSize === "full" ? "100%" : "80%",
      }}
    >
      {/* 상단 (동영상 정보, 닫기 버튼) */}
      {isVisibleVideoController && (
        <div className="absolute top-0 z-[10] w-full ">
          {/* wrapper */}
          <div className="relative w-full h-[50px] flex items-center justify-center bg-black text-white font-bold">
            {/* 동영상 정보 */}
            {`${videoInfo.index}화 ${videoInfo.title}`}

            {/* 닫기 버튼 */}
            <img
              src={videoCloseBtn}
              alt=""
              className="absolute top-0 right-0 cursor-pointer"
              width={"2.5%"}
              onClick={onVideoCloseBtnClick}
            />
          </div>
        </div>
      )}

      {/* 동영상 */}
      <video
        ref={videoRef} // 참조
        controls={false} // 컨트롤러 표시
        loop={false} // 반복재생
        autoPlay={false} // 자동재생
        muted={false} // 음소거
        src={videoInfo.videoUrl}
        className="w-full h-full bg-black"
        onClick={onToggleVisibleVideoController}
      />

      {/* 컨트롤바 */}
      {isVisibleVideoController && (
        <VideoControllBar
          videoRef={videoRef}
          videoCurrentTime={videoCurrentTime}
          setVideoCurrentTime={setVideoCurrentTime}
          videoTotalTime={videoTotalTime}
          screenSize={screenSize}
          onScreenSizeBtnClick={onScreenSizeBtnClick}
        />
      )}
    </div>
  );
}
