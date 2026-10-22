import mongoose, { mongo, Schema } from "mongoose";
import {
  Auditory,
  Backup,
  Cita,
  Cliente,
  Especialidad,
  Factura,
  Mascota,
  Medico,
  Pago,
  Producto,
  ProductoSeleccionado,
  Usuario,
  Venta,
} from "../models";

const EspecialidadSchema = new mongoose.Schema<Especialidad>(
  {
    nombre: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
EspecialidadSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
EspecialidadSchema.set("toJSON", {
  virtuals: true,
});

export const EspecialidadModel =
  mongoose.models.Especialidades ||
  mongoose.model("Especialidades", EspecialidadSchema);

const MedicosSchema = new mongoose.Schema<Medico>(
  {
    number: { type: Number },
    especialidad: { type: EspecialidadSchema },
    nombres: { type: String },
    correo: { type: String },
    telefono: { type: String },
    fechaNacimiento: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
MedicosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MedicosSchema.set("toJSON", {
  virtuals: true,
});

export const MedicosModel =
  mongoose.models.Medicos || mongoose.model("Medicos", MedicosSchema);

const UserSchema = new mongoose.Schema<Usuario>(
  {
    number: { type: Number },
    usuario: { type: String, unique: true },
    contraseña: { type: String },
    nombre: { type: String },
    correo: { type: String },
    identificacion: { type: String },
    medico: { type: MedicosSchema },
    telefono: { type: String },
    rol: { type: Number },
    estado: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set("toJSON", {
  virtuals: true,
});

export const UserModel =
  mongoose.models.Users || mongoose.model("Users", UserSchema);

const MascotaSchema = new mongoose.Schema<Mascota>(
  {
    number: { type: Number },
    nombre: { type: String },
    tipo: { type: String },
    raza: { type: String },
    fechaNacimiento: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
MascotaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MascotaSchema.set("toJSON", {
  virtuals: true,
});

export const MascotaModel =
  mongoose.models.Mascotas || mongoose.model("Mascotas", MascotaSchema);

const ClientSchema = new mongoose.Schema<Cliente>(
  {
    number: { type: Number },
    nombre: { type: String },
    apellidos: { type: String },
    cedula: { type: String },
    fechaNacimiento: { type: String },
    telefono: { type: String },
    correo: { type: String },
    mascotas: { type: [MascotaSchema] },
  },
  { timestamps: true }
);

// Duplicate the ID field.
ClientSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ClientSchema.set("toJSON", {
  virtuals: true,
});

export const ClientModel =
  mongoose.models.Clientes || mongoose.model("Clientes", ClientSchema);

const CitasSchema = new mongoose.Schema<Cita>(
  {
    number: { type: Number },
    cliente: { type: ClientSchema },
    mascota: { type: MascotaSchema },
    fecha: { type: String },
    hora: { type: String },
    diagnostico: { type: String },
    medico: { type: MedicosSchema },
    especialidad: { type: EspecialidadSchema },
    tratamiento: { type: String },
    detalle: { type: String },
    valor: { type: Number },
  },
  { timestamps: true }
);

// Duplicate the ID field.
CitasSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CitasSchema.set("toJSON", {
  virtuals: true,
});

export const CitaModel =
  mongoose.models.Citas || mongoose.model("Citas", CitasSchema);

const FactureSchema = new mongoose.Schema<Factura>(
  {
    nombreProveedor: { type: String },
    ruc: { type: String },
    numeroFactura: { type: String },
    valorFactura: { type: Number },
    fechaFactura: { type: String },
    detalleFactura: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
FactureSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
FactureSchema.set("toJSON", {
  virtuals: true,
});

const PagoSchema = new mongoose.Schema<Pago>(
  {
    number: { type: Number },
    fechaCreacion: { type: String },
    solicitante: { type: String },
    facturas: { type: [FactureSchema] },
    valorTotal: { type: Number },
  },
  { timestamps: true }
);

// Duplicate the ID field.
PagoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Calculate total from factures.
PagoSchema.virtual("total").get(function () {
  let total = 0;
  this.facturas.forEach(
    (element: Factura) => (total += element.valorFactura ?? 0)
  );
  return total;
});

// Ensure virtual fields are serialised.
PagoSchema.set("toJSON", {
  virtuals: true,
});

export const PagoModel =
  mongoose.models.Pagos || mongoose.model("Pagos", PagoSchema);

const ProductosSchema = new mongoose.Schema<Producto>(
  {
    nombre: { type: String },
    tipo: { type: String },
    stock: { type: Number },
    valor: { type: Number },
  },
  { timestamps: true }
);

// Duplicate the ID field.
ProductosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProductosSchema.set("toJSON", {
  virtuals: true,
});

export const ProductoModel =
  mongoose.models.Productos || mongoose.model("Productos", ProductosSchema);

const ProductosSeleccionadosSchema = new mongoose.Schema<ProductoSeleccionado>(
  {
    producto: { type: ProductosSchema },
    cantidad: { type: Number },
    total: { type: Number },
  },
  { timestamps: true }
);

// Duplicate the ID field.
ProductosSeleccionadosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProductosSeleccionadosSchema.set("toJSON", {
  virtuals: true,
});

const VentaSchema = new mongoose.Schema<Venta>(
  {
    number: { type: Number },
    cliente: { type: ClientSchema },
    fecha: { type: String },
    solicitante: { type: String },
    productos: { type: [ProductosSeleccionadosSchema] },
    valorVenta: { type: Number },
  },
  { timestamps: true }
);

// Duplicate the ID field.
VentaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Calculate total from factures.
VentaSchema.virtual("total").get(function () {
  let total = 0;
  this.productos.forEach(
    (element: ProductoSeleccionado) => (total += element.total ?? 0)
  );
  return total;
});

// Ensure virtual fields are serialised.
VentaSchema.set("toJSON", {
  virtuals: true,
});

export const VentaModel =
  mongoose.models.Ventas || mongoose.model("Ventas", VentaSchema);

const BackupPagosSchema = new mongoose.Schema<Backup>(
  {
    pagos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pagos",
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
BackupPagosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
BackupPagosSchema.set("toJSON", {
  virtuals: true,
});

export const BackupPagosModel =
  mongoose.models.BackupsPagos ||
  mongoose.model("BackupsPagos", BackupPagosSchema);

const BackupClientSchema = new mongoose.Schema<Backup>(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clientes",
    },
  },
  { timestamps: true }
);

BackupClientSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupClientSchema.set("toJSON", {
  virtuals: true,
});

export const BackupClientsModel =
  mongoose.models.BackupsClients ||
  mongoose.model("BackupsClients", BackupClientSchema);

const BackupMedicoSchema = new mongoose.Schema<Backup>(
  {
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicos",
    },
  },
  { timestamps: true }
);

BackupMedicoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupMedicoSchema.set("toJSON", {
  virtuals: true,
});

export const BackupMedicosModel =
  mongoose.models.BackupsMedicos ||
  mongoose.model("BackupsMedicos", BackupMedicoSchema);

const BackupCitaSchema = new mongoose.Schema<Backup>(
  {
    cita: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citas",
    },
  },
  { timestamps: true }
);

BackupCitaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupCitaSchema.set("toJSON", {
  virtuals: true,
});

export const BackupCitasModel =
  mongoose.models.BackupsCitas ||
  mongoose.model("BackupsCitas", BackupCitaSchema);

const BackupVentasSchema = new mongoose.Schema<Backup>(
  {
    ventas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ventas",
    },
  },
  { timestamps: true }
);

BackupVentasSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupVentasSchema.set("toJSON", {
  virtuals: true,
});

export const BackupVentasModel =
  mongoose.models.BackupsVentas ||
  mongoose.model("BackupsVentas", BackupVentasSchema);

const AuditorySchema = new mongoose.Schema<Auditory>(
  {
    date: { type: String },
    user: { type: String },
    action: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
AuditorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AuditorySchema.set("toJSON", {
  virtuals: true,
});

export const AuditoryModel =
  mongoose.models.Auditory || mongoose.model("Auditory", AuditorySchema);
