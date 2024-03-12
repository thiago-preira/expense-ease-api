import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import chalk from "chalk";

const connection = postgres(Bun.env.DATABASE_URL, { max: 1 });

const db = drizzle(connection);

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "./src/db/migrations",
		});
		console.log(chalk.greenBright("Migrations applied successfully!"));
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await connection.end();
	}
};

main();
