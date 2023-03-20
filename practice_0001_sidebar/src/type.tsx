import { Slice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

/*----- info -----*/
// 카테고리
export type categoryType = {
  categoryName: string; // 카테고리 이름
  categoryCode: string; // 카테고리 코드
};

// 메뉴
export type menuType = {
  menuName: string; // 메뉴 이름
  menuCode: string; // 메뉴 코드
  displayOrder: number; // 메뉴 순서
};

// 사이드바 메뉴
export type sideBarMenuListType = {
  category: categoryType; // 카테고리
  menu: menuType[]; // 카테고리에 속한 메뉴
};

// open 카테고리
export type categoryOpenType = {
  category: string; // 카테고리
  open: boolean; // 해당 카테고리 open 여부
};

// 사이드바 타이틀 영역 아이콘
export type subheaderIconsType = {
  icon: ReactNode; // 아이콘
  description: string; // 설명
  onClick?: () => void; // 클릭시
};

// 사이드바 메뉴 정렬 방식
export type sideBarMenuListSortOrderType =
  | "menuName" // 메뉴이름 순
  | "ascending" // 오름차순
  | "descending"; // 내림차순

/*----- store -----*/
// 선택한 사이드바 메뉴
export type selectSideBarType = {
  category: categoryType | null; // 선택한 카테고리
  menu: menuType | null; // 선택한 메뉴
};

// store 정보
export type selectSideBarStoreType = Slice<
  selectSideBarType,
  {
    setSelectSideBarMenu(): void;
  },
  "selectSideBar"
>;
