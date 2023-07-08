import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import {
  comprehensiveValueType,
  onChangeValueType,
  selectDateType,
  selectMonthListType,
} from "../type/type";
import { concatZeroToMonth } from "../util/customComponentUtil";

// props
type CustomSelectMonthProps = {
  el: comprehensiveValueType;
  onChangeValue: onChangeValueType;
};

export default function CustomSelectMonth({
  el,
  onChangeValue,
}: CustomSelectMonthProps) {
  /*---------- info ----------*/
  const minDate: string = "2022-03"; // 선택가능한 최소일자
  const minYear: string = minDate.split("-")[0]; // 선택가능한 최소년도
  const minMonth: string = minDate.split("-")[1]; // 선택가능한 최소월
  const currentDate: Dayjs = dayjs(); // 현재일자
  const currentYear: number = currentDate.year(); // 현재년도
  const currentMonth: number = currentDate.month(); // 현재월

  // 선택한 일자
  const [selectDate, setSelectDate] = useState<selectDateType>(
    el.value as selectDateType
  );

  /*---------- 선택목록 (년도) ----------*/
  // 년도 목록
  const selectYearList = useMemo<string[]>(() => {
    let yearList: string[] = [minYear];
    let loopCnt: number = currentYear - Number.parseInt(minYear);
    while (loopCnt-- > 0) {
      yearList.push(String(currentYear - loopCnt));
    }
    return yearList;
  }, [currentYear, minYear]);

  // 년도 선택시
  const onSelectYear = useCallback(
    (event: SelectChangeEvent) => {
      const selectYear: string = event.target.value; // 선택한 년도
      let selectMonth: string = selectDate.month; // 선택한 월

      // 최소년도로 변경시 월 체크
      // 선택한 월이 선택가능한 최소년도의 월보다 작을경우 최소년도의 월로 변경
      if (
        selectYear === minYear &&
        !(Number.parseInt(minMonth) < Number.parseInt(selectMonth))
      ) {
        selectMonth = minMonth;
      }

      // 현재년도로 변경시 월 체크
      // 선택한 월이 현재년도의 월보다 클경우 현재년도의 월로 변경
      if (
        selectYear === String(currentYear) &&
        !(currentMonth > Number.parseInt(selectMonth))
      ) {
        selectMonth = concatZeroToMonth(currentMonth + 1);
      }

      // 선택한 일자 변경
      setSelectDate({
        year: selectYear,
        month: selectMonth,
      });

      // 종합입력값 변경
      onChangeValue(el.id, { year: selectYear, month: selectMonth });
    },
    [
      currentMonth,
      currentYear,
      el.id,
      minMonth,
      minYear,
      onChangeValue,
      selectDate,
    ]
  );

  /*---------- 선택목록 (월) ----------*/
  // 월 목록
  const selectMonthList = useMemo<selectMonthListType[]>(() => {
    return Array.from({ length: 12 }, (_v: undefined, i: number) => {
      const arrangeMonth: string = concatZeroToMonth(i + 1);
      let disabled: boolean = false;

      // 최소 년도인 경우
      if (selectDate.year === minYear) {
        // 최소 월과 비교
        disabled = i < Number.parseInt(minMonth) - 1 ? true : false;
      } else {
        // 현재 월과 비교
        disabled = i <= currentMonth ? false : true;
      }
      return {
        month: arrangeMonth,
        disabled: disabled,
      };
    });
  }, [currentMonth, minMonth, minYear, selectDate.year]);

  // 월 선택시
  const onSelectMonth = useCallback(
    (selectMonth: string) => () => {
      // 선택한 일자 변경
      setSelectDate((prev: selectDateType) => ({
        ...prev,
        month: selectMonth,
      }));

      // 종합입력값 변경
      onChangeValue(el.id, { ...selectDate, month: selectMonth });
    },
    [el.id, onChangeValue, selectDate]
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        mt: 1,
        mb: 1,
      }}
    >
      {/* 년도 목록 */}
      <FormControl sx={{ m: 1, minWidth: 120, height: 30, margin: 0 }}>
        <Select
          defaultValue={String(currentYear)}
          onChange={onSelectYear}
          sx={{
            "& .MuiSelect-select": {
              margin: 0,
              padding: 0.5,
              fontSize: 14,
              textAlign: "center",
            },
          }}
        >
          {selectYearList.map((year: string) => {
            return (
              <MenuItem key={year} value={year}>
                {`${year}년`}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* 월 목록 */}
      <ButtonGroup
        sx={{
          ml: 1,
          mr: 1,
          flexWrap: "wrap",
          width: "100%",
        }}
        variant="contained"
      >
        {selectMonthList.map((el: selectMonthListType) => {
          return (
            <Button
              key={el.month}
              sx={{
                width: `${100 / 12}%`,
                color: selectDate.month === el.month ? "white" : "black",
                bgcolor: selectDate.month === el.month ? "green" : "white",
                ":hover": {
                  color: "white",
                  bgcolor: "green",
                },
              }}
              disabled={el.disabled}
              onClick={onSelectMonth(el.month)}
            >
              {el.month}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
}
