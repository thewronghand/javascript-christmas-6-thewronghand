import MESSAGE from '../utils/constants/message.js';
import { SYMBOLS } from '../utils/constants/string.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class View {
  #inputView = InputView;

  #outputView = OutputView;

  async readDate() {
    const dateInput = await this.#inputView.readNaturalNumber(
      MESSAGE.read.dateInput,
    );
    return this.#parseNumberFromInput(dateInput);
  }

  #parseNumberFromInput(input) {
    return Number(input);
  }

  async readOrders() {
    const ordersInput = await this.#inputView.readMultipleStrings(
      MESSAGE.read.ordersInput,
    );
    return this.#parseArrayFromString(ordersInput);
  }

  #parseArrayFromString(string) {
    return string.split(SYMBOLS.inputSeparator).map(item => {
      const [menu, count] = item.split(SYMBOLS.menuSeparator);
      return [menu, Number(count)];
    });
  }

  printError(error) {
    this.#outputView.print(error.message);
  }

  printApplicationHeader() {
    this.#outputView.print(MESSAGE.header.application);
  }

  printPromotionHeader(date) {
    this.#outputView.print(
      MESSAGE.header.benefitAnnouncement(date) + SYMBOLS.newLine,
    );
  }

  printOrders(orders) {
    this.#outputView.print(MESSAGE.header.orders);
    const orderMessage = orders
      .map(item => item.getMenuMessage())
      .join(SYMBOLS.newLine);
    this.#outputView.print(orderMessage + SYMBOLS.newLine);
  }

  printTotalPrice(totalPrice) {
    this.#outputView.print(MESSAGE.header.totalPriceBeforeDiscount);
    this.#outputView.print(MESSAGE.format.price(totalPrice) + SYMBOLS.newLine);
  }

  printPromotionResult(result) {
    this.#printGiftMenu(result.gift);
    this.#printBenefitDetails(result.appliedBenefits);
    this.#printTotalBenefitAmount(result.totalBenefitAmount);
    this.#printExpectedTotalPrice(result.expectedTotalPrice);
    this.#printEventBadge(result.eventBadge);
  }

  #printGiftMenu(gift) {
    this.#outputView.print(MESSAGE.header.complimentaryMenu);
    this.#outputView.print(gift + SYMBOLS.newLine);
  }

  #parseBenefitDetailsMessage(appliedBenefits) {
    if (appliedBenefits.length === 0) {
      return '없음';
    }
    return appliedBenefits
      .map(item => `${item.title}: ${MESSAGE.format.price(item.benefitAmount)}`)
      .join(SYMBOLS.newLine);
  }

  #printBenefitDetails(appliedBenefits) {
    this.#outputView.print(MESSAGE.header.benefitDetails);
    const benefitMessage = this.#parseBenefitDetailsMessage(appliedBenefits);
    this.#outputView.print(benefitMessage + SYMBOLS.newLine);
  }

  #printTotalBenefitAmount(totalBenefitAmount) {
    this.#outputView.print(MESSAGE.header.totalBenefitAmount);
    this.#outputView.print(
      MESSAGE.format.price(totalBenefitAmount) + SYMBOLS.newLine,
    );
  }

  #printExpectedTotalPrice(expectedTotalPrice) {
    this.#outputView.print(MESSAGE.header.expectedPaymentAfterDiscount);
    this.#outputView.print(
      MESSAGE.format.price(expectedTotalPrice) + SYMBOLS.newLine,
    );
  }

  #printEventBadge(eventBadge) {
    this.#outputView.print(MESSAGE.header.eventBadge);
    this.#outputView.print(eventBadge);
  }
}

export default View;
