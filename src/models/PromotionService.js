import DATE from '../utils/constants/date.js';
import PromotionServiceValidator from '../utils/validators/PromotionServiceValidator.js';
import Discounter from './Discounter.js';
import Menu from './Menu.js';

class PromotionService {
  #reservation = {
    date: new Date(DATE.year, DATE.month, 1),
    orders: [],
    totalPrice: 0,
  };

  #discounter;

  #validateReservationDate(date) {
    PromotionServiceValidator.validateDate(date);
  }

  setReservationDate(date) {
    this.#validateReservationDate(date);
    this.#reservation.date = new Date(DATE.year, DATE.month, date);
  }

  #validateReservationOrders(orders) {
    PromotionServiceValidator.validateOrderNameDuplicate(orders);
    PromotionServiceValidator.validateOrderTotalCount(orders);
  }

  setReservationOrders(orders) {
    this.#validateReservationOrders(orders);
    this.#reservation.orders = this.#setUpOrdersFromInput(orders);
    this.#updateTotalPrice();
  }

  #setUpOrdersFromInput(orders) {
    return orders.map(item => new Menu(item));
  }

  #updateTotalPrice() {
    this.#reservation.totalPrice = this.#reservation.orders
      .map(item => item.getPrice())
      .reduce((total, current) => total + current, 0);
  }

  applyDiscounter() {
    this.#discounter = new Discounter(this.#reservation);
    this.#discounter.applyAllBenefits(this.#reservation);
    return this.#discounter.getDiscountResult();
  }

  getReservationData() {
    return this.#reservation;
  }
}

export default PromotionService;
