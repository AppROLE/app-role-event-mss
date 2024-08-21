import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const IAC_DIRECTORY_NAME = 'iac';
const LAYER_NODE_MODULES_DIR_NAME = 'dependencies';
const NODEJS_DIR_NAME = 'nodejs';
const NODE_MODULES_DIR_NAME = 'node_modules';

export function nodeModulesAdjust(): void {
  // Obtém o diretório raiz do diretório fonte
  const rootDirectory = path.join(__dirname, '..');
  const iacDirectory = path.join(rootDirectory, IAC_DIRECTORY_NAME);

  console.log(`Root directory: ${rootDirectory}`);
  console.log(`IaC directory: ${iacDirectory}`);

  // Define o diretório de destino para shared
  const destinationDirectory = path.join(iacDirectory, LAYER_NODE_MODULES_DIR_NAME, NODEJS_DIR_NAME);
  const nodeModulesDirectory = path.join(destinationDirectory, NODE_MODULES_DIR_NAME);

  // Apaga o diretório de destino se ele existir
  if (fs.existsSync(destinationDirectory)) {
    fs.rmSync(destinationDirectory, { recursive: true, force: true });
  }

  // Cria o diretório de destino
  fs.mkdirSync(destinationDirectory, { recursive: true });

  // Inicializa o npm e instala as bibliotecas necessárias
  process.chdir(destinationDirectory);
  execSync('npm init -y');
  execSync('npm install express serverless-http dotenv nodemailer cors');

  // Remove todos os arquivos exceto a pasta node_modules
  const files = fs.readdirSync(destinationDirectory);
  for (const file of files) {
    if (file !== NODE_MODULES_DIR_NAME) {
      fs.rmSync(path.join(destinationDirectory, file), { recursive: true, force: true });
    }
  }

  console.log(`Node modules directory created at ${nodeModulesDirectory}`);
}

if (require.main === module) {
  nodeModulesAdjust();
}