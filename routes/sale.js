const express = require('express');
const router = express.Router();
const fs = require('fs'); 

const salesDataFile = './data/sales.json';

// Consultar todas las ventas
router.get('/', (req, res) => {
  fs.readFile(salesDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de ventas.' });
      return;
    }
    const sales = JSON.parse(data);
    res.json(sales);
  });
});

// Consultar una venta por ID
router.get('/:id', (req, res) => {
  const saleId = req.params.id;
  fs.readFile(salesDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de ventas.' });
      return;
    }
    const sales = JSON.parse(data);
    const sale = sales.find((s) => s.id === saleId);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: 'Venta no encontrada' });
    }
  });
});

// Agregar una nueva venta
router.post('/', (req, res) => {
  const newSaleData = req.body;
  fs.readFile(salesDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de ventas.' });
      return;
    }
    const sales = JSON.parse(data);
    const newSale = {
      id: newSaleData.id,
      productId: newSaleData.productId,
      clientId: newSaleData.clientId,
      quantity: newSaleData.quantity,
      total: newSaleData.total,
    };
    sales.push(newSale);
    fs.writeFile(salesDataFile, JSON.stringify(sales, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error al guardar la nueva venta.' });
        return;
      }
      res.json(newSale);
    });
  });
});

// Actualizar una venta por ID
router.put('/:id', (req, res) => {
  const saleId = req.params.id;
  const updatedSaleData = req.body;
  fs.readFile(salesDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de ventas.' });
      return;
    }
    let sales = JSON.parse(data);
    const index = sales.findIndex((s) => s.id === saleId);
    if (index !== -1) {
      sales[index] = {
        id: saleId,
        productId: updatedSaleData.productId,
        clientId: updatedSaleData.clientId,
        quantity: updatedSaleData.quantity,
        total: updatedSaleData.total,
      };
      fs.writeFile(salesDataFile, JSON.stringify(sales, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error al actualizar la venta.' });
          return;
        }
        res.json(sales[index]);
      });
    } else {
      res.status(404).json({ message: 'Venta no encontrada' });
    }
  });
});

// Eliminar una venta por ID
router.delete('/:id', (req, res) => {
  const saleId = req.params.id;
  fs.readFile(salesDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de ventas.' });
      return;
    }
    let sales = JSON.parse(data);
    const index = sales.findIndex((s) => s.id === saleId);
    if (index !== -1) {
      const deletedSale = sales.splice(index, 1)[0];
      fs.writeFile(salesDataFile, JSON.stringify(sales, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error al eliminar la venta.' });
          return;
        }
        res.json({ message: 'Venta eliminada', sale: deletedSale });
      });
    } else {
      res.status(404).json({ message: 'Venta no encontrada' });
    }
  });
});

module.exports = router;
