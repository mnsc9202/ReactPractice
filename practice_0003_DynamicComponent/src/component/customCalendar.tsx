import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { comprehensiveValueType, onChangeValueType } from "../type/type";

// trans
import "dayjs/locale/ko";

// props
type CustomCalendarProps = {
  el: comprehensiveValueType;
  onChangeValue: onChangeValueType;
};

export default function CustomCalendar({
  el,
  onChangeValue,
}: CustomCalendarProps) {
  /*---------- info ----------*/
  const locale: string = dayjs.locale("ko"); // dayjs 한글사용

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <DatePicker
          format={"YYYY년 MM월 DD일"}
          minDate={dayjs("2022-11-11")} // 선택가능한 최소일자
          maxDate={dayjs().add(7, "d")} // 선택가능한 최대일자
          onChange={(value: Dayjs | null) => {
            value && onChangeValue(el.id, value.add(1, "d"));
          }}
          slotProps={{
            textField: {
              sx: {
                width: "100%",
                ".MuiOutlinedInput-root": {
                  fontSize: 12,
                  color: "green",
                  fontWeight: "bold",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
