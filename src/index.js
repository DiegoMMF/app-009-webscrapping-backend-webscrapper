/**
 * LISTO: 1) Requerimos dotenv para utilizar variables de entorno
 * LISTO: 2) Importamos e inicializamos módulos del servidor y middlewares (enrutadores)
 * LISTO: 3) Recibimos un GET con el JSON searchOrder completo
 *  3.1) Ver si es aquí que solucionamos el problema de la autenticación (para que sólo Ganymede nos llame)
 * 4) Pasamos searchOrder.searchData al módulo selector.js (debemos importarlo)
 *  4.1) Recibimos [status, productList] del selector
 *  4.2) Ver si es aquí que manejamos los errores o dentro de las funciones llamadas
 * 5) Devolvemos searchOrder (JSON completo actualizado)como respuesta a la llamada inicial
 */
require('dotenv').config();

const Koa = require('koa');
const KoaRouter = require("koa-router");
const bodyParser = require('koa-bodyparser');
const scrapear = require('./productProviders/cetrogar');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

// const searchData = JSON.parse(process.env.SEARCH_DATA);     // dummy-data para probar, console.log(searchData);

router.get("/scrape-me", (ctx, next) => {
    let searchOrder = ctx.request.body;
    console.log("Ahora enviamos 'searchOrder.searchData' a selector()", searchOrder.searchData);
    scrapear(searchOrder.searchData.provider, searchOrder.searchData.query);
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Themisto inicializado."));