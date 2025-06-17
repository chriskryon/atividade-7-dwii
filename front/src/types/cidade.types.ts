export interface Cidade {
  id: number;
  nome: string;
  geometry: {
    type: string;
    coordinates: number[]; // Changed from [number, number] to number[]
  };
}

export interface CidadeContextType {
  selectedCidade: Cidade | null;
  cidades: Cidade[];
  selectCidade: (cidade: Cidade) => void;
  loading: boolean;
  error: string | null;
}

export interface SetorCensitarioContextType {
  setores: any[];
  selectedSetor: any | null;
  loading: boolean;
  error: string | null;
  fetchSetoresByCidade: (cidadeNome: string) => Promise<void>;
  selectSetor: (setor: any) => void;
  fetchSetorByPoint: (x: number, y: number) => Promise<void>;
  clearSetores: () => void;
}
