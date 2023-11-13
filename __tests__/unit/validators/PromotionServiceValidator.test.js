import CustomError from '../../../src/errors/CustomError';
import PromotionServiceValidator from '../../../src/utils/validators/PromotionServiceValidator';

describe('PromotionServiceValidator 테스트', () => {
  describe('validateDate 메서드', () => {
    it('유효한 날짜 입력에 예외를 던지지 않아야 한다', () => {
      const inputDate = 25;
      expect(() =>
        PromotionServiceValidator.validateDate(inputDate),
      ).not.toThrow();
    });

    it('범위를 벗어나는 날짜 입력에 CustomError를 던져야 한다.', () => {
      const inputDate = 34;
      expect(() => PromotionServiceValidator.validateDate(inputDate)).toThrow(
        CustomError,
      );
    });
  });

  describe('validateOrderNameDuplicate 메서드', () => {
    it('중복이 없는 메뉴 배열 입력에 예외를 던지지 않아야 한다', () => {
      const menuArray = [
        ['해산물파스타', 1],
        ['초코케이크', 1],
        ['샴페인', 1],
      ];
      expect(() =>
        PromotionServiceValidator.validateOrderNameDuplicate(menuArray),
      ).not.toThrow();
    });

    it('중복이 있는 메뉴 배열 입력에 CustomError를 던져야 한다.', () => {
      const menuArray = [
        ['해산물파스타', 1],
        ['초코케이크', 1],
        ['해산물파스타', 1],
      ];
      expect(() =>
        PromotionServiceValidator.validateOrderNameDuplicate(menuArray),
      ).toThrow(CustomError);
    });
  });

  describe('validateTotalOrderCount 메서드', () => {
    it('갯수 총합이 20이 넘지 않는 메뉴 배열 입력에 예외를 던지지 않아야 한다', () => {
      const menuArray = [
        ['해산물파스타', 5],
        ['초코케이크', 3],
        ['샴페인', 6],
      ];
      expect(() =>
        PromotionServiceValidator.validateTotalOrderCount(menuArray),
      ).not.toThrow();
    });

    it('갯수 총합이 20이 넘는 메뉴 배열 입력에 CustomError를 던져야 한다.', () => {
      const menuArray = [
        ['해산물파스타', 8],
        ['초코케이크', 8],
        ['샴페인', 8],
      ];
      expect(() =>
        PromotionServiceValidator.validateTotalOrderCount(menuArray),
      ).toThrow(CustomError);
    });
  });
});
