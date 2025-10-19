import { DEFAULT_SEPARATOR_REGX, DEFAULT_SEPARATOR } from "./const/index.js";

/**
 * cutom 여부에 따른 구분자 정규식 반환 함수
 * @param {string} separator 'q' '!'
 */
export function extractSeparatorRegx(separator) {
  if (separator === DEFAULT_SEPARATOR) return new RegExp(DEFAULT_SEPARATOR_REGX, 'g');

  if (separator.includes('\\')) {
    separator = separator.replaceAll(/\\/g, '\\\\');
  }

  return new RegExp(separator, 'g');
}