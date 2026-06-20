'use client';

import React, { useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OrcamentoService } from '@/lib/municipalBudget';
import { IndicadoresMunicipais } from '@/games/isocity/types/municipal';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

function Row({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`font-mono text-xs ${color ?? 'text-foreground'}`}>
        {formatCurrency(value)}
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

function IndicatorsSection({ indicadores }: { indicadores: IndicadoresMunicipais }) {
  const getColor = (value: number) => value >= 70 ? 'text-green-500' : value >= 40 ? 'text-amber-500' : 'text-red-500';
  const getLabel = (value: number) =>
    value >= 70 ? 'Ótimo' : value >= 55 ? 'Bom' : value >= 40 ? 'Regular' : value >= 25 ? 'Ruim' : 'Péssimo';

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-xs">Aprovação</span>
          <span className={`font-mono text-xs ${getColor(indicadores.popularidade)}`}>
            {indicadores.popularidade}%
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div className={`h-full ${getColor(indicadores.popularidade).replace('text', 'bg')}`} style={{ width: `${indicadores.popularidade}%` }} />
        </div>
        <span className="text-[10px] text-muted-foreground">{getLabel(indicadores.popularidade)}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-xs">Serviços</span>
          <span className={`font-mono text-xs ${getColor(indicadores.satisfacaoServicos)}`}>
            {indicadores.satisfacaoServicos}%
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div className={`h-full ${getColor(indicadores.satisfacaoServicos).replace('text', 'bg')}`} style={{ width: `${indicadores.satisfacaoServicos}%` }} />
        </div>
        <span className="text-[10px] text-muted-foreground">{getLabel(indicadores.satisfacaoServicos)}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-xs">Estabilidade</span>
          <span className={`font-mono text-xs ${getColor(indicadores.estabilidadeFiscal)}`}>
            {indicadores.estabilidadeFiscal}%
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div className={`h-full ${getColor(indicadores.estabilidadeFiscal).replace('text', 'bg')}`} style={{ width: `${indicadores.estabilidadeFiscal}%` }} />
        </div>
        <span className="text-[10px] text-muted-foreground">{getLabel(indicadores.estabilidadeFiscal)}</span>
      </div>
    </div>
  );
}

export function MunicipalPanel() {
  const { state, setActivePanel } = useGame();
  const { stats, budget, taxRate, month, year } = state;

  const orcamento = useMemo(() => {
    return OrcamentoService.calcularOrcamento(stats, budget, taxRate, month, year);
  }, [stats, budget, taxRate, month, year]);

  const saldoColor = orcamento.saldo >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <Dialog open={true} onOpenChange={() => setActivePanel('none')}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Orçamento Municipal - {month}/{year}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <IndicatorsSection indicadores={orcamento.indicadores} />

          <div className="grid grid-cols-2 gap-4">
            {/* Receita */}
            <Section title="Receita">
              <Row label="IPTU" value={orcamento.receita.iptu} color="text-green-400" />
              <Row label="ISS" value={orcamento.receita.iss} color="text-green-400" />
              <Row label="Taxas diversas" value={orcamento.receita.taxasDiversas} color="text-green-400" />
              <Row label="Repasse FPM" value={orcamento.receita.repasseFPM} color="text-green-400" />
              <div className="flex justify-between pt-1.5 border-t border-border">
                <span className="text-xs font-semibold">Total receita</span>
                <span className="font-mono text-xs text-green-400 font-semibold">
                  {formatCurrency(orcamento.receita.total)}
                </span>
              </div>
            </Section>

            {/* Despesa */}
            <Section title="Despesa">
              <Row label="Saúde" value={orcamento.despesa.saude} color="text-red-400" />
              <Row label="Educação" value={orcamento.despesa.educacao} color="text-red-400" />
              <Row label="Saneamento" value={orcamento.despesa.saneamento} color="text-red-400" />
              <Row label="Segurança pública" value={orcamento.despesa.segurancaPublica} color="text-red-400" />
              <Row label="Obras e infra" value={orcamento.despesa.obras} color="text-red-400" />
              <Row label="Administração" value={orcamento.despesa.administracao} color="text-red-400" />
              <div className="flex justify-between pt-1.5 border-t border-border">
                <span className="text-xs font-semibold">Total despesa</span>
                <span className="font-mono text-xs text-red-400 font-semibold">
                  {formatCurrency(orcamento.despesa.total)}
                </span>
              </div>
            </Section>
          </div>

          {/* Saldo */}
          <div className="flex justify-between items-center px-3 py-2 rounded bg-secondary/50 border border-border">
            <span className="text-sm font-semibold">Saldo mensal</span>
            <span className={`font-mono text-sm font-bold ${saldoColor}`}>
              {orcamento.saldo >= 0 ? '+' : ''}{formatCurrency(orcamento.saldo)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Caixa municipal: <span className="font-mono font-semibold">{formatCurrency(stats.money)}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
