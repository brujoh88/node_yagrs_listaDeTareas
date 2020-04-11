const fs = require('fs')

let listadoPorHacer = []

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer)
  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error('No se pudo grabar', err)
    else return `Save: ../db/data.json`
  })
}

const cargarDB = () => {
  try {
    listadoPorHacer = require('../db/data.json')
  } catch (error) {
    listadoPorHacer = []
  }
}

const crear = (descripcion) => {
  cargarDB()
  let porHacer = {
    descripcion,
    completado: false,
  }
  listadoPorHacer.push(porHacer)
  return porHacer
}

const getlistado = (completado) => {
  cargarDB()
  if (completado == 'all') {
    return listadoPorHacer
  } else {
    switch (completado) {
      case 'true':
      case 't':
        let listadoTrue = []
        listadoTrue = listadoPorHacer.filter((dato) => dato.completado == true)
        return listadoTrue

      case 'false':
      case 'f':
        let listadoFalse = []
        listadoFalse = listadoPorHacer.filter(
          (dato) => dato.completado == false
        )
        return listadoFalse
      default:
        return 'Comando erroneo'
    }
  }
}

const actualizar = (descripcion, completado = true) => {
  cargarDB()

  let index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  )
  if (index >= 0) {
    listadoPorHacer[index].completado = completado
    guardarDB()
    return `Actualizado tarea: ${descripcion} ==> ${completado}`
  } else {
    return 'Asegurece de buscar una tarea previamente guardada!!!'
  }
}
const borrar = (descripcion) => {
  cargarDB()
  if (listadoPorHacer.length === 0) return 'No existen datos para borrar'
  listadoPorHacer = listadoPorHacer.filter(
    (dato) => dato.descripcion != descripcion
  )
  guardarDB()
  return listadoPorHacer
}

module.exports = {
  crear,
  guardarDB,
  getlistado,
  actualizar,
  borrar,
}
