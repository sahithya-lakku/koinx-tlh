import { useState, useEffect, useMemo } from 'react';
import type { Holding, CapitalGains } from '../types';
import { fetchHoldings } from '../api/holdingsApi';
import { fetchCapitalGains } from '../api/capitalGainsApi';

export function useHarvesting() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [baseGains, setBaseGains] = useState<CapitalGains | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Stable key per row (coin + coinName handles duplicate USDC)
  const getKey = (h: Holding, idx: number) => `${h.coin}-${h.coinName}-${idx}`;

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchHoldings(), fetchCapitalGains()])
      .then(([holdingsData, gainsData]) => {
        // Sort: highest absolute stcg gain first
        const sorted = [...holdingsData].sort(
          (a, b) => Math.abs(b.stcg.gain) - Math.abs(a.stcg.gain)
        );
        setHoldings(sorted);
        setBaseGains(gainsData.capitalGains);
      })
      .catch(() => setError('Failed to load data. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const afterGains = useMemo(() => {
    if (!baseGains) return null;

    let stcgProfits = baseGains.stcg.profits;
    let stcgLosses = baseGains.stcg.losses;
    let ltcgProfits = baseGains.ltcg.profits;
    let ltcgLosses = baseGains.ltcg.losses;

    holdings.forEach((h, idx) => {
      if (!selectedKeys.has(getKey(h, idx))) return;

      const sg = h.stcg.gain;
      const lg = h.ltcg.gain;

      if (sg > 0) stcgProfits += sg;
      else stcgLosses += Math.abs(sg);

      if (lg > 0) ltcgProfits += lg;
      else ltcgLosses += Math.abs(lg);
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [selectedKeys, baseGains, holdings]);

  const preRealised = baseGains
    ? (baseGains.stcg.profits - baseGains.stcg.losses) +
      (baseGains.ltcg.profits - baseGains.ltcg.losses)
    : 0;

  const afterRealised = afterGains
    ? (afterGains.stcg.profits - afterGains.stcg.losses) +
      (afterGains.ltcg.profits - afterGains.ltcg.losses)
    : 0;

  const savings = preRealised > afterRealised ? preRealised - afterRealised : 0;

  const toggleRow = (key: string) => {
    setSelectedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allKeys = holdings.map((h, i) => getKey(h, i));
  const allSelected = allKeys.length > 0 && allKeys.every(k => selectedKeys.has(k));
  const someSelected = allKeys.some(k => selectedKeys.has(k));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(allKeys));
    }
  };

  const visibleHoldings = showAll ? holdings : holdings.slice(0, 5);

  return {
    holdings,
    visibleHoldings,
    baseGains,
    afterGains,
    preRealised,
    afterRealised,
    savings,
    selectedKeys,
    toggleRow,
    toggleAll,
    allSelected,
    someSelected,
    loading,
    error,
    showAll,
    setShowAll,
    getKey,
  };
}
