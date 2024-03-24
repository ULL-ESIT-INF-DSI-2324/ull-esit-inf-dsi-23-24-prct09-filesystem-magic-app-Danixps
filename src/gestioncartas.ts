import fs from 'fs';
import { Card } from './card.js';

export const cargarCartas = (usuario: string): Card[] => {
    const directorioUsuario = `./${usuario}`;
    const cartas: Card[] = [];
    if (fs.existsSync(directorioUsuario)) {
        const archivos = fs.readdirSync(directorioUsuario);
        archivos.forEach((archivo: unknown) => {
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
