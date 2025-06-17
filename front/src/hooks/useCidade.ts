import { useCidadeContext } from '../contexts/CidadeContext';
import { useSetorCensitarioContext } from '../contexts/SetorCensitarioContext';

export const useCidade = () => {
  const cidadeContext = useCidadeContext();
  const setorContext = useSetorCensitarioContext();

  const changeCidade = async (cidadeId: number) => {
    // Evitar recarregar a mesma cidade
    if (cidadeContext.selectedCidade?.id === cidadeId) {
      return;
    }

    const cidade = cidadeContext.cidades.find(c => c.id === cidadeId);
    
    if (cidade) {
      try {
        // Limpar setores antigos
        setorContext.clearSetores();
        
        // Selecionar nova cidade
        cidadeContext.selectCidade(cidade);
        
        // Buscar novos setores
        await setorContext.fetchSetoresByCidade(cidade.nome);
      } catch (error) {
        console.error('Erro ao trocar cidade:', error);
      }
    }
  };

  return {
    ...cidadeContext,
    changeCidade,
    setores: setorContext.setores,
    setoresLoading: setorContext.loading,
    setoresError: setorContext.error
  };
};
