import App from "../src/App.js";
import { ERROR_MESSAGE } from "../src/util/const/messageType.js";

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
  { inputs: ['0:1:1'], output: '결과 : 2' },
  { inputs: [''], output: '결과 : 0' },
  { inputs: ['//q\\n1q2q3'], output: '결과 : 6' },
  { inputs: [' '], output: '결과 : 0' },
  { inputs: ['123'], output: '결과 : 123' },
  { inputs: ['+1,2'], output: '결과 : 3' },
  { inputs: ['2,+2'], output: '결과 : 4' },
  { inputs: ['1, 2:1 :3 ,3'], output: '결과 : 10' },
  { inputs: ['//0x\\n10x20x3'], output: '결과 : 6' },
  { inputs: ['//\\\\n1\\2\\3'], output: '결과 : 6' },
]

const exceptedCase = [
  { inputs: ['0x12,2,2'], output: ERROR_MESSAGE },
  { inputs: ['0b12,2,2'], output: ERROR_MESSAGE },
  { inputs: ['0,2!2'], output: ERROR_MESSAGE },
  { inputs: ['0:1,'], output: ERROR_MESSAGE },
  { inputs: ['0q1'], output: ERROR_MESSAGE },
  { inputs: ['1,-1,0'], output: ERROR_MESSAGE },
  { inputs: ['1,-1,--0'], output: ERROR_MESSAGE },
  { inputs: ['1,1,*3'], output: ERROR_MESSAGE },
  { inputs: ['\\n,1'], output: ERROR_MESSAGE },
  { inputs: ['\\'], output: ERROR_MESSAGE },
  { inputs: ['//\\n123'], output: ERROR_MESSAGE },
  { inputs: ['//1\\n11213'], output: ERROR_MESSAGE },
  { inputs: ['//0x2\\n10x220x23'], output: ERROR_MESSAGE },
]

describe("문자열 계산기 통합", () => {
  describe('성공', () => {
    test.each(correctCase)('입력: $inputs → $output"', async ({ inputs, output }) => {
      mockQuestions(inputs);

      const logSpy = getLogSpy();

      const app = new App();
      await app.calculator();

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    })
  })

  describe('예외', () => {
    test.each(exceptedCase)('입력: $inputs → $output', async ({ inputs, output }) => {
      mockQuestions(inputs);

      const logSpy = getLogSpy();

      async function calculator() {
        const app = new App();
        return await app.calculator()
      }
      await expect(calculator).rejects.toThrow(ERROR_MESSAGE);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    })
  })
});
