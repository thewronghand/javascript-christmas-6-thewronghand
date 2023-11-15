import PromotionService from '../../src/models/PromotionService';

describe('PromotionService - Discounter 통합 테스트', () => {
  let promotionService;

  beforeEach(() => {
    promotionService = new PromotionService();
  });

  it('예제 입력값을 통한 기능 테스트', () => {
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

  it('예제 입력값을 이용한 기능 테스트 : 할인 미적용', () => {
    promotionService.setReservationDate(26);
    const orders = [
      ['타파스', 1],
      ['제로콜라', 1],
    ];
    promotionService.updateReservationWithOrders(orders);

    const expectedResult = {
      gifts: [],
      totalPriceBeforeDiscount: 8500,
      totalBenefitAmount: 0,
      totalDiscountAmount: 0,
      expectedTotalPrice: 8500,
      appliedBenefits: [],
      eventBadge: '없음',
    };

    const result = promotionService.applyDiscounter();

    expect(result).toEqual(expectedResult);
  });
});
