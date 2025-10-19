import { DEFAULT_SEPARATOR } from "../src/util/const";
import { CUSTOM_SEPARATOR_EMPTY, CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER, ERROR_MESSAGE, NOT_ALLOWED_NAN, NOT_ALLOWED_NEGATIVE, NOT_END_WITH_SEPARATOR, ONLY_ALLOWED_DECIMAL, ONLY_ENTER_INTEGER } from "../src/util/const/messageType";

import { extractSeparatorRegx } from "../src/util/extractSeparatorRegx";
import { hasCustomSeparator } from "../src/util/hasCustomSeparator";
import { throwMessage } from "../src/util/throwMessage";
import { trimRespondPrefix } from "../src/util/trimRespondPrefix";
import { validateCustomSeparator } from "../src/util/validate/validateCustomSeparator";
import { validateInput } from "../src/util/validate/validateInput";
import { validateNums } from "../src/util/validate/validateNums";

const Console = { print: jest.fn() };

describe("유틸리티", () => {
  describe('hasCustomSeparator - 커스텀 문자 반환', () => {
    test('기본 구분자인 경우', async () => {
      const inputs = ['1:2:3', '1,2,3']
      const outputs = [DEFAULT_SEPARATOR, DEFAULT_SEPARATOR]

      inputs.forEach((input, i) => {
        const result = hasCustomSeparator(input);
        expect(result).toBe(outputs[i]);
      })
    })

    test('커스텀 구분자인 경우', async () => {
      const inputs = ['//!\\n1!2!3', '//;\\n1;2;3']
      const outputs = ['!', ';']

      inputs.forEach((input, i) => {
        const result = hasCustomSeparator(input);
        expect(result).toBe(outputs[i]);
      })
    })
  })

  describe('throwMessage - 메시지 출력 및 오류 던짐', () => {
    test('문자 오류 반환', async () => {
      const inputs = [NOT_END_WITH_SEPARATOR];
      const output = ERROR_MESSAGE.NOT_END_WITH_SEPARATOR;

      inputs.forEach(async (input) => {
        async function throwMessageFn() {
          return await throwMessage(input, Console)
        }
        await expect(throwMessageFn).rejects.toThrow(new Error(output));
        expect(Console.print).toHaveBeenCalledWith(output);
      })
    })

    test('숫자 오류 반환', async () => {
      const inputs = [NOT_END_WITH_SEPARATOR, NOT_ALLOWED_NEGATIVE, NOT_ALLOWED_NAN, ONLY_ENTER_INTEGER];
      const outputs = [ERROR_MESSAGE.NOT_END_WITH_SEPARATOR, ERROR_MESSAGE.NOT_ALLOWED_NEGATIVE, ERROR_MESSAGE.NOT_ALLOWED_NAN, ERROR_MESSAGE.ONLY_ENTER_INTEGER];

      inputs.forEach(async (input, i) => {
        async function throwMessageFn() {
          return await throwMessage(input, Console);
        }
        await expect(throwMessageFn).rejects.toThrow(new Error(outputs[i]));
        expect(Console.print).toHaveBeenCalledWith(outputs[i]);
      })
    })
  })

  describe('validate - 오류 메시지 반환', () => {
    test('validateInput - 문자열 검증', () => {
      const inputs = ['1,2,', '1:'];
      const outputs = [NOT_END_WITH_SEPARATOR, NOT_END_WITH_SEPARATOR];

      inputs.forEach(async (input, i) => {
        const result = validateInput(input);
        expect(result).toBe(outputs[i]);
      })
    })

    test('validateNums - 문자 배열 중 숫자 검증', () => {
      const inputs = [['-1', '0', '3'], ['1', '2', '3'], [',', '2', '3'], ['1.1', '4'], ['0x12', '0', '2']];
      const outputs = [NOT_ALLOWED_NEGATIVE, '', NOT_ALLOWED_NAN, ONLY_ENTER_INTEGER, ONLY_ALLOWED_DECIMAL];

      inputs.forEach((input, i) => {
        const result = validateNums(input);
        expect(result).toBe(outputs[i])
      })
    })

    test('validateCustomSeparator - 커스텀 구분자 검증', () => {
      const inputs = ['c', '', '123', ' '];
      const outputs = ['', CUSTOM_SEPARATOR_EMPTY, CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER, ''];

      inputs.forEach((input, i) => {
        const result = validateCustomSeparator(input);
        expect(result).toBe(outputs[i])
      })
    })
  })

  describe('extractSeparatorRegx - 구분자 구별 정규식 반환', () => {
    test('기본 구분자인 경우', () => {
      const inputs = [DEFAULT_SEPARATOR]
      const output = new RegExp(/,|:/, 'g');

      inputs.forEach((input) => {
        expect(extractSeparatorRegx(input)).toEqual(output)
      })
    })

    test('커스텀 구분자인 경우', () => {
      const inputs = ['', 'a', '\\', '\\\\'];

      function setRegExp(props) {
        return new RegExp(props, 'g');
      }
      const outputs = [setRegExp(''), setRegExp('a'), setRegExp('\\\\'), setRegExp('\\\\\\\\')];

      inputs.forEach((input, i) => {
        expect(extractSeparatorRegx(input)).toEqual(outputs[i])
      })
    })
  })

  describe('trimRespondPrefix - 온전한 숫자 문자열 반환', () => {
    test('기본 구분자인 경우', () => {
      const inputs = [{ respond: '1,2:3', custom: DEFAULT_SEPARATOR }, { respond: '3:2', custom: DEFAULT_SEPARATOR }]
      const outputs = ['1,2:3', '3:2'];

      inputs.forEach((input, i) => {
        const { respond, custom } = input
        expect(trimRespondPrefix(respond, custom)).toEqual(outputs[i])
      })
    })

    test('커스텀 구분자인 경우', () => {
      const inputs = [{ respond: '//q\\n1q2q3', custom: 'q' }, { respond: '//!\\n4!3!2', custom: '!' }]
      const outputs = ['1q2q3', '4!3!2']

      inputs.forEach((input, i) => {
        const { respond, custom } = input
        expect(trimRespondPrefix(respond, custom)).toEqual(outputs[i])
      })
    })
  })
});
