import {
  faArchive,
  faBroadcastTower,
  faCalendarAlt,
  faChevronRight,
  faCircleNotch,
  faFile,
  faFolder,
  faFolderOpen,
  faList,
  faListUl,
  faNewspaper,
  faSearch,
  faTag,
  faTimes,
  faFileLines,
  faTowerCell,
  faLink,
  faImage,
  faUsersCog,
  faBoxArchive,
  // faBriefcase,
  // faTags,
} from '@fortawesome/free-solid-svg-icons';

import {
  faRectangleHistory,
  faCircleS,
  faComputerClassic,
} from '@fortawesome/pro-solid-svg-icons';

import { faBriefcase, faTags } from '@fortawesome/pro-regular-svg-icons';
const icons = {
  faArchive,
  faBriefcase,
  faBroadcastTower,
  faCalendarAlt,
  faChevronRight,
  faCircleNotch,
  faFile,
  faFolder,
  faFolderOpen,
  faList,
  faListUl,
  faNewspaper,
  faSearch,
  faTag,
  faTags,
  faTimes,
  faComputerClassic,
  faFileLines,
  faTowerCell,
  faRectangleHistory,
  faLink,
  faImage,
  faUsersCog,
  faBoxArchive,
  faCircleS,
};

// this is used for utils.py GROUP_ICONS dict
const getIcon = name => {
  if (name in icons) {
    return icons[name];
  } else {
    return null;
  }
};

export { icons, getIcon };
