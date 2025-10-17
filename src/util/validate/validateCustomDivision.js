/**
 * 커스텀 구분자 검증
 * @param {string} division 'q' 'BASE' 
 * @return {string} 오류 메시지 유형
 */
export function validateCustomDivision(division) {
  /**
   * 1. 구분자가 존재하는지?
   * 2. 공백 구분인지?
   * 3. 숫자가 아닌지?
   */

  if (division === 'BASE') return '';

  if (!division) return 'CUSTOM_DIVISION_EMPTY';

  if (!division.trim()) return '';

  const isNaN = Number.isNaN(Number(division));
  if (!isNaN) return 'CUSTOM_DIVISION_NUMBER';

  return '';
}