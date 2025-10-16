import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const correctCase = [
  { inputs: ['1,2,3'], output: '결과 : 6' },
  { inputs: ['0:1:1'], output: '결과 : 2' }
]

const exceptedCase = [
  { inputs: [''], output: '결과 : 0' },
  { inputs: ['//q\\n1q2q3'], output: '결과 : 6' },
]

describe("문자열 계산기 통합", () => {
  test.each(correctCase)('성공 - 입력: $inputs $output ', async ({ inputs, output }) => {
    mockQuestions(inputs);

    const logSpy = getLogSpy();

    const app = new App();
    await app.calculator();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  })

  test.each(exceptedCase)('예외 - 입력: $inputs $output ', async ({ inputs, output }) => {
    mockQuestions(inputs);

    const logSpy = getLogSpy();

    const app = new App();
    await app.calculator();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  })
});
