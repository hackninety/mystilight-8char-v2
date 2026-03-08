import { TIAN_GAN, MONTH_ZHI, MONTH_NAMES, WU_HU_DUN } from './constants.mjs';
import { getShiShen } from './shishen.mjs';

/**
 * 根据年干和日主计算一年十二个流月的干支和十神
 * @param {string} yearGan - 流年天干
 * @param {string} dayMasterGan - 日主天干
 * @returns {Array<{monthIndex:number, monthName:string, gan:string, zhi:string, ganZhi:string, shiShen:string}>}
 */
export function getLiuYueForYear(yearGan, dayMasterGan) {
  const startGanIdx = WU_HU_DUN[yearGan];
  if (startGanIdx === undefined) return [];

  const result = [];
  for (let i = 0; i < 12; i++) {
    const ganIdx = (startGanIdx + i) % 10;
    const gan = TIAN_GAN[ganIdx];
    const zhi = MONTH_ZHI[i];
    result.push({
      monthIndex: i + 1,
      monthName: MONTH_NAMES[i],
      gan,
      zhi,
      ganZhi: gan + zhi,
      shiShen: getShiShen(dayMasterGan, gan),
    });
  }
  return result;
}
