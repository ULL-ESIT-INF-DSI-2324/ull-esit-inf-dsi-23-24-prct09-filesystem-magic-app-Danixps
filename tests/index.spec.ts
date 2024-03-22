import "mocha";
import { expect } from "chai";
import {ManejodeFicheros} from '../src/lectura.js'
import {LecturaArchivoscvs, LecturaArchivosjson} from '../src/index.js'
describe("Pruebas sobre Template", () => {
  it("operaciones con Lwectura", () => {
    const algoritmo: ManejodeFicheros = new LecturaArchivoscvs();
    algoritmo.ejecutar();
    expect(algoritmo.ejecutar()).to.eql([
      "12\n3\n1",
      "5",
     "10\n2",
      "7",
     "5\n3",
      "2",
      "7",
     ]);
  });
});

describe("Pruebas sobre Template", () => {
  it("operaciones con Lwectura con json", () => {
    const algoritmo: ManejodeFicheros = new LecturaArchivosjson();
    algoritmo.ejecutar();
    expect(algoritmo.ejecutar()).to.eql(       [
        "12\n3\n1",
        "5",
       "10\n2",
        "7",
       "5\n3",
        "2",
        "7",
       ]
      );
  });
});
