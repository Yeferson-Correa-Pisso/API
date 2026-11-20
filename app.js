import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import productosRoutes from './routes/productos.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//Datos del JSON
app.use(express.json());

// Rutas Productos
app.use('/productos', productosRoutes);


// Ruta Servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
    
});

// Comprobar conexión desde el navegador
app.get('/conexion', async (req, res) => {
    try {
        const [resultado] = await db.query('SELECT 1 AS conexion');

        res.json({
            mensaje: 'Conexión exitosa con MySQL',
            resultado
        });

    } catch (error) {
        console.error('Error de conexión:', error);

        res.status(500).json({
            mensaje: 'Error de conexión'
        });
    }
});

// Iniciar servidor y comprobar conexión con MySQL
async function iniciarServidor() {
    try {
        await db.query('SELECT 1');

        console.log('Conexión exitosa con MySQL');

        app.listen(PORT, () => {
            console.log(`Servidor activo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al conectar con MySQL:', error.message);
    }
}


iniciarServidor();

