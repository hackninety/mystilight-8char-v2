// ─── 原版 API 透传 ────────────────────────────────────
import paipan from '../../index.js';

export const getCurrentEightCharJSON = paipan.getCurrentEightCharJSON;
export const fromBaZi = paipan.fromBaZi;
export const Lunar = paipan.Lunar;
export default paipan;

// ─── v2 扩展：常量 ─────────────────────────────────────
export {
  TIAN_GAN, DI_ZHI, JIA_ZI_60,
  MONTH_ZHI, MONTH_NAMES, WU_HU_DUN,
  GAN_WX_IDX, GAN_YY,
  SHI_CHEN_NAMES, SHI_CHEN_HOURS,
} from './constants.mjs';

// ─── v2 扩展：十神（无需 Lunar） ───────────────────────
export { getShiShen } from './shishen.mjs';

// ─── v2 扩展：流月（无需 Lunar） ───────────────────────
export { getLiuYueForYear } from './liuyue.mjs';

// ─── v2 扩展：流日（自动注入 Lunar） ───────────────────
import { getLiuRiForMonth as _getLiuRiForMonth } from './liuri.mjs';
export const getLiuRiForMonth = (liuNianYear, monthIndex, dayMasterGan) =>
  _getLiuRiForMonth(paipan.Lunar, liuNianYear, monthIndex, dayMasterGan);

// ─── v2 扩展：流时（自动注入 Lunar） ───────────────────
import { getLiuShiForDay as _getLiuShiForDay } from './liushi.mjs';
export const getLiuShiForDay = (solarYear, solarMonth, solarDay, dayMasterGan) =>
  _getLiuShiForDay(paipan.Lunar, solarYear, solarMonth, solarDay, dayMasterGan);

// ─── v2 扩展：工具函数（自动注入 Lunar/fromBaZi） ──────
import {
  applyTrueSolarTime as _applyTrueSolarTime,
  lunarToSolar as _lunarToSolar,
  reverseLookupBazi as _reverseLookupBazi,
} from './utils.mjs';

export { _applyTrueSolarTime as applyTrueSolarTime };

export const lunarToSolar = (year, month, day, hour, minute, isLeapMonth) =>
  _lunarToSolar(paipan.Lunar, year, month, day, hour, minute, isLeapMonth);

export const reverseLookupBazi = (yearGZ, monthGZ, dayGZ, timeGZ) =>
  _reverseLookupBazi(paipan.Lunar, paipan.fromBaZi, yearGZ, monthGZ, dayGZ, timeGZ);
