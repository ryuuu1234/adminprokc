import camelCase from 'lodash/camelCase'

const requiredModule = require.context(".", false, /\.js$/); // extract js files inside module folder

    const modules = {}; //variable object
    requiredModule.keys().forEach(fileName => {
        if (fileName === "./index.js") return; // reject index.js file

        const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));
        
        modules[moduleName] = requiredModule(fileName).default;
    });

export default modules;