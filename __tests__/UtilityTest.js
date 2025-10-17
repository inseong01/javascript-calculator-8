import { hasCustomDivision } from "../src/util/hasCustomDivision";
import { throwMessage } from "../src/util/throwMessage";
import { validateCustomDivision } from "../src/util/validate/validateCustomDivision";
import { validateInput } from "../src/util/validate/validateInput";
import { validateNums } from "../src/util/validate/validateNums";

const Console = { print: jest.fn() };

describe("유틸리티", () => {
  describe('hasCustomDivision - 커스텀 문자 반환', () => {
    test('기본 구분자인 경우', async () => {
      const inputs = ['1:2:3', '1,2,3']
      const outputs = ['', '']

      inputs.forEach((input, i) => {
        const result = hasCustomDivision(input);
        expect(result).toBe(outputs[i]);
      })
    })

    test('커스텀 구분자인 경우', async () => {
      const inputs = ['//!\\n1!2!3', '//;\\n1;2;3']
      const outputs = ['!', ';']

      inputs.forEach((input, i) => {
        const result = hasCustomDivision(input);
        expect(result).toBe(outputs[i]);
      })
    })
  })

  describe('throwMessage - 메시지 출력 및 오류 던짐', () => {
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

  describe('validate - 오류 메시지 반환', () => {
    test('validateInput - 문자열 검증', () => {
      const inputs = ['1,2,', '1:'];
      const outputs = ['NOT_END_WITH_NUMBER', 'NOT_END_WITH_NUMBER'];

      inputs.forEach(async (input, i) => {
        const result = validateInput(input);
        expect(result).toBe(outputs[i]);
      })
    })

    test('validateNums - 문자 배열 중 숫자 검증', () => {
      const inputs = [['-1', '0', '3'], ['1', '2', '3'], [',', '2', '3'], ['1.1', '4']];
      const outputs = ['NOT_ALLOWED_NEGATIVE', '', 'NOT_ALLOWED_NAN', 'ONLY_ENTER_INTEGER'];

      inputs.forEach((input, i) => {
        const result = validateNums(input);
        expect(result).toBe(outputs[i])
      })
    })

    test('validateCustomDivision - 커스텀 구분자 검증', () => {
      const inputs = ['c', '', '123', ' '];
      const outputs = ['', 'CUSTOM_DIVISION_EMPTY', 'CUSTOM_DIVISION_NUMBER', ''];

      inputs.forEach((input, i) => {
        const result = validateCustomDivision(input);
        expect(result).toBe(outputs[i])
      })
    })
  })
});
