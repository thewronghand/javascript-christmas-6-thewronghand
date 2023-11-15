import CustomError from '../../src/errors/CustomError';
import Menu from '../../src/models/Menu';

describe('Menu 클래스', () => {
  describe('인스턴스 생성', () => {
    it('유효한 메뉴 이름과 수량으로 인스턴스 생성이 가능하다', () => {
      const menu = new Menu(['샴페인', 2]);
      expect(menu).toBeDefined();
    });

    it('잘못된 메뉴 이름이 입력되면 CustomError를 던진다', () => {
      const invalidMenuNameInput = ['해물순두부찌개', 1];
      expect(() => new Menu(invalidMenuNameInput)).toThrow(CustomError);
    });

    it('잘못된 수량이 입력되면 CustomError를 던진다', () => {
      const invalidCountInput = ['샴페인', 25];
      expect(() => new Menu(invalidCountInput)).toThrow(CustomError);
    });
  });

  describe('메서드 테스트', () => {
    let menu;

    beforeAll(() => {
      menu = new Menu(['샴페인', 2]);
    });

    it('getMenuInfo 메서드는 메뉴 정보를 반환한다', () => {
      const info = menu.getMenuInfo();
      expect(info).toEqual({ menuName: '샴페인', count: 2 });
    });

    it('getPrice 메서드는 메뉴의 가격을 반환한다', () => {
      const price = menu.getPrice();
      expect(price).toEqual(50000);
    });

    it('getCategory 메서드는 메뉴의 카테고리를 반환한다', () => {
      const category = menu.getCategory();
      expect(category).toEqual('음료');
    });

    it('getCountIfCategoryMatches 메서드는 카테고리가 일치할 경우 수량을 반환한다', () => {
      const countWithCategoryMatch = menu.getCountIfCategoryMatches('음료');
      expect(countWithCategoryMatch).toEqual(2);
    });

    it('getCountIfCategoryMatches 메서드는 카테고리가 일치하지 않을 경우 0을 반환한다', () => {
      const countWithNoCategoryMatch = menu.getCountIfCategoryMatches('디저트');
      expect(countWithNoCategoryMatch).toEqual(0);
    });
  });
});
