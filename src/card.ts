import fs from 'fs';
import chalk from 'chalk';

export enum Rarity {
    Common = 'común',
    Uncommon = 'infrecuente',
    Rare = 'rara',
    Mythic = 'mítica'
}


export enum Color {
    White = 'blanco',
    Blue = 'azul',
    Black = 'negro',
    Red = 'rojo',
    Green = 'verde',
    Colorless = 'incoloro',
    Multicolor = 'multicolor'
}

export enum LineType {
    Tierra = 'tierra',
    Criatura = 'criatura',
    Encantamiento = 'encantamiento',
    Conjuro = 'conjuro',
    Instantaneo = 'instantaneo',
    Artefacto = 'artefacto',
    Planeswalker = 'planeswalker'
}

export class Card {
    constructor(
        public id: number,
        public name: string,
        public manaCost: number,
        public color: Color,
        public type: LineType,
        public rarity: Rarity,
        public rulesText: string,
        public marketValue: number,
        //powerandtoughness quiero que sea un array de numeros de 2 elementos
        public powerandtoughness?: [number, number],
        public loyalty?: number,
    ) {}

    public guardarCarta(usuario: string) {
        const directorioUsuario = `./${usuario}`;
        if (!fs.existsSync(directorioUsuario)) {
            fs.mkdirSync(directorioUsuario);
        }

        const rutaArchivoid = `${directorioUsuario}/${this.id}.json`;
        if (fs.existsSync(rutaArchivoid)) {
            console.error(chalk.red(`Card already exists at ${usuario} collection`));
            return `Card already exists at ${usuario} collection`;
        } 
        const rutaArchivo = `${directorioUsuario}/${this.id}.json`;
        fs.writeFileSync(rutaArchivo, JSON.stringify(this, null, 2));
        console.log(chalk.green(`New card saved at ${usuario} collection!`));
        return `New card saved at ${usuario} collection!`;
        
 
    }
    public modificarCarta(usuario: string , id: number) {
        const directorioUsuario = `./${usuario}`;
        const rutaArchivoid = `${directorioUsuario}/${id}.json`;
        if (!fs.existsSync(rutaArchivoid)) {
            console.error(chalk.red(`Card not found at ${usuario} collection`));
            return;
        } 
        const rutaArchivo = `${directorioUsuario}/${this.id}.json`;
        fs.writeFileSync(rutaArchivo, JSON.stringify(this, null, 2));
        console.log(chalk.green(`Card updated at ${usuario} collection!`));
    }
    public eliminarcarta(usuario: string , id: number) {
        const directorioUsuario = `./${usuario}`;
            const rutaArchivo = `${directorioUsuario}/${id}.json`;
            if (fs.existsSync(rutaArchivo)) {
                fs.unlinkSync(rutaArchivo);
                console.log(chalk.green(`Card id ${id} removed from ${usuario} collection!`));
            } else {
                console.error(chalk.red(`Card id ${id} not found at ${usuario} collection`));
            }
    }
}
