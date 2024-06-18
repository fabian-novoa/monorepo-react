#!/usr/bin/env-node
const prompts = require('prompts');
prompts.override(require('yargs').argv);

const apps= {
  clientes:9001,
  facturar:9002,
  menu:9003,
  productos:9004
};

(async () => {
  const appSeleccionadas = await prompts([

    {
      type: 'multiselect',
      name: 'appSeleccionadas',
      message: 'Seleccionar la(s) aplicaciones a trabajar',
      instructions:false,
      choices: Object.entries(apps).map(([appName, portNumber])=>({
        title:`${appName}`,
        value: appName
      }))
      ,
      hint: '- Seleccionar con barra espaciadora y Enter'
    }
  ]);

})();