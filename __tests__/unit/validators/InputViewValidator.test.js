import CustomError from '../../../src/errors/CustomError';
import InputViewValidator from '../../../src/utils/validators/InputViewValidator';

describe('InputViewValidator 테스트', () => {
  describe('isValidNaturalNumber 메서드', () => {
    const validInput = '3';
    const invalidInputs = ['', 'asdf', '-3', '3.5'];

    it.each([validInput])(
      '올바른 입력(%s)에 대해 예외를 던지지 말아야 한다',
      input => {
        expect(() =>
          InputViewValidator.isValidNaturalNumber(input),
        ).not.toThrow();
      },
    );

    it.each(invalidInputs)(
      '잘못된 입력(%s)에 대해 CustomError를 던져야 한다',
      input => {
        expect(() => InputViewValidator.isValidNaturalNumber(input)).toThrow(
          CustomError,
        );
      },
    );
  });

  describe('areValidMultipleStrings 메서드', () => {
    const validInputs = ['타파스-1', '해산물파스타-2,초코케이크-1'];
    const invalidInputs = [
      '',
      'asdf',
      '해산8물파7스5타-1',
      '해물파스타-한개',
      '해물파스타-5.5',
    ];

    it.each(validInputs)(
      '올바른 입력(%s)에 대해 예외를 던지지 말아야 한다',
      input => {
        expect(() =>
          InputViewValidator.areValidMultipleStrings(input),
        ).not.toThrow();
      },
    );

    it.each(invalidInputs)(
      '잘못된 입력(%s)에 대해 CustomError를 던져야 한다',
      input => {
        expect(() => InputViewValidator.areValidMultipleStrings(input)).toThrow(
          CustomError,
        );
      },
    );
  });
});
