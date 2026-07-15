import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ausentes no .env.local");
}

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Falha na conexão com o Supabase:", error.message);
    process.exit(1);
  }

  console.log("Conexão com o Supabase OK.");
  console.log("Buckets encontrados:", data.length);
}

main();
