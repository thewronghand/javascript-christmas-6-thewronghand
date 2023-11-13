import PromotionService from '../models/PromotionService.js';
import View from '../views/View.js';

class PromotionController {
  #view = new View();

  #promotionService = new PromotionService();

  async run() {
    await this.#initializePromotionService();
    this.#displayReservationResult();
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
      this.#promotionService.updateReservationWithOrders(orders);
    });
  }

  async #initializePromotionService() {
    this.#view.printApplicationHeader();
    await this.#ensureDateInput();
    await this.#ensureOrdersInput();
  }

  #displayReservationResult() {
    const reservationData = this.#promotionService.getReservationData();
    this.#view.printPromotionHeader(reservationData.date);
    this.#view.printOrders(reservationData.orders);
    this.#displayPromotionResult();
  }

  #displayPromotionResult() {
    const result = this.#promotionService.applyDiscounter();
    this.#view.printTotalPrice(result.totalPriceBeforeDiscount);
    this.#view.printPromotionResult(result);
  }
}

export default PromotionController;
