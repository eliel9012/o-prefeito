'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import Image from 'next/image';

const EVENTO_IMAGENS: Record<string, string> = {
  buraco_na_rua: '/assets/br/buraco_na_rua_256.webp',
  enchente: '/assets/br/enchente_256.webp',
  obra_parada: '/assets/br/obra_parada_256.webp',
  licitacao_emergencial: '/assets/br/camara_municipal_256.webp',
  camara_pressiona: '/assets/br/camara_municipal_256.webp',
  ministerio_publico_recomenda: '/assets/br/ubs_posto_saude_256.webp',
  crise_saneamento: '/assets/br/ubs_posto_saude_256.webp',
  fiscalizacao_ambiental: '/assets/br/casa_popular_256.webp',
};

interface ToastItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageSrc?: string;
}

const DURACAO_MS = 6000;

export function EventoToast() {
  const { state } = useGame();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const novos = state.notifications.filter(n => !seenIds.current.has(n.id));
    if (novos.length === 0) return;

    novos.forEach(n => seenIds.current.add(n.id));

    const items: ToastItem[] = novos.map(n => ({
      id: n.id,
      title: n.title,
      description: n.description,
      icon: n.icon,
      imageSrc: EVENTO_IMAGENS[n.id.replace(/-\d+$/, '')] ?? undefined,
    }));

    setToasts(prev => [...prev, ...items]);

    items.forEach(item => {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== item.id));
      }, DURACAO_MS);
    });
  }, [state.notifications]);

  if (toasts.length === 0) return null;

  return (
    <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-start gap-3 bg-card border border-border rounded-lg shadow-xl px-3 py-2.5 max-w-[320px] pointer-events-auto animate-in slide-in-from-right-4 duration-300"
        >
          {toast.imageSrc && (
            <div className="shrink-0 w-14 h-14 rounded overflow-hidden border border-border/60">
              <Image
                src={toast.imageSrc}
                alt={toast.title}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base leading-none">{toast.icon}</span>
              <span className="text-xs font-semibold text-foreground truncate">{toast.title}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3">{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
