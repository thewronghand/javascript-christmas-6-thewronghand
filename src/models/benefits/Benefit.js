import CustomError from '../../errors/CustomError';
import ERROR from '../../utils/constants/error';

class Benefit {
  constructor() {
    if (this.constructor === Benefit) {
      throw CustomError.benefit(ERROR.abstractClassInitiation);
    }
  }

  apply(reservation) {
    throw CustomError.benefit(ERROR.abstractClassInitiation);
  }
}

export default Benefit;
