#!/usr/bin/env-node
const prompts = require('prompts');
prompts.override(require('yargs').argv);
const {spawn} = require('node:child_process');

const apps= {
  clientes:9001,
  facturar:9002,
  menu:9003,
  productos:9004
};

(async () => {
  const {appSeleccionadas} = await prompts([

    {
      type: 'multiselect',
      name: 'appSeleccionadas',
      message: 'Seleccionar la(s) aplicaciones a trabajar',
      instructions:false,
      choices: Object.entries(apps).map(([appName, portNumber])=>({
        title:`${appName} (Puerto: ${portNumber})`,
        value: appName
      }))
      ,
      hint: '- Seleccionar con barra espaciadora y Enter',
    }
  ]);

  if(Array.isArray(appSeleccionadas) && appSeleccionadas.length<=0){
    console.log("Debe seleccionar por lo menos una aplicación");
    process.exit();
   }

   const iniciarProceso= spawn(/^win/.test(process.platform) ? 'lerna.cmd' : 'lerna',
    [
    "run",
    "start",
    "--scope",
    `*/*{root-config,styleguide,${appSeleccionadas.join(",")}}*`,
    "--stream",
    "--parallel",
  ],
    {
    stdio: "inherit",
    env:{
      ...process.env,
      FEATURE_APP_DATA : JSON.stringify(
        appSeleccionadas.reduce((result, currFeactureApp)=>{
          result[currFeactureApp] = apps[currFeactureApp];
          return result;
        },{})
      )
    }
  }
   );

})();