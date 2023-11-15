import CustomError from '../../src/errors/CustomError';
import Menu from '../../src/models/Menu';

describe('Menu 테스트', () => {
  let menu;

  beforeAll(() => {
    menu = new Menu(['샴페인', 2]);
  });

  it('인스턴스 생성 시 잘못된 값이 입력되면 CustomError를 던진다.', () => {
    const invalidMenuNameInput = ['해물순두부찌개', 1];
    const invalidCountInput = ['샴페인', 25];

    expect(() => {
      new Menu(invalidMenuNameInput);
    }).toThrow(CustomError);
    expect(() => {
      new Menu(invalidCountInput);
    }).toThrow(CustomError);
  });

  it('getMenuInfo 메서드', () => {
    const info = menu.getMenuInfo();
    expect(info.menuName).toEqual('샴페인');
    expect(info.count).toEqual(2);
  });

  it('getPrice 메서드', () => {
    const price = menu.getPrice();
    expect(price).toEqual(50000);
  });

  it('getCategory 메서드', () => {
    const category = menu.getCategory();
    expect(category).toEqual('음료');
  });

  it('getCountIfCategoryMatches 메서드', () => {
    const countWithCategoryMatch = menu.getCountIfCategoryMatches('음료');
    const countWithNoCategoryMatch = menu.getCountIfCategoryMatches('디저트');
    expect(countWithCategoryMatch).toEqual(2);
    expect(countWithNoCategoryMatch).toEqual(0);
  });
});
