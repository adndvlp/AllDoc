const {stripTypeScriptTypes} = require('node:module');

// Solo elimina TypeScript; el typecheck completo se ejecuta de forma independiente.
module.exports = function runtimeTypeScript(source) {
  return stripTypeScriptTypes(source, {mode: 'strip', sourceUrl: this.resourcePath});
};
