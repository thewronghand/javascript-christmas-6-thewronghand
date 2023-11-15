import { MENU } from '../../utils/constants/string';
import Benefit from './Benefit';

class WeekendBenefit extends Benefit {
  static title = '주말 할인';

  static discountIncrement = 2023;

  static discountCategory = MENU.menuCategories.main;

  static weekends = [5, 6];

  #result = {
    title: WeekendBenefit.title,
    isApplied: false,
    benefitAmount: 0,
    discountAmount: 0,
  };

  #isWeekend(date) {
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

  apply(reservation) {
    if (this.#isWeekend(reservation.date)) {
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

export default WeekendBenefit;
