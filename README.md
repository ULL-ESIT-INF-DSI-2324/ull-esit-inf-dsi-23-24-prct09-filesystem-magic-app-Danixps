# Práctica 9 - Aplicación para coleccionistas de cartas Magic

*Nombre y apellidos: [Daniel Bensa Expósito Paz](https://github.com/Danixps?tab=repositories, "Enlace Github")*

*Asignatura: Desarrollo de Sistemas Informáticos (DSI)*


[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Danixps/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Danixps/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Danixps/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Danixps?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Danixps&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Danixps)



## Índice

1. [Introducción](#id1)

2. [Ejercicios de Tarea](#id2)

3. [Conclusión](#id3)

3. [Bibliografía](#id4)

<div id='id1' />

## 1. Introducción

El objetivo de esta práctica es desarrollar una aplicación para gestionar cartas. Para ello he tenido que inventigar los dos nuevos paquetes yargs y chalks. `yargs` para manipular y gestionar argumentos de línea de comandos. Y `chalk` que es un paquete para dar estilo a la salida de texto en la consola. Permite agregar colores y otros estilos de formato al texto que se imprime en la consola. Al principio, lo más díficil fue entender la estructura para manipular los argumentos de lineas de comandos y como funciona. Esto junto a la API síncrona de Node.js pude gestionar el sistema de archivos para la creación de directorios que serán los usuarios y dentro estarán las cartas con un identificados como nombre de archivo json, con sus propiedades definidad dentro.

<div id='id2' />

## 2. Ejercicio (Aplicación para coleccionistas de cartas Magic)
Para empezar creé una clase `Card` donde implmenta las caracteristicas de una carta con una interfaz `Card_characteristics`, para que la clase sea abierta a posibles modificaciones. Dejando eso a un lado de momento, empezaremos con la manipulación de argumentos en la línea de comandos empezando con el comando `add` donde creo una carta con todos los atributos requeridos que he indicado en el campo de options en builder. Al crearla , le llamo a la función `gestionarerrores()` para saber si la carta cumple unas ciertas condiciones de integridad como la de si es planeswalker tiene una puntuacion de lealtad, solo para ese tipo, o por ejemplo para solo las criaturas tienen dos valores númericos como fuerza/resistencia. Entonces si pasa todo esto creará la carta y sino pues no se creará y explicará por qué.
Dentro de la función `guardarcarta()` al pasar el gestor de errores pues comprobamos si ya existe la carta, si ya existe se notificará y sino pues se creara las cartas creando un fichero json con la api síncrona de node, en específico `writeFileSync`. Después con `modificarcarta` con el comando `update` miramos si existía ya la carta para poder modificarla con `existsSync(rutaArchivoid)` y si no existe se notificará al usuario con un mensaje, si ya existe se volvera a escribir y modificar la carta en el json. En `remove` es distintos los argumentos que construyo ya que solo necesito el user y el id, por ello llamo a la funcion `eliminarcarta` donde dentro de ella verifico si existe la carta en el fichero json, y si existe lo elimino con `unlinkSync(rutaArchivo)`, sino pues le notificaré al usuario que la carta no existe. Con el comando read pasa lo mismo que con remove ya que solo necesito el user y el id, y es por ello que llamare a `encontrarCarta` donde dentro de ella cargo todas las cartas del usuario pasado por linea de comandos y buscare con `find` en el array de cartas por su id y retornaré su información, en el caso de que no la encuentre pues se lo notificaré al usuario. En el último `list` donde muestro todas las cartas de un usuario propietario primero compruebo si tiene alguna carta y si es así hare un for each de todo el array de las cartas con las cartas cargadas del usuario, y mostraré toda su información.

<div id='id3' />

## 3. Conclusión
En mi caso lo mas costoso fue pasar la puerta de calidad de SonarCloud ya que debia reducir código duplicado en el gestionador de opciones en los argumentos de comandos. Es por ello que creé una estructura donde optimizaba el código en ciertos puntos donde en builder se deben construir  bastantes argumentos en el caso de añadir carta o modificar, es por ello que definí las opciones, su requerimiento si es obligatorio o no, para cada caso de los atributos, id,name,type.... y después lo convierto en un objeto para manipularlo con yargs.

<div id='id4' />

## 4. Bibliografía

[Guión de la Práctica 9](https://ull-esit-inf-dsi-2324.github.io/prct09-fiilesystem-magic-app/)