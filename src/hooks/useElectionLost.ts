'use client';

import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { OrcamentoService } from '@/lib/municipalBudget';

const POPULARIDADE_MINIMA = 20;
const MESES_CONSECUTIVOS = 3;

export function useElectionLost() {
  const { state } = useGame();
  const [electionLost, setElectionLost] = useState(false);
  const consecutivosRef = useRef(0);
  const prevMonthRef = useRef<number>(state.month);
  const prevYearRef = useRef<number>(state.year);

  useEffect(() => {
    const monthChanged = state.month !== prevMonthRef.current || state.year !== prevYearRef.current;
    if (!monthChanged || electionLost) return;

    prevMonthRef.current = state.month;
    prevYearRef.current = state.year;

    try {
      const orc = OrcamentoService.calcularOrcamento(
        state.stats, state.budget, state.taxRate, state.month, state.year
      );
      if (orc.indicadores.popularidade < POPULARIDADE_MINIMA) {
        consecutivosRef.current += 1;
        if (consecutivosRef.current >= MESES_CONSECUTIVOS) {
          setElectionLost(true);
        }
      } else {
        consecutivosRef.current = 0;
      }
    } catch {
      consecutivosRef.current = 0;
    }
  }, [state.month, state.year, electionLost]);

  const resetElection = () => {
    consecutivosRef.current = 0;
    setElectionLost(false);
  };

  return { electionLost, resetElection };
}
