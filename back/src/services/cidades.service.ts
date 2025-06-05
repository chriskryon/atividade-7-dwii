import pool from "../controllers/db";

export const cidadeService = {
	async getAllCidades() {
		try {
			const result = await pool.query(`
        SELECT id, nome, ST_AsGeoJSON(geom) as geom 
        FROM cidades
      `);

			return result.rows.map((row) => ({
				id: row.id,
				nome: row.nome,
				geom: JSON.parse(row.geom),
			}));
		} catch (error) {
			console.error("Erro ao buscar cidades:", error);
			throw error;
		}
	},

	async getIncidenciaForCidade(cidadeId: number) {
		try {
			const cidadeResult = await pool.query(
				`
        SELECT id, nome, geom 
        FROM cidades 
        WHERE id = $1
      `,
				[cidadeId],
			);

			if (cidadeResult.rows.length === 0) {
				return null;
			}

			const incidenciaResult = await pool.query(
				`
        SELECT
					i.id, i.lon, i.lat, i.anual,
					i.jan, i.fev, i.mar, i.abr, i.mai, i.jun, i.jul, i.ago, i.set, i.out, i.nov, i.dez, 
					ST_AsGeoJSON(i.geom) as geom,
					ST_AsGeoJSON(ST_Centroid(i.geom)) as centroid_geom
        FROM incidencias i
				JOIN cidades c ON ST_Intersects(i.geom, c.geom)
				WHERE c.id = $1
      `,
				[cidadeId],
			);

			if (incidenciaResult.rows.length === 0) {
				return {
					cidade: {
						id: cidadeResult.rows[0].id,
						nome: cidadeResult.rows[0].nome,
					},
					mensagem: "Não há dados de incidência para esta cidade",
				};
			}

			const incidencia = incidenciaResult.rows[0];
			return {
				cidade: {
					id: cidadeResult.rows[0].id,
					nome: cidadeResult.rows[0].nome,
				},
				incidencia: {
					id: incidencia.id,
					lon: incidencia.lon,
					lat: incidencia.lat,
					anual: incidencia.anual,
					mensal: {
						jan: incidencia.jan,
						fev: incidencia.fev,
						mar: incidencia.mar,
						abr: incidencia.abr,
						mai: incidencia.mai,
						jun: incidencia.jun,
						jul: incidencia.jul,
						ago: incidencia.ago,
						set: incidencia.set,
						out: incidencia.out,
						nov: incidencia.nov,
						dez: incidencia.dez,
					},
					geom: JSON.parse(incidencia.geom),
					centroid_geom: JSON.parse(incidencia.centroid_geom),
				},
			};
		} catch (error) {
			console.error("Erro ao buscar incidência para cidade:", error);
			throw error;
		}
	},

	async getCidadeInfo(cidadeId: number) {
		try {
			// Using ST_Centroid to get the center point of the geometry
			const result = await pool.query(
				`
        SELECT 
          id,
          nome,
          ST_AsGeoJSON(ST_Centroid(geom)) as geometry
        FROM 
          cidades
        WHERE 
          id = $1
      `,
				[cidadeId],
			);

			if (result.rows.length === 0) {
				return null;
			}

			const cidade = result.rows[0];

			// Parse the GeoJSON string to a proper JSON object
			return {
				id: cidade.gid,
				nome: cidade.nome,
				geometry: JSON.parse(cidade.geometry),
			};
		} catch (error) {
			console.error("Erro ao buscar informações da cidade:", error);
			throw new Error("Erro ao buscar informações da cidade");
		}
	},

	async getAllCidadesInfo() {
		try {
			// Get all cities with centered geometry
			const result = await pool.query(`
        SELECT 
          id,
          nome,
          ST_AsGeoJSON(ST_Centroid(geom)) as geometry
        FROM 
          cidades
      `);

			if (result.rows.length === 0) {
				return [];
			}

			// Parse the GeoJSON string to proper JSON objects for each city
			return result.rows.map((cidade) => ({
				id: cidade.id,
				nome: cidade.nome,
				geometry: JSON.parse(cidade.geometry),
			}));
		} catch (error) {
			console.error("Erro ao buscar informações de todas as cidades:", error);
			throw new Error("Erro ao buscar informações de todas as cidades");
		}
	},
};
