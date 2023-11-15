import DATE from '../utils/constants/date';
import PromotionServiceValidator from '../utils/validators/PromotionServiceValidator';
import Discounter from './Discounter';
import Menu from './Menu';
import ComplimentaryBenefit from './benefits/ComplimentaryBenefit';
import DDayBenefit from './benefits/DDayBenefit';
import SpecialDayBenefit from './benefits/SpecialDayBenefit';
import WeekdayBenefit from './benefits/WeekdayBenefit';
import WeekendBenefit from './benefits/WeekendBenefit';

class PromotionService {
  #reservation = {
    date: DATE.defaultDate,
    orders: [],
    totalPrice: 0,
  };

  #discounter;

  #benefits = [
    new DDayBenefit(),
    new WeekdayBenefit(),
    new WeekendBenefit(),
    new SpecialDayBenefit(),
    new ComplimentaryBenefit(),
  ];

  #validateReservationDate(date) {
    PromotionServiceValidator.validateDate(date);
  }

  setReservationDate(date) {
    this.#validateReservationDate(date);
    this.#reservation.date = new Date(DATE.year, DATE.month, date);
  }

  #validateReservationOrders(orders, orderMenus) {
    PromotionServiceValidator.validateOrderNameDuplicate(orders);
    PromotionServiceValidator.validateTotalOrderCount(orders);
    PromotionServiceValidator.validateDrinkOnlyOrder(orderMenus);
  }

  updateReservationWithOrders(orders) {
    const orderMenus = this.#setUpOrdersFromInput(orders);
    this.#validateReservationOrders(orders, orderMenus);
    this.#reservation.orders = orderMenus;
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
    this.#discounter = new Discounter(
      this.#reservation.totalPrice,
      this.#benefits,
    );
    this.#discounter.applyAllBenefits(this.#reservation);
    return this.#discounter.getDiscountResult();
  }

  getReservationData() {
    return this.#reservation;
  }
}

export default PromotionService;
