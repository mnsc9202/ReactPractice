import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import {
  comprehensiveValueType,
  onChangeValueType,
  selectBoxItemDataNameType,
  selectBoxListDataType,
  selectBoxListType,
} from "../type/type";
import CustomSelectBoxItem from "./customSelectBoxItem";
import tempSelectBoxItemData from "../tempData/tempSelectBoxItemData.json";
import {
  getDataListOfSameCategory,
  getValueOfSetSelectBoxList,
} from "../util/customComponentUtil";

// props
type CustomSelectBoxProps = {
  el: comprehensiveValueType;
  onChangeValue: onChangeValueType;
};

export function CustomSelectBox({ el, onChangeValue }: CustomSelectBoxProps) {
  /*---------- info ----------*/
  // 임시데이터
  const selectBoxItemData: selectBoxListDataType[] = tempSelectBoxItemData;

  // 선택항목 목록
  const [selectBoxList, setSelectBoxList] = useState<selectBoxListType[]>(
    () => {
      return [
        { label: "범주", name: "categoryName1", code: "all" },
        { label: "항목", name: "categoryName2", code: "all" },
        { label: "요소", name: "categoryName3", code: "all" },
      ];
    }
  );

  /*---------- func ----------*/
  // 선택항목 아이템 클릭시
  const onSelectBoxItemClick = useCallback(
    (name: selectBoxItemDataNameType, code: string) => {
      const newSelectBoxList: selectBoxListType[] = selectBoxList.reduce(
        (prev: selectBoxListType[], current: selectBoxListType) => {
          // 첫번째 카테고리 값 변경
          // 첫번째 카테고리를 제외한 나머지를 all로 변경
          if (name === "categoryName1") {
            // 첫번째 카테고리
            if (current.name === name) {
              return prev.concat({ ...current, code: code });
            }
            // 나머지 카테고리
            else {
              return prev.concat({ ...current, code: "all" });
            }
          }
          // 두번째 카테고리 값 변경
          // 세번째 카테고리의 값을 all로 변경
          else if (name === "categoryName2") {
            // 첫번째 카테고리
            if (current.name === "categoryName1") {
              return prev.concat(current);
            }
            // 두번째 카테고리
            else if (current.name === name) {
              return prev.concat({ ...current, code: code });
            }
            // 세번째 카테고리
            else {
              return prev.concat({ ...current, code: "all" });
            }
          }
          // 세번째 카테고리 값 변경
          else {
            // 첫번째, 두번째 카테고리
            if (current.name !== name) {
              return prev.concat(current);
            } else {
              return prev.concat({ ...current, code: code });
            }
          }
        },
        [] as selectBoxListType[]
      );

      setSelectBoxList(newSelectBoxList);
    },
    [selectBoxList]
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* 선택항목 */}
      {selectBoxList.map((el: selectBoxListType, i: number) => {
        return (
          <Box
            key={el.name}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "50px",
              width: `${100 / 3}%`,
            }}
          >
            {/* 라벨 */}
            <Box
              sx={{
                ml: i > 0 ? 3 : 0,
                bgcolor: "info.main",
                color: "background.paper",
                minWidth: "50px",
                height: "42px", // 50-(2*(8*0.5))
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0.5,
                borderRadius: "5px",
              }}
            >
              {el.label}
            </Box>

            {/* 선택아이템 */}
            <CustomSelectBoxItem
              selectItem={el}
              itemData={getDataListOfSameCategory(
                i > 0
                  ? (`categoryName${i}` as selectBoxItemDataNameType)
                  : null,
                i > 0 ? selectBoxList[i - 1].code : null,
                `categoryName${i + 1}` as selectBoxItemDataNameType,
                selectBoxItemData
              )}
              onSelectBoxItemClick={onSelectBoxItemClick}
            />
          </Box>
        );
      })}

      {/* 검색버튼 */}
      <Button
        variant="contained"
        color="primary"
        sx={{ height: "50px" }}
        onClick={() => {
          onChangeValue(el.id, getValueOfSetSelectBoxList(selectBoxList));
        }}
      >
        검색
      </Button>
    </Box>
  );
}
