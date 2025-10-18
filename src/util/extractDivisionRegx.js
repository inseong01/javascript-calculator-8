import { BASE_DIVISION_REGX, HAVE_BASE_DIVISION } from "./const";

/**
 * cutom 여부에 따른 구분자 정규식 반환 함수
 * @param {string} division 'q' '!'
  */
export function extractDivisionRegx(division) {
  if (division === HAVE_BASE_DIVISION) return new RegExp(BASE_DIVISION_REGX, 'g');

  if (division.includes('\\')) {
    division = division.replaceAll(/\\/g, '\\\\');
  }

  return new RegExp(division, 'g');
}