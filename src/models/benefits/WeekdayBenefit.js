import PROMOTION_THRESHOLD from '../../utils/constants/number.js';
import Benefit from './Benefit.js';

class WeekdayBenefit extends Benefit {
  static title = '평일 할인';

  static discountIncrement = -2023;

  static discountCategory = '디저트';

  static weekdays = [0, 1, 2, 3, 4];

  #result = {
    title: WeekdayBenefit.title,
    isApplied: false,
    benefitAmount: 0,
  };

  #isWeekday(date) {
    return WeekdayBenefit.weekdays.includes(date.getDay());
  }

  #calculateDiscount(orders) {
    return (
      orders
        .map(item =>
          item.getCountIfCategoryMatches(WeekdayBenefit.discountCategory),
        )
        .reduce((total, count) => total + count, 0) *
      WeekdayBenefit.discountIncrement
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

export default WeekdayBenefit;
