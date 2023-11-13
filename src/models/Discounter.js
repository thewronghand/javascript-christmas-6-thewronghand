import MESSAGE from '../utils/constants/message.js';
import NUMBER from '../utils/constants/number.js';
import { BADGES, SYMBOLS } from '../utils/constants/string.js';
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
    gifts: [],
    totalPriceBeforeDiscount: 0,
    totalBenefitAmount: 0,
    expectedTotalPrice: 0,
    appliedBenefits: [],
    eventBadge: MESSAGE.none,
  };

  constructor(reservation) {
    this.#result.totalPriceBeforeDiscount = reservation.totalPrice;
  }

  applyAllBenefits(reservation) {
    if (this.#result.totalPriceBeforeDiscount < NUMBER.benefitThreshold) {
      return;
    }
    this.#calculateDiscountResult(reservation);
    this.#setEventBadge();
    this.#setGiftResult();
  }

  #calculateDiscountResult(reservation) {
    const benefitsApplied = this.#benefits.map(item => item.apply(reservation));
    this.#result.appliedBenefits = benefitsApplied.filter(
      item => item.isApplied,
    );
    this.#result.totalBenefitAmount = this.#sumBenefitAmount();
    this.#result.expectedTotalPrice =
      this.#result.totalPriceBeforeDiscount + this.#result.totalBenefitAmount;
  }

  #sumBenefitAmount() {
    const sum = this.#result.appliedBenefits.reduce(
      (total, current) => total + current.benefitAmount,
      0,
    );
    return sum;
  }

  #setGiftResult() {
    const complimentaryBenefits = this.#result.appliedBenefits.filter(
      benefit => benefit.giftItem,
    );
    const gifts = this.#collectAllGiftItems(complimentaryBenefits);
    this.#result.gifts = gifts;
    const totalGiftPrice = this.#calculateTotalGiftPrice(complimentaryBenefits);
    this.#result.totalBenefitAmount -= totalGiftPrice;
  }

  #collectAllGiftItems(complimentaryBenefits) {
    return complimentaryBenefits.map(item => [
      item.giftItem.name,
      item.giftCount,
    ]);
  }

  #calculateTotalGiftPrice(complimentaryBenefits) {
    return complimentaryBenefits.reduce(
      (total, current) => total + current.giftItem.price * current.giftCount,
      0,
    );
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
