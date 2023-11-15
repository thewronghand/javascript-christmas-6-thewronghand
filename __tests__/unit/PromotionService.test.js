import CustomError from '../../src/errors/CustomError';
import Menu from '../../src/models/Menu';
import PromotionService from '../../src/models/PromotionService';

describe('PromotionService 테스트', () => {
  let promotionService;

  beforeEach(() => {
    promotionService = new PromotionService();
  });

  describe('setReservationDate 메서드', () => {
    it('잘못된 날짜가 입력될 경우 CustomError를 던져야 한다.', () => {
      expect(() => {
        promotionService.setReservationDate(45);
      }).toThrow(CustomError);
    });

    it('올바른 입력의 경우 예외를 던지지 않아야 한다.', () => {
      expect(() => {
        promotionService.setReservationDate(24);
      }).not.toThrow();
    });
  });

  describe('updateReservationWithOrders 메서드', () => {
    it('잘못된 메뉴 배열이 입력될 경우 CustomError를 던져야 한다', () => {
      const orders = [
        ['해산물파스타', 1],
        ['불닭볶음면', 1],
      ];
      expect(() => {
        promotionService.updateReservationWithOrders(orders);
      }).toThrow(CustomError);
    });

    it('올바른 메뉴 배열이 입력될 경우 예외를 던지지 않아야 한다.', () => {
      const orders = [
        ['해산물파스타', 1],
        ['샴페인', 1],
      ];
      expect(() => {
        promotionService.updateReservationWithOrders(orders);
      }).not.toThrow();
    });
  });

  it('applyDiscounter 메서드', () => {
    promotionService.setReservationDate(3);
    const orders = [
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ];
    promotionService.updateReservationWithOrders(orders);

    const expectedResult = {
      gifts: [['샴페인', 1]],
      totalPriceBeforeDiscount: 142000,
      totalBenefitAmount: 31246,
      totalDiscountAmount: 31246 - 25000,
      expectedTotalPrice: 135754,
      appliedBenefits: [
        {
          title: '크리스마스 디데이 할인',
          isApplied: true,
          benefitAmount: 1200,
          discountAmount: 1200,
        },
        {
          title: '평일 할인',
          isApplied: true,
          benefitAmount: 4046,
          discountAmount: 4046,
        },
        {
          title: '특별 할인',
          isApplied: true,
          benefitAmount: 1000,
          discountAmount: 1000,
        },
        {
          title: '증정 이벤트',
          isApplied: true,
          benefitAmount: 25000,
          discountAmount: 0,
          giftItem: {
            category: '음료',
            name: '샴페인',
            price: 25000,
          },
          giftCount: 1,
        },
      ],
      eventBadge: '산타',
    };

    const result = promotionService.applyDiscounter();

    expect(result).toEqual(expectedResult);
  });

  it('getReservationData 메서드', () => {
    promotionService.setReservationDate(3);
    const orders = [
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ];
    promotionService.updateReservationWithOrders(orders);

    const expectedResult = {
      date: new Date(2023, 11, 3),
      orders: orders.map(item => new Menu(item)),
      totalPrice: 142000,
    };

    const result = promotionService.getReservationData();

    expect(result).toEqual(expectedResult);
  });
});
