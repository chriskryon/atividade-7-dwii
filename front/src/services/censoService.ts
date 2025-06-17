import api from "./api";

export const censoService = {
  // Buscar setores censitários por cidade
  list: async (city: string) => {
    console.log(`censoService.list chamado com cidade: ${city}`);
    console.log(`URL da requisição: ${api.defaults.baseURL}/censo?city=${city}`);
    
    try {
      const response = await api.get(`/censo`, {
        params: { city }
      });

      console.log("Response from censoService.list:", response.data);
      console.log("Status da resposta:", response.status);
      return response.data;
    } catch (error: any) {
      console.error("Erro na requisição censoService.list:", error);
      console.error("Resposta do erro:", error.response?.data);
      console.error("Status do erro:", error.response?.status);
      throw error;
    }
  },

  // Buscar setor censitário por ponto
  getByPoint: async (x: number, y: number) => {
    const response = await api.get(`/censo/point`, {
      params: { x, y }
    });
    return response.data;
  }
};
