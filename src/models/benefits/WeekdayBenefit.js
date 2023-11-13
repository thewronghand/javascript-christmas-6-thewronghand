import { MENU } from '../../utils/constants/string.js';
import Benefit from './Benefit.js';

class WeekdayBenefit extends Benefit {
  static title = '평일 할인';

  static discountIncrement = -2023;

  static discountCategory = MENU.menuCategories.dessert;

  static weekdays = [0, 1, 2, 3, 4];

  #result = {
    title: WeekdayBenefit.title,
    isApplied: false,
    benefitAmount: 0,
    discountAmount: 0,
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

  apply(reservation) {
    if (this.#isWeekday(reservation.date)) {
      this.#updateResult(reservation);
    }
    return this.#result;
  }

  #updateResult(reservation) {
    this.#result.benefitAmount = this.#calculateDiscount(reservation.orders);
    this.#result.discountAmount = this.#result.benefitAmount;
    this.#result.isApplied = this.#result.benefitAmount > 0;
  }
}

export default WeekdayBenefit;
