import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const BlueprintSchema = z.object({
  pages: z.array(z.object({ route: z.string() })),
  theme: z.object({ primary: z.string() }),
});

export type Blueprint = z.infer<typeof BlueprintSchema>;

export async function getBlueprint(): Promise<Blueprint> {
  const filePath = path.join(process.cwd(), "blueprint.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(fileContent);
  return BlueprintSchema.parse(json);
}
