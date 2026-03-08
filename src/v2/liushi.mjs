import { SHI_CHEN_NAMES, SHI_CHEN_HOURS } from './constants.mjs';
import { getShiShen } from './shishen.mjs';

/**
 * 获取某日的十二时辰流时干支和十神
 * @param {object} Lunar - Lunar 类（由调用方注入）
 * @param {number} solarYear - 公历年
 * @param {number} solarMonth - 公历月
 * @param {number} solarDay - 公历日
 * @param {string} dayMasterGan - 日主天干
 * @returns {Array<{shiChenName:string, ganZhi:string, gan:string, zhi:string, shiShen:string}>}
 */
export function getLiuShiForDay(Lunar, solarYear, solarMonth, solarDay, dayMasterGan) {
  if (!Lunar) return [];

  const result = [];
  for (let i = 0; i < 12; i++) {
    try {
      const h = SHI_CHEN_HOURS[i];
      const lunar = Lunar.fromDate(new Date(solarYear, solarMonth - 1, solarDay, h, 0));
      const gz = lunar.getTimeInGanZhi();
      const gan = gz[0];
      result.push({
        shiChenName: SHI_CHEN_NAMES[i],
        ganZhi: gz,
        gan,
        zhi: gz[1],
        shiShen: getShiShen(dayMasterGan, gan),
      });
    } catch { /* skip */ }
  }
  return result;
}
