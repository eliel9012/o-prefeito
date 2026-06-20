'use client';

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

interface ElectionLostDialogProps {
  open: boolean;
  onRestart: () => void;
}

export function ElectionLostDialog({ open, onRestart }: ElectionLostDialogProps) {
  const { state } = useGame();

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-sm text-center" onPointerDownOutside={e => e.preventDefault()}>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-24 h-24 rounded overflow-hidden border border-border/60 mx-auto">
            <Image
              src="/assets/br/camara_municipal_256.webp"
              alt="Câmara Municipal"
              width={96}
              height={96}
              className="object-cover w-full h-full grayscale"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">Você perdeu a eleição</h2>
            <p className="text-sm text-muted-foreground">
              {state.cityName} — {state.month}/{state.year}
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
            Sua aprovação popular ficou abaixo de 20% por {3} meses consecutivos.
            A oposição venceu. O povo falou.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <Button onClick={onRestart} className="w-full">
              Tentar novamente
            </Button>
            <p className="text-[10px] text-muted-foreground/60">
              Dica: invista em saúde, educação e saneamento para recuperar popularidade.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
