/**
 * Eventos municipais brasileiros.
 * Disparados mensalmente via hook — sem tocar na simulação.
 */

import { GameState } from '@/games/isocity/types';

export interface EventoBrasileiro {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  /** 0–1 base probability per month */
  probabilidade: number;
  /** Return true if event can fire given state */
  condicao?: (state: GameState) => boolean;
}

const MESES_CHUVA = [1, 2, 11, 12]; // Verão brasileiro

export const EVENTOS_BRASILEIROS: EventoBrasileiro[] = [
  {
    id: 'buraco_na_rua',
    titulo: 'Buraco na via!',
    descricao: 'Moradores reclamam de buraco na pista. Trânsito lento e reclamações nas redes sociais.',
    icone: '🕳️',
    probabilidade: 0.55,
  },
  {
    id: 'enchente',
    titulo: 'Enchente na cidade',
    descricao: 'Chuvas fortes causam alagamentos em bairros de baixa altitude. Defesa Civil em alerta.',
    icone: '🌊',
    probabilidade: 0.30,
    condicao: (s) => MESES_CHUVA.includes(s.month),
  },
  {
    id: 'obra_parada',
    titulo: 'Obra paralisada',
    descricao: 'Empresa contratada paralisa obra por falta de pagamento. Prazo vencido há 3 meses.',
    icone: '🏗️',
    probabilidade: 0.35,
    condicao: (s) => s.stats.money < 5000,
  },
  {
    id: 'licitacao_emergencial',
    titulo: 'Licitação emergencial',
    descricao: 'Vereadores questionam dispensa de licitação. TCM solicita prestação de contas em 15 dias.',
    icone: '📋',
    probabilidade: 0.25,
  },
  {
    id: 'camara_pressiona',
    titulo: 'Câmara convoca prefeito',
    descricao: 'Vereadores da oposição convocam prefeito para explicar gastos. Sessão extraordinária marcada.',
    icone: '🏛️',
    probabilidade: 0.40,
    condicao: (s) => (s.stats.happiness ?? 50) < 45,
  },
  {
    id: 'ministerio_publico_recomenda',
    titulo: 'Recomendação do MP',
    descricao: 'Ministério Público emite recomendação sobre acesso à saúde pública. Prazo de 30 dias para resposta.',
    icone: '⚖️',
    probabilidade: 0.18,
    condicao: (s) => s.budget.health.funding < 60,
  },
  {
    id: 'crise_saneamento',
    titulo: 'Crise de saneamento',
    descricao: "Falta d’água em bairros periféricos. SAAE não tem previsão de retorno da pressão normal.",
    icone: '🚰',
    probabilidade: 0.28,
    condicao: (s) => s.budget.water.funding < 50,
  },
  {
    id: 'fiscalizacao_ambiental',
    titulo: 'Fiscalização ambiental',
    descricao: 'IBAMA e CETESB notificam prefeitura por desmatamento irregular. Multa pode chegar a R$50 mil.',
    icone: '🌿',
    probabilidade: 0.20,
    condicao: (s) => s.stats.environment < 35,
  },
];

/**
 * Sorteia quais eventos disparam neste mês.
 * Máx 2 por mês para não sobrecarregar o jogador.
 */
export function sortearEventosMensais(state: GameState): EventoBrasileiro[] {
  const candidatos = EVENTOS_BRASILEIROS.filter(
    (e) => (!e.condicao || e.condicao(state)) && Math.random() < e.probabilidade
  );
  // Shuffle and cap at 2
  for (let i = candidatos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidatos[i], candidatos[j]] = [candidatos[j], candidatos[i]];
  }
  return candidatos.slice(0, 2);
}
