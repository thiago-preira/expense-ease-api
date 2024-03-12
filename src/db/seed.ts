import * as schema from "./schema";
import chalk from "chalk";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connection = postgres(Bun.env.DATABASE_URL, { max: 1 });

const db = drizzle(connection, {
	schema,
});

const main = async () => {
	try {
		/**
		 * Reset database
		 */
		await db.delete(schema.transactions);
		await db.delete(schema.categories);
		await db.delete(schema.rules);
		await db.delete(schema.wallets);
		await db.delete(schema.segments);
		console.log(chalk.yellowBright("✔️ Database reset!"));

		await db.insert(schema.wallets).values([
			{
				id: 1,
				name: "AIB",
			},
			{
				id: 2,
				name: "BOI CREDIT CARD",
			},
		]);

		await db.insert(schema.segments).values([
			{
				id: 1,
				name: "Essentials",
				icon: "home",
				percentage: "50.0",
			},
			{
				id: 2,
				name: "Savings",
				icon: "piggy-bank",
				percentage: "20.0",
			},
			{
				id: 3,
				name: "Wants",
				icon: "drama",
				percentage: "30",
			},
		]);

		await db.insert(schema.categories).values([
			{
				id: 1,
				title: "Fees",
				icon: "receipt-euro",
				segmentId: 1,
			},
			{
				id: 2,
				title: "Car",
				icon: "car-front",
				segmentId: 1,
			},
			{
				id: 3,
				title: "Donations",
				icon: "heart",
				segmentId: 3,
			},
			{
				id: 4,
				title: "Transfers",
				icon: "send",
				segmentId: 3,
			},
			{
				id: 5,
				title: "Food & Drink",
				icon: "utensils",
				segmentId: 3,
			},
			{
				id: 6,
				title: "Gifts",
				icon: "gift",
				segmentId: 3,
			},
			{
				id: 7,
				title: "Groceries",
				icon: "croissant",
				segmentId: 1,
			},
			{
				id: 8,
				title: "Healthcare",
				icon: "ambulance",
				segmentId: 1,
			},
			{
				id: 9,
				title: "Home",
				icon: "home",
				segmentId: 1,
			},
			{
				id: 10,
				title: "Other",
				icon: "circle-help",
				segmentId: 3,
			},
			{
				id: 11,
				title: "Pet",
				icon: "paw-print",
				segmentId: 1,
			},
			{
				id: 12,
				title: "Shopping",
				icon: "shopping-bag",
				segmentId: 3,
			},
			{
				id: 13,
				title: "Subscription",
				icon: "tv",
				segmentId: 3,
			},
			{
				id: 14,
				title: "Transport",
				icon: "train-front",
				segmentId: 1,
			},
			{
				id: 15,
				title: "Travel",
				icon: "plane",
				segmentId: 3,
			},
			{
				id: 16,
				title: "Education",
				icon: "graduation-cap",
				segmentId: 2,
			},
			{
				id: 17,
				title: "Pension",
				icon: "tree-palm",
				segmentId: 2,
			},
			{
				id: 18,
				title: "Savings",
				icon: "piggy-bank",
				segmentId: 2,
			},
			{
				id: 19,
				title: "Salary",
				icon: "badge-euro",
				segmentId: null,
			},
			{
				id: 20,
				title: "Insurance Payout",
				icon: "shield-plus",
				segmentId: null,
			},
			{
				id: 21,
				title: "Revenue",
				icon: "landmark",
				segmentId: null,
			},
			{
				id: 22,
				title: "Extra Income",
				icon: "hand-coins",
				segmentId: null,
			},
		]);
		console.log(chalk.yellowBright("✔️ Created orders!"));

		console.log(chalk.greenBright("Database seeded successfully!"));

		process.exit(0);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to seed database");
	}
};

main();
