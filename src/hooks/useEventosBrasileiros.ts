'use client';

import { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { EventoService } from '@/lib/eventosBrasileiros';

/**
 * Hook para gerenciamento de eventos municipais brasileiros
 */
export function useEventosBrasileiros() {
  const { state, addNotification } = useGame();
  const prevMonthRef = useRef<number>(state.month);
  const prevYearRef = useRef<number>(state.year);

  useEffect(() => {
    const monthChanged = state.month !== prevMonthRef.current || state.year !== prevYearRef.current;

    if (monthChanged) {
      prevMonthRef.current = state.month;
      prevYearRef.current = state.year;

      // Pequeno atraso para permitir que a UI de mudança de mês se estabeleça primeiro
      const timer = setTimeout(() => {
        try {
          const eventos = EventoService.sortearEventosMensais(state);
          eventos.forEach((ev) => {
            addNotification(ev.titulo, ev.descricao, ev.icone);
          });
        } catch (error) {
          console.error('Erro ao processar eventos mensais:', error);
          addNotification(
            'Erro',
            'Ocorreu um erro ao processar eventos mensais',
            '⚠️'
          );
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [state.month, state.year, addNotification]);
}
