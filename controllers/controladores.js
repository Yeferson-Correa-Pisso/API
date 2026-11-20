import db from '../db.js';

// Consultar todos los productos
export const consultarProductos = async (req, res) => {
    try {
        const [productos] = await db.query(
            'SELECT * FROM productos'
        );

        console.log('Productos consultados correctamente');

        res.json({
            mensaje: 'Productos consultados correctamente',
            total: productos.length,
            productos
        });

    } catch (error) {
        console.error('Error al consultar:', error);

        res.status(500).json({
            mensaje: 'Error al consultar los productos'
        });
    }
};

// Registrar un producto
export const registrarProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, stock } = req.body;

        const [resultado] = await db.query(
            `INSERT INTO productos
            (nombre, categoria, precio, stock)
            VALUES (?, ?, ?, ?)`,
            [nombre, categoria, precio, stock]
        );

        console.log('Producto registrado. ID:', resultado.insertId);

        res.status(201).json({
            mensaje: 'Producto registrado correctamente',
            id: resultado.insertId
        });

    } catch (error) {
        console.error('Error al registrar:', error);

        res.status(500).json({
            mensaje: 'Error al registrar el producto'
        });
    }
};

// Modificar un producto
export const modificarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, precio, stock } = req.body;

        const [resultado] = await db.query(
            `UPDATE productos
            SET nombre = ?, categoria = ?, precio = ?, stock = ?
            WHERE id = ?`,
            [nombre, categoria, precio, stock, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        console.log('Producto modificado. ID:', id);

        res.json({
            mensaje: 'Producto modificado correctamente',
            id
        });

    } catch (error) {
        console.error('Error al modificar:', error);

        res.status(500).json({
            mensaje: 'Error al modificar el producto'
        });
    }
};


// Consultar un producto por su ID
export const consultarProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [productos] = await db.query(
            'SELECT * FROM productos WHERE id = ?',
            [id]
        );

        if (productos.length === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        console.log('Producto consultado correctamente');
        console.log(productos[0]);

        res.json({
            mensaje: 'Producto consultado correctamente',
            producto: productos[0]
        });

    } catch (error) {
        console.error('Error al consultar producto:', error);

        res.status(500).json({
            mensaje: 'Error al consultar el producto'
        });
    }
};
