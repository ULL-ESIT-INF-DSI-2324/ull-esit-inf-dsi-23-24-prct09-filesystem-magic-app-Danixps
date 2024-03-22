
import yargs from 'yargs';
import chalk from 'chalk';
const fs = require('fs');


class Card {
    constructor(
        public id: number,
        public name: string,
        public manaCost: number,
        public color: string,
        public type: string,
        public rarity: string,
        public rulesText: string,
        public marketValue: number,
        public power?: number,
        public toughness?: number,
        public loyalty?: number,
    ) {}
}

const guardarCarta = (usuario: string, carta: Card) => {
    const directorioUsuario = `./${usuario}`;
    if (!fs.existsSync(directorioUsuario)) {
        fs.mkdirSync(directorioUsuario);
    }
    const rutaArchivo = `${directorioUsuario}/${carta.id}.json`;
    fs.writeFileSync(rutaArchivo, JSON.stringify(carta, null, 2));
    console.log(chalk.green('¡Carta guardada con éxito!'));
};

const cargarCartas = (usuario: string): Card[] => {
    const directorioUsuario = `./${usuario}`;
    const cartas: Card[] = [];
    if (fs.existsSync(directorioUsuario)) {
        const archivos = fs.readdirSync(directorioUsuario);
        archivos.forEach((archivo) => {
            const rutaArchivo = `${directorioUsuario}/${archivo}`;
            const cartaData = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'));
            const carta = new Card(
                cartaData.id,
                cartaData.name,
                cartaData.manaCost,
                cartaData.color,
                cartaData.type,
                cartaData.rarity,
                cartaData.rulesText,
                cartaData.power,
                cartaData.toughness,
                cartaData.loyalty,
                cartaData.marketValue
            );
            cartas.push(carta);
        });
    }
    return cartas;
};

yargs(process.argv.slice(2))
    .command({
        command: 'add',
        describe: 'Añadir una carta a la colección',
        builder: {
            id: {
                describe: 'ID de la carta',
                type: 'number',
                demandOption: true,
            },
            name: {
                describe: 'Nombre de la carta',
                type: 'string',
                demandOption: true,
            },
            manaCost: {
                describe: 'Costo de maná',
                type: 'number',
                demandOption: true,
            },
            color: {
                describe: 'Color de la carta',
                type: 'string',
                demandOption: true,
            },
            type: {
                describe: 'Línea de tipo',
                type: 'string',
                demandOption: true,
            },
            rarity: {
                describe: 'Rareza de la carta',
                type: 'string',
                demandOption: true,
            },
            rulesText: {
                describe: 'Texto de reglas',
                type: 'string',
                demandOption: true,
            },
            power: {
                describe: 'Fuerza de la carta',
                type: 'number',
            },
            toughness: {
                describe: 'Resistencia de la carta',
                type: 'number',
            },
            loyalty: {
                describe: 'Marcas de lealtad',
                type: 'number',
            },
            marketValue: {
                describe: 'Valor de mercado',
                type: 'number',
                demandOption: true,
            },
            user: {
                describe: 'Usuario',
                type: 'string',
                demandOption: true,
            },
        },
        handler: (argv) => {
            const carta = new Card(
                argv.id,
                argv.name,
                argv.manaCost,
                argv.color,
                argv.type,
                argv.rarity,
                argv.rulesText,
                argv.power,
                argv.toughness,
                argv.loyalty,
                argv.marketValue
            );
            guardarCarta(argv.user, carta);
        },
    })
    .command({
        command: 'list',
        describe: 'Listar las cartas de un usuario',
        builder: {
            user: {
                describe: 'Usuario',
                type: 'string',
                demandOption: true,
            },
        },
        handler: (argv) => {
            const cartas = cargarCartas(argv.user);
            if (cartas.length === 0) {
                console.log(chalk.red('No hay cartas en la colección.'));
            } else {
                console.log(chalk.green(`${argv.user} collection`));
                console.log('--------------------------------');
                cartas.forEach((carta) => {
                    console.log(`ID: ${carta.id}`);
                    console.log(`Name: ${carta.name}`);
                    console.log(`ManaCost: ${carta.manaCost}`);
                    console.log(`Color: ${carta.color}`);
                    console.log(`Type: ${carta.type}`);
                    console.log(`Rarity: ${carta.rarity}`);
                    console.log(`RulesText: ${carta.rulesText}`);
                    if (carta.power !== undefined && carta.toughness !== undefined) {
                        console.log(`Power/Toughness: ${carta.power}/${carta.toughness}`);
                    }
                    if (carta.loyalty !== undefined) {
                        console.log(`Loyalty: ${carta.loyalty}`);
                    }
                    console.log(`MarketValue: ${carta.marketValue}`);
                    console.log('--------------------------------');
                });
            }
        },
    })
    .help()
    .argv;
