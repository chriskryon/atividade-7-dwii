import fs from "node:fs";
import path from "node:path";

import { cidadeService } from "../services/cidades.service";

/**
 * Generates a TypeScript file with cities data
 */
async function generateCidadesFile() {
	try {
		console.log("Fetching cities data from database...");
		const cidades = await cidadeService.getAllCidadesInfo();

		const outputPath = path.join(__dirname, "../../src/data/cidades.ts");

		// Create directory if it doesn't exist
		const dir = path.dirname(outputPath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		// Format the data as a TypeScript object
		const fileContent = `// This file was auto-generated
export const cidades = ${JSON.stringify(cidades, null, 2)} as const;

export type Cidade = typeof cidades[number];
`;

		// Write to file
		fs.writeFileSync(outputPath, fileContent);

		console.log(`Cities data successfully written to ${outputPath}`);
	} catch (error) {
		console.error("Error generating cities file:", error);
	} finally {
		// Close database connections if needed
		process.exit(0);
	}
}

// Execute the function if this file is run directly
if (require.main === module) {
	generateCidadesFile();
}

export { generateCidadesFile };
