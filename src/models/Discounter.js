import { BADGES } from '../utils/constants/string.js';
import ComplimentaryBenefit from './benefits/ComplimentaryBenefit.js';
import DDayBenefit from './benefits/DDayBenefit.js';
import SpecialDayBenefit from './benefits/SpecialDayBenefit.js';
import WeekdayBenefit from './benefits/WeekdayBenefit.js';
import WeekendBenefit from './benefits/WeekendBenefit.js';

class Discounter {
  #benefits = [
    new DDayBenefit(),
    new WeekdayBenefit(),
    new WeekendBenefit(),
    new SpecialDayBenefit(),
    new ComplimentaryBenefit(),
  ];

  #result = {
    gift: '없음',
    totalPriceBeforeDiscount: 0,
    totalBenefitAmount: 0,
    expectedTotalPrice: 0,
    appliedBenefits: [],
    eventBadge: '없음',
  };

  constructor(reservation) {
    this.#result.totalPriceBeforeDiscount = reservation.totalPrice;
  }

  applyAllBenefits(reservation) {
    const benefitsApplied = this.#benefits.map(item => item.apply(reservation));
    this.#result.appliedBenefits = benefitsApplied.filter(
      item => item.isApplied,
    );
    this.#result.totalBenefitAmount = this.#sumBenefitAmount();
    this.#result.expectedTotalPrice =
      this.#result.totalPriceBeforeDiscount + this.#result.totalBenefitAmount;
    this.#setEventBadge();
    this.#setGiftResult();
  }

  #sumBenefitAmount() {
    const sum = this.#result.appliedBenefits.reduce(
      (total, current) => total + current.benefitAmount,
      0,
    );
    return sum;
  }

  #setGiftResult() {
    const complimentaryBenefit = this.#result.appliedBenefits.find(
      benefit => benefit.giftItem,
    );

    if (complimentaryBenefit) {
      this.#result.gift = `${complimentaryBenefit.giftItem.name} ${complimentaryBenefit.giftCount}개`;
      this.#result.totalBenefitAmount -= complimentaryBenefit.giftItem.price;
    }
  }

  #setEventBadge() {
    const totalBenefitAbsolute = Math.abs(this.#result.totalBenefitAmount);
    const badge = BADGES.find(
      ({ threshold, _badgeName }) => totalBenefitAbsolute >= threshold,
    );
    this.#result.eventBadge = badge.badgeName;
  }

  getDiscountResult() {
    return this.#result;
  }
}

export default Discounter;
