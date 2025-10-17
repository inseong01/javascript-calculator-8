/**
 * 사용자 입력 검증 
 * @param input string 
 * @returns string
 */
export function validateInput(input) {
  input = input?.trim() ?? '';

  /**
   * 1. 공백인지?
   * 2. 구분자로 끝나지 않았는지?
   */

  if (!input) return '';

  if (input.endsWith(',') || input.endsWith(':')) return 'NOT_END_WITH_NUMBER';

  return '';
}