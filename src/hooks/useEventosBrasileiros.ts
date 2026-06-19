'use client';

import { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { sortearEventosMensais } from '@/lib/eventosBrasileiros';

/**
 * Dispara eventos municipais brasileiros ao virar o mês.
 * Chame este hook dentro do componente Game.
 */
export function useEventosBrasileiros() {
  const { state, addNotification } = useGame();
  const prevMonthRef = useRef<number>(state.month);
  const prevYearRef = useRef<number>(state.year);

  useEffect(() => {
    const monthChanged =
      state.month !== prevMonthRef.current || state.year !== prevYearRef.current;

    if (monthChanged) {
      prevMonthRef.current = state.month;
      prevYearRef.current = state.year;

      // Small delay so month-turn UI settles first
      const t = setTimeout(() => {
        const eventos = sortearEventosMensais(state);
        eventos.forEach((ev) => {
          addNotification(ev.titulo, ev.descricao, ev.icone);
        });
      }, 800);

      return () => clearTimeout(t);
    }
  }, [state.month, state.year, state, addNotification]);
}
