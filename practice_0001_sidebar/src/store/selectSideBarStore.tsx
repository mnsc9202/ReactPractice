import { createSlice } from "@reduxjs/toolkit";
import { selectSideBarType } from "../type";
import { initSelectSideBarMenu } from "../util";

// state
export const selectSideBarStore = createSlice({
  name: "selectSideBar",
  initialState: initSelectSideBarMenu,
  reducers: {
    // 선택한 sideBar 아이템 지정
    setSelectSideBar(_state, action) {
      return action.payload;
    },
  },
});

// action
export const { setSelectSideBar } = selectSideBarStore.actions;
export const selectSideBar = (state: { selectSideBar: selectSideBarType }) =>
  state.selectSideBar;
