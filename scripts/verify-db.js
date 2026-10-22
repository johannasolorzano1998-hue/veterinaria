// Script para verificar los datos en la base de datos
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/veterinaria';

async function verifyData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB\n');

    const db = mongoose.connection.db;

    // Verificar usuarios
    const users = await db.collection('users').find({}).toArray();
    console.log('=== USUARIOS ===');
    users.forEach(u => {
      console.log(`- ${u.nombre} (${u.usuario}) - Rol: ${u.rol}`);
    });

    // Verificar especialidades
    const especialidades = await db.collection('especialidades').find({}).toArray();
    console.log('\n=== ESPECIALIDADES ===');
    especialidades.forEach(e => {
      console.log(`- ${e.nombre}`);
    });

    // Verificar productos
    const productos = await db.collection('productos').find({}).toArray();
    console.log('\n=== PRODUCTOS ===');
    productos.forEach(p => {
      console.log(`- ${p.nombre} - Stock: ${p.stock} - Precio: $${p.valor}`);
    });

    console.log('\n=== TOTALES ===');
    console.log(`Usuarios: ${users.length}`);
    console.log(`Especialidades: ${especialidades.length}`);
    console.log(`Productos: ${productos.length}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

verifyData();
