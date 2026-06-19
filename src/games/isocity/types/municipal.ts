/**
 * Tipos de orçamento municipal brasileiro.
 * Derivados dos Stats existentes — não substitui o sistema de simulação.
 */

export interface ReceitaMunicipal {
  iptu: number;        // Imposto Predial e Territorial Urbano
  iss: number;         // Imposto Sobre Serviços
  taxasDiversas: number; // Taxas de licença, coleta etc.
  repasseFPM: number;  // Fundo de Participação dos Municípios
  total: number;
}

export interface DespesaMunicipal {
  saude: number;
  educacao: number;
  saneamento: number;
  segurancaPublica: number;
  obras: number;
  administracao: number;
  total: number;
}

export interface OrcamentoMunicipal {
  receita: ReceitaMunicipal;
  despesa: DespesaMunicipal;
  saldo: number; // receita.total - despesa.total
  popularidade: number; // 0–100
}
