import { Dayjs } from "dayjs";

/*---------- main ----------*/
// 변환가능한 컴포넌트 타입
export type convertComponentType =
  | "input"
  | "calendar"
  | "selectMonth"
  | "selectBox";

// 입력한 데이터 정보
export type dataInfoType = {
  label: string; // data 구분 값
  name: string; // queryString에 사용
  type: convertComponentType; // 컴포넌트 타입
};

// 종합 입력값
export type comprehensiveValueType = {
  id: string; // value 구분 값
  value: string | Dayjs | selectDateType | selectBoxType; // 컴포넌트에 입력된 값
  dataInfo: dataInfoType; // 변환된 data 정보
};

// 입력값 변경 함수 타입
export type onChangeValueType = (
  id: string,
  value: string | Dayjs | selectDateType | selectBoxType
) => void;

/*---------- component custom ----------*/
// CustomSelectMonth
// 선택한 일자 (년도, 월)
export type selectDateType = {
  year: string;
  month: string;
};

// 월 목록
export type selectMonthListType = {
  month: string;
  disabled: boolean;
};

// CustomSelectBox
// 선택항목 데이터의 아이템 이름
export type selectBoxItemDataNameType =
  | "categoryName1"
  | "categoryName2"
  | "categoryName3";

// 선택항목 데이터의 아이템 코드
export type selectBoxItemDataCodeType =
  | "categoryCode1"
  | "categoryCode2"
  | "categoryCode3";

// 카테고리별 선택한 아이템
export type selectBoxType = {
  [key in selectBoxItemDataNameType]: string;
};

// 선택항목
export type selectBoxListType = {
  label: string;
  name: selectBoxItemDataNameType;
  code: string;
};

// 선택항목의 아이템
export type selectBoxItemDataType = {
  categoryName: string;
  categoryCode: string;
};

// 선택항목 데이터
export type selectBoxListDataType = {
  [key in selectBoxItemDataNameType | selectBoxItemDataCodeType]: string;
};
