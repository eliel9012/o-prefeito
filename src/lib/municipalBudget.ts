/**
 * Serviço de cálculo de orçamento municipal brasileiro
 */

import { Stats, Budget } from '@/games/isocity/types/economy';
import { OrcamentoMunicipal, IndicadoresMunicipais, ReceitaMunicipal, DespesaMunicipal } from '@/games/isocity/types/municipal';

const FPM_PER_CAPITA = 30; // Valor mínimo per capita do FPM em R$

export class OrcamentoService {
  /**
   * Calcula o orçamento municipal com base nos stats atuais
   */
  static calcularOrcamento(
    stats: Stats,
    budget: Budget,
    taxRate: number,
    mes: number,
    ano: number
  ): OrcamentoMunicipal {
    const income = Math.max(0, stats.income);
    const pop = Math.max(0, stats.population);

    // Validação básica
    if (isNaN(income) || isNaN(pop)) {
      throw new Error('Dados de entrada inválidos para cálculo de orçamento');
    }

    // Cálculo de receita
    const receita = this.calcularReceita(income, pop);
    // Cálculo de despesa
    const despesa = this.calcularDespesa(budget);
    // Cálculo de indicadores
    const indicadores = this.calcularIndicadores(stats, receita.total, despesa.total, taxRate);

    return {
      receita,
      despesa,
      saldo: receita.total - despesa.total,
      indicadores,
      mes,
      ano
    };
  }

  private static calcularReceita(income: number, pop: number): ReceitaMunicipal {
    const iptu = Math.floor(income * 0.38);
    const iss = Math.floor(income * 0.28);
    const taxasDiversas = Math.floor(income * 0.10);
    const repasseFPM = Math.floor(pop * FPM_PER_CAPITA);
    const total = iptu + iss + taxasDiversas + repasseFPM;

    return {
      iptu,
      iss,
      taxasDiversas,
      repasseFPM,
      total
    };
  }

  private static calcularDespesa(budget: Budget): DespesaMunicipal {
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

    const subtotal = saude + educacao + saneamento + segurancaPublica + obras;
    const administracao = Math.floor(subtotal * 0.10);
    const total = subtotal + administracao;

    return {
      saude,
      educacao,
      saneamento,
      segurancaPublica,
      obras,
      administracao,
      total
    };
  }

  private static calcularIndicadores(
    stats: Stats,
    receitaTotal: number,
    despesaTotal: number,
    taxRate: number
  ): IndicadoresMunicipais {
    // Popularidade baseada em happiness com penalidades
    const deficitPenalty = receitaTotal < despesaTotal
      ? Math.min(30, Math.floor((despesaTotal - receitaTotal) / (despesaTotal || 1) * 30))
      : 0;
    const taxPenalty = taxRate > 15 ? Math.min(20, (taxRate - 15) * 2) : 0;
    const popularidade = Math.max(0, Math.min(100, Math.round(stats.happiness - deficitPenalty - taxPenalty)));

    // Satisfação com serviços públicos
    const servicos = (stats.health + stats.safety + stats.environment) / 3;

    // Estabilidade fiscal
    const estabilidade = receitaTotal > 0
      ? Math.min(100, Math.max(0, Math.floor((receitaTotal - despesaTotal) / (receitaTotal / 100) + 50)))
      : 0;

    return {
      popularidade,
      satisfacaoServicos: Math.round(servicos),
      estabilidadeFiscal: estabilidade
    };
  }
}
