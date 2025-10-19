import { NOT_END_WITH_SEPARATOR, PASS } from "../const/messageType.js";

/**
 * 사용자 입력 검증 
 * @param {string} input  '//q\n1q2q3' '1,2:3'
 * @returns {string} 오류 메시지 유형
 */
export function validateInput(input) {
  input = input?.trim() ?? '';

  /**
   * 1. 공백인지?
   * 2. 구분자로 끝나지 않았는지?
   */

  if (!input) return PASS;

  if (input.endsWith(',') || input.endsWith(':')) return NOT_END_WITH_SEPARATOR;

  return PASS;
}