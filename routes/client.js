const express = require('express');
const router = express.Router();



const clientsData = require('../data/clients.json');

// Obtener todos los clientes
router.get('/', (req, res) => {
    const clients = clientsData.clients;
    res.json(clients);
  });

// Obtener un cliente por ID
router.get('/:id', (req, res) => {
    const clientId = req.params.id;
    const client = clientsData.clients.find((c) => c.id === parseInt(clientId));
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  });

// Agregar un nuevo cliente
router.post('/', (req, res) => {
    const newClient = req.body;
    clientsData.clients.push(newClient);
    // Aquí puedes guardar los datos actualizados en el archivo JSON
    // (guardar en clients.json)
    res.json(newClient);
  });

// Actualizar un cliente por ID
router.put('/:id', (req, res) => {
  const clientId = req.params.id;
  const updatedClient = req.body;
  // Implementa la lógica para actualizar el cliente con el ID especificado
  // en el archivo JSON (clients.json).
  res.json(updatedClient);
});

// Eliminar un cliente por ID
router.delete('/:id', (req, res) => {
  const clientId = req.params.id;
  // Implementa la lógica para eliminar el cliente con el ID especificado
  // del archivo JSON (clients.json).
  res.json({ message: 'Cliente eliminado' });
});

module.exports = router;
