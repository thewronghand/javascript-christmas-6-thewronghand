import CustomError from '../../errors/CustomError.js';
import DATE from '../constants/date.js';
import ERROR from '../constants/error.js';
import NUMBER from '../constants/number.js';
import { MENU } from '../constants/string.js';

const PromotionServiceValidator = {
  validateDate(date) {
    if (date > DATE.dayEnd || date < DATE.dayStart) {
      throw CustomError.promotionService(ERROR.invalidDate);
    }
  },

  validateOrderNameDuplicate(order) {
    const names = order.map(([menuName, _count]) => menuName);
    if (new Set(names).size !== names.length) {
      throw CustomError.promotionService(ERROR.invalidOrder);
    }
  },

  validateTotalOrderCount(order) {
    const totalCount = order.reduce(
      (total, [_menuName, count]) => total + count,
      0,
    );
    if (totalCount > NUMBER.maxMenuCount || totalCount < NUMBER.minMenuCount) {
      throw CustomError.promotionService(ERROR.invalidOrder);
    }
  },

  validateDrinkOnlyOrder(orderMenus) {
    const categories = orderMenus.map(item => item.getCategory());
    if (categories.every(item => item === MENU.menuCategories.drink)) {
      throw CustomError.promotionService(ERROR.invalidOrder);
    }
  },
};

export default PromotionServiceValidator;
