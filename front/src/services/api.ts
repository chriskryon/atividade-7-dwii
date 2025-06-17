import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001",
});


// Métodos da API de censo
export const censoApi = {
  // Buscar setores censitários por cidade
  list: async (city: string) => {
    console.log(`censoApi.list chamado com cidade: ${city}`);
    console.log(`URL da requisição: ${api.defaults.baseURL}/censo?city=${city}`);
    
    try {
      const response = await api.get(`/censo`, {
        params: { city }
      });

      console.log("Response from censoApi.list:", response.data);
      console.log("Status da resposta:", response.status);
      return response.data;
    } catch (error: any) {
      console.error("Erro na requisição censoApi.list:", error);
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

export default api;
