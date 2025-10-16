import { hasCustomDivision } from "../src/util/hasCustomDivision";

describe("유틸리티", () => {
  test('커스텀 문자열 판별 후 커스텀 문자 반환', async () => {
    const inputs = ['1:2:3', '1,2,3', '//!\\n1!2!3', '//;\\n1;2;3']
    const outputs = ['', '', '!', ';']

    inputs.forEach((input, i) => {
      const result = hasCustomDivision(input);
      expect(result).toBe(outputs[i]);
    })
  })
});
