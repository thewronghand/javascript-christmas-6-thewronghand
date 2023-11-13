import CustomError from '../../errors/CustomError.js';
import DATE from '../constants/date.js';
import ERROR from '../constants/error.js';

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
  validateOrderTotalCount(order) {
    const totalCount = order.reduce(
      (total, [_menuName, count]) => total + count,
      0,
    );
    if (totalCount > 20) {
      throw CustomError.promotionService(ERROR.invalidOrder);
    }
  },
};

export default PromotionServiceValidator;
