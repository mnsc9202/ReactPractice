import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { arrangeTime } from "../util";
import { screenSizeType } from "../type";

// asset
import videoPlayBtn from "../assets/videoPlay/videoPlayBtn.png";
import videoPauseBtn from "../assets/videoPlay/videoPauseBtn.png";
import videoReplayBtn from "../assets/videoPlay/videoReplayBtn.png";
import videoSoundOn from "../assets/videoPlay/videoSoundOn.png";
import videoSoundOff from "../assets/videoPlay/videoSoundOff.png";
import screenSizeFull from "../assets/videoPlay/screenSizeFull.png";
import screenSizeNotFull from "../assets/videoPlay/screenSizeNotFull.png";

// props
type VideoControllBarProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoCurrentTime: number;
  setVideoCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  videoTotalTime: number;
  screenSize: screenSizeType;
  onScreenSizeBtnClick: () => void;
};

export default function VideoControllBar({
  videoRef,
  videoCurrentTime,
  setVideoCurrentTime,
  videoTotalTime,
  screenSize,
  onScreenSizeBtnClick,
}: VideoControllBarProps) {
  /*---------- 재생 ----------*/
  // 재생바
  const progressBarRef = useRef<HTMLInputElement>(null);

  // 재생바 위치값
  const progressBarValue: number = useMemo(
    () => (videoCurrentTime / videoTotalTime || 0) * 100,
    [videoCurrentTime, videoTotalTime]
  );

  // 재생버튼 이미지
  const [videoPlayBtnImg, setVideoPlayBtnImg] = useState<string>(
    videoRef.current?.paused ? videoPlayBtn : videoPauseBtn
  );

  /*---------- 볼륨 ----------*/
  // 볼륨바
  const soundBarRef = useRef<HTMLInputElement>(null);
  // 볼륨값
  const [soundBarValue, setSoundBarValue] = useState<number>(
    videoRef.current ? videoRef.current.volume * 100 : 100
  );
  // 볼륨버튼 이미지
  const [videoSoundBtnImg, setVideoSoundBtnImg] =
    useState<string>(videoSoundOn);

  // 볼륨조절바
  const [isVisibleSoundBar, setIsVisibleSoundBar] = useState<boolean>(false);

  /*---------- func ----------*/
  // 재생바의 재생위치 변경시
  const onChangeProgressBar = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const playTimePercent: number = Number.parseInt(event.target.value, 10); // 10진법 사용
      if (videoRef.current) {
        const movePlayTime: number =
          videoRef.current.duration * (playTimePercent / 100);

        setVideoCurrentTime(movePlayTime);
        videoRef.current.currentTime = movePlayTime; // 동영상 재생진행시간 위치 지정

        // 재생버튼이미지 체크
        if (movePlayTime === videoTotalTime) {
          // 재생바 이동시 종료 위치일 경우
          setVideoPlayBtnImg(videoReplayBtn);
        } else {
          // 재생바 이동시 종료 위치가 아닌 경우
          if (videoRef.current.paused) {
            // 영상이 정지상태에서 이동시
            setVideoPlayBtnImg(videoPlayBtn);
          } else {
            // 영상이 재생상태에서 이동시
            setVideoPlayBtnImg(videoPauseBtn);
          }
        }
      }
    },
    [setVideoCurrentTime, videoRef, videoTotalTime]
  );

  // 재생/일시정지 버튼 클릭시
  const onToggleVideoPlay = useCallback(() => {
    const tagetVideo: HTMLVideoElement | null = videoRef.current;

    if (tagetVideo) {
      if (tagetVideo.paused) {
        tagetVideo.play();
        setVideoPlayBtnImg(videoPauseBtn);
        return;
      }
      // 재생 -> 일시정지
      else {
        tagetVideo.pause();
        setVideoPlayBtnImg(videoPlayBtn);
        return;
      }
    }
  }, [videoRef]);

  // 볼륨버튼 클릭시
  const onClickSoundBtn = useCallback(() => {
    setIsVisibleSoundBar((prev: boolean) => !prev);
  }, []);

  // 볼륨바의 위치 변경시
  const onChangeSoundBar = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        const soundValue: number = Number.parseInt(event.target.value, 10); // 10진법 사용
        setSoundBarValue(soundValue); // 볼륨바 위치 지정
        videoRef.current!.volume = soundValue / 100; // 동영상 볼륨 지정

        // 볼륨버튼이미지 체크
        if (soundValue === 0) {
          setVideoSoundBtnImg(videoSoundOff);
        } else if (videoSoundBtnImg === videoSoundOff && soundValue > 0) {
          setVideoSoundBtnImg(videoSoundOn);
        }
      }
    },
    [videoRef, videoSoundBtnImg]
  );

  /*---------- render ----------*/
  // 동영상 종료시 다시보기버튼으로 변경
  if (videoRef.current?.ended && videoPlayBtnImg !== videoReplayBtn) {
    setVideoPlayBtnImg(videoReplayBtn);
  }

  // 재생바 색상 채우기
  useEffect(() => {
    if (progressBarRef.current) {
      const addSize: number = progressBarValue > 50 ? -0.15 : 0.15; // thumb 밑으로 들어오게 하기 위함
      progressBarRef.current.style.backgroundSize = `${
        Math.round(progressBarValue) + addSize
      }% 100%`;
    }
  }, [progressBarValue]);

  // 볼륨바 색상 채우기
  useEffect(() => {
    if (soundBarRef.current) {
      soundBarRef.current.style.backgroundSize = `${Math.round(
        soundBarValue
      )}% 100%`;
    }
  });

  return (
    // container
    <div className="w-full absolute bottom-0 ">
      {/* 재생바 */}
      <input
        ref={progressBarRef}
        type={"range"}
        min={0}
        max={100}
        step={1}
        value={progressBarValue}
        onChange={onChangeProgressBar}
        className="videoController"
      />

      {/* wrapper */}
      <div className="flex items-center justify-start bg-black">
        {/* 재생/일시정지 버튼 */}
        <div className="w-[5%]">
          <img
            src={videoPlayBtnImg}
            alt=""
            width={"100%"}
            onClick={onToggleVideoPlay}
            className="cursor-pointer"
          />
        </div>

        {/* 볼륨 wrapper */}
        <div className="w-[5%] relative ">
          {/* 볼륨버튼 */}
          <img
            src={videoSoundBtnImg}
            alt=""
            width={"100%"}
            className="cursor-pointer"
            onClick={onClickSoundBtn}
          />

          {/* 볼륨바 */}
          {isVisibleSoundBar && (
            <div className="absolute top-0 w-full flex items-center justify-center">
              <input
                ref={soundBarRef}
                type={"range"}
                min={0}
                max={100}
                step={1}
                value={soundBarValue}
                onChange={onChangeSoundBar}
                className="soundController "
              />
            </div>
          )}
        </div>

        {/* 동영상 시간정보 */}
        <div className="flex items-center justify-start text-white ">
          {/* 재생시간 */}
          <div className="mr-[5px]">{arrangeTime(videoCurrentTime)}</div>

          {/* 구분선 */}
          {"/"}

          {/* 종료시간 */}
          <div className="ml-[5px]">{arrangeTime(videoTotalTime)}</div>
        </div>

        {/* 화면크기 버튼*/}
        <div className="w-full flex items-center justify-end">
          <img
            src={screenSize === "full" ? screenSizeNotFull : screenSizeFull}
            alt=""
            width={"5%"}
            onClick={onScreenSizeBtnClick}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
