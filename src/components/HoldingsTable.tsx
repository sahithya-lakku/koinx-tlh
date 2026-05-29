import type { Holding } from '../types';
import { fmt, fmtFull, fmtHolding } from '../utils/format';

interface Props {
  holdings: Holding[];
  selectedKeys: Set<string>;
  toggleRow: (key: string) => void;
  toggleAll: () => void;
  allSelected: boolean;
  someSelected: boolean;
  showAll: boolean;
  setShowAll: (v: boolean) => void;
  totalCount: number;
  getKey: (h: Holding, idx: number) => string;
}

function GainCell({ gain, balance, coin }: { gain: number; balance: number; coin: string }) {
  const color = gain < 0 ? 'text-red-400' : gain > 0 ? 'text-green-400' : 'text-gray-400';
  return (
    <div className="text-right">
      <div className={`text-sm font-semibold ${color}`}>{fmt(gain)}</div>
      <div className="text-xs text-gray-500">{fmtHolding(balance)} {coin}</div>
    </div>
  );
}

export default function HoldingsTable({
  holdings, selectedKeys, toggleRow, toggleAll,
  allSelected, someSelected, showAll, setShowAll, totalCount, getKey,
}: Props) {
  return (
    <div className="bg-[#1a1f2e] border border-[#2a2f42] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2a2f42]">
        <h2 className="text-lg font-bold text-white">Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#2a2f42]">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Asset</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-400">
                <div>Holdings</div>
                <div className="text-xs font-normal text-gray-500">Avg Buy Price</div>
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-400">Current Price</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-400">Short-Term</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-400">Long-Term</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-400">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, idx) => {
              const key = getKey(h, idx);
              const isSelected = selectedKeys.has(key);
              return (
                <tr
                  key={key}
                  onClick={() => toggleRow(key)}
                  className={`border-b border-[#2a2f42] cursor-pointer transition-colors duration-150
                    ${isSelected ? 'bg-blue-900 bg-opacity-20' : 'hover:bg-[#22273a]'}`}
                >
                  <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(key)}
                      className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={h.logo}
                        alt={h.coin}
                        className="w-8 h-8 rounded-full object-cover bg-gray-700 flex-shrink-0"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{h.coin}</div>
                        <div className="text-xs text-gray-500 max-w-[120px] truncate">{h.coinName}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="text-sm font-medium text-white">{fmtHolding(h.totalHolding)} {h.coin}</div>
                    <div className="text-xs text-gray-500">{fmtFull(h.averageBuyPrice)}/{h.coin}</div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-medium text-white">{fmtFull(h.currentPrice)}</span>
                  </td>

                  <td className="px-4 py-4">
                    <GainCell gain={h.stcg.gain} balance={h.stcg.balance} coin={h.coin} />
                  </td>

                  <td className="px-4 py-4">
                    <GainCell gain={h.ltcg.gain} balance={h.ltcg.balance} coin={h.coin} />
                  </td>

                  <td className="px-4 py-4 text-right">
                    {isSelected ? (
                      <span className="text-sm font-semibold text-blue-400">
                        {fmtHolding(h.totalHolding)} {h.coin}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalCount > 5 && (
        <div className="px-6 py-4 border-t border-[#2a2f42] text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            {showAll ? '▲ Show Less' : `▼ View All (${totalCount} assets)`}
          </button>
        </div>
      )}
    </div>
  );
}
