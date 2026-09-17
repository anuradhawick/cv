import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pythonScript = path.join(__dirname, 'sync_scholar.py');

const proc = spawn('python3', [pythonScript, ...process.argv.slice(2)], {
  stdio: 'inherit'
});

proc.on('close', (code) => {
  process.exit(code || 0);
});
