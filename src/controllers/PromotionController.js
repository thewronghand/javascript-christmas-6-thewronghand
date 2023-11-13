import PromotionService from '../models/PromotionService.js';
import MESSAGE from '../utils/constants/message.js';
import View from '../views/View.js';

class PromotionController {
  #view = new View();

  #promotionService = new PromotionService();

  async run() {
    this.#view.printApplicationHeader();
    await this.#ensureDateInput();
    await this.#ensureOrdersInput();
    const data = this.#promotionService.getReservationData();
    this.#view.printPromotionHeader(data.date);
    this.#view.printOrders(data.orders);
    const result = this.#promotionService.applyDiscounter();
    this.#view.printTotalPrice(result.totalPriceBeforeDiscount);
    this.#view.printPromotionResult(result);
  }

  async #retryOnFailure(callBack) {
    try {
      return await callBack();
    } catch (error) {
      this.#view.printError(error);
      return this.#retryOnFailure(callBack);
    }
  }

  async #ensureDateInput() {
    await this.#retryOnFailure(async () => {
      const date = await this.#view.readDate();
      this.#promotionService.setReservationDate(date);
    });
  }

  async #ensureOrdersInput() {
    await this.#retryOnFailure(async () => {
      const orders = await this.#view.readOrders();
      this.#promotionService.setReservationOrders(orders);
    });
  }
}

export default PromotionController;
