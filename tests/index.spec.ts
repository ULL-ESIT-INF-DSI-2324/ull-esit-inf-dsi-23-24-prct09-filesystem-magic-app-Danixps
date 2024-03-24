import "mocha";
import { expect } from "chai";
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { Card, Color, LineType, Rarity } from '../src/card.js';
import { mostrarCartas } from '../src/index.js';
describe('Aplicación Magic Cards', () => {

    it('Añadir una carta. Intento de añadir con Fuerza/Resistencia en una línea de tipo que es distinta a Criatura', () => {

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
    it('Añadir una carta. Intento de añadir con Lealtad en una línea de tipo que es distinta a Planeswalker', () => {

        const card = new Card(
            1,
            'Black Lotus',
            69,
            Color.Multicolor,
            LineType.Criatura,
            Rarity.Common,
            'Tap to add three mana of any color to your mana pool.',
            1234,
            [5, 11], 
            10 //puntos loyalty

        );
        card.eliminarcarta('danixps'); //por si existiera de ejecutar los test alguna vez antes
        expect(card.guardarCarta('danixps')).to.be.equal('Loyalty is only for planeswalker cards'); //ahora si se añade por primera vez
    });
    it('Añadir una carta. Con éxito', () => {

        const card = new Card(
            777,
            'Black Lotus',
            69,
            Color.Black,
            LineType.Tierra,
            Rarity.Rare,
            'Tap to delete the enemy creature.',
            100
        );
        card.eliminarcarta('danixps'); //por si existiera de ejecutar los test alguna vez antes
        expect(card.guardarCarta('danixps')).to.be.equal('New card saved at danixps collection!'); //ahora si se añade por primera vez
    });
    it('Añadir una carta. Criatura con Fuerza/Resistencia con éxito', () => {

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
    it('Añadir una carta. Planeswalker con éxito', () => {

        const card = new Card(
            1,
            'White Panter',
            20,
            Color.Colorless,
            LineType.Planeswalker,
            Rarity.Mythic,
            'Tap to atack the enemy and gain 5 life points.',
            1234,
            undefined,
            10 //puntos loyalty
        );
        card.eliminarcarta('danixps'); //por si existiera de ejecutar los test alguna vez antes
        expect(card.guardarCarta('danixps')).to.be.equal('New card saved at danixps collection!'); //ahora si se añade por primera vez
    });

    it ('Listar las cartas del usuario danixps', () => {
        expect(mostrarCartas('danixps')).to.be.equal('danixps collection\n--------------------------------\nID: 1\nName: White Panter\nManaCost: 20\nColor: incoloro\nType: planeswalker\nRarity: mítica\nRulesText: Tap to atack the enemy and gain 5 life points.\nLoyalty: 10\nMarketValue: 1234\n--------------------------------\nID: 777\nName: Black Lotus\nManaCost: 69\nColor: multicolor\nType: criatura\nRarity: común\nRulesText: Tap to add three mana of any color to your mana pool.\nPower/Toughness: 5,11\nMarketValue: 1234\n--------------------------------');
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
