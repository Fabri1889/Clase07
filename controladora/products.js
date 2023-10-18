const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const fs = require('fs');

const productsDataFile = './data/products.json';

// Consultar todos los productos
router.get('/', (req, res) => {
  fs.readFile(productsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de productos.' });
      return;
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

// Consultar un producto por ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  fs.readFile(productsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de productos.' });
      return;
    }
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const newProductData = req.body;
  fs.readFile(productsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de productos.' });
      return;
    }
    const products = JSON.parse(data);
    const newProduct = new Product(newProductData.id, newProductData.name, newProductData.price);
    products.push(newProduct);
    fs.writeFile(productsDataFile, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error al guardar el nuevo producto.' });
        return;
      }
      res.json(newProduct);
    });
  });
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  fs.readFile(productsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de productos.' });
      return;
    }
    let products = JSON.parse(data);
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products[index] = {
        id: productId,
        name: updatedProductData.name,
        price: updatedProductData.price,
      };
      fs.writeFile(productsDataFile, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error al actualizar el producto.' });
          return;
        }
        res.json(products[index]);
      });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  fs.readFile(productsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de productos.' });
      return;
    }
    let products = JSON.parse(data);
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      fs.writeFile(productsDataFile, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error al eliminar el producto.' });
          return;
        }
        res.json({ message: 'Producto eliminado', product: deletedProduct });
      });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
});

module.exports = router;
