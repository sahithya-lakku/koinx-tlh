import { useHarvesting } from './hooks/useHarvesting';
import CapitalGainsCard from './components/CapitalGainsCard';
import HoldingsTable from './components/HoldingsTable';
import DisclaimerBanner from './components/DisclaimerBanner';

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const {
    holdings, visibleHoldings, baseGains, afterGains,
    preRealised, afterRealised, savings,
    selectedKeys, toggleRow, toggleAll,
    allSelected, someSelected,
    loading, error,
    showAll, setShowAll,
    getKey,
  } = useHarvesting();

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="border-b border-[#2a2f42] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="text-blue-500 font-black text-xl tracking-tight">KoinX</div>
          <div className="text-gray-600">|</div>
          <div className="text-gray-300 text-sm">Tax Loss Harvesting</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <h1 className="text-2xl font-bold text-white">Tax Optimisation</h1>
          <button className="text-blue-400 text-sm font-medium hover:underline">How it works?</button>
        </div>

        <DisclaimerBanner />

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-20 text-red-400 font-medium">{error}</div>
        ) : baseGains && afterGains ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <CapitalGainsCard
                title="Pre Harvesting"
                gains={baseGains}
                realisedLabel="Realised Capital Gains"
                realisedValue={preRealised}
                variant="dark"
              />
              <CapitalGainsCard
                title="After Harvesting"
                gains={afterGains}
                realisedLabel="Effective Capital Gains"
                realisedValue={afterRealised}
                variant="blue"
                savings={savings}
              />
            </div>

            <HoldingsTable
              holdings={visibleHoldings}
              selectedKeys={selectedKeys}
              toggleRow={toggleRow}
              toggleAll={toggleAll}
              allSelected={allSelected}
              someSelected={someSelected}
              showAll={showAll}
              setShowAll={setShowAll}
              totalCount={holdings.length}
              getKey={getKey}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
