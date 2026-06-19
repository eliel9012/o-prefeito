'use client';

import React, { useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { calcularOrcamento } from '@/lib/municipalBudget';

function Row({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`font-mono text-xs ${color ?? 'text-foreground'}`}>
        R${value.toLocaleString('pt-BR')}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{title}</h3>
      {children}
    </div>
  );
}

function PopularityBar({ value }: { value: number }) {
  const color = value >= 60 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-500';
  const label = value >= 70 ? 'Ótima' : value >= 55 ? 'Boa' : value >= 40 ? 'Regular' : value >= 25 ? 'Ruim' : 'Péssima';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Aprovação popular</span>
        <span className="font-mono font-semibold">{value}% — {label}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function MunicipalPanel() {
  const { state, setActivePanel } = useGame();
  const { stats, budget, taxRate } = state;

  const orc = useMemo(
    () => calcularOrcamento(stats, budget, taxRate),
    [stats, budget, taxRate]
  );

  const saldoColor = orc.saldo >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <Dialog open={true} onOpenChange={() => setActivePanel('none')}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Orçamento Municipal</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <PopularityBar value={orc.popularidade} />

          <div className="grid grid-cols-2 gap-4">
            {/* Receita */}
            <Section title="Receita">
              <Row label="IPTU" value={orc.receita.iptu} color="text-green-400" />
              <Row label="ISS" value={orc.receita.iss} color="text-green-400" />
              <Row label="Taxas diversas" value={orc.receita.taxasDiversas} color="text-green-400" />
              <Row label="Repasse FPM" value={orc.receita.repasseFPM} color="text-green-400" />
              <div className="flex justify-between pt-1.5 border-t border-border">
                <span className="text-xs font-semibold">Total receita</span>
                <span className="font-mono text-xs text-green-400 font-semibold">
                  R${orc.receita.total.toLocaleString('pt-BR')}
                </span>
              </div>
            </Section>

            {/* Despesa */}
            <Section title="Despesa">
              <Row label="Saúde" value={orc.despesa.saude} color="text-red-400" />
              <Row label="Educação" value={orc.despesa.educacao} color="text-red-400" />
              <Row label="Saneamento" value={orc.despesa.saneamento} color="text-red-400" />
              <Row label="Segurança pública" value={orc.despesa.segurancaPublica} color="text-red-400" />
              <Row label="Obras e infra" value={orc.despesa.obras} color="text-red-400" />
              <Row label="Administração" value={orc.despesa.administracao} color="text-red-400" />
              <div className="flex justify-between pt-1.5 border-t border-border">
                <span className="text-xs font-semibold">Total despesa</span>
                <span className="font-mono text-xs text-red-400 font-semibold">
                  R${orc.despesa.total.toLocaleString('pt-BR')}
                </span>
              </div>
            </Section>
          </div>

          {/* Saldo */}
          <div className="flex justify-between items-center px-3 py-2 rounded bg-secondary/50 border border-border">
            <span className="text-sm font-semibold">Saldo mensal</span>
            <span className={`font-mono text-sm font-bold ${saldoColor}`}>
              {orc.saldo >= 0 ? '+' : ''}R${orc.saldo.toLocaleString('pt-BR')}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Caixa municipal: <span className="font-mono font-semibold">R${stats.money.toLocaleString('pt-BR')}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
