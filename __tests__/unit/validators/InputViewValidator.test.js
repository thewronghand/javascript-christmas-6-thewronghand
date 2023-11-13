import CustomError from '../../../src/errors/CustomError';
import InputViewValidator from '../../../src/utils/validators/InputViewValidator';

describe('InputViewValidator 테스트', () => {
  describe('isValidNaturalNumber 메서드', () => {
    it('올바른 입력에 대해 예외를 던지지 말아야 한다.', () => {
      const input = '3';
      expect(() =>
        InputViewValidator.isValidNaturalNumber(input),
      ).not.toThrow();
    });

    it('공백 입력에 대해 CustomError를 던져야 한다.', () => {
      const input = '';
      expect(() => InputViewValidator.isValidNaturalNumber(input)).toThrow(
        CustomError,
      );
    });

    it('숫자가 아닌 값에 대해 CustomError를 던져야 한다.', () => {
      const input = 'asdf';
      const number = Number(input);
      expect(() => InputViewValidator.isValidNaturalNumber(number)).toThrow(
        CustomError,
      );
    });

    it('음수인 값에 대해 CustomError를 던져야 한다.', () => {
      const input = '-3';
      const number = Number(input);
      expect(() => InputViewValidator.isValidNaturalNumber(number)).toThrow(
        CustomError,
      );
    });

    it('정수가 아닌 값에 대해 CustomError를 던져야 한다.', () => {
      const input = '3.5';
      const number = Number(input);
      expect(() => InputViewValidator.isValidNaturalNumber(number)).toThrow(
        CustomError,
      );
    });
  });

  describe('areValidMultipleStrings 메서드', () => {
    it('올바른 입력에 대해 예외를 던지지 말아야 한다.', () => {
      const singleInput = '타파스-1';
      const multipleInputs = '해산물파스타-2,초코케이크-1';
      expect(() =>
        InputViewValidator.areValidMultipleStrings(singleInput),
      ).not.toThrow();
      expect(() =>
        InputViewValidator.areValidMultipleStrings(multipleInputs),
      ).not.toThrow();
    });

    it('공백인 값에 대해 CustomError를 던져야 한다.', () => {
      const input = '';
      expect(() => InputViewValidator.areValidMultipleStrings(input)).toThrow(
        CustomError,
      );
    });

    it('주어진 형식에 맞지 않는 값에 CustomError를 던져야 한다.', () => {
      const input = 'asdf';
      expect(() => InputViewValidator.areValidMultipleStrings(input)).toThrow(
        CustomError,
      );
    });

    it('숫자가 포함된 메뉴 이름 입력에 CustomError를 던져야 한다.', () => {
      const input = '해산8물파7스5타-1';
      expect(() => InputViewValidator.areValidMultipleStrings(input)).toThrow(
        CustomError,
      );
    });

    it('숫자가 아닌 메뉴 갯수 입력에 CustomError를 던져야 한다.', () => {
      const input = '해물파스타-한개';
      expect(() => InputViewValidator.areValidMultipleStrings(input)).toThrow(
        CustomError,
      );
    });

    it('자연수가 아닌 메뉴 갯수 입력에 CustomError를 던져야 한다.', () => {
      const input = '해물파스타-5.5';
      expect(() => InputViewValidator.areValidMultipleStrings(input)).toThrow(
        CustomError,
      );
    });
  });
});
