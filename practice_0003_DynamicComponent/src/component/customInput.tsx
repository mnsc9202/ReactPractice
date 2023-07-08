import { Box, Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { comprehensiveValueType, onChangeValueType } from "../type/type";

// props
type CustomInputProps = {
  el: comprehensiveValueType;
  onChangeValue: onChangeValueType;
};

export default function CustomInput({ el, onChangeValue }: CustomInputProps) {
  /*---------- info ----------*/
  const [inputValue, setInputValue] = useState<string>(""); // 입력창의 값

  /*---------- func ----------*/
  // 입력창 값 변경시
  const onChangeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  // 확인버튼 클릭시
  const onConfirmBtnClick = useCallback(() => {
    onChangeValue(el.id, inputValue);
  }, [el.id, onChangeValue, inputValue]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* 입력창 */}
      <TextField
        value={inputValue}
        placeholder={el.dataInfo.label ?? ""}
        onChange={onChangeInputValue}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            color: "green",
            fontWeight: "bold",
          },
        }}
      />
      {/* 버튼 */}
      <Button onClick={onConfirmBtnClick} variant="contained" color="primary">
        확인
      </Button>
    </Box>
  );
}
