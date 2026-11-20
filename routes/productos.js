import express from 'express';

import {
    consultarProductos,
    registrarProducto,
    modificarProducto,
    consultarProductoPorId
} from '../controllers/controladores.js';

const router = express.Router();

// Consultar todos los productos
router.get('/', consultarProductos);

// Registrar un producto
router.post('/', registrarProducto);

// Consultar un producto por su ID
router.get('/:id', consultarProductoPorId);

// Modificar un producto
router.put('/:id', modificarProducto);

export default router;