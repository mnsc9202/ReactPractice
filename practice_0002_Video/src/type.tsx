// 동영상 목록
export type videoListType = {
  index: number; // 순서
  title: string; // 제목
  thumbnailUrl: string; // 섬네일 주소
  videoUrl: string; // 동영상 주소
};

// 선택한 동영상 정보
export type selectVideoType = {
  item: videoListType; // 선택한 동영상 정보
  minIndex: number; // 최소 순번
  maxIndex: number; // 최대 순번
};

// 동영상 목록 이동 토글
// first: 처음으로 / last: 끝으로
export type videoIndexMoveToggleType = "first" | "last";

// 동영상 화면 크기
// full: 전체화면 / notFull: 일반화면
export type screenSizeType = "full" | "notFull";
