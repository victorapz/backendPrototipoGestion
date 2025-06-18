import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/db.js'; // Extensión .js obligatoria
import { createUser, createLicitaciones , createFichaTecnica, createCotizacion, createEmpresa, createLicitacionFichaTecnica, createTrabajador } from './config/initialSetup.js'; // Asegúrate de que la ruta sea correcta 
import userRoutes from './routes/user.routes.js'; // Corrección clave aquí
import cors from 'cors';
import authRoutes from './routes/auth.js';
import Empresa from './models/empresa.model.js';
import Trabajador from './models/trabajador.model.js';
import licitacionRoutes from './routes/licitacion.routes.js';
// import FichaTecnicaRoutes from './routes/fichatecnica.routes.js';
// import licitacionfichatecnicaRoutes from './routes/licitacionfichatecnica.routes.js';


await sequelize.sync({ force: true }); // Solo en desarrollo 

dotenv.config();

// Configuración inicial
const app = express();

Empresa.associate({ Trabajador });
Trabajador.associate({ Empresa });

// Habilitar CORS para el frontend
app.use(cors({
    origin: 'http://localhost:3000', // URL de tu frontend
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.error('Error de conexión:', err));

// Rutas
app.get('/', (req, res) => {
    res.send('API Running!');
});

// Rutas de autenticación y usuarios
app.use('/api/auth', authRoutes);  // Rutas de autenticación
app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/licitaciones', licitacionRoutes);
// app.use('api/fichas-tecnicas', fichaTecnicaRoutes);
// app.use('/api/licitacionfichatecnica', licitacionfichatecnicaRoutes);

const startServer = async () => {
    try {
        // 1. Autenticar conexión
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida');

        // 2. Sincronizar modelos (esto debe estar solo en desarrollo)
        await sequelize.sync({ force: true });
        console.log('🔄 Tablas recreadas exitosamente');

        await createUser();
        await createLicitaciones();
        await createEmpresa();
        await createCotizacion();
        await createFichaTecnica();
        await createTrabajador();
        await createLicitacionFichaTecnica();

        // 4. Iniciar servidor
        const PORT = 4000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error crítico:', error);
        process.exit(1);
    }
};
startServer();

// Función para crear un usuario inicial (opcional)
// async function setupAPI() {
//     try {
//         await createUser();
//     } catch (error) {
//         console.log("Error en index.js -> setupAPI(), el error es: ", error);
//     }
// }

// setupAPI()
//     .then(() => console.log("=> API Iniciada exitosamente"))
//     .catch((error) =>
//         console.log("Error en index.js -> setupAPI(), el error es: ", error),
//     );
