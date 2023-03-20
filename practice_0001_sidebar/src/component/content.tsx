import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import * as sideBarStore from "../store/selectSideBarStore";
import { selectSideBarType } from "../type";

export default function Content() {
  /*----- store -----*/
  // 선택한 sideBar 카테고리, 메뉴 정보
  const selectSideBar: selectSideBarType = useSelector(
    sideBarStore.selectSideBar
  );

  if (!selectSideBar.category) return null;
  if (!selectSideBar.menu) return null;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>{selectSideBar.category.categoryName}</Box>
      <Box>{selectSideBar.menu.menuName}</Box>
    </Box>
  );
}
