import { FormikProps, FormikErrors, FormikTouched } from "formik";

//tipos de datos para la app
export type AuthContextProps = {
  auth: Usuario | null;
  login: (userData: Usuario) => void;
  logout: () => void;
};

//Datos de respuesta
export type ResponseData = {
  message?: string;
  data?: any;
  success: boolean;
};

//Datos del login
export type LoginData = {
  usuario: string;
  contraseña: string;
};

//Roles del sistema
export type UserRole =
  | 0 //Administrador
  | 1 //Secretaria
  | 2 //Gerente
  | 3 //Medico
  | 4; //Cliente

// Modelo para las especialidades
export type Especialidad = {
  id?: string;
  nombre: string;
};

// Modelo para los médicos
export type Medico = {
  id?: string;
  number: number;
  especialidad: Especialidad;
  nombres: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
};

// Modelo para los usuarios
export type Usuario = {
  id?: string;
  number: number;
  identificacion: string;
  usuario: string;
  contraseña: string;
  nombre: string;
  correo: string;
  medico?: Medico;
  telefono: string;
  rol: UserRole;
  estado: string;
};

// Modelo para las mascotas
export type Mascota = {
  id?: string;
  number: number;
  nombre: string;
  tipo: string; // Ejemplo: perro, gato, etc.
  raza: string;
  fechaNacimiento: string;
};

// Modelo para los clientes
export type Cliente = {
  id?: string;
  number: number;
  nombre: string;
  apellidos: string;
  cedula: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  mascotas: Array<Mascota>;
};

// Modelo para las citas
export type Cita = {
  id?: string;
  number: number;
  cliente: Cliente;
  mascota: Mascota;
  fecha: string;
  hora: string;
  diagnostico: string;
  medico: Medico;
  especialidad: Especialidad;
  tratamiento: string;
  detalle: string;
  valor: number;
};

// Modelo para las facturas
export type Factura = {
  id?: string;
  nombreProveedor: string;
  ruc: string;
  numeroFactura: string;
  valorFactura: number;
  fechaFactura: string;
  detalleFactura: string;
};

// Modelo para los pagos
export type Pago = {
  id?: string;
  number: number;
  fechaCreacion: string;
  solicitante: string;
  facturas: Array<Factura>;
  valorTotal: number;
};

// Modelo para los productos
export type Producto = {
  id?: string;
  nombre: string;
  tipo: string; // Ejemplo: alimento, medicamento, etc.
  stock: number;
  valor: number;
};

export type ProductoSeleccionado = {
  producto: Producto;
  cantidad: number;
  total: number;
};

// Modelo para las ventas
export type Venta = {
  id?: string;
  number: number;
  cliente: Cliente;
  fecha: string;
  solicitante: string;
  productos: Array<ProductoSeleccionado>;
  valorVenta: number;
};

//backups
export type Backup = {
  id?: string;
  cita: any | Cita;
  pagos: any | Pago;
  cliente: any | Cliente;
  medico: any | Medico;
  ventas: any | Venta;
};

//Auditoria del sistema
export type Auditory = {
  id?: string;
  date: string;
  user: string;
  action: string;
};

export interface ModalProps<T> {
  visible: boolean;
  close: () => void;
  onDone?: (data?: T) => void | Promise<void>;
}

export interface FormikComponentProps<T = Element> extends FormikProps<T> {
  formik: {
    values: T;
    handleChange: {
      (e: ChangeEvent<any>): void;
      <T_1 = string | ChangeEvent<T>>(field: T_1): T_1 extends ChangeEvent<T>
        ? void
        : (e: string | ChangeEvent<T>) => void;
    };
    touched: FormikTouched<T>;
    errors: FormikErrors<T>;
    setFieldValue: (
      field: string,
      value: T,
      shouldValidate?: boolean
    ) => Promise<void> | Promise<FormikErrors<T>>;
    setFieldError: (field: string, value: string) => void;
  };
}
