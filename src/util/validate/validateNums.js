/**
 * 문자 유형 숫자 배열 검증
 * @param {string[]} nums ['1', '2', '3'] 
 * @returns {string} 오류 메시지 유형  
 */
export function validateNums(nums) {
  /**
   * 1. 10진수가 아닌 경우
   * 2. 음수인지?
   * 3. NaN인지?
   * 4. 정수인지?
  */

  const notDecimal = nums.some((num) => /[a-z]/i.test(num));
  if (notDecimal) return 'ONLY_ALLOWED_DECIMAL';

  nums = nums.map(num => Number(num));

  const hasNegative = nums.some((num) => Math.sign(num) === -1);
  if (hasNegative) return 'NOT_ALLOWED_NEGATIVE';

  const hasNaN = nums.some((num) => Number.isNaN(num));
  if (hasNaN) return 'NOT_ALLOWED_NAN';

  const isInteger = nums.every((num) => Number.isInteger(num));
  if (!isInteger) return 'ONLY_ENTER_INTEGER';

  return '';
}