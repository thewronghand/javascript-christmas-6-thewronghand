import CustomError from '../../errors/CustomError.js';
import ERROR from '../constants/error.js';

function validateInputLength(input, error) {
  if (!input.length) {
    throw CustomError.inputView(error);
  }
}

function validateIsNumber(input) {
  if (Number.isNaN(input)) {
    throw CustomError.inputView(ERROR.invalidDate);
  }
}

function validateNonNegativeValue(input) {
  if (input < 0) {
    throw CustomError.inputView(ERROR.invalidDate);
  }
}

function validateIsInteger(input) {
  if (!Number.isInteger(input)) {
    throw CustomError.inputView(ERROR.invalidDate);
  }
}

function validateOrderPattern(input) {
  const orderPattern = /^[a-zA-Z가-힣]+-\d+(,[a-zA-Z가-힣]+-\d+)*$/;
  if (!orderPattern.test(input)) {
    throw CustomError.inputView(ERROR.invalidOrder);
  }
}

function validateMenuNameCharacters(menu) {
  const validMenuNamePattern = /^[a-zA-Z가-힣\s]+$/;
  if (!validMenuNamePattern.test(menu)) {
    throw CustomError.inputView(ERROR.invalidOrder);
  }
}

function validateOrderName(menu) {
  validateInputLength(menu, ERROR.invalidOrder);
  validateMenuNameCharacters(menu);
}

function validateOrderQuantity(quantity) {
  validateInputLength(quantity, ERROR.invalidOrder);
  const quantityNumber = Number(quantity);
  validateIsNumber(quantityNumber);
  validateNonNegativeValue(quantityNumber);
  validateIsInteger(quantityNumber);
}

function validateSingleOrder(input) {
  const [menu, quantity] = input.split('-');
  validateOrderName(menu);
  validateOrderQuantity(quantity);
}

const InputViewValidator = {
  isValidNaturalNumber(input) {
    validateInputLength(input, ERROR.invalidDate);
    const number = Number(input);
    validateIsNumber(number);
    validateNonNegativeValue(number);
    validateIsInteger(number);
  },

  areValidMultipleStrings(input) {
    validateInputLength(input, ERROR.invalidOrder);
    const inputArray = input.split(',');
    inputArray.forEach(item => {
      validateOrderPattern(item);
      validateSingleOrder(item);
    });
  },
};

export default InputViewValidator;
