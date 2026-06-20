/**
 * Tipos de orçamento municipal brasileiro.
 * Valores em Reais (R$)
 */

export interface ReceitaMunicipal {
  iptu: number; // Imposto Predial e Territorial Urbano (em R$)
  iss: number; // Imposto Sobre Serviços (em R$)
  taxasDiversas: number; // Taxas de licença, coleta etc. (em R$)
  repasseFPM: number; // Fundo de Participação dos Municípios (em R$)
  total: number; // Total da receita (em R$)
}

export interface DespesaMunicipal {
  saude: number; // Despesas com saúde (em R$)
  educacao: number; // Despesas com educação (em R$)
  saneamento: number; // Despesas com saneamento (em R$)
  segurancaPublica: number; // Despesas com segurança pública (em R$)
  obras: number; // Despesas com obras e infraestrutura (em R$)
  administracao: number; // Despesas administrativas (em R$)
  total: number; // Total da despesa (em R$)
}

export interface IndicadoresMunicipais {
  popularidade: number; // 0-100
  satisfacaoServicos: number; // 0-100
  estabilidadeFiscal: number; // 0-100
}

export interface OrcamentoMunicipal {
  receita: ReceitaMunicipal;
  despesa: DespesaMunicipal;
  saldo: number; // receita.total - despesa.total (em R$)
  indicadores: IndicadoresMunicipais;
  mes: number;
  ano: number;
}

/**
 * Eventos municipais brasileiros
 */
export interface EventoMunicipal {
  id: string;
  categoria: 'infraestrutura' | 'social' | 'economico' | 'ambiental' | 'administrativo';
  titulo: string;
  descricao: string;
  icone: string;
  impacto: {
    popularidade?: number; // -100 a 100
    financas?: number; // em R$
    servicos?: number; // -100 a 100
  };
  urgencia: 'baixa' | 'media' | 'alta';
}
