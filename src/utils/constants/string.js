import { EOL } from 'os';

const menuCategories = Object.freeze({
  appetizer: '애피타이저',
  main: '메인',
  dessert: '디저트',
  drink: '음료',
});

const menuItems = Object.freeze([
  { category: menuCategories.appetizer, name: '양송이수프', price: 6000 },
  { category: menuCategories.appetizer, name: '타파스', price: 5500 },
  { category: menuCategories.appetizer, name: '시저샐러드', price: 8000 },
  { category: menuCategories.main, name: '티본스테이크', price: 55000 },
  { category: menuCategories.main, name: '바비큐립', price: 54000 },
  { category: menuCategories.main, name: '해산물파스타', price: 35000 },
  { category: menuCategories.main, name: '크리스마스파스타', price: 25000 },
  { category: menuCategories.dessert, name: '초코케이크', price: 15000 },
  { category: menuCategories.dessert, name: '아이스크림', price: 5000 },
  { category: menuCategories.drink, name: '제로콜라', price: 3000 },
  { category: menuCategories.drink, name: '레드와인', price: 60000 },
  { category: menuCategories.drink, name: '샴페인', price: 25000 },
]);

const MENU = Object.freeze({
  menuCategories,
  menuItems,
});

const BADGES = Object.freeze(
  [
    { threshold: 20000, badgeName: '산타' },
    { threshold: 10000, badgeName: '트리' },
    { threshold: 5000, badgeName: '별' },
    { threshold: 0, badgeName: '없음' },
  ].sort((a, b) => b.threshold - a.threshold),
);

const SYMBOLS = Object.freeze({
  inputSeparator: ',',
  menuSeparator: '-',
  newLine: EOL,
});

export { MENU, BADGES, SYMBOLS };
