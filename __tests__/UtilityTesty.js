import { hasCustomDivision } from "../src/util/hasCustomDivision";
import { throwMessage } from "../src/util/throwMessage";

const Console = { print: jest.fn() };

describe("유틸리티", () => {
  test('커스텀 문자열 판별 후 커스텀 문자 반환', async () => {
    const inputs = ['1:2:3', '1,2,3', '//!\\n1!2!3', '//;\\n1;2;3']
    const outputs = ['', '', '!', ';']

    inputs.forEach((input, i) => {
      const result = hasCustomDivision(input);
      expect(result).toBe(outputs[i]);
    })
  })

  describe('유형에 알맞은 메시지 출력 및 오류 던짐', () => {
    test('문자 오류 반환', async () => {
      const inputs = ['NOT_END_WITH_NUMBER'];
      const output = '[ERROR]';

      inputs.forEach(async (input) => {
        async function throwMessageFn() {
          return await throwMessage(input, Console)
        }
        await expect(throwMessageFn).rejects.toThrow(new Error(output));
        expect(Console.print).toHaveBeenCalledWith(output);
      })
    })

    test('숫자 오류 반환', async () => {
      const inputs = ['NOT_END_WITH_NUMBER', 'NOT_ALLOWED_NEGATIVE', 'NOT_ALLOWED_NAN', 'ONLY_ENTER_INTEGER'];
      const output = '[ERROR]';

      inputs.forEach(async (input) => {
        async function throwMessageFn() {
          return await throwMessage(input, Console);
        }
        await expect(throwMessageFn).rejects.toThrow(new Error(output));
        expect(Console.print).toHaveBeenCalledWith(output);
      })
    })
  })

});
