import DATE from '../../utils/constants/date.js';
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
    discountAmount: 0,
  };

  calculateDaysUntilDDay(date) {
    const timeDiff = DDayBenefit.dDay.getTime() - date.getTime();
    const daysUntilDDay = Math.ceil(timeDiff / DDayBenefit.msPerDay);
    return daysUntilDDay;
  }

  calculateDiscountAmount(daysUntilDDay) {
    if (daysUntilDDay >= 0) {
      return (
        DDayBenefit.initialDiscount +
        (DDayBenefit.dDay.getDate() - daysUntilDDay - 1) *
          DDayBenefit.incrementPerDay
      );
    }
    return 0;
  }

  apply(reservation) {
    const daysUntilDDay = this.calculateDaysUntilDDay(reservation.date);
    if (daysUntilDDay >= 0) {
      this.#updateResult(daysUntilDDay);
    }
    return this.#result;
  }

  #updateResult(reservation, daysUntilDDay) {
    this.#result.isApplied = true;
    this.#result.benefitAmount = this.calculateDiscountAmount(
      reservation,
      daysUntilDDay,
    );
    this.#result.discountAmount = this.#result.benefitAmount;
  }
}

export default DDayBenefit;
