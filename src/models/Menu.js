import { MENU } from '../utils/constants/string';
import MenuValidator from '../utils/validators/MenuValidator';

class Menu {
  #name;

  #count;

  constructor([name, count]) {
    this.#validateMenuInput(name, count);
    this.#name = name;
    this.#count = count;
  }

  #validateMenuInput(name, count) {
    MenuValidator.validateMenuName(name);
    MenuValidator.validateMenuCount(count);
  }

  getMenuInfo() {
    const info = {
      menuName: this.#name,
      count: this.#count,
    };
    return info;
  }

  getPrice() {
    const menuItem = MENU.menuItems.find(item => item.name === this.#name);
    return menuItem ? menuItem.price * this.#count : 0;
  }

  getCategory() {
    const menuItem = MENU.menuItems.find(item => item.name === this.#name);
    return menuItem ? menuItem.category : '';
  }

  getCountIfCategoryMatches(category) {
    if (this.getCategory() === category) {
      return this.#count;
    }
    return 0;
  }
}

export default Menu;
