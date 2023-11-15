import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import PromotionController from '../../src/controllers/PromotionController';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = logSpy => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach(log => {
    expect(received).toContain(log);
  });
};

describe('PromotionController - PromotionService - View 통합 테스트', () => {
  let controller;

  beforeEach(() => {
    controller = new PromotionController();
  });

  it('예제 입력값에 대한 출력 테스트', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['3', '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1']);

    await controller.run();

    const expected = [
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      '12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '티본스테이크 1개',
      '바비큐립 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '<할인 전 총주문 금액>',
      '142,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -1,200원',
      '평일 할인: -4,046원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-31,246원',
      '<할인 후 예상 결제 금액>',
      '135,754원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  it('예제 입력값에 대한 출력 테스트: 금액 부족으로 인한 할인 미적용', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['26', '타파스-1,제로콜라-1']);

    await controller.run();

    const expected = [
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '타파스 1개',
      '제로콜라 1개',
      '<할인 전 총주문 금액>',
      '8,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '없음',
      '<총혜택 금액>',
      '0원',
      '<할인 후 예상 결제 금액>',
      '8,500원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  it('예제 입력값에 대한 출력 테스트: 할인 조건 미충족으로 인한 할인 미적용', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['29', '타파스-1,제로콜라-1,초코케이크-1']);

    await controller.run();

    const expected = [
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      '12월 29일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '타파스 1개',
      '제로콜라 1개',
      '초코케이크 1개',
      '<할인 전 총주문 금액>',
      '23,500원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '없음',
      '<총혜택 금액>',
      '0원',
      '<할인 후 예상 결제 금액>',
      '23,500원',
      '<12월 이벤트 배지>',
      '없음',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  it('예제 입력값에 대한 출력 테스트: 특별 할인 미적용, 주말 할인 적용', async () => {
    const logSpy = getLogSpy();
    mockQuestions([
      '15',
      '양송이수프-1,타파스-1,티본스테이크-1,크리스마스파스타-1,아이스크림-1,초코케이크-1,레드와인-1,샴페인-1',
    ]);

    await controller.run();

    const expected = [
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      '12월 15일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '양송이수프 1개',
      '타파스 1개',
      '티본스테이크 1개',
      '크리스마스파스타 1개',
      '아이스크림 1개',
      '초코케이크 1개',
      '레드와인 1개',
      '샴페인 1개',
      '<할인 전 총주문 금액>',
      '196,500원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -2,400원',
      '주말 할인: -4,046원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '31,446원',
      '<할인 후 예상 결제 금액>',
      '190,054원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  it('예제 입력값에 대한 출력 테스트: 이벤트 뱃지 - 트리', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['28', '초코케이크-5']);

    await controller.run();

    const expected = [
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      '12월 28일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '초코케이크 5개',
      '<할인 전 총주문 금액>',
      '75,000원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '평일 할인: -10,115원',
      '<총혜택 금액>',
      '-10,115원',
      '<할인 후 예상 결제 금액>',
      '64,885원',
      '<12월 이벤트 배지>',
      '트리',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  it('예제 입력값에 대한 출력 테스트: 이벤트 뱃지 - 별', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['28', '초코케이크-3']);

    await controller.run();

    const expected = [
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      '12월 28일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
      '<주문 메뉴>',
      '초코케이크 3개',
      '<할인 전 총주문 금액>',
      '45,000원',
      '<증정 메뉴>',
      '없음',
      '<혜택 내역>',
      '평일 할인: -6,069원',
      '<총혜택 금액>',
      '-6,069원',
      '<할인 후 예상 결제 금액>',
      '38,931원',
      '<12월 이벤트 배지>',
      '별',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });
});
