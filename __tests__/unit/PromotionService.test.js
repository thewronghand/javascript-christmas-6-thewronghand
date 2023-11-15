import CustomError from '../../src/errors/CustomError';
import Menu from '../../src/models/Menu';
import PromotionService from '../../src/models/PromotionService';

describe('PromotionService 클래스', () => {
  let promotionService;

  beforeEach(() => {
    promotionService = new PromotionService();
  });

  describe('setReservationDate 메서드', () => {
    it('잘못된 날짜가 입력되면 CustomError를 던진다', () => {
      expect(() => promotionService.setReservationDate(45)).toThrow(
        CustomError,
      );
    });

    it('올바른 날짜 입력 시 예외가 발생하지 않는다', () => {
      expect(() => promotionService.setReservationDate(24)).not.toThrow();
    });
  });

  describe('updateReservationWithOrders 메서드', () => {
    it('잘못된 메뉴 배열 입력 시 CustomError를 던진다', () => {
      const invalidOrders = [
        ['해산물파스타', 1],
        ['불닭볶음면', 1],
      ];
      expect(() =>
        promotionService.updateReservationWithOrders(invalidOrders),
      ).toThrow(CustomError);
    });

    it('올바른 메뉴 배열 입력 시 예외가 발생하지 않는다', () => {
      const validOrders = [
        ['해산물파스타', 1],
        ['샴페인', 1],
      ];
      expect(() =>
        promotionService.updateReservationWithOrders(validOrders),
      ).not.toThrow();
    });
  });

  describe('getReservationData 메서드', () => {
    it('예약 데이터를 올바르게 반환한다', () => {
      const date = 3;
      const orders = [
        ['티본스테이크', 1],
        ['바비큐립', 1],
        ['초코케이크', 2],
        ['제로콜라', 1],
      ];

      promotionService.setReservationDate(date);
      promotionService.updateReservationWithOrders(orders);

      const expectedResult = {
        date: new Date(2023, 11, 3),
        orders: orders.map(item => new Menu(item)),
        totalPrice: 142000,
      };

      const result = promotionService.getReservationData();

      expect(result).toEqual(expectedResult);
    });
  });
});
