import { configureStore } from "@reduxjs/toolkit";
import { selectSideBarStore } from "./selectSideBarStore";

// store
export default configureStore({
  reducer: {
    selectSideBar: selectSideBarStore.reducer,
  },
});
