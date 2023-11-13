import CustomError from '../../../src/errors/CustomError';
import MenuValidator from '../../../src/utils/validators/MenuValidator';

describe('MenuValidator 테스트', () => {
  describe('validateMenuName 메서드', () => {
    it('올바른 메뉴 이름 입력에 예외를 던지지 않아야 한다.', () => {
      const input = '해산물파스타';
      expect(() => MenuValidator.validateMenuName(input)).not.toThrow();
    });

    it('메뉴판에 없는 메뉴 입력에 대해 CustomError를 던져야 한다.', () => {
      const input = '해물비빔소스';
      expect(() => MenuValidator.validateMenuName(input)).toThrow(CustomError);
    });
  });

  describe('validateMenuCount 테스트', () => {
    it('올바른 메뉴 갯수 입력에 예외를 던지지 않아야 한다.', () => {
      const input = 3;
      expect(() => MenuValidator.validateMenuCount(input)).not.toThrow();
    });

    it('20개를 초과하는 메뉴 입력에 CustomError를 던져야 한다.', () => {
      const input = 25;
      expect(() => MenuValidator.validateMenuCount(input)).toThrow(CustomError);
    });
  });
});
