import { Console } from '@woowacourse/mission-utils';
import InputViewValidator from '../utils/validators/InputViewValidator.js';
import { SYMBOLS } from '../utils/constants/string.js';

const InputView = {
  async readNaturalNumber(queryMessage) {
    const userInput = await Console.readLineAsync(
      queryMessage + SYMBOLS.newLine,
    );
    InputViewValidator.isValidNaturalNumber(userInput);
    return userInput;
  },

  async readMultipleStrings(queryMessage) {
    const userInput = await Console.readLineAsync(
      queryMessage + SYMBOLS.newLine,
    );
    InputViewValidator.areValidMultipleStrings(userInput);
    return userInput;
  },
};

export default InputView;
