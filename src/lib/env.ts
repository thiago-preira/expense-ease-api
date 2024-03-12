import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().min(1).url(),
	PORT: z.coerce.number().int().positive().default(3000),
	ENV: z
		.union([z.literal("local"), z.literal("development"), z.literal("testing"), z.literal("production")])
		.default("development"),
});

console.log("reading");
const parsed = envSchema.safeParse(Bun.env);
if (!parsed.success) {
	console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 4));
	process.exit(1);
}

declare global {
	namespace NodeJS {
		interface Env extends z.infer<typeof envSchema> {}
	}
}
