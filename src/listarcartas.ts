import { cargarCartas } from './index.js';

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
