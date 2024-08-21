import * as fs from 'fs';
import * as path from 'path';

const prismaSourcePath = path.join(__dirname, '..', 'prisma');

const prismaDestinationPath = path.join(__dirname, '..', 'iac', 'prisma_requirements');

function copyDirectory(source: string, destination: string) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const items = fs.readdirSync(source);

    items.forEach(item => {
        const sourceItemPath = path.join(source, item);
        const destinationItemPath = path.join(destination, item);

        if (fs.statSync(sourceItemPath).isDirectory()) {
            copyDirectory(sourceItemPath, destinationItemPath);
        } else {
            fs.copyFileSync(sourceItemPath, destinationItemPath);
        }
    });
}

function copyPrismaFolder() {
    try {
        copyDirectory(prismaSourcePath, prismaDestinationPath);
        console.log('Pasta "prisma" copiada com sucesso!');
    } catch (err) {
        console.error('Erro ao copiar a pasta "prisma":', err);
    }
}

copyPrismaFolder();