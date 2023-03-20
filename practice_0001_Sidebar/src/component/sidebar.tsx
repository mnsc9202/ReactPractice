import {
  alpha,
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ArrowDropDown,
  ArrowDropUp,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Photo,
  Article,
  Monitor,
  Settings,
  Home,
} from "@mui/icons-material";
import {
  categoryOpenType,
  categoryType,
  menuType,
  selectSideBarType,
  sideBarMenuListSortOrderType,
  sideBarMenuListType,
  subheaderIconsType,
} from "../type";
import tempSideBarMenuList from "../tempData/tempSideBarMenuList.json";
import { Action, Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as selectSideBarStore from "../store/selectSideBarStore";
import { initSelectSideBarMenu, sortSideBarMenuList } from "../util";

export default function Sidebar() {
  /*----- store -----*/
  const disPatchSelectSideBar: Dispatch<Action> = useDispatch();
  // 선택한 sideBar 카테고리, 메뉴 정보
  const selectSideBar: selectSideBarType = useSelector(
    selectSideBarStore.selectSideBar
  );

  /*----- 카테고리 목록 -----*/
  const sideBarMenuList: sideBarMenuListType[] = tempSideBarMenuList; // 사이드바 목록 (카테고리>메뉴)
  // 정렬 방식
  const [sideBarMenuListSortOrder, setSideBarMenuListSortOrder] =
    useState<sideBarMenuListSortOrderType>("menuName");

  // 정렬된 사이드바 목록
  const arrangeSideBarMenuList = useMemo<sideBarMenuListType[]>(() => {
    // 복사본 생성
    const copySideBarMenuList: sideBarMenuListType[] = [...sideBarMenuList];

    // 정렬
    switch (sideBarMenuListSortOrder) {
      // 메뉴이름 순서로 정렬
      case "menuName": {
        sortSideBarMenuList("menuName", copySideBarMenuList);
        break;
      }
      // 오름차순으로 정렬
      case "ascending": {
        sortSideBarMenuList("ascending", copySideBarMenuList);
        break;
      }
      // 내림차순으로 정렬
      case "descending": {
        sortSideBarMenuList("descending", copySideBarMenuList);
        break;
      }
    }

    return copySideBarMenuList;
  }, [sideBarMenuList, sideBarMenuListSortOrder]);

  /*----- 카테고리, 메뉴 열기 -----*/
  const [allCategoryOpen, setAllCategoryOpen] = useState<boolean>(false); // 전체 카테고리 open 여부

  // open 카테고리 초기값
  const initCategoryOpen = useMemo<categoryOpenType[]>(() => {
    return sideBarMenuList.map((el: sideBarMenuListType) => {
      return { category: el.category.categoryName, open: false };
    });
  }, [sideBarMenuList]);

  // 각 카테고리 open 여부
  const [openCategory, setOpenCategory] =
    useState<categoryOpenType[]>(initCategoryOpen);

  // 전체 카테고리별 open 여부 체크 후 버튼 변경
  const checkAllCategoryOpen = useCallback((category: categoryOpenType[]) => {
    // open 카테고리 수 체크
    let openCategoryCnt: number = 0;
    for (let i: number = 0; i < category.length; i++) {
      if (category[i].open !== true) {
        continue;
      }
      openCategoryCnt++;
    }
    // 모두 열렸을 경우에만 버튼(카테고리 닫기)으로 변경
    if (openCategoryCnt === category.length) {
      setAllCategoryOpen(true);
    } else {
      setAllCategoryOpen(false);
    }
  }, []);

  // 카테고리 클릭시 열기
  const onCategoryItemClick = useCallback(
    (index: number) => {
      // open 여부 변경
      const arrangeOpenCategory: categoryOpenType[] = [...openCategory].map(
        (el: categoryOpenType, i: number) => {
          if (i === index) {
            return { ...el, open: !el.open };
          } else {
            return el;
          }
        }
      );

      // 클릭한 카테고리의 open 여부 변경
      setOpenCategory(arrangeOpenCategory);

      // 전체 카테고리 open 여부 체크후 버튼 변경
      checkAllCategoryOpen(arrangeOpenCategory);
    },
    [checkAllCategoryOpen, openCategory]
  );

  // 메뉴 클릭시 store 저장
  const onMenuItemClick = useCallback(
    (category: categoryType, menu: menuType) => {
      disPatchSelectSideBar(
        selectSideBarStore.setSelectSideBar({ category, menu })
      );
    },
    [disPatchSelectSideBar]
  );

  /*----- 셋팅 아이콘 -----*/
  const [openMenuSetting, setOpenMenuSetting] = useState<boolean>(false); // 설정버튼 하위 메뉴 open 여부
  const menuSettingIcon = useRef(null); // 설정버튼 아이콘 ref

  // 버튼(홈) 클릭시
  const onHomeBtnClick = useCallback(() => {
    disPatchSelectSideBar(
      selectSideBarStore.setSelectSideBar(initSelectSideBarMenu)
    );
  }, [disPatchSelectSideBar]);

  // 버튼(설정)의 메뉴 클릭시
  const onMenuSettingBtnClick = useCallback(() => {
    setOpenMenuSetting((prev: boolean) => !prev);
  }, []);

  // 버튼(카테고리 모두열기) 클릭시
  const onListAllOpenBtnClick = useCallback(() => {
    // 카테고리 모두열기 목록
    const allCategoryOpenList: categoryOpenType[] = sideBarMenuList.map(
      (el: sideBarMenuListType) => {
        return { category: el.category.categoryName, open: !allCategoryOpen };
      }
    );
    setOpenCategory(allCategoryOpenList);
    setAllCategoryOpen(!allCategoryOpen);
  }, [allCategoryOpen, sideBarMenuList]);

  /*----- 카테고리 타이틀 영역 아이콘 -----*/
  const subheaderIcons = useMemo<subheaderIconsType[]>(() => {
    return [
      { icon: <Home />, description: "홈", onClick: onHomeBtnClick },
      {
        icon: (
          <>
            <Settings ref={menuSettingIcon} />
            <Menu open={openMenuSetting} anchorEl={menuSettingIcon.current}>
              <MenuItem
                onClick={() => {
                  setSideBarMenuListSortOrder("menuName");
                }}
              >{`메뉴이름 (가나다)`}</MenuItem>
              <MenuItem
                onClick={() => {
                  setSideBarMenuListSortOrder("ascending");
                }}
              >{`순서(오름차순)`}</MenuItem>
              <MenuItem
                onClick={() => {
                  setSideBarMenuListSortOrder("descending");
                }}
              >{`순서(내림차순)`}</MenuItem>
            </Menu>
          </>
        ),
        description: "설정",
        onClick: onMenuSettingBtnClick,
      },
      {
        icon: allCategoryOpen ? (
          <KeyboardDoubleArrowUp />
        ) : (
          <KeyboardDoubleArrowDown />
        ),
        description: "카테고리 열기",
        onClick: onListAllOpenBtnClick,
      },
    ];
  }, [
    allCategoryOpen,
    onHomeBtnClick,
    onListAllOpenBtnClick,
    onMenuSettingBtnClick,
    openMenuSetting,
  ]);

  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: 300,
        bgcolor: "secondary.main",
      }}
    >
      {/* 카테고리, 메뉴 wrapper */}
      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "secondary.main",
          color: "custom.text",
          // overflow: "auto", // 세로길이가 작을경우 카테고리영역이 스크롤과 같이 내려감
        }}
        component="nav"
        subheader={
          // 카테고리 타이틀 영역
          <ListSubheader
            component="div"
            sx={{
              textAlign: "center",
              bgcolor: "secondary.main",
              color: "custom.text",
            }}
          >
            {/* 타이틀 영역*/}
            <Typography sx={{ fontSize: 25, fontWeight: "bold", p: 3 }}>
              sidebar
            </Typography>

            {/* 아이콘 영역*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {/* 아이콘 */}
              {subheaderIcons.map((el: subheaderIconsType) => {
                return (
                  <IconButton
                    sx={{
                      bgcolor: "custom.main",
                      width: 25,
                      height: 25,
                      borderRadius: 2,
                      m: 0.5,
                    }}
                    onClick={el.onClick ? el.onClick : undefined}
                    key={el.description}
                  >
                    {el.icon}
                  </IconButton>
                );
              })}
            </Box>
          </ListSubheader>
        }
      >
        {/* 카테고리 & 메뉴 내용 */}
        {arrangeSideBarMenuList.map((el: sideBarMenuListType, i: number) => {
          return (
            <Box key={el.category.categoryCode}>
              {/* 카테고리 */}
              <ListItemButton
                onClick={() => onCategoryItemClick(i)}
                sx={{
                  padding: 1,
                }}
              >
                {/* 카테고리 아이콘 */}
                <ListItemIcon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    color:
                      selectSideBar.category?.categoryCode ===
                      el.category.categoryCode
                        ? "primary.main"
                        : alpha("#2E4F4F", 0.2), // primary.main
                  }}
                >
                  {/* 카테고리 아이콘 구분 */}
                  {el.category.categoryName.includes("사진") && <Photo />}
                  {el.category.categoryName.includes("일반") && <Article />}
                  {el.category.categoryName.includes("관리자") && <Monitor />}
                </ListItemIcon>

                {/* 카테고리 내용 */}
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {el.category.categoryName}
                    </Typography>
                  }
                />
                {openCategory[i].open ? <ArrowDropDown /> : <ArrowDropUp />}
              </ListItemButton>

              {/* 메뉴 영역 */}
              <Collapse
                in={openCategory[i].open}
                timeout="auto"
                unmountOnExit
                sx={{ pl: 5 }}
              >
                {/* 메뉴 */}
                <List component="div" disablePadding>
                  {el.menu.map((menu: menuType) => {
                    return (
                      // 메뉴 아이콘
                      <ListItemButton
                        sx={{
                          padding: 1,
                          pl: 3,
                          bgcolor:
                            selectSideBar.menu?.menuCode === menu.menuCode
                              ? alpha("#000", 0.2)
                              : "unset",
                        }}
                        key={menu.menuCode}
                        onClick={() => onMenuItemClick(el.category, menu)}
                      >
                        {/* 메뉴 내용 */}
                        <ListItemText primary={menu.menuName} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Paper>
  );
}
