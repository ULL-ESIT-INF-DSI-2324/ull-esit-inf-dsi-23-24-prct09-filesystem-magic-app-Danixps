
import yargs from 'yargs';
import chalk from 'chalk';
import fs from 'fs';
import { Card, Rarity, Color, LineType } from './card.js';


const cargarCartas = (usuario: string): Card[] => {
    const directorioUsuario = `./${usuario}`;
    const cartas: Card[] = [];
    if (fs.existsSync(directorioUsuario)) {
        const archivos = fs.readdirSync(directorioUsuario);
        archivos.forEach((archivo: any) => {
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
                cartaData.marketValue,
                cartaData.powerandtoughness,
                cartaData.loyalty
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
            user: {
                describe: 'Usuario propietario',
                type: 'string',
                demandOption: true,
            },
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
            marketValue: {
                describe: 'Valor de mercado',
                type: 'number',
                demandOption: true,
            },
            powerandtoughness: {
                describe: 'Fuerza/Resistencia de la carta (sólo para tipo criatura)',
                type: 'array',
            },
            loyalty: {
                describe: 'Marcas de lealtad',
                type: 'number',
            },
        },
        handler: (argv) => {

            const carta = new Card(
                argv.id,
                argv.name,
                argv.manaCost,
                argv.color as Color,
                argv.type as LineType,
                argv.rarity as Rarity, 
                argv.rulesText,
                argv.marketValue,
                argv.powerandtoughness,
                argv.loyalty
            );
            carta.guardarCarta(argv.user);
        },
    })
    .command({
        command: 'update',
        describe: 'Modificar una carta a la colección',
        builder: {
            user: {
                describe: 'Usuario propietario',
                type: 'string',
                demandOption: true,
            },
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
            marketValue: {
                describe: 'Valor de mercado',
                type: 'number',
                demandOption: true,
            },
            powerandtoughness: {
                describe: 'Fuerza/Resistencia de la carta (sólo para tipo criatura)',
                type: 'array',
            },
            loyalty: {
                describe: 'Marcas de lealtad',
                type: 'number',
            },
        },
        handler: (argv) => {
            if (!Object.values(Rarity).includes(argv.rarity as Rarity)) {
                console.error(chalk.red(`Invalid rarity: ${argv.rarity}, change it to one of the following: ${Object.values(Rarity)} for creating a card`));
                return;
            }
            if (!Object.values(Color).includes(argv.color as Color)) {
                console.error(chalk.red(`Invalid color: ${argv.color}, change it to one of the following: ${Object.values(Color)} for creating a card`));
                return;
            }
            if (!Object.values(LineType).includes(argv.type as LineType)) {
                console.error(chalk.red(`Invalid type: ${argv.type}, change it to one of the following: ${Object.values(LineType)} for creating a card`));
                return;
            }
            if (argv.powerandtoughness && argv.type !== LineType.Criatura) {
                console.error(chalk.red(`Power/Toughness is only for criatura cards`));
                return;
            }
            if (argv.loyalty && argv.type !== LineType.Planeswalker) {
                console.error(chalk.red(`Loyalty is only for planeswalker cards`));
                return;
            }
        
            const carta = new Card(
                argv.id,
                argv.name,
                argv.manaCost,
                argv.color as Color,
                argv.type as LineType,
                argv.rarity as Rarity, 
                argv.rulesText,
                argv.marketValue,
                argv.powerandtoughness,
                argv.loyalty
            );
            carta.modificarCarta(argv.user);
        },
    })
    .command({
        command: 'remove',
        describe: 'Eliminar una carta de la colección',
        builder: {
            user: {
                describe: 'Usuario propietario',
                type: 'string',
                demandOption: true,
            },
            id: {
                describe: 'ID de la carta',
                type: 'number',
                demandOption: true,
            },
        },
        handler: (argv) => {

            const carta = new Card(
                argv.id,
                '',
                0,
                Color.Colorless,
                LineType.Tierra,
                Rarity.Common,
                '',
                0,
            );

            carta.eliminarcarta(argv.user);
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
                    if (carta.powerandtoughness !== undefined) {
                        console.log(`Power/Toughness: ${carta.powerandtoughness}`);
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

export function mostrarCartas(user: string): string {
    const cartas = cargarCartas(user);
    let cardInfo = '';

    cardInfo+= `${user} collection\n`;
    cardInfo+='--------------------------------';
    cartas.forEach((carta) => {
        
        cardInfo += `\nID: ${carta.id}\nName: ${carta.name}\nManaCost: ${carta.manaCost}\nColor: ${carta.color}\nType: ${carta.type}\nRarity: ${carta.rarity}\nRulesText: ${carta.rulesText}`;

        if (carta.powerandtoughness !== undefined) {
            cardInfo += `\nPower/Toughness: ${carta.powerandtoughness}`;
        }

        if (carta.loyalty !== undefined) {
            cardInfo += `\nLoyalty: ${carta.loyalty}`;
        }

        cardInfo += `\nMarketValue: ${carta.marketValue}\n--------------------------------`;
    });

    return cardInfo;
}
