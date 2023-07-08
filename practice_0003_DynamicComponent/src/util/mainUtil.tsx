import dayjs, { Dayjs } from "dayjs";
import {
  comprehensiveValueType,
  dataInfoType,
  selectBoxType,
  selectDateType,
} from "../type/type";
import { concatZeroToMonth } from "./customComponentUtil";

// 입력 데이터(string) -> obj로 변경
export function parseFromDataInfo(dataInfo: string): dataInfoType[] | null {
  try {
    const parseObj: dataInfoType[] = JSON.parse(dataInfo);
    if (parseObj.length === 0) {
      return null;
    }
    return parseObj;
  } catch {
    return null;
  }
}

// 아이디 생성
export function createInitId(label: string | null, i: number): string {
  return `${label ?? ""}_${i}`;
}

// 초기값
const initInputValue: string = "";
const initCalendarValue: string = "";
const initSelectMonthValue: () => selectDateType = () => {
  const currentDate: Dayjs = dayjs();
  return {
    year: String(currentDate.year()),
    month: concatZeroToMonth(currentDate.month() + 1),
  };
};
const initSelectBoxValue: selectBoxType = {
  categoryName1: "all",
  categoryName2: "all",
  categoryName3: "all",
};

// 종합입력값의 초기값 생성
export function createInitValue(
  el: dataInfoType
): string | Dayjs | selectDateType | selectBoxType {
  switch (el.type) {
    case "input": {
      return initInputValue;
    }
    case "calendar": {
      return initCalendarValue;
    }
    case "selectMonth": {
      return initSelectMonthValue();
    }
    case "selectBox": {
      return initSelectBoxValue;
    }
    default: {
      return "null";
    }
  }
}

// 종합입력값 생성
export function createComprehensiveValue(
  dataInfo: dataInfoType[],
  setComprehensiveValue: React.Dispatch<
    React.SetStateAction<comprehensiveValueType[] | null>
  >
) {
  // 초기값 생성
  const initValue: comprehensiveValueType[] = dataInfo.map(
    (el: dataInfoType, i: number) => {
      return {
        id: createInitId(el.label, i),
        value: createInitValue(el),
        dataInfo: el,
      };
    }
  );
  setComprehensiveValue(initValue);
}

// 개별입력값 변경시 종합입력값 수정
export function arrangeComprehensiveValue(
  comprehensiveValue: comprehensiveValueType[],
  setComprehensiveValue: React.Dispatch<
    React.SetStateAction<comprehensiveValueType[] | null>
  >,
  id: string,
  value: string | Dayjs | selectDateType | selectBoxType
) {
  // 동일 id의 입력개체 찾기
  const findEl: comprehensiveValueType | undefined = comprehensiveValue.find(
    (el: comprehensiveValueType) => el.id === id
  );

  // 입력개체의 값 수정
  if (findEl) {
    const newComprehensiveValue: comprehensiveValueType[] =
      comprehensiveValue.reduce(
        (prev: comprehensiveValueType[], current: comprehensiveValueType) => {
          if (current.id === findEl.id) {
            return prev.concat({ ...findEl, value: value });
          } else {
            return prev.concat(current);
          }
        },
        [] as comprehensiveValueType[]
      );
    setComprehensiveValue(newComprehensiveValue);
  }
}
