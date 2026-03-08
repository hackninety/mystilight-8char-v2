# mystilight-8char-v2 扩展说明

本项目是 [mystilight-8char](https://github.com/mystilight/mystilight-8char) 的 fork 扩展版本。

**原则：不修改原版任何文件**，所有扩展功能通过新增 `src/v2/` 目录下的模块实现，确保可随时与上游同步。

## 与原版的关系

- 原版代码：`src/index.js`、`index.js`、`index.d.ts`、`README.md` 等文件全部保持不变
- v2 扩展：`src/v2/*.mjs` 为新增模块，`v2.d.ts` 为扩展类型定义
- 入口：`src/v2/index.mjs` 同时透传原版 API 和导出 v2 扩展

## 安装

```bash
# 本地引用（推荐）
npm install --save file:../mystilight-8char-v2
```

## 使用

```javascript
import paipan, {
  getCurrentEightCharJSON,
  fromBaZi,
  Lunar,
  // v2 扩展
  getShiShen,
  getLiuYueForYear,
  getLiuRiForMonth,
  getLiuShiForDay,
  lunarToSolar,
  reverseLookupBazi,
  applyTrueSolarTime,
  TIAN_GAN,
  DI_ZHI,
} from 'mystilight-8char-v2';

// 原版 API 照常使用
const result = getCurrentEightCharJSON({
  year: 1990, month: 5, day: 15,
  hour: 14, minute: 30,
  sect: 2, gender: 1,
});

// v2 扩展：计算十神
const shiShen = getShiShen('庚', '甲'); // => '偏财'

// v2 扩展：获取流月
const liuYue = getLiuYueForYear('乙', '庚'); // 乙年、日主庚 -> 12个月

// v2 扩展：获取流日（基于节气边界，自动注入 Lunar）
const liuRi = getLiuRiForMonth(2025, 12, '庚'); // 2025年腊月，日主庚

// v2 扩展：获取流时
const liuShi = getLiuShiForDay(2026, 1, 10, '庚'); // 2026年1月10日，日主庚

// v2 扩展：农历转公历
const solar = lunarToSolar(2025, 1, 15, 14, 0, false);

// v2 扩展：八字反查
const matches = reverseLookupBazi('庚午', '辛巳', '庚辰', '癸未');
```

## v2 新增 API

### 常量

| 导出 | 说明 |
|------|------|
| `TIAN_GAN` | 十天干 `['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']` |
| `DI_ZHI` | 十二地支 `['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']` |
| `JIA_ZI_60` | 六十甲子 |
| `MONTH_ZHI` | 月支（正月寅起） |
| `MONTH_NAMES` | 月份名（正月~腊月） |
| `WU_HU_DUN` | 五虎遁起月映射 |
| `SHI_CHEN_NAMES` | 十二时辰名 |
| `SHI_CHEN_HOURS` | 时辰对应小时 |

### 函数

| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getShiShen(dayGan, otherGan)` | 日干, 他干 | 十神名 | 十神计算 |
| `getLiuYueForYear(yearGan, dayMasterGan)` | 年干, 日主 | `LiuYueItem[]` | 流月排盘（五虎遁） |
| `getLiuRiForMonth(year, monthIndex, dayMasterGan)` | 流年, 月序(1-12), 日主 | `LiuRiItem[]` | 流日排盘（节气边界） |
| `getLiuShiForDay(year, month, day, dayMasterGan)` | 公历年月日, 日主 | `LiuShiItem[]` | 流时排盘（十二时辰） |
| `applyTrueSolarTime(y, m, d, h, min, longitude)` | 年月日时分 + 经度 | 校正后时间 | 真太阳时校正 |
| `lunarToSolar(y, m, d, h, min, isLeap)` | 农历年月日时分 + 闰月 | 公历时间 | 农历转公历 |
| `reverseLookupBazi(yearGZ, monthGZ, dayGZ, timeGZ)` | 四柱干支 | `ReverseLookupResult[]` | 八字反查（近60年） |

## 文件结构

```
src/v2/
  constants.mjs   # 天干/地支/月支/五虎遁/时辰等常量
  shishen.mjs     # 十神计算
  liuyue.mjs      # 流月排盘
  liuri.mjs       # 流日排盘（节气边界）
  liushi.mjs      # 流时排盘
  utils.mjs       # 真太阳时、农历转换、八字反查
  index.mjs       # 统一入口（透传原版 + v2 扩展）
v2.d.ts           # TypeScript 类型定义
```

## 许可证

ISC License（同原版）
