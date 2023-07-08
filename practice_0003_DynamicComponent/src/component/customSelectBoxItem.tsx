import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  selectBoxItemDataNameType,
  selectBoxItemDataType,
  selectBoxListType,
} from "../type/type";

// props
type CustomSelectBoxItemProps = {
  selectItem: selectBoxListType;
  itemData: selectBoxItemDataType[];
  onSelectBoxItemClick: (name: selectBoxItemDataNameType, code: string) => void;
};

export default function CustomSelectBoxItem({
  selectItem,
  itemData,
  onSelectBoxItemClick,
}: CustomSelectBoxItemProps) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        defaultValue={"all"}
        value={selectItem.code}
        onChange={(event: SelectChangeEvent<string>) => {
          const code: string = event.target.value;
          onSelectBoxItemClick(selectItem.name, code);
        }}
        sx={{
          "& .MuiInputBase-input": {
            padding: 1,
            height: "34px", // 50-(2*8)
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "green",
            fontWeight: "bold",
          },
        }}
      >
        <MenuItem value={"all"}>전체</MenuItem>
        {itemData.map((el: selectBoxItemDataType, i: number) => {
          return (
            <MenuItem key={`${el.categoryName}_${i}`} value={el.categoryCode}>
              {el.categoryName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
