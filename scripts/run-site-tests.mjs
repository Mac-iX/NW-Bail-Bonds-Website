import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const testEnvironment = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: "https://example.test",
  NEXT_TELEMETRY_DISABLED: "1",
};

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: testEnvironment,
      stdio: "inherit",
      ...options,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => resolve({ code, signal }));
  });
}

async function getAvailablePort() {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not allocate a test port.");
  server.close();
  await once(server, "close");
  return address.port;
}

async function waitForServer(baseUrl, server) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next.js exited before tests started (code ${server.exitCode}).`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for the Next.js test server.");
}

const build = await run(process.execPath, [nextCli, "build"]);
if (build.code !== 0) process.exit(build.code ?? 1);

const port = await getAvailablePort();
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [nextCli, "start", "-H", "127.0.0.1", "-p", String(port)], {
  cwd: projectRoot,
  env: testEnvironment,
  stdio: "inherit",
});

let testResult;
try {
  await waitForServer(baseUrl, server);
  testResult = await run(process.execPath, ["--test", "tests/rendered-html.test.mjs"], {
    env: { ...testEnvironment, TEST_BASE_URL: baseUrl },
  });
} finally {
  if (server.exitCode === null) {
    server.kill("SIGTERM");
    await once(server, "exit");
  }
}

if (!testResult || testResult.code !== 0) process.exit(testResult?.code ?? 1);
