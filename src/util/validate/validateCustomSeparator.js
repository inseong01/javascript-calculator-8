import { DEFAULT_SEPARATOR } from "../const/index.js";
import { CUSTOM_SEPARATOR_EMPTY, CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER, PASS } from "../const/messageType.js";

/**
 * 커스텀 구분자 검증
 * @param {string} separator 'q' DEFAULT_SEPARATOR 
 * @return {string} 오류 메시지 유형
 */
export function validateCustomSeparator(separator) {
  /**
   * 1. 구분자가 존재하는지?
   * 2. 공백 구분인지?
   * 3. 숫자가 아닌지?
   */

  if (separator === DEFAULT_SEPARATOR) return PASS;

  if (!separator) return CUSTOM_SEPARATOR_EMPTY;

  if (!separator.trim()) return PASS;

  const isNaN = Number.isNaN(Number(separator));
  if (!isNaN) return CUSTOM_SEPARATOR_NOT_ALLOWED_NUMBER;

  return PASS;
}