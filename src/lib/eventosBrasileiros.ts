/**
 * Serviço de eventos municipais brasileiros
 */

import { GameState } from '@/games/isocity/types';
import { EventoMunicipal } from '@/games/isocity/types/municipal';

const MESES_CHUVA = [1, 2, 11, 12]; // Verão brasileiro

export class EventoService {
  private static eventos: EventoMunicipal[] = [
    {
      id: 'buraco_na_rua',
      categoria: 'infraestrutura',
      titulo: 'Buraco na via!',
      descricao: 'Moradores reclamam de buraco na pista. Trânsito lento e reclamações nas redes sociais.',
      icone: '🕳️',
      impacto: {
        popularidade: -5,
        servicos: -3
      },
      urgencia: 'media'
    },
    {
      id: 'enchente',
      categoria: 'infraestrutura',
      titulo: 'Enchente na cidade',
      descricao: 'Chuvas fortes causam alagamentos em bairros de baixa altitude. Defesa Civil em alerta.',
      icone: '🌊',
      impacto: { popularidade: -10, financas: -50000 },
      urgencia: 'alta'
    },
    {
      id: 'obra_parada',
      categoria: 'infraestrutura',
      titulo: 'Obra paralisada',
      descricao: 'Empresa contratada paralisa obra por falta de pagamento. Prazo vencido há 3 meses.',
      icone: '🏗️',
      impacto: { popularidade: -8, servicos: -5 },
      urgencia: 'media'
    },
    {
      id: 'licitacao_emergencial',
      categoria: 'administrativo',
      titulo: 'Licitação emergencial',
      descricao: 'Vereadores questionam dispensa de licitação. TCM solicita prestação de contas em 15 dias.',
      icone: '📋',
      impacto: { popularidade: -5 },
      urgencia: 'media'
    },
    {
      id: 'camara_pressiona',
      categoria: 'administrativo',
      titulo: 'Câmara convoca prefeito',
      descricao: 'Vereadores da oposição convocam prefeito para explicar gastos. Sessão extraordinária marcada.',
      icone: '🏛️',
      impacto: { popularidade: -12 },
      urgencia: 'alta'
    },
    {
      id: 'ministerio_publico_recomenda',
      categoria: 'social',
      titulo: 'Recomendação do MP',
      descricao: 'Ministério Público emite recomendação sobre acesso à saúde pública. Prazo de 30 dias para resposta.',
      icone: '⚖️',
      impacto: { popularidade: -6, servicos: -3 },
      urgencia: 'media'
    },
    {
      id: 'crise_saneamento',
      categoria: 'infraestrutura',
      titulo: 'Crise de saneamento',
      descricao: "Falta d'água em bairros periféricos. SAAE não tem previsão de retorno da pressão normal.",
      icone: '🚰',
      impacto: { popularidade: -10, servicos: -8 },
      urgencia: 'alta'
    },
    {
      id: 'fiscalizacao_ambiental',
      categoria: 'ambiental',
      titulo: 'Fiscalização ambiental',
      descricao: 'IBAMA autua município por descumprimento de normas ambientais. Multa a ser contestada.',
      icone: '🌿',
      impacto: { popularidade: -4, financas: -20000 },
      urgencia: 'baixa'
    },
    {
      id: 'lgpd_municipal',
      categoria: 'administrativo',
      titulo: 'LGPD Municipal',
      descricao: 'Câmara aprova "Política de Privacidade Municipal". Moradores devem aceitar cookies da prefeitura para acessar serviços online. Consulta pública em 30 dias.',
      icone: '🍪',
      impacto: { popularidade: -2 },
      urgencia: 'baixa'
    },
  ];

  /**
   * Sorteia eventos mensais com base no estado atual
   */
  static sortearEventosMensais(state: GameState): EventoMunicipal[] {
    // Filtra eventos que podem ocorrer no estado atual
    const eventosCandidatos = this.eventos.filter(evento => {
      // Adicionar condições específicas para cada evento aqui
      switch (evento.id) {
        case 'enchente':
          return MESES_CHUVA.includes(state.month);
        case 'obra_parada':
          return state.stats.money < 5000;
        case 'camara_pressiona':
          return (state.stats.happiness ?? 50) < 45;
        case 'ministerio_publico_recomenda':
          return state.budget.health.funding < 60;
        case 'crise_saneamento':
          return state.budget.water.funding < 50;
        case 'fiscalizacao_ambiental':
          return state.stats.environment < 35;
        case 'lgpd_municipal':
          return state.year === 1 && state.month === 1;
        default:
          return true;
      }
    });

    // Ordena por urgência (alta probabilidade para eventos urgentes)
    const eventosOrdenados = [...eventosCandidatos].sort((a, b) => {
      const prioridadeA = a.urgencia === 'alta' ? 3 : a.urgencia === 'media' ? 2 : 1;
      const prioridadeB = b.urgencia === 'alta' ? 3 : b.urgencia === 'media' ? 2 : 1;
      return prioridadeB - prioridadeA;
    });

    // Seleciona até 2 eventos com base em probabilidade
    const eventosSelecionados: EventoMunicipal[] = [];
    const probabilidades = [0.7, 0.3]; // 70% para primeiro evento, 30% para segundo

    for (let i = 0; i < probabilidades.length && i < eventosOrdenados.length; i++) {
      if (Math.random() < probabilidades[i]) {
        eventosSelecionados.push(eventosOrdenados[i]);
      }
    }

    return eventosSelecionados;
  }

  /**
   * Obtém um evento pelo ID
   */
  static getEventoPorId(id: string): EventoMunicipal | undefined {
    return this.eventos.find(evento => evento.id === id);
  }

  /**
   * Obtém todos os eventos de uma categoria
   */
  static getEventosPorCategoria(categoria: string): EventoMunicipal[] {
    return this.eventos.filter(evento => evento.categoria === categoria);
  }
}
