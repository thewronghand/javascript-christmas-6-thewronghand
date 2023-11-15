import CustomError from '../../../src/errors/CustomError';
import MenuValidator from '../../../src/utils/validators/MenuValidator';

describe('MenuValidator 테스트', () => {
  describe('validateMenuName 메서드', () => {
    const validInput = '해산물파스타';
    const invalidInput = '해물비빔소스';

    it('올바른 메뉴 이름 입력에 예외를 던지지 않아야 한다', () => {
      expect(() => MenuValidator.validateMenuName(validInput)).not.toThrow();
    });

    it('메뉴판에 없는 메뉴 입력에 대해 CustomError를 던져야 한다', () => {
      expect(() => MenuValidator.validateMenuName(invalidInput)).toThrow(
        CustomError,
      );
    });
  });

  describe('validateMenuCount 메서드', () => {
    it.each([3])(
      '올바른 메뉴 갯수(%s) 입력에 예외를 던지지 않아야 한다',
      input => {
        expect(() => MenuValidator.validateMenuCount(input)).not.toThrow();
      },
    );

    it.each([25, 0])(
      '잘못된 메뉴 갯수(%s) 입력에 CustomError를 던져야 한다',
      input => {
        expect(() => MenuValidator.validateMenuCount(input)).toThrow(
          CustomError,
        );
      },
    );
  });
});
