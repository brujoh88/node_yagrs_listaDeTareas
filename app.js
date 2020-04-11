//IMPORTAR FUNCION ARGV DEL ./config/yargs
const { argv } = require('./config/yargs')
const colors = require('colors')

const porHacer = require('./por-hacer/por-hacer')

let comando = argv._[0]

//SWICHEAR LOS CASOS DE COMANDO
switch (comando) {
  // Crea una nueva tarea
  case 'crear':
    let tarea = porHacer.crear(argv.filtro)
    console.log('Ingreso: ', tarea)
    porHacer.guardarDB()
    break

  // Lista las tareas
  case 'listar':
    let listado = porHacer.getlistado(argv.filtro)
    if (typeof listado == 'object') {
      for (let i = 0; i < listado.length; i++) {
        console.log('====================Por hacer===================='.green)
        console.log(listado[i].descripcion)
        console.log('Completado: ', listado[i].completado)
        console.log('================================================='.green)
      }
    } else {
      console.log(listado)
    }
    //!Asi lo hizo fer-------------------------------------------------------
    /*     for (let tarea of listado) {
      console.log('====================Por hacer===================='.green)
      console.log(tarea.descripcion)
      console.log('Completado: ', tarea.completado)
      console.log('================================================='.green)
    } */
    //!FIN-------------------------------------------------------------------

    break

  // Actualiza alguna de las tareas del data.json
  case 'actualizar':
    const actualizando = porHacer.actualizar(argv.descripcion, argv.completado)
    console.log(actualizando)
    break

  // Borra alguna de las tareas del data.json
  case 'borrar':
    const arrBorrado = porHacer.borrar(argv.descripcion)
    console.log(arrBorrado)
    break

  default:
    console.log('Comando no reconocido')
}
