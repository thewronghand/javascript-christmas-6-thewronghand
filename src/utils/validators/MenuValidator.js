import CustomError from '../../errors/CustomError.js';
import ERROR from '../constants/error.js';
import { MENU } from '../constants/string.js';

const MenuValidator = {
  validateMenuName(menuName) {
    if (!MENU.menuItems.find(item => item.name === menuName)) {
      throw CustomError.menu(ERROR.invalidOrder);
    }
  },
  validateMenuCount(menuCount) {
    if (menuCount > 20) {
      throw CustomError.menu(ERROR.invalidOrder);
    }
  },
};

export default MenuValidator;
