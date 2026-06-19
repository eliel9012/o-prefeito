/**
 * Calcula o orçamento municipal brasileiro a partir dos Stats existentes.
 * Não modifica a simulação — apenas deriva valores para exibição.
 */

import { Stats, Budget } from '@/games/isocity/types/economy';
import { OrcamentoMunicipal, ReceitaMunicipal, DespesaMunicipal } from '@/games/isocity/types/municipal';

export function calcularOrcamento(
  stats: Stats,
  budget: Budget,
  taxRate: number
): OrcamentoMunicipal {
  const income = stats.income;
  const pop = stats.population;

  // Receita: fatias do income total + repasse FPM baseado em população
  const iptu = Math.floor(income * 0.38);
  const iss = Math.floor(income * 0.28);
  const taxasDiversas = Math.floor(income * 0.10);
  // FPM: simulação simplificada — R$30/habitante/mês (cota per capita mínima)
  const repasseFPM = Math.floor(pop * 30);
  const receitaTotal = iptu + iss + taxasDiversas + repasseFPM;

  // Despesa: mapear categorias do Budget para equivalentes brasileiros
  const saude = Math.floor(budget.health.cost * budget.health.funding / 100);
  const educacao = Math.floor(budget.education.cost * budget.education.funding / 100);
  const saneamento = Math.floor(
    budget.water.cost * budget.water.funding / 100 +
    budget.power.cost * budget.power.funding / 100 * 0.4
  );
  const segurancaPublica = Math.floor(
    budget.police.cost * budget.police.funding / 100 +
    budget.fire.cost * budget.fire.funding / 100
  );
  const obras = Math.floor(
    budget.transportation.cost * budget.transportation.funding / 100 +
    budget.parks.cost * budget.parks.funding / 100 +
    budget.power.cost * budget.power.funding / 100 * 0.6
  );
  // Administração: 10% do total das demais despesas
  const subtotal = saude + educacao + saneamento + segurancaPublica + obras;
  const administracao = Math.floor(subtotal * 0.10);
  const despesaTotal = subtotal + administracao;

  // Popularidade: baseada em happiness + penalidade por déficit
  const deficitPenalty = receitaTotal < despesaTotal
    ? Math.min(30, Math.floor((despesaTotal - receitaTotal) / (despesaTotal || 1) * 30))
    : 0;
  const taxPenalty = taxRate > 15 ? Math.min(20, (taxRate - 15) * 2) : 0;
  const popularidade = Math.max(0, Math.min(100, Math.round(stats.happiness - deficitPenalty - taxPenalty)));

  const receita: ReceitaMunicipal = { iptu, iss, taxasDiversas, repasseFPM, total: receitaTotal };
  const despesa: DespesaMunicipal = { saude, educacao, saneamento, segurancaPublica, obras, administracao, total: despesaTotal };

  return { receita, despesa, saldo: receitaTotal - despesaTotal, popularidade };
}
