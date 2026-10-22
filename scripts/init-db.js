// Script para inicializar la base de datos con datos de prueba COMPLETOS
const mongoose = require('mongoose');

// URL de conexión a MongoDB local
const MONGODB_URI = 'mongodb://localhost:27017/veterinaria';

// Datos iniciales - ESPECIALIDADES
const especialidades = [
  { nombre: 'Medicina General' },
  { nombre: 'Cirugía Veterinaria' },
  { nombre: 'Dermatología' },
  { nombre: 'Cardiología' },
  { nombre: 'Odontología Veterinaria' },
  { nombre: 'Traumatología' },
  { nombre: 'Oftalmología' }
];

// PRODUCTOS
const productos = [
  { nombre: 'Alimento para perros adultos', tipo: 'Alimento', stock: 50, valor: 25.50 },
  { nombre: 'Alimento para gatos', tipo: 'Alimento', stock: 30, valor: 22.00 },
  { nombre: 'Alimento para cachorros', tipo: 'Alimento', stock: 40, valor: 28.00 },
  { nombre: 'Shampoo antiparasitario', tipo: 'Higiene', stock: 40, valor: 12.50 },
  { nombre: 'Collar antipulgas', tipo: 'Accesorio', stock: 25, valor: 18.00 },
  { nombre: 'Vitaminas para mascotas', tipo: 'Medicamento', stock: 60, valor: 15.75 },
  { nombre: 'Desparasitante interno', tipo: 'Medicamento', stock: 35, valor: 22.50 },
  { nombre: 'Juguete para perros', tipo: 'Accesorio', stock: 45, valor: 8.50 },
  { nombre: 'Arena para gatos', tipo: 'Higiene', stock: 55, valor: 12.00 },
  { nombre: 'Plato para comida', tipo: 'Accesorio', stock: 30, valor: 6.50 }
];

// MASCOTAS
const mascotas = [
  { number: 1, nombre: 'Max', tipo: 'Perro', raza: 'Labrador', fechaNacimiento: '2020-05-15' },
  { number: 2, nombre: 'Luna', tipo: 'Gato', raza: 'Persa', fechaNacimiento: '2019-08-20' },
  { number: 3, nombre: 'Rocky', tipo: 'Perro', raza: 'Bulldog', fechaNacimiento: '2021-03-10' },
  { number: 4, nombre: 'Mia', tipo: 'Gato', raza: 'Siamés', fechaNacimiento: '2020-11-05' },
  { number: 5, nombre: 'Zeus', tipo: 'Perro', raza: 'Pastor Alemán', fechaNacimiento: '2019-07-22' },
  { number: 6, nombre: 'Bella', tipo: 'Perro', raza: 'Golden Retriever', fechaNacimiento: '2022-01-15' },
  { number: 7, nombre: 'Simba', tipo: 'Gato', raza: 'Angora', fechaNacimiento: '2021-09-30' },
  { number: 8, nombre: 'Coco', tipo: 'Perro', raza: 'Poodle', fechaNacimiento: '2020-12-12' }
];

// CLIENTES
const clientes = [
  {
    number: 1,
    nombre: 'Juan',
    apellidos: 'Pérez López',
    cedula: '1720345678',
    fechaNacimiento: '1985-06-15',
    telefono: '0987654321',
    correo: 'juan.perez@email.com',
    mascotas: [mascotas[0], mascotas[2]]
  },
  {
    number: 2,
    nombre: 'María',
    apellidos: 'González Torres',
    cedula: '1715678901',
    fechaNacimiento: '1990-03-22',
    telefono: '0998765432',
    correo: 'maria.gonzalez@email.com',
    mascotas: [mascotas[1]]
  },
  {
    number: 3,
    nombre: 'Carlos',
    apellidos: 'Ramírez Silva',
    cedula: '1710234567',
    fechaNacimiento: '1988-11-08',
    telefono: '0976543210',
    correo: 'carlos.ramirez@email.com',
    mascotas: [mascotas[4]]
  },
  {
    number: 4,
    nombre: 'Ana',
    apellidos: 'Martínez Cruz',
    cedula: '1718901234',
    fechaNacimiento: '1992-07-30',
    telefono: '0965432109',
    correo: 'ana.martinez@email.com',
    mascotas: [mascotas[3], mascotas[6]]
  },
  {
    number: 5,
    nombre: 'Luis',
    apellidos: 'Fernández Ruiz',
    cedula: '1712345098',
    fechaNacimiento: '1987-02-14',
    telefono: '0954321098',
    correo: 'luis.fernandez@email.com',
    mascotas: [mascotas[5], mascotas[7]]
  }
];

// USUARIOS
const usuarios = [
  {
    number: 1,
    identificacion: '1234567890',
    usuario: 'admin',
    contraseña: 'admin123',
    nombre: 'Administrador Sistema',
    correo: 'admin@ohmydog.com',
    telefono: '0999999999',
    rol: 0, // Administrador
    estado: 'activo'
  },
  {
    number: 2,
    identificacion: '0987654321',
    usuario: 'secretaria',
    contraseña: 'secretaria123',
    nombre: 'María García',
    correo: 'secretaria@ohmydog.com',
    telefono: '0988888888',
    rol: 1, // Secretaria
    estado: 'activo'
  },
  {
    number: 3,
    identificacion: '1723456789',
    usuario: 'gerente',
    contraseña: 'gerente123',
    nombre: 'Roberto Sánchez',
    correo: 'gerente@ohmydog.com',
    telefono: '0977777777',
    rol: 2, // Gerente
    estado: 'activo'
  }
];

async function initDatabase() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Limpiar colecciones existentes
    const collections = await mongoose.connection.db.collections();
    console.log('\nLimpiando base de datos...');
    for (let collection of collections) {
      await collection.deleteMany({});
    }
    console.log('✓ Base de datos limpiada');

    const db = mongoose.connection.db;

    // 1. Insertar especialidades
    console.log('\nInsertando especialidades...');
    const especialidadesCreadas = await db.collection('especialidades').insertMany(especialidades);
    console.log(`✓ ${especialidades.length} especialidades creadas`);
    const especialidadesArray = await db.collection('especialidades').find({}).toArray();

    // 2. Insertar médicos
    console.log('\nInsertando médicos...');
    const medicos = [
      {
        number: 1,
        especialidad: especialidadesArray[0],
        nombres: 'Dr. Pedro Morales',
        correo: 'pedro.morales@ohmydog.com',
        telefono: '0991234567',
        fechaNacimiento: '1980-04-12'
      },
      {
        number: 2,
        especialidad: especialidadesArray[1],
        nombres: 'Dra. Laura Vega',
        correo: 'laura.vega@ohmydog.com',
        telefono: '0992345678',
        fechaNacimiento: '1985-09-25'
      },
      {
        number: 3,
        especialidad: especialidadesArray[2],
        nombres: 'Dr. Miguel Ortiz',
        correo: 'miguel.ortiz@ohmydog.com',
        telefono: '0993456789',
        fechaNacimiento: '1978-12-08'
      }
    ];
    await db.collection('medicos').insertMany(medicos);
    console.log(`✓ ${medicos.length} médicos creados`);
    const medicosArray = await db.collection('medicos').find({}).toArray();

    // 3. Actualizar usuarios con médicos
    usuarios[3] = {
      number: 4,
      identificacion: '1720987654',
      usuario: 'medico1',
      contraseña: 'medico123',
      nombre: 'Dr. Pedro Morales',
      correo: 'pedro.morales@ohmydog.com',
      medico: medicosArray[0],
      telefono: '0991234567',
      rol: 3, // Médico
      estado: 'activo'
    };

    // 4. Insertar usuarios
    console.log('\nInsertando usuarios...');
    await db.collection('users').insertMany(usuarios);
    console.log(`✓ ${usuarios.length} usuarios creados`);

    // 5. Insertar productos
    console.log('\nInsertando productos...');
    await db.collection('productos').insertMany(productos);
    console.log(`✓ ${productos.length} productos creados`);

    // 6. Insertar clientes con mascotas
    console.log('\nInsertando clientes...');
    await db.collection('clientes').insertMany(clientes);
    console.log(`✓ ${clientes.length} clientes creados`);
    const clientesArray = await db.collection('clientes').find({}).toArray();

    // 7. Insertar citas médicas
    console.log('\nInsertando citas médicas...');
    const citas = [
      {
        number: 1,
        cliente: clientesArray[0],
        mascota: clientesArray[0].mascotas[0],
        fecha: '2026-02-15',
        hora: '09:00',
        diagnostico: 'Chequeo general de rutina',
        medico: medicosArray[0],
        especialidad: especialidadesArray[0],
        tratamiento: 'Vacunación antirrábica y chequeo completo',
        detalle: 'Mascota en buen estado de salud general',
        valor: 45.00
      },
      {
        number: 2,
        cliente: clientesArray[1],
        mascota: clientesArray[1].mascotas[0],
        fecha: '2026-02-16',
        hora: '10:30',
        diagnostico: 'Infección en la piel',
        medico: medicosArray[2],
        especialidad: especialidadesArray[2],
        tratamiento: 'Antibióticos y crema tópica',
        detalle: 'Aplicar tratamiento por 10 días',
        valor: 65.00
      },
      {
        number: 3,
        cliente: clientesArray[0],
        mascota: clientesArray[0].mascotas[1],
        fecha: '2026-02-17',
        hora: '14:00',
        diagnostico: 'Revisión post-operatoria',
        medico: medicosArray[1],
        especialidad: especialidadesArray[1],
        tratamiento: 'Seguimiento de cirugía',
        detalle: 'Recuperación satisfactoria',
        valor: 80.00
      },
      {
        number: 4,
        cliente: clientesArray[3],
        mascota: clientesArray[3].mascotas[0],
        fecha: '2026-02-18',
        hora: '11:00',
        diagnostico: 'Limpieza dental',
        medico: medicosArray[0],
        especialidad: especialidadesArray[4],
        tratamiento: 'Limpieza y aplicación de flúor',
        detalle: 'Realizar limpieza cada 6 meses',
        valor: 55.00
      }
    ];
    await db.collection('citas').insertMany(citas);
    console.log(`✓ ${citas.length} citas médicas creadas`);

    // 8. Insertar ventas
    console.log('\nInsertando ventas...');
    const productosArray = await db.collection('productos').find({}).toArray();
    const ventas = [
      {
        number: 1,
        cliente: clientesArray[0],
        fecha: '2026-02-10',
        solicitante: 'María García',
        productos: [
          {
            producto: productosArray[0],
            cantidad: 2,
            total: productosArray[0].valor * 2
          },
          {
            producto: productosArray[5],
            cantidad: 1,
            total: productosArray[5].valor
          }
        ],
        valorVenta: (productosArray[0].valor * 2) + productosArray[5].valor
      },
      {
        number: 2,
        cliente: clientesArray[1],
        fecha: '2026-02-11',
        solicitante: 'María García',
        productos: [
          {
            producto: productosArray[1],
            cantidad: 3,
            total: productosArray[1].valor * 3
          },
          {
            producto: productosArray[8],
            cantidad: 2,
            total: productosArray[8].valor * 2
          }
        ],
        valorVenta: (productosArray[1].valor * 3) + (productosArray[8].valor * 2)
      },
      {
        number: 3,
        cliente: clientesArray[2],
        fecha: '2026-02-12',
        solicitante: 'María García',
        productos: [
          {
            producto: productosArray[3],
            cantidad: 1,
            total: productosArray[3].valor
          },
          {
            producto: productosArray[4],
            cantidad: 1,
            total: productosArray[4].valor
          }
        ],
        valorVenta: productosArray[3].valor + productosArray[4].valor
      }
    ];
    await db.collection('ventas').insertMany(ventas);
    console.log(`✓ ${ventas.length} ventas creadas`);

    // 9. Insertar pagos
    console.log('\nInsertando pagos...');
    const pagos = [
      {
        number: 1,
        fechaCreacion: '2026-02-05',
        solicitante: 'Roberto Sánchez',
        facturas: [
          {
            nombreProveedor: 'Distribuidora Veterinaria S.A.',
            ruc: '1792345678001',
            numeroFactura: '001-001-000123',
            valorFactura: 450.50,
            fechaFactura: '2026-02-01',
            detalleFactura: 'Compra de alimentos y medicamentos'
          }
        ],
        valorTotal: 450.50
      },
      {
        number: 2,
        fechaCreacion: '2026-02-08',
        solicitante: 'Roberto Sánchez',
        facturas: [
          {
            nombreProveedor: 'MediPet Suministros',
            ruc: '1798765432001',
            numeroFactura: '001-002-000456',
            valorFactura: 320.00,
            fechaFactura: '2026-02-06',
            detalleFactura: 'Equipamiento médico básico'
          },
          {
            nombreProveedor: 'Servicios Públicos',
            ruc: '1790123456001',
            numeroFactura: '001-003-000789',
            valorFactura: 85.30,
            fechaFactura: '2026-02-07',
            detalleFactura: 'Pago de servicios básicos'
          }
        ],
        valorTotal: 405.30
      }
    ];
    await db.collection('pagos').insertMany(pagos);
    console.log(`✓ ${pagos.length} pagos creados`);

    console.log('\n=================================');
    console.log('Base de datos inicializada correctamente!');
    console.log('=================================');
    console.log('\n📊 RESUMEN DE DATOS CREADOS:');
    console.log(`  • ${usuarios.length} Usuarios`);
    console.log(`  • ${especialidades.length} Especialidades`);
    console.log(`  • ${medicos.length} Médicos`);
    console.log(`  • ${clientes.length} Clientes`);
    console.log(`  • ${mascotas.length} Mascotas`);
    console.log(`  • ${productos.length} Productos`);
    console.log(`  • ${citas.length} Citas Médicas`);
    console.log(`  • ${ventas.length} Ventas`);
    console.log(`  • ${pagos.length} Pagos`);
    console.log('\n🔐 CREDENCIALES DE ACCESO:');
    console.log('\nAdministrador:');
    console.log('  Usuario: admin');
    console.log('  Contraseña: admin123');
    console.log('\nSecretaria:');
    console.log('  Usuario: secretaria');
    console.log('  Contraseña: secretaria123');
    console.log('\nGerente:');
    console.log('  Usuario: gerente');
    console.log('  Contraseña: gerente123');
    console.log('\nMédico:');
    console.log('  Usuario: medico1');
    console.log('  Contraseña: medico123');
    console.log('=================================\n');

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

initDatabase();
