export interface IncidenciaData {
	cidade: {
		id: number;
		nome: string;
	};
	incidencia?: {
		id: number;
		lon: number;
		lat: number;
		anual: number;
		mensal: {
			jan: number;
			fev: number;
			mar: number;
			abr: number;
			mai: number;
			jun: number;
			jul: number;
			ago: number;
			set: number;
			out: number;
			nov: number;
			dez: number;
		};
		geom: {
			type: string;
			coordinates: number[][][];
		};
		centroid_geom?: {
			type: string;
			coordinates: number[];
		};
	};
	mensagem?: string;
}
