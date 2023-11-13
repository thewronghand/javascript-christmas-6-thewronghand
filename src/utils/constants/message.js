const format = Object.freeze({
  menu: (menuName, count) => `${menuName} ${count}개`,
  number: number => number.toLocaleString('ko-KR'),
  price: number => `${format.number(number)}원`,
  date: date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}월 ${day}일`;
  },
});

const header = Object.freeze({
  application: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  benefitAnnouncement: date =>
    `${format.date(date)}에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orders: '<주문 메뉴>',
  totalPriceBeforeDiscount: '<할인 전 총주문 금액>',
  complimentaryMenu: '<증정 메뉴>',
  benefitDetails: '<혜택 내역>',
  totalBenefitAmount: '<총혜택 금액>',
  expectedPaymentAfterDiscount: '<할인 후 예상 결제 금액>',
  eventBadge: '<12월 이벤트 배지>',
});

const read = Object.freeze({
  dateInput:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
  ordersInput:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
});

const MESSAGE = {
  header,
  read,
  format,
  none: '없음',
};

export default MESSAGE;
