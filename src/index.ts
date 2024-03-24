
import yargs from 'yargs';
import chalk from 'chalk';
import { Card, Rarity, Color, LineType } from './card.js';
import { cargarCartas } from './gestioncartas.js';

function createOption(description: string, type: string, demandOption = true) {
    return { describe, type, demandOption };
}

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
            if(carta.gestionarerrores() === true){
                carta.modificarCarta(argv.user);
            } 
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

