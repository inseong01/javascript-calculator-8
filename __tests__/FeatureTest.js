import App from "../src/App.js";
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
    const props = "덧셈할 문자열을 입력해 주세요.\n";

    const app = new App();
    await app.readLine()

    expect(lineSpy).toHaveBeenCalledWith(props)
  })

  test('결과 출력, 입력한 문자열 출력', async () => {
    const inputs = ["123", "0", "222"];

    const logSpy = getLogSpy();
    const outputs = ["결과: 123", "결과: 0", "결과: 222"];

    const app = new App();

    inputs.forEach(async (input, i) => {
      await app.print(input)
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(outputs[i]));
    })
  })

  test('문자 숫자 추출', async () => {
    const inputs = ["1,2,3", "//;\n2;2;3"];
    const outputs = [['1', '2', '3'], ['2', '2', '3']];

    const app = new App();

    inputs.forEach((input, i) => {
      expect(app.extractNums(input)).toStrictEqual(outputs[i]);
    })
  })

  test('숫자 더하기', async () => {
    const inputs = [['1', '2', '3'], ['2', '2', '3']];
    const outputs = [6, 7];

    const app = new App();

    inputs.forEach((input, i) => {
      expect(app.sum(input)).toStrictEqual(outputs[i]);
    })
  })

  test('문자열 검증', () => {
    const inputs = ['', '   ', '1,2,', '1:'];
    const outputs = ['EMPTY_STRING', 'EMPTY_STRING', 'NOT_END_WITH_NUMBER', 'NOT_END_WITH_NUMBER'];

    const app = new App();

    inputs.forEach(async (input, i) => {
      const result = app.validateInput(input)
      expect(result).toBe(outputs[i]);
    })
  })

  describe.only('메시지 출력', () => {
    test('오류 반환', async () => {
      const inputs = ['NOT_END_WITH_NUMBER'];
      const outputs = ['[ERROR]'];

      const logSpy = getLogSpy();
      const app = new App();

      inputs.forEach(async (input, i) => {
        async function throwMessageFn() {
          return await app.throwMessage(input)
        }
        await expect(throwMessageFn).rejects.toThrow(new Error());

        expect(logSpy).toHaveBeenCalledWith(outputs[i]);
      })
    })

    test('오류 미반환', async () => {
      const inputs = ['', 'EMPTY_STRING',];
      const outputs = [undefined, '결과: 0'];

      const logSpy = getLogSpy();
      const app = new App();

      inputs.forEach(async (input, i) => {
        await app.throwMessage(input);

        if (!input) {
          return expect(logSpy).not.toHaveBeenCalledWith(outputs[i])
        }

        expect(logSpy).toHaveBeenCalledWith(outputs[i])
      })
    })
  })
});
