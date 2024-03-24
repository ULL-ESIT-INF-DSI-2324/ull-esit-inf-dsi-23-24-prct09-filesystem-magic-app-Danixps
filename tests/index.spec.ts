import "mocha";
import { expect } from "chai";
import fs from 'fs';
import { Card, Color, LineType, Rarity } from '../src/card.js';
import { mostrarCartas,  encontrarCarta } from '../src/gestioncartas.js';

describe('Aplicación Magic Cards', () => {
    it('Creación de una carta', () => {
        const card = new Card(
            1,
            'Black Lotus',
            69,
            Color.Black,
            LineType.Tierra,
            Rarity.Rare,
            'Tap to delete the enemy creature.',
            100
        );
        expect(card.id).to.be.equal(1);
        expect(card.name).to.be.equal('Black Lotus');
        expect(card.manaCost).to.be.equal(69);
        expect(card.color).to.be.equal(Color.Black);
        expect(card.type).to.be.equal(LineType.Tierra);
        expect(card.rarity).to.be.equal(Rarity.Rare);
        expect(card.rulesText).to.be.equal('Tap to delete the enemy creature.');
        expect(card.marketValue).to.be.equal(100);
        expect(card).instanceOf(Card);
    });

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
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(false); //no se ha creado el archivo con la carta 
        expect(card.guardarCarta('danixps')).to.be.equal('Power/Toughness is only for criatura cards'); //ahora si se añade por primera vez
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(false); //no se podido crear el archivo con la carta 
    });
    it('Añadir una carta. Intento de añadir con Lealtad en una línea de tipo que es distinta a Planeswalker', () => {

        const card = new Card(
            2,
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
        expect(fs.existsSync(`./danixps/2.json`)).to.be.equal(false); //no se ha creado el archivo con la carta 
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
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(false); //creado el archivo con la carta 
        expect(card.guardarCarta('danixps')).to.be.equal('New card saved at danixps collection!'); //ahora si se añade por primera vez
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(true); //creado el archivo con la carta 
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
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(true); //creado el archivo con la carta 
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
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(false); //no se ha creado el archivo con la carta 
        expect(card.guardarCarta('danixps')).to.be.equal('New card saved at danixps collection!'); //ahora si se añade por primera vez
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(true); //creado el archivo con la carta 
    });

    it ('Listar las cartas del usuario danixps', () => {
        expect(mostrarCartas('danixps')).to.be.equal('danixps collection\n--------------------------------\nID: 1\nName: White Panter\nManaCost: 20\nColor: incoloro\nType: planeswalker\nRarity: mítica\nRulesText: Tap to atack the enemy and gain 5 life points.\nLoyalty: 10\nMarketValue: 1234\n--------------------------------\nID: 777\nName: Black Lotus\nManaCost: 69\nColor: multicolor\nType: criatura\nRarity: común\nRulesText: Tap to add three mana of any color to your mana pool.\nPower/Toughness: 5,11\nMarketValue: 1234\n--------------------------------');
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(true); //creado el archivo con la carta 
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(true); //creado el archivo con la carta 
    });
    it ('Eliminar una carta', () => {
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
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(true); //creado el archivo con la carta 
        expect(card.eliminarcarta('danixps')).to.be.equal('Card id 777 removed from danixps collection!');
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(false); //se ah eliminado el archivo
    });
    it ('Eliminar una carta que no existe', () => {
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
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(false); //no se ha creado el archivo con la carta 
        expect(card.eliminarcarta('danixps')).to.be.equal('Card id 777 not found at danixps collection');
    });
    it ('Listar las cartas del usuario danixps teniendo en cuenta la carta eliminada', () => {
        expect(mostrarCartas('danixps')).to.be.equal('danixps collection\n--------------------------------\nID: 1\nName: White Panter\nManaCost: 20\nColor: incoloro\nType: planeswalker\nRarity: mítica\nRulesText: Tap to atack the enemy and gain 5 life points.\nLoyalty: 10\nMarketValue: 1234\n--------------------------------');
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(true); //creado el archivo con la carta 
    });

    it ('Actualizar una carta que no existe', () => {
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
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(false); //no se creado el archivo con la carta 
        expect(card.modificarCarta('danixps')).to.be.equal('Card not found at danixps collection');
    });
    it ('Actualizar una carta que existe', () => {
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
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(true); //ya se habíacreado el archivo con la carta 
        expect(card.modificarCarta('danixps')).to.be.equal('Card updated at danixps collection!');
    });
    it ('Actualizar una carta que existe. Cambio de tipo a Criatura', () => {
        const card = new Card(
            1,
            'White Panter',
            20,
            Color.Colorless,
            LineType.Criatura,
            Rarity.Mythic,
            'Tap to atack the enemy and gain 5 life points.',
            1234,
            [5, 11]
        );
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(true); //ya se había creado el archivo con la carta 
        expect(card.modificarCarta('danixps')).to.be.equal('Card updated at danixps collection!');
    });
    it ('Actualizar una carta que existe. Cambio de tipo a Planeswalker', () => {
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
        expect(fs.existsSync(`./danixps/1.json`)).to.be.equal(true); //ya se había creado el archivo con la carta 
        expect(card.modificarCarta('danixps')).to.be.equal('Card updated at danixps collection!');
    });
    it('Actualizar una carta que no existe.', () => {
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
        expect(fs.existsSync(`./danixps/777.json`)).to.be.equal(false); //no se ha creado el archivo con la carta 
        expect(card.modificarCarta('danixps')).to.be.equal('Card not found at danixps collection');
      });
    it ('Lee una carta que no existe', () => {
        expect(encontrarCarta('danixps', 777)).to.be.equal('Card not found at danixps collection!');
    });
    it ('Lee una carta que existe', () => {
        expect(encontrarCarta('danixps', 1)).to.be.equal('ID: 1\nName: White Panter\nManaCost: 20\nColor: incoloro\nType: planeswalker\nRarity: mítica\nRulesText: Tap to atack the enemy and gain 5 life points.\nLoyalty: 10\nMarketValue: 1234');
    });
});
