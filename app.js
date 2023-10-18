const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const clientRouter = require('./routes/client');
const saleRouter = require('./routes/sale');
const productRouter = require('./routes/product');

app.use('/api/clientes', clientRouter);
app.use('/api/ventas', saleRouter);
app.use('/api/productos', productRouter);

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
