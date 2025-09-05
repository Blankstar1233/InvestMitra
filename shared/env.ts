// Loads environment variables from environment/.env
import * as fs from 'fs';
import * as path from 'path';

export function getGeminiApiKey(): string | undefined {
  const envPath = path.resolve(__dirname, '../environment/.env');
  if (!fs.existsSync(envPath)) return undefined;
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/^GEMINI_PRO_API_KEY=(.*)$/m);
  return match ? match[1].trim() : undefined;
}
