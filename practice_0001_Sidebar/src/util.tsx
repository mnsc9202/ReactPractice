import {
  menuType,
  selectSideBarType,
  sideBarMenuListSortOrderType,
  sideBarMenuListType,
} from "./type";

// store 초기값
export const initSelectSideBarMenu: selectSideBarType = {
  category: null,
  menu: null,
};

// 카테고리 정렬
export function sortSideBarMenuList(
  type: sideBarMenuListSortOrderType,
  sideBarMenuList: sideBarMenuListType[]
) {
  sideBarMenuList.forEach((el: sideBarMenuListType) => {
    el.menu.sort((prevEl: menuType, nextEl: menuType) => {
      switch (type) {
        // 메뉴이름 순서로 정렬
        case "menuName": {
          if (prevEl.menuName > nextEl.menuName) {
            return 1;
          } else if (prevEl.menuName < nextEl.menuName) {
            return -1;
          } else {
            return 0;
          }
        }
        // 오름차순으로 정렬
        case "ascending": {
          if (prevEl.displayOrder > nextEl.displayOrder) {
            return 1;
          } else if (prevEl.displayOrder < nextEl.displayOrder) {
            return -1;
          } else {
            return 0;
          }
        }

        // 내림차순으로 정렬
        case "descending": {
          if (prevEl.displayOrder > nextEl.displayOrder) {
            return -1;
          } else if (prevEl.displayOrder < nextEl.displayOrder) {
            return 1;
          } else {
            return 0;
          }
        }

        default: {
          return 0;
        }
      }
    });
  });
}
