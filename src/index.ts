import { loadEnv } from "./env";
import { helloGroq } from "./provider";

const main = async () => {
  loadEnv();

  try {
    const result = await helloGroq();

    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
