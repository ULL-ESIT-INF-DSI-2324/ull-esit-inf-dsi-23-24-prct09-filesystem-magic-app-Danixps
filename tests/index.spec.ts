import "mocha";
import { expect } from "chai";
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { Card, Color, LineType, Rarity } from '../src/card.js';

describe('Aplicación Magic Cards', () => {
    it('Añadir una carta 1', () => {

        const card = new Card(
            777,
            'Black Lotus',
            69,
            Color.Multicolor,
            LineType.Criatura,
            Rarity.Common,
            'Tap to add three mana of any color to your mana pool.',
            1234,
            [5, 11]
        );
        card.eliminarcarta('danixps'); //por si existiera de ejecutar los test alguna vez antes
        expect(card.guardarCarta('danixps')).to.be.equal('New card saved at danixps collection!'); //ahora si se añade por primera vez
    });
    it('Añadir una carta 2. Intento de añadir con Fuerza/Resistencia en una línea de tipo que es distinta a criatura', () => {

        const card = new Card(
            1,
            'Black Lotus',
            69,
            Color.Multicolor,
            LineType.Planeswalker,
            Rarity.Common,
            'Tap to add three mana of any color to your mana pool.',
            1234,
            [5, 11]
        );
        card.eliminarcarta('danixps'); //por si existiera de ejecutar los test alguna vez antes
        expect(card.guardarCarta('danixps')).to.be.equal('Power/Toughness is only for criatura cards'); //ahora si se añade por primera vez
    });
    // it ('Comando add con una nueva carta', () => {
    //     execSync('node dist/index.js add --user "danixps" --id 778 --name "Black Lotus" --manaCost 69 --color "multicolor" --type "criatura" --rarity rara --rulesText "Tap to add three mana of any color to your mana pool." --marketValue 1234 --powerandtoughness 5 11');
    //     expect(existsSync('./danixps/778.json')).to.be.true;
    //     const cardData = JSON.parse(readFileSync('./danixps/778.json', 'utf-8'));
    //     expect(cardData).eql({
    //         id: 778,
    //         name: 'Black Lotus',
    //         manaCost: 69,
    //         color: 'multicolor',
    //         type: 'criatura',
    //         rarity: 'rara',
    //         rulesText: 'Tap to add three mana of any color to your mana pool.',
    //         marketValue: 1234,
    //         powerandtoughness: [5, 11]
    // });
    // });
    // it ('Comando add con una carta ya existente', () => {
    //     const cardexists = new Card(
    //         777,
    //         'Black Lotus',
    //         69,
    //         Color.Multicolor,
    //         LineType.Criatura,
    //         Rarity.Common,
    //         'Tap to add three mana of any color to your mana pool.',
    //         1234,
    //         [5, 11]
    //     );
    //     expect(cardexists.guardarCarta('danixps')).to.be.equal('Card already exists at danixps collection');
    // });
    // it ('Comando list', () => {
    //     const output = execSync('node dist/index.js list --user "danixps"').toString();
    //     expect(output).to.eql(
    //     `danixps collection\n--------------------------------\nID: 777\nName: Black Lotus\nManaCost: 69\nColor: multicolor\nType: criatura\nRarity: común\nRulesText: Tap to add three mana of any color to your mana pool.\nPower/Toughness: 5,11\nMarketValue: 1234\n--------------------------------\nID: 778\nName: Black Lotus\nManaCost: 69\nColor: multicolor\nType: criatura\nRarity: rara\nRulesText: Tap to add three mana of any color to your mana pool.\nPower/Toughness: 5,11\nMarketValue: 1234\n--------------------------------\n`
    //     );
    // });
    // it ('Comando remove card', () => {
    //     execSync('node dist/index.js remove --user "danixps" --id 777');
    //     expect(existsSync('./danixps/777.json')).to.be.false;
    // });
});
