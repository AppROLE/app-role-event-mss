import { envs } from "../../src/envs";

const githubRef = envs.GITHUB_REF || "";
let stage = "";
if (githubRef.includes("prod")) {
  stage = "PROD";
} else if (githubRef.includes("homolog")) {
  stage = "HOMOLOG";
} else if (githubRef.includes("dev")) {
  stage = "DEV";
} else {
  stage = "TEST";
}

export { stage };
