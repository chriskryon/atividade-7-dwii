export interface Cidade {
	id: number;
	nome: string;
	geometry: {
		type: string;
		coordinates: number[];
	};
}
