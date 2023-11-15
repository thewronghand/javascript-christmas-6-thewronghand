import { Console } from '@woowacourse/mission-utils';
import { SYMBOLS } from '../utils/constants/string';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printWithNewLine(message) {
    Console.print(message + SYMBOLS.newLine);
  },
};

export default OutputView;
