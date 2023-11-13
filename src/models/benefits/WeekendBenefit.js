import PROMOTION_THRESHOLD from '../../utils/constants/number.js';
import Benefit from './Benefit.js';

class WeekendBenefit extends Benefit {
  static title = '주말 할인';

  static discountIncrement = -2023;

  static discountCategory = '메인';

  static weekends = [5, 6];

  #result = {
    title: WeekendBenefit.title,
    isApplied: false,
    benefitAmount: 0,
  };

  #isWeekday(date) {
    return WeekendBenefit.weekends.includes(date.getDay());
  }

  #calculateDiscount(orders) {
    return (
      orders
        .map(item =>
          item.getCountIfCategoryMatches(WeekendBenefit.discountCategory),
        )
        .reduce((total, count) => total + count, 0) *
      WeekendBenefit.discountIncrement
    );
  }

  #checkBenefitAvailability(reservation) {
    return reservation.totalPrice >= PROMOTION_THRESHOLD;
  }

  apply(reservation) {
    if (
      this.#checkBenefitAvailability(reservation) &&
      this.#isWeekday(reservation.date)
    ) {
      this.#result.isApplied = true;
      this.#result.benefitAmount = this.#calculateDiscount(reservation.orders);
    }
    return this.#result;
  }
}

export default WeekendBenefit;
