const descripcion = {
  demand: true,
  describe: 'Descripcion de la tarea por hacer',
  alias: 'd',
}
const completado = {
  describe: 'True: Tarea completada (Default) / False: Imcompleta',
  default: true,
  alias: 'c',
}

//Tear modulo YARGS
const argv = require('yargs')
  .command('crear', 'Crea una tarea por hacer.', {
    descripcion,
  })
  .command('actualizar', 'Actualiza el estado de una tarea', {
    descripcion,
    completado,
  })
  .command('listar', 'Lista las tareas.', {
    filtro: {
      alias: 'f',
      describe:
        '-- [all: Todas las tareas - false/f: Tareas imcompleta - true/t: Tareas compeltas]',
      demand: true,
    },
  })
  .command('borrar', 'Elimina una tarea expecificada de la agenda', {
    descripcion,
  })
  .help().argv

//EXPORTAR FUNCION ARGV
module.exports = {
  argv,
}
