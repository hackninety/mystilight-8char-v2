/**
 * 真太阳时经度校正
 * 公式：真太阳时 ≈ 北京时间 + (经度 - 120) × 4 分钟
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @param {number} hour
 * @param {number} minute
 * @param {number} longitude - 出生地经度
 * @returns {{year:number, month:number, day:number, hour:number, minute:number}}
 */
export function applyTrueSolarTime(year, month, day, hour, minute, longitude) {
  const offsetMinutes = Math.round((longitude - 120) * 4);
  const dt = new Date(year, month - 1, day, hour, minute);
  dt.setMinutes(dt.getMinutes() + offsetMinutes);

  return {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes(),
  };
}

/**
 * 农历转公历
 * @param {object} Lunar - Lunar 类（由调用方注入）
 * @param {number} year - 农历年
 * @param {number} month - 农历月
 * @param {number} day - 农历日
 * @param {number} hour - 时
 * @param {number} minute - 分
 * @param {boolean} isLeapMonth - 是否闰月
 * @returns {{year:number, month:number, day:number, hour:number, minute:number}}
 */
export function lunarToSolar(Lunar, year, month, day, hour, minute, isLeapMonth) {
  if (!Lunar) throw new Error('Lunar 模块加载失败');
  const lunarMonth = isLeapMonth ? -Math.abs(month) : month;
  const lunar = Lunar.fromYmdHms(year, lunarMonth, day, hour, minute, 0);
  const solar = lunar.getSolar();
  return {
    year: solar.getYear(),
    month: solar.getMonth(),
    day: solar.getDay(),
    hour: solar.getHour(),
    minute: solar.getMinute(),
  };
}

/**
 * 八字反查公历日期（最近60年）
 * @param {object} Lunar - Lunar 类（由调用方注入）
 * @param {Function} fromBaZiFn - fromBaZi 函数（由调用方注入）
 * @param {string} yearGZ - 年柱干支
 * @param {string} monthGZ - 月柱干支
 * @param {string} dayGZ - 日柱干支
 * @param {string} timeGZ - 时柱干支
 * @returns {Array<{solar:string, lunar:string, year:number, month:number, day:number, hour:number, minute:number}>}
 */
export function reverseLookupBazi(Lunar, fromBaZiFn, yearGZ, monthGZ, dayGZ, timeGZ) {
  if (!fromBaZiFn) throw new Error('fromBaZi 方法加载失败');

  const candidates = fromBaZiFn(yearGZ, monthGZ, dayGZ, timeGZ);
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 60;

  return candidates
    .filter((c) => c.year >= minYear && c.year <= currentYear)
    .map((c) => {
      let lunarStr = '';
      if (Lunar) {
        try {
          const lunar = Lunar.fromDate(new Date(c.year, c.month - 1, c.day, c.hour, c.minute));
          lunarStr = `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
        } catch { /* ignore */ }
      }
      return {
        solar: c.ymdHms || `${c.year}-${String(c.month).padStart(2, '0')}-${String(c.day).padStart(2, '0')} ${String(c.hour).padStart(2, '0')}:${String(c.minute).padStart(2, '0')}`,
        lunar: lunarStr,
        year: c.year,
        month: c.month,
        day: c.day,
        hour: c.hour,
        minute: c.minute,
      };
    });
}
