import CustomError from '../../src/errors/CustomError';
import Menu from '../../src/models/Menu';
import Benefit from '../../src/models/benefits/Benefit';
import ComplimentaryBenefit from '../../src/models/benefits/ComplimentaryBenefit';
import DDayBenefit from '../../src/models/benefits/DDayBenefit';
import SpecialDayBenefit from '../../src/models/benefits/SpecialDayBenefit';
import WeekdayBenefit from '../../src/models/benefits/WeekdayBenefit';
import WeekendBenefit from '../../src/models/benefits/WeekendBenefit';

describe('Benefit 추상 클래스 테스트', () => {
  it('인스턴스 생성 시 CustomError를 던져야 한다', () => {
    expect(() => new Benefit()).toThrow(CustomError);
  });
});

describe('Benefit 서브클래스 테스트', () => {
  describe('ComplimentaryBenefit 테스트', () => {
    it('조건이 일치할 때의 결과 예상', () => {
      const benefit = new ComplimentaryBenefit();
      const reservation = {
        totalPrice: 150000,
      };
      const expectedResult = {
        isApplied: true,
        benefitAmount: 25000,
        discountAmount: 0,
        giftItem: { category: '음료', name: '샴페인', price: 25000 },
        giftCount: 1,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.giftItem.name).toEqual(expectedResult.giftItem.name);
      expect(result.giftCount).toEqual(expectedResult.giftCount);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });

    it('조건이 일치하지 않을 때의 결과 예상', () => {
      const benefit = new ComplimentaryBenefit();
      const reservation = {
        totalPrice: 15000,
      };
      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
        giftCount: 0,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.giftCount).toEqual(expectedResult.giftCount);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });
  });

  describe('DDayBenefit 테스트', () => {
    it('조건이 일치할 때의 결과 예상 : 시작값', () => {
      const benefit = new DDayBenefit();
      const reservation = {
        date: new Date(2023, 11, 3),
      };
      const expectedResult = {
        isApplied: true,
        benefitAmount: 1200,
        discountAmount: 1200,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });

    it('조건이 일치할 때의 결과 예상 : 경계값', () => {
      const benefit = new DDayBenefit();
      const reservation = {
        date: new Date(2023, 11, 25),
      };
      const expectedResult = {
        isApplied: true,
        benefitAmount: 3400,
        discountAmount: 3400,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });

    it('조건이 일치하지 않을 때의 결과 예상', () => {
      const benefit = new DDayBenefit();
      const reservation = {
        date: new Date(2023, 11, 28),
      };
      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });
  });

  describe('SpecialDayBenefit 테스트', () => {
    it('조건이 일치할 때의 결과 예상', () => {
      const benefit = new SpecialDayBenefit();
      const reservation = {
        date: new Date(2023, 11, 3),
      };
      const expectedResult = {
        isApplied: true,
        benefitAmount: 1000,
        discountAmount: 1000,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });

    it('조건이 일치하지 않을 때의 결과 예상', () => {
      const benefit = new SpecialDayBenefit();
      const reservation = {
        date: new Date(2023, 11, 2),
      };
      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
      };

      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });
  });

  describe('WeekdayBenefit 테스트', () => {
    it('조건이 일치할 때의 결과 예상', () => {
      const benefit = new WeekdayBenefit();
      const reservation = {
        date: new Date(2023, 11, 13),
        orders: [new Menu(['해산물파스타', 1]), new Menu(['초코케이크', 2])],
      };

      const expectedResult = {
        isApplied: true,
        benefitAmount: 4046,
        discountAmount: 4046,
      };
      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });

    it('조건이 일치하지 않을 때의 결과 예상', () => {
      const benefit = new WeekdayBenefit();
      const reservation = {
        date: new Date(2023, 11, 8),
        orders: [new Menu(['해산물파스타', 1]), new Menu(['초코케이크', 2])],
      };

      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
      };
      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });

    it('조건이 일치하지만 적용가능한 할인이 없을 때의 결과 예상', () => {
      const benefit = new WeekdayBenefit();
      const reservation = {
        date: new Date(2023, 11, 13),
        orders: [new Menu(['해산물파스타', 1]), new Menu(['샴페인', 2])],
      };

      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
      };
      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
      expect(result.discountAmount).toEqual(expectedResult.discountAmount);
    });
  });

  describe('WeekendBenefit 테스트', () => {
    it('조건이 일치할 때의 결과 예상', () => {
      const benefit = new WeekendBenefit();
      const reservation = {
        date: new Date(2023, 11, 8),
        orders: [new Menu(['해산물파스타', 1]), new Menu(['초코케이크', 2])],
      };

      const expectedResult = {
        isApplied: true,
        benefitAmount: 2023,
        discountAmount: 2023,
      };
      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
    });

    it('조건이 일치하지 않을 때의 결과 예상', () => {
      const benefit = new WeekendBenefit();
      const reservation = {
        date: new Date(2023, 11, 3),
        orders: [new Menu(['해산물파스타', 1]), new Menu(['초코케이크', 2])],
      };

      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
      };
      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
    });

    it('조건이 일치하지만 적용가능한 할인이 없을 때의 결과 예상', () => {
      const benefit = new WeekendBenefit();
      const reservation = {
        date: new Date(2023, 11, 8),
        orders: [new Menu(['샴페인', 1]), new Menu(['초코케이크', 2])],
      };

      const expectedResult = {
        isApplied: false,
        benefitAmount: 0,
        discountAmount: 0,
      };
      const result = benefit.apply(reservation);
      expect(result.isApplied).toEqual(expectedResult.isApplied);
      expect(result.benefitAmount).toEqual(expectedResult.benefitAmount);
    });
  });
});
