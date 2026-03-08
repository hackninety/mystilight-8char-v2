import { getShiShen } from './shishen.mjs';

/**
 * 根据节气边界获取传统月份的实际公历日期范围。
 * 使用 Lunar.getPrevJie() / getNextJie() 获取当月"节"的起止日期。
 * @param {object} Lunar - Lunar 类
 * @param {number} liuNianYear - 流年年份
 * @param {number} monthIndex - 传统月份索引 (1=正月/寅, 12=腊月/丑)
 */
function getMonthJieBounds(Lunar, liuNianYear, monthIndex) {
  const approxSolarMonth = monthIndex <= 11 ? monthIndex + 1 : 1;
  const approxSolarYear = monthIndex <= 11 ? liuNianYear : liuNianYear + 1;
  const midDate = new Date(approxSolarYear, approxSolarMonth - 1, 15);

  try {
    const lunar = Lunar.fromDate(midDate);
    const prevJie = lunar.getPrevJie();
    const nextJie = lunar.getNextJie();
    if (!prevJie || !nextJie) return null;

    const s1 = prevJie.getSolar()._p;
    const s2 = nextJie.getSolar()._p;
    return {
      startYear: s1.year, startMonth: s1.month, startDay: s1.day,
      endYear: s2.year, endMonth: s2.month, endDay: s2.day,
    };
  } catch {
    return null;
  }
}

/**
 * 获取某流年某月的每日流日干支和十神（基于节气边界）
 * @param {object} Lunar - Lunar 类（由调用方注入）
 * @param {number} liuNianYear - 流年年份
 * @param {number} monthIndex - 传统月份索引 (1-12)
 * @param {string} dayMasterGan - 日主天干
 * @returns {Array<{solarYear:number, solarMonth:number, solarDay:number, lunarDay:string, lunarMonth:string, ganZhi:string, gan:string, zhi:string, shiShen:string}>}
 */
export function getLiuRiForMonth(Lunar, liuNianYear, monthIndex, dayMasterGan) {
  if (!Lunar) return [];

  const bounds = getMonthJieBounds(Lunar, liuNianYear, monthIndex);
  if (!bounds) return [];

  const startDate = new Date(bounds.startYear, bounds.startMonth - 1, bounds.startDay);
  const endDate = new Date(bounds.endYear, bounds.endMonth - 1, bounds.endDay);
  const result = [];

  const cur = new Date(startDate);
  while (cur < endDate) {
    try {
      const y = cur.getFullYear();
      const m = cur.getMonth() + 1;
      const d = cur.getDate();
      const lunar = Lunar.fromDate(cur);
      const gz = lunar.getDayInGanZhi();
      const gan = gz[0];
      result.push({
        solarYear: y,
        solarMonth: m,
        solarDay: d,
        lunarDay: lunar.getDayInChinese(),
        lunarMonth: lunar.getMonthInChinese(),
        ganZhi: gz,
        gan,
        zhi: gz[1],
        shiShen: getShiShen(dayMasterGan, gan),
      });
    } catch { /* skip */ }
    cur.setDate(cur.getDate() + 1);
  }
  return result;
}
