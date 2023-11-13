import Benefit from './Benefit.js';

class SpecialDayBenefit extends Benefit {
  static title = '특별 할인';

  static discountIncrement = 1000;

  static specialDays = [3, 10, 17, 24, 25, 31];

  #result = {
    title: SpecialDayBenefit.title,
    isApplied: false,
    benefitAmount: 0,
    discountAmount: 0,
  };

  apply(reservation) {
    if (SpecialDayBenefit.specialDays.includes(reservation.date.getDate())) {
      this.#updateResult();
    }
    return this.#result;
  }

  #updateResult() {
    this.#result.isApplied = true;
    this.#result.benefitAmount += SpecialDayBenefit.discountIncrement;
    this.#result.discountAmount = this.#result.benefitAmount;
  }
}

export default SpecialDayBenefit;
