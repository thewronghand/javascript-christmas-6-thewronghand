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
    console.log(result);
    const expectedResult = {
      gifts: [{ category: '음료', name: '샴페인', price: 25000 }],
      totalPriceBeforeDiscount: 142000,
      totalBenefitAmount: 31246,
      totalDiscountAmount: 31246 - 25000,
      expectedTotalPrice: 135754,
      applyAllBenefits: Array(4),
      eventBadge: '산타',
    };

    expect(result.gifts.length).toEqual(expectedResult.gifts.length);
    expect(result.totalPriceBeforeDiscount).toEqual(
      expectedResult.totalPriceBeforeDiscount,
    );
    expect(result.totalBenefitAmount).toEqual(
      expectedResult.totalBenefitAmount,
    );
    expect(result.totalDiscountAmount).toEqual(
      expectedResult.totalDiscountAmount,
    );
    expect(result.expectedTotalPrice).toEqual(
      expectedResult.expectedTotalPrice,
    );
    expect(result.appliedBenefits.length).toEqual(
      expectedResult.applyAllBenefits.length,
    );
    expect(result.eventBadge).toEqual(expectedResult.eventBadge);
  });
});
