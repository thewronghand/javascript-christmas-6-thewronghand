class CustomError extends Error {
  static ERROR_PREFIX = '[ERROR]';

  constructor(message, name) {
    super(`${CustomError.ERROR_PREFIX} ${message}`);
    this.name = name || this.constructor.name;
  }

  static inputView(message) {
    return new CustomError(message, 'InputViewError');
  }

  static menu(message) {
    return new CustomError(message, 'MenuError');
  }

  static promotionService(message) {
    return new CustomError(message, 'PromotionServiceError');
  }

  static benefit(message) {
    return new CustomError(message, 'BenefitError');
  }
}

export default CustomError;
