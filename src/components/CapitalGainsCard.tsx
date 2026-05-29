import type { CapitalGains } from '../types';
import { fmtFull } from '../utils/format';

interface Props {
  title: string;
  gains: CapitalGains;
  realisedLabel: string;
  realisedValue: number;
  variant: 'dark' | 'blue';
  savings?: number;
}

export default function CapitalGainsCard({ title, gains, realisedLabel, realisedValue, variant, savings }: Props) {
  const isDark = variant === 'dark';

  const cardCls = isDark
    ? 'bg-[#1a1f2e] border border-[#2a2f42] text-white'
    : 'bg-[#1a6ef5] text-white';

  const labelCls = isDark ? 'text-gray-400' : 'text-blue-100';
  const headerCls = isDark ? 'text-gray-300' : 'text-blue-100';
  const dividerCls = isDark ? 'border-[#2a2f42]' : 'border-blue-400';

  const netStcg = gains.stcg.profits - gains.stcg.losses;
  const netLtcg = gains.ltcg.profits - gains.ltcg.losses;

  const valColor = (v: number) =>
    v < 0 ? (isDark ? 'text-red-400' : 'text-red-200') : isDark ? 'text-white' : 'text-white';

  return (
    <div className={`rounded-2xl p-5 flex-1 min-w-0 ${cardCls}`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Headers */}
      <div className="grid grid-cols-3 mb-2">
        <span />
        <span className={`text-sm font-medium text-right ${headerCls}`}>Short-term</span>
        <span className={`text-sm font-medium text-right ${headerCls}`}>Long-term</span>
      </div>

      {/* Profits */}
      <div className="grid grid-cols-3 py-2">
        <span className={`text-sm ${labelCls}`}>Profits</span>
        <span className="text-sm font-medium text-right">{fmtFull(gains.stcg.profits)}</span>
        <span className="text-sm font-medium text-right">{fmtFull(gains.ltcg.profits)}</span>
      </div>

      {/* Losses */}
      <div className="grid grid-cols-3 py-2">
        <span className={`text-sm ${labelCls}`}>Losses</span>
        <span className="text-sm font-medium text-right">{fmtFull(gains.stcg.losses)}</span>
        <span className="text-sm font-medium text-right">{fmtFull(gains.ltcg.losses)}</span>
      </div>

      {/* Net Capital Gains */}
      <div className="grid grid-cols-3 py-2">
        <span className={`text-sm ${labelCls}`}>Net Capital Gains</span>
        <span className={`text-sm font-semibold text-right ${valColor(netStcg)}`}>{fmtFull(netStcg)}</span>
        <span className={`text-sm font-semibold text-right ${valColor(netLtcg)}`}>{fmtFull(netLtcg)}</span>
      </div>

      <div className={`border-t my-3 ${dividerCls}`} />

      {/* Realised / Effective */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-base font-bold">{realisedLabel}:</span>
        <span className={`text-2xl font-extrabold ${realisedValue < 0 ? (isDark ? 'text-red-400' : 'text-red-200') : ''}`}>
          {fmtFull(realisedValue)}
        </span>
      </div>

      {/* Savings banner */}
      {savings !== undefined && savings > 0 && (
        <div className="mt-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-xl px-4 py-2 text-green-300 text-sm font-semibold text-center">
          🎉 You're going to save {fmtFull(savings)} in taxes!
        </div>
      )}
    </div>
  );
}
