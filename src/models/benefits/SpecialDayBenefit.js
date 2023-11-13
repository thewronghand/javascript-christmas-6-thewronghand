import PROMOTION_THRESHOLD from '../../utils/constants/number.js';
import Benefit from './Benefit.js';

class SpecialDayBenefit extends Benefit {
  static title = '특별 할인';

  static discountIncrement = -1000;

  static specialDays = [3, 10, 17, 24, 25, 31];

  #result = {
    title: SpecialDayBenefit.title,
    isApplied: false,
    benefitAmount: 0,
  };

  #checkBenefitAvailability(reservation) {
    return reservation.totalPrice >= PROMOTION_THRESHOLD;
  }

  apply(reservation) {
    if (
      this.#checkBenefitAvailability(reservation) &&
      SpecialDayBenefit.specialDays.includes(reservation.date.getDate())
    ) {
      this.#result.isApplied = true;
      this.#result.benefitAmount += SpecialDayBenefit.discountIncrement;
    }
    return this.#result;
  }
}

export default SpecialDayBenefit;
