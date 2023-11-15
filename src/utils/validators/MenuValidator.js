import CustomError from '../../errors/CustomError';
import ERROR from '../constants/error';
import NUMBER from '../constants/number';
import { MENU } from '../constants/string';

const MenuValidator = {
  validateMenuName(menuName) {
    if (!MENU.menuItems.find(item => item.name === menuName)) {
      throw CustomError.menu(ERROR.invalidOrder);
    }
  },
  validateMenuCount(menuCount) {
    if (menuCount > NUMBER.maxMenuCount || menuCount < NUMBER.minMenuCount) {
      throw CustomError.menu(ERROR.invalidOrder);
    }
  },
};

export default MenuValidator;
