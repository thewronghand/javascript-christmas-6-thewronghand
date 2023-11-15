import CustomError from '../../../src/errors/CustomError';
import Menu from '../../../src/models/Menu';
import PromotionServiceValidator from '../../../src/utils/validators/PromotionServiceValidator';

describe('PromotionServiceValidator 테스트', () => {
  describe('validateDate 메서드', () => {
    const validDate = 25;
    const invalidDate = 34;

    it('유효한 날짜 입력에 예외를 던지지 않아야 한다', () => {
      expect(() =>
        PromotionServiceValidator.validateDate(validDate),
      ).not.toThrow();
    });

    it('범위를 벗어나는 날짜 입력에 CustomError를 던져야 한다', () => {
      expect(() => PromotionServiceValidator.validateDate(invalidDate)).toThrow(
        CustomError,
      );
    });
  });

  describe('validateOrderNameDuplicate 메서드', () => {
    const nonDuplicateMenuArray = [
      ['해산물파스타', 1],
      ['초코케이크', 1],
      ['샴페인', 1],
    ];
    const duplicateMenuArray = [
      ['해산물파스타', 1],
      ['초코케이크', 1],
      ['해산물파스타', 1],
    ];

    it('중복이 없는 메뉴 배열 입력에 예외를 던지지 않아야 한다', () => {
      expect(() =>
        PromotionServiceValidator.validateOrderNameDuplicate(
          nonDuplicateMenuArray,
        ),
      ).not.toThrow();
    });

    it('중복이 있는 메뉴 배열 입력에 CustomError를 던져야 한다', () => {
      expect(() =>
        PromotionServiceValidator.validateOrderNameDuplicate(
          duplicateMenuArray,
        ),
      ).toThrow(CustomError);
    });
  });

  describe('validateTotalOrderCount 메서드', () => {
    const validMenuArray = [
      ['해산물파스타', 5],
      ['초코케이크', 3],
      ['샴페인', 6],
    ];
    const invalidMenuArrayOverMax = [
      ['해산물파스타', 8],
      ['초코케이크', 8],
      ['샴페인', 8],
    ];
    const invalidMenuArrayUnderMin = [
      ['해산물파스타', 0],
      ['초코케이크', 0],
      ['샴페인', 0],
    ];

    it('갯수 총합이 20이 넘지 않는 메뉴 배열 입력에 예외를 던지지 않아야 한다', () => {
      expect(() =>
        PromotionServiceValidator.validateTotalOrderCount(validMenuArray),
      ).not.toThrow();
    });

    it('갯수 총합이 최대값을 넘는 메뉴 배열 입력에 CustomError를 던져야 한다', () => {
      expect(() =>
        PromotionServiceValidator.validateTotalOrderCount(
          invalidMenuArrayOverMax,
        ),
      ).toThrow(CustomError);
    });

    it('갯수 총합이 최소값 미만인 메뉴 배열 입력에 CustomError를 던져야 한다', () => {
      expect(() =>
        PromotionServiceValidator.validateTotalOrderCount(
          invalidMenuArrayUnderMin,
        ),
      ).toThrow(CustomError);
    });
  });

  describe('validateDrinkOnlyOrder 메서드', () => {
    const mixedMenuArray = [
      ['타파스', 3],
      ['샴페인', 6],
    ];
    const drinkOnlyMenuArray = [
      ['제로콜라', 3],
      ['샴페인', 6],
    ];

    it('음료만으로 구성되지 않은 주문에 예외를 던지지 않아야 한다', () => {
      const menus = mixedMenuArray.map(item => new Menu(item));
      expect(() =>
        PromotionServiceValidator.validateDrinkOnlyOrder(menus),
      ).not.toThrow();
    });

    it('음료만으로 구성된 주문에 CustomError를 던져야 한다', () => {
      const menus = drinkOnlyMenuArray.map(item => new Menu(item));
      expect(() =>
        PromotionServiceValidator.validateDrinkOnlyOrder(menus),
      ).toThrow(CustomError);
    });
  });
});
