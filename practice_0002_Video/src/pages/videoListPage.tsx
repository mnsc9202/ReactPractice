import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoListItem from "../component/videoListItem";
import {
  videoIndexMoveToggleType,
  selectVideoType,
  videoListType,
} from "../type";
import { getSessionStorageVideoIndex, initSelectVideo } from "../util";

// data
import tempVideoList from "../tempData/tempVideoList.json";

// assets
import { ReactComponent as PrevBtn } from "../assets/videoList/prevBtn.svg";
import { ReactComponent as NextBtn } from "../assets/videoList/nextBtn.svg";

export default function VideoListPage() {
  /*---------- info ----------*/
  const navigate = useNavigate(); // navi
  // 동영상 목록
  const videoList = useMemo<videoListType[]>(() => {
    return tempVideoList;
  }, []);

  // 선택한 동영상 정보
  const [selectVideo, setSelectVideo] =
    useState<selectVideoType>(initSelectVideo);

  // 동영상 이동 토글버튼
  const [videoIndexMoveToggle, setSelectTogle] =
    useState<videoIndexMoveToggleType>("first");

  /*---------- func ----------*/
  // 이전버튼 클릭시
  const onPrevBtnClick = useCallback(() => {
    setSelectVideo((prev: selectVideoType) => {
      const moveIndex: number = prev.item.index - 1; // 이동할 index
      const minIndex: number = 0; // 최소 index
      if (moveIndex === minIndex) setSelectTogle("first"); // toggle 체크
      return {
        ...prev,
        item: moveIndex < minIndex ? videoList[minIndex] : videoList[moveIndex],
      };
    });
  }, [videoList]);

  // 다음버튼 클릭시
  const onNextBtnClick = useCallback(() => {
    setSelectVideo((prev: selectVideoType) => {
      const moveIndex: number = prev.item.index + 1; // 이동할 index
      const maxIndex: number = videoList.length - 1; // 최대 index
      if (moveIndex === maxIndex) setSelectTogle("last"); // toggle 체크
      return {
        ...prev,
        item: moveIndex > maxIndex ? videoList[maxIndex] : videoList[moveIndex],
      };
    });
  }, [videoList]);

  // 토글버튼 클릭시
  const onToggleBtnClick = useCallback(() => {
    if (videoIndexMoveToggle === "first") {
      setSelectTogle("last");
      setSelectVideo((prev: selectVideoType) => ({
        ...prev,
        item: videoList[prev.maxIndex],
      }));
    } else {
      setSelectTogle("first");
      setSelectVideo((prev: selectVideoType) => ({
        ...prev,
        item: videoList[prev.minIndex],
      }));
    }
  }, [videoIndexMoveToggle, videoList]);

  // 재생버튼 클릭시
  const onPlayBtnClick = useCallback(() => {
    navigate("/videoPlay", { state: selectVideo.item });
  }, [navigate, selectVideo.item]);

  /*---------- render ----------*/
  // 시청한 동영상이 있을 경우
  useEffect(() => {
    const getVideoIndex: number = getSessionStorageVideoIndex();
    if (getVideoIndex !== -1) {
      setSelectVideo((prev: selectVideoType) => ({
        ...prev,
        item: videoList[getVideoIndex],
      }));
    }
  }, [videoList]);

  return (
    // container
    <div className="w-full flex flex-col items-center justify-center mt-10 min-w-[1024px] overflow-hidden">
      {/* 토글 wrapper */}
      <div className="w-full max-w-[50%] flex items-center justify-end">
        <div className="relative w-[15%] h-[30px] flex items-center justify-center rounded-full bg-moveVideoIndexToggle text-white">
          {/* 내용 */}
          {videoIndexMoveToggle === "first" ? "끝" : "시작"}

          {/* 버튼 */}
          <div
            className="absolute top-0 w-full h-full flex items-center justify-center transition-all"
            style={{
              transform: `translateX(${
                (videoIndexMoveToggle === "first" ? -1 : 1) * 30
              }%)`,
            }}
          >
            <button
              className="bg-white rounded-full w-[20px] h-[20px]"
              onClick={onToggleBtnClick}
            />
          </div>
        </div>
      </div>

      {/* 동영상목록 */}
      <div className="relative flex w-full max-w-[50%] overflow-hidden ">
        <div
          className="flex transition-all duration-[700ms]"
          style={{
            transform: `translateX(${-selectVideo.item.index * 100}%)`,
          }}
        >
          {videoList.map((el: videoListType) => {
            return (
              <VideoListItem
                key={el.index}
                info={el}
                onPlayBtnClick={onPlayBtnClick}
              />
            );
          })}
        </div>

        {/* prev 버튼 */}
        <div className="absolute top-0 left-[0px] w-[20%] h-full flex items-center justify-center mt-[12.5px]">
          <button onClick={onPrevBtnClick}>
            {selectVideo.item.index > selectVideo.minIndex && <PrevBtn />}
          </button>
        </div>

        {/* next 버튼 */}
        <div className="absolute top-0 right-[0px] w-[20%] h-full flex items-center justify-center mt-[12.5px]">
          <button onClick={onNextBtnClick}>
            {selectVideo.item.index < selectVideo.maxIndex && <NextBtn />}
          </button>
        </div>
      </div>
    </div>
  );
}
