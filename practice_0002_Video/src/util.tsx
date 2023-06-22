import { selectVideoType } from "./type";
import tempVideoList from "./tempData/tempVideoList.json";

// 선택한 동영상 초기값
export const initSelectVideo: selectVideoType = {
  item: tempVideoList[0],
  minIndex: 0,
  maxIndex: tempVideoList.length - 1,
};

// 1자리 수에 0 붙이기 (1 -> 01)
export function checkNumWithZero(checkNum: number): string {
  if (checkNum > 9) {
    return `${checkNum}`;
  } else {
    return `0${checkNum}`;
  }
}

// 동영상 시간 표현
export function arrangeTime(videoTimeSecond: number) {
  // console.log(`second:${second}`);
  let time: number = Math.floor(videoTimeSecond);
  const oneSecond: number = 60; // 1분=60초

  // 시
  const hour: number = Math.floor(time / Math.pow(oneSecond, 2));
  time -= Math.pow(oneSecond, 2) * hour;

  // 분
  const minute: number = Math.floor(time / Math.pow(oneSecond, 1));
  time -= Math.pow(oneSecond, 1) * minute;

  // 초
  const second: number = time % oneSecond;

  return `${checkNumWithZero(hour)}:${checkNumWithZero(
    minute
  )}:${checkNumWithZero(second)}`;
}

// 세션에 저장
export function setSessionStorageVideoIndex(videoIndex: number) {
  sessionStorage.setItem("videoIndex", videoIndex.toString());
}

// 세션에서 불러오기
export function getSessionStorageVideoIndex(): number {
  const getVideoIndex: string | null = sessionStorage.getItem("videoIndex");
  return getVideoIndex === null ? -1 : parseInt(getVideoIndex);
}
