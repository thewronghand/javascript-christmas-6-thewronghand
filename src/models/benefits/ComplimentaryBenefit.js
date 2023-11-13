import { MENU } from '../../utils/constants/string.js';
import Benefit from './Benefit.js';

class ComplimentaryBenefit extends Benefit {
  static title = '증정 이벤트';

  static giftItemName = '샴페인';

  static giftItem = MENU.menuItems.find(
    item => item.name === ComplimentaryBenefit.giftItemName,
  );

  static discountIncrement = -ComplimentaryBenefit.giftItem.price;

  static benefitThreshold = 120000;

  #result = {
    title: ComplimentaryBenefit.title,
    isApplied: false,
    benefitAmount: 0,
    discountAmount: 0,
    giftItem: undefined,
    giftCount: 0,
  };

  apply(reservation) {
    if (reservation.totalPrice >= ComplimentaryBenefit.benefitThreshold) {
      this.#result.isApplied = true;
      this.#result.benefitAmount += ComplimentaryBenefit.discountIncrement;
      this.#result.giftItem = ComplimentaryBenefit.giftItem;
      this.#result.giftCount += 1;
    }
    return this.#result;
  }
}

export default ComplimentaryBenefit;
