import { relations } from "drizzle-orm";
import { serial, text, timestamp, integer, pgTable, date, boolean, pgEnum, decimal } from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("type", ["CREDIT", "DEBIT"]);

export const wallets = pgTable("wallets", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const segments = pgTable("segments", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	icon: text("icon").notNull(),
	percentage: decimal("percentage").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	title: text("name").notNull(),
	icon: text("icon").notNull(),
	segmentId: integer("segment_id").references(() => segments.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const transactions = pgTable("transactions", {
	id: serial("id").primaryKey(),
	description: text("description").notNull(),
	extraInfo: text("extra_info").notNull(),
	date: date("date").notNull(),
	type: transactionTypeEnum("type").notNull().default("DEBIT"),
	categoryId: integer("category_id").references(() => categories.id),
	walletId: integer("wallet_id").references(() => wallets.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const rules = pgTable("rules", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	expression: text("expression").notNull(),
	value: text("value").notNull(),
	active: boolean("active").notNull().default(true),
	categoryId: integer("category_id").references(() => categories.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
	segment: one(segments, { fields: [categories.segmentId], references: [segments.id] }),
	transaction: many(transactions),
	rule: many(rules),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
	category: one(categories, { fields: [transactions.categoryId], references: [categories.id] }),
	wallet: one(wallets, { fields: [transactions.walletId], references: [wallets.id] }),
}));

export const walletsRelations = relations(wallets, ({ many }) => ({
	transaction: many(transactions),
}));

export const rulesRelations = relations(rules, ({ one }) => ({
	category: one(categories, { fields: [rules.categoryId], references: [categories.id] }),
}));
