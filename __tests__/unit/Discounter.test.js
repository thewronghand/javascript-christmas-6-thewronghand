import Discounter from '../../src/models/Discounter';
import Menu from '../../src/models/Menu';
import ComplimentaryBenefit from '../../src/models/benefits/ComplimentaryBenefit';
import DDayBenefit from '../../src/models/benefits/DDayBenefit';
import SpecialDayBenefit from '../../src/models/benefits/SpecialDayBenefit';
import WeekdayBenefit from '../../src/models/benefits/WeekdayBenefit';
import WeekendBenefit from '../../src/models/benefits/WeekendBenefit';

describe('Discounter 테스트', () => {
  it('기능 테스트', () => {
    const benefits = [
      new DDayBenefit(),
      new WeekdayBenefit(),
      new WeekendBenefit(),
      new SpecialDayBenefit(),
      new ComplimentaryBenefit(),
    ];

    const reservation = {
      date: new Date(2023, 11, 3),
      orders: [
        new Menu(['티본스테이크', 1]),
        new Menu(['바비큐립', 1]),
        new Menu(['초코케이크', 2]),
        new Menu(['제로콜라', 1]),
      ],
      totalPrice: 142000,
    };

    const discounter = new Discounter(benefits);
    discounter.applyAllBenefits(reservation);
    const result = discounter.getDiscountResult();
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

    expect(result).toEqual(expectedResult);
  });
});
