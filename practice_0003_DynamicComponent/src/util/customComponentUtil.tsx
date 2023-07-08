import {
  selectBoxItemDataCodeType,
  selectBoxItemDataNameType,
  selectBoxItemDataType,
  selectBoxListDataType,
  selectBoxListType,
  selectBoxType,
} from "../type/type";

// 날짜 중에서 한자리 달에 0을 붙이기
export function concatZeroToMonth(month: number): string {
  return month <= 9 ? "0" + String(month) : String(month);
}

// 같은 카테고리 이름 + 상위 카테고리 코드에 속한 목록 찾기
function findListOfSameCategoryNameCode(
  upperCategoryName: selectBoxItemDataNameType | null,
  uppperCategoryCode: string | null,
  categoryName: selectBoxItemDataNameType,
  data: selectBoxListDataType[]
): selectBoxListDataType[] {
  let findList: selectBoxListDataType[] = []; // 찾은 목록
  let checkCategoryNameList: string[] = []; // 카테고리이름 중복 체크

  data.forEach((el: selectBoxListDataType) => {
    // 새로운 카테고리 이름인 경우
    if (!checkCategoryNameList.includes(el[categoryName])) {
      // 첫번째 카테고리의 목록을 정하는 경우
      if (upperCategoryName === null || uppperCategoryCode === null) {
        findList.push(el);
        checkCategoryNameList.push(el[categoryName]);
      }
      // 첫번째가 아닌 카테고리 목록을 정하는 경우
      else {
        const categoryCode: selectBoxItemDataCodeType =
          upperCategoryName.replace(
            "Name",
            "Code"
          ) as selectBoxItemDataCodeType;
        // 상위 카테고리 코드에 속한 경우
        if (el[categoryCode] === uppperCategoryCode) {
          findList.push(el);
          checkCategoryNameList.push(el[categoryName]);
        }
      }
    }
  });
  return findList;
}

// 같은 카테고리의 선택항목 아이템으로 변환
function convertSelectBoxItemDataOfSameCategory(
  categoryName: selectBoxItemDataNameType,
  data: selectBoxListDataType[]
): selectBoxItemDataType[] {
  return data.map((el: selectBoxListDataType) => {
    const categoryCode: selectBoxItemDataCodeType = categoryName.replace(
      "Name",
      "Code"
    ) as selectBoxItemDataCodeType;
    return {
      categoryName: el[categoryName],
      categoryCode: el[categoryCode],
    };
  });
}

// 같은 카테고리의 데이터 가져오기
export function getDataListOfSameCategory(
  upperCategoryName: selectBoxItemDataNameType | null,
  upperCategoryCode: string | null,
  categoryName: selectBoxItemDataNameType,
  data: selectBoxListDataType[]
): selectBoxItemDataType[] {
  // 상위 카테고리이름, 코드로 찾은 목록
  const upperFindList: selectBoxListDataType[] = findListOfSameCategoryNameCode(
    upperCategoryName,
    upperCategoryCode,
    categoryName,
    data
  );

  return convertSelectBoxItemDataOfSameCategory(categoryName, upperFindList);
}

// 선택항목의 값 불러오기
export function getValueOfSetSelectBoxList(
  setSelectBoxList: selectBoxListType[]
): selectBoxType {
  let selectBoxValue: selectBoxType = {
    categoryName1: "",
    categoryName2: "",
    categoryName3: "",
  };
  setSelectBoxList.forEach((el: selectBoxListType) => {
    selectBoxValue = {
      ...selectBoxValue,
      [el.name as selectBoxItemDataNameType]: el.code,
    };
  });
  return selectBoxValue;
}
