import { AppDataSource } from './data-source';
import { readFileSync } from 'node:fs';
import path from 'node:path';

async function main() {
  const ds = await AppDataSource.initialize();

  const sql = readFileSync(path.join(__dirname, '../data.sql'), 'utf8');

  await ds.query(sql);

  console.log('Seed aplicado correctamente, se cargaron los datos.');
  await ds.destroy();
}

main().catch(err => {
  console.error('Error ejecutando seed:', err);
  process.exit(1);
});