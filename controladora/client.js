const express = require('express');
const router = express.Router();
const Sale = require('../models/client');
const fs = require('fs'); 

const clientsDataFile = './data/clients.json'; 

// Obtener todos los clientes
router.get('/', (req, res) => {
  fs.readFile(clientsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de clientes.' });
      return;
    }
    const clients = JSON.parse(data);
    res.json(clients);
  });
});

// Obtener un cliente por ID
router.get('/:id', (req, res) => {
  const clientId = req.params.id;
  fs.readFile(clientsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de clientes.' });
      return;
    }
    const clients = JSON.parse(data);
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  });
});

// Agregar un nuevo cliente
router.post('/', (req, res) => {
  const newClient = req.body;
  fs.readFile(clientsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de clientes.' });
      return;
    }
    const clients = JSON.parse(data);
    clients.push(newClient);
    fs.writeFile(clientsDataFile, JSON.stringify(clients, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error al guardar el nuevo cliente.' });
        return;
      }
      res.json(newClient);
    });
  });
});

// Actualizar un cliente por ID
router.put('/:id', (req, res) => {
  const clientId = req.params.id;
  const updatedClient = req.body;
  fs.readFile(clientsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de clientes.' });
      return;
    }
    let clients = JSON.parse(data);
    const index = clients.findIndex((c) => c.id === clientId);
    if (index !== -1) {
      clients[index] = updatedClient;
      fs.writeFile(clientsDataFile, JSON.stringify(clients, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error al actualizar el cliente.' });
          return;
        }
        res.json(updatedClient);
      });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  });
});

// Eliminar un cliente por ID
router.delete('/:id', (req, res) => {
  const clientId = req.params.id;
  fs.readFile(clientsDataFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer los datos de clientes.' });
      return;
    }
    let clients = JSON.parse(data);
    const index = clients.findIndex((c) => c.id === clientId);
    if (index !== -1) {
      const deletedClient = clients.splice(index, 1)[0];
      fs.writeFile(clientsDataFile, JSON.stringify(clients, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error al eliminar el cliente.' });
          return;
        }
        res.json({ message: 'Cliente eliminado', client: deletedClient });
      });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  });
});

module.exports = router;
