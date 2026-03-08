// Type definitions for mystilight-8char-v2 extensions
// Original API types are in index.d.ts

// ─── Re-export original types ──────────────────────────
export * from './index';

// ─── Constants ─────────────────────────────────────────

export const TIAN_GAN: readonly string[];
export const DI_ZHI: readonly string[];
export const JIA_ZI_60: readonly string[];
export const MONTH_ZHI: readonly string[];
export const MONTH_NAMES: readonly string[];
export const WU_HU_DUN: Readonly<Record<string, number>>;
export const GAN_WX_IDX: Readonly<Record<string, number>>;
export const GAN_YY: Readonly<Record<string, number>>;
export const SHI_CHEN_NAMES: readonly string[];
export const SHI_CHEN_HOURS: readonly number[];

// ─── ShiShen (十神) ────────────────────────────────────

export function getShiShen(dayGan: string, otherGan: string): string;

// ─── LiuYue (流月) ─────────────────────────────────────

export interface LiuYueItem {
  monthIndex: number;
  monthName: string;
  gan: string;
  zhi: string;
  ganZhi: string;
  shiShen: string;
}

export function getLiuYueForYear(yearGan: string, dayMasterGan: string): LiuYueItem[];

// ─── LiuRi (流日) ──────────────────────────────────────

export interface LiuRiItem {
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  ganZhi: string;
  gan: string;
  zhi: string;
  shiShen: string;
}

export function getLiuRiForMonth(
  liuNianYear: number,
  monthIndex: number,
  dayMasterGan: string
): LiuRiItem[];

// ─── LiuShi (流时) ─────────────────────────────────────

export interface LiuShiItem {
  shiChenName: string;
  ganZhi: string;
  gan: string;
  zhi: string;
  shiShen: string;
}

export function getLiuShiForDay(
  solarYear: number,
  solarMonth: number,
  solarDay: number,
  dayMasterGan: string
): LiuShiItem[];

// ─── Utils ─────────────────────────────────────────────

export function applyTrueSolarTime(
  year: number, month: number, day: number,
  hour: number, minute: number, longitude: number
): { year: number; month: number; day: number; hour: number; minute: number };

export function lunarToSolar(
  year: number, month: number, day: number,
  hour: number, minute: number, isLeapMonth: boolean
): { year: number; month: number; day: number; hour: number; minute: number };

export interface ReverseLookupResult {
  solar: string;
  lunar: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export function reverseLookupBazi(
  yearGZ: string, monthGZ: string,
  dayGZ: string, timeGZ: string
): ReverseLookupResult[];

// ─── Lunar class (from original, re-exported) ──────────

export const Lunar: any;
