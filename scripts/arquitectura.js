const path = require('path');
const fs = require("fs");

function createDirectory(dirPath){
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
        console.log(`Creado el directorio: ${dirPath}`);

    }else{
        console.log(`El directorio existe: ${dirPath}`);
    }
}

function createDirectoryStructure(basePath, structure){
    if(structure){
        for(const item of structure){
            const itemPath = path.join(basePath, item.name);

            if(item.isDirectory){
                createDirectory(itemPath);
                createDirectoryStructure(itemPath, item.children);

            }

        }
    }
}

function generar (basePath){

const structure =[

    {
        name:"src",
        isDirectory:true,
        children:[
            {
                name:"domain",
                isDirectory:true,
                children:[
                    {
                        name:"models",
                        isDirectory:true,
                    },
                    {
                        name:"services",
                        isDirectory:true,
                    }
                ]
            },
            {
                name:"application",
                isDirectory:true,
                children:[
                    {
                        name:"useCases",
                        isDirectory:true,
                    },
                    {
                        name:"services",
                        isDirectory:true,
                    }
                ]
            },
            {
                name:"presentation",
                isDirectory:true,
                children:[
                    {
                        name:"actions",
                        isDirectory:true,
                    },
                    {
                        name:"stores",
                        isDirectory:true,
                    },
                    {
                        name:"views",
                        isDirectory:true,
                    }
                ]
            },
            {
                name:"infrastructure",
                isDirectory:true,
                children:[
                    {
                        name:"adapters",
                        isDirectory:true,
                    },
                    {
                        name:"api",
                        isDirectory:true,
                    }
                ]
            }
        ]
    }
];

createDirectoryStructure(basePath, structure);

}

const baseDirectory = process.argv[2];

if(baseDirectory){
    generar(baseDirectory);
}else{
    console.log("por favor ingrese el directorio del microfrontend");
}

// Ejemplo de como ejecutar

//npm run arquitectura ./packages/productos