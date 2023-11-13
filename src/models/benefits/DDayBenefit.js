import DATE from '../../utils/constants/date.js';
import PROMOTION_THRESHOLD from '../../utils/constants/number.js';
import Benefit from './Benefit.js';

class DDayBenefit extends Benefit {
  static title = '크리스마스 디데이 할인';

  static initialDiscount = -1000;

  static incrementPerDay = -100;

  static msPerDay = 24 * 60 * 60 * 1000;

  static dDay = new Date(DATE.year, DATE.month, 25);

  #result = {
    title: DDayBenefit.title,
    isApplied: false,
    benefitAmount: 0,
  };

  #checkBenefitAvailability(reservation, daysUntilDDay) {
    return reservation.totalPrice >= PROMOTION_THRESHOLD && daysUntilDDay >= 0;
  }

  calculateDaysUntilDDay(date) {
    const daysUntilDDay = Math.floor(
      (DDayBenefit.dDay - date) / DDayBenefit.msPerDay,
    );
    return DDayBenefit.dDay.getDate() - 1 - daysUntilDDay;
  }

  calculateDiscountAmount(reservation, daysUntilDDay) {
    if (this.#checkBenefitAvailability(reservation, daysUntilDDay)) {
      return (
        DDayBenefit.initialDiscount +
        daysUntilDDay * DDayBenefit.incrementPerDay
      );
    }
    return 0;
  }

  apply(reservation) {
    const daysUntilDDay = this.calculateDaysUntilDDay(reservation.date);
    this.#result.isApplied = this.#checkBenefitAvailability(
      reservation,
      daysUntilDDay,
    );
    this.#result.benefitAmount = this.calculateDiscountAmount(
      reservation,
      daysUntilDDay,
    );
    return this.#result;
  }
}

export default DDayBenefit;
