/**
 * cutom 여부에 따른 구분자 정규식 반환 함수
 * @param {string} custom 'BASE' 'q' '!'
  */
export function extractDivisionRegx(custom) {
  if (custom === 'BASE') return new RegExp(/,|:/, 'g');
  return new RegExp(custom, 'g');
}