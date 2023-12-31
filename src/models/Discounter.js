import MESSAGE from '../utils/constants/message';
import NUMBER from '../utils/constants/number';
import { BADGES } from '../utils/constants/string';

class Discounter {
  #benefits;

  #result = {
    gifts: [],
    totalPriceBeforeDiscount: 0,
    totalBenefitAmount: 0,
    totalDiscountAmount: 0,
    expectedTotalPrice: 0,
    appliedBenefits: [],
    eventBadge: MESSAGE.none,
  };

  constructor(totalPrice, benefits) {
    this.#result.totalPriceBeforeDiscount = totalPrice;
    this.#result.expectedTotalPrice = totalPrice;
    this.#benefits = benefits;
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
    return this.#result.appliedBenefits.reduce(
      (total, current) => total + current.benefitAmount,
      0,
    );
  }

  #sumDiscountAmount() {
    return this.#result.appliedBenefits.reduce(
      (total, current) => total + current.discountAmount,
      0,
    );
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
      item => this.#result.totalBenefitAmount >= item.threshold,
    );
    this.#result.eventBadge = badge.badgeName;
  }

  getDiscountResult() {
    return this.#result;
  }
}

export default Discounter;
