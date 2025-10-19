import App from "../src/App.js";
import { PROMPT_START_MESSAGE } from "../src/util/const/index.js";

import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLineAsyncSpy = () => {
  const lineSpy = jest.spyOn(MissionUtils.Console, "readLineAsync");
  lineSpy.mockClear();
  return lineSpy;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("문자열 계산기 기능", () => {
  test('문자 입력, 기본 상태 메시지 출력', async () => {
    // keeping Jest from exiting error: 입력 유지 해제 목적
    const inputs = [" "];
    mockQuestions(inputs);

    const lineSpy = getLineAsyncSpy();

    const app = new App();
    await app.readLine()

    expect(lineSpy).toHaveBeenCalledWith(PROMPT_START_MESSAGE)
  })

  test('결과 출력, 입력한 문자열 출력', async () => {
    const inputs = ["123", "0", "222"];

    const logSpy = getLogSpy();
    const outputs = ["결과 : 123", "결과 : 0", "결과 : 222"];

    const app = new App();

    inputs.forEach(async (input, i) => {
      await app.print(input)
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(outputs[i]));
    })
  })

  test('문자 숫자 추출', () => {
    const inputs = ["1,2,3", "//;\\n2;2;3", "1,1:1"];
    const outputs = [['1', '2', '3'], ['2', '2', '3'], ['1', '1', '1']];

    const app = new App();

    inputs.forEach(async (input, i) => {
      expect(await app.extractNums(input)).toStrictEqual(outputs[i]);
    })
  })

  test('숫자 더하기', () => {
    const inputs = [['1', '2', '3'], ['2', '2', '3']];
    const outputs = [6, 7];

    const app = new App();

    inputs.forEach(async (input, i) => {
      expect(await app.sum(input)).toBe(outputs[i]);
    })
  })
});
