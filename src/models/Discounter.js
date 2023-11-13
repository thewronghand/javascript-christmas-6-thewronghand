import MESSAGE from '../utils/constants/message.js';
import NUMBER from '../utils/constants/number.js';
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
    gifts: [],
    totalPriceBeforeDiscount: 0,
    totalBenefitAmount: 0,
    totalDiscountAmount: 0,
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
    this.#result.totalDiscountAmount = this.#sumDiscountAmount();
    this.#result.expectedTotalPrice =
      this.#result.totalPriceBeforeDiscount - this.#result.totalDiscountAmount;
  }

  #sumBenefitAmount() {
    const sum = this.#result.appliedBenefits.reduce(
      (total, current) => total + current.benefitAmount,
      0,
    );
    return sum;
  }

  #sumDiscountAmount() {
    const sum = this.#result.appliedBenefits.reduce(
      (total, current) => total + current.discountAmount,
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
  }

  #collectAllGiftItems(complimentaryBenefits) {
    return complimentaryBenefits.map(item => [
      item.giftItem.name,
      item.giftCount,
    ]);
  }

  #setEventBadge() {
    const badge = BADGES.find(
      ({ threshold, _badgeName }) =>
        this.#result.totalBenefitAmount >= threshold,
    );
    this.#result.eventBadge = badge.badgeName;
  }

  getDiscountResult() {
    return this.#result;
  }
}

export default Discounter;
