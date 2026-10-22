/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import {
  Cliente,
  Producto,
  ProductoSeleccionado,
  ResponseData,
  Venta,
} from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useEffect, useState } from "react";
import FormatedDate from "../../../controllers/utils/formated_date";

export const VentasCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [clienteSearch, setClienteSearch] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProductos, setSelectedProductos] = useState<
    ProductoSeleccionado[]
  >([]);
  const [productoSearch, setProductoSearch] = useState("");

  // Cargar clientes desde el backend
  const loadClient = async () => {
    setLoading(true);
    const response = await HttpClient(
      "/api/client",
      "GET",
      auth.usuario,
      auth.rol
    );
    setClientes(response.data ?? []);
    setLoading(false);
  };

  const loadProducts = async () => {
    setLoading(true);
    const response = await HttpClient(
      "/api/productos",
      "GET",
      auth.usuario,
      auth.rol
    );
    setProductos(response.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadClient();
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddProducto = (producto: Producto, cantidad: number) => {
    const total = producto.valor * cantidad;
    setSelectedProductos((prev) => [...prev, { producto, cantidad, total }]);
  };

  const formik = useFormik<Venta>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      number: 0,
      cliente: null,
      fecha: FormatedDate(),
      solicitante: auth.nombre,
      productos: [],
      valorVenta: 0,
    },
    onSubmit: async (formData) => {
      setLoading(true);

      formData.cliente = selectedCliente;
      formData.productos = selectedProductos; // Incluir todos los datos del producto
      formData.valorVenta = selectedProductos.reduce(
        (acc, p) => acc + p.total,
        0
      );
      console.log(formData);

      const response: ResponseData = await HttpClient(
        `/api/ventas`,
        "POST",
        auth.usuario,
        auth.rol,
        formData
      );
      
      if (response.success) {
        toast.success("Venta creada correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }

      setLoading(false);
    },
  });

  return (
    <>
      <title>Crear venta | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto p-2 m-5 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-500 text-center mb-2">
              Crear Venta
            </h1>
            <p className="md:text-xl text-lg py-2 font-bold text-blue-500">
              Datos del cliente
            </p>
            {/* Buscar cliente */}
            <div className="mb-2">
              <label className="block font-semibold mb-2">Buscar Cliente</label>
              <input
                type="text"
                placeholder="Buscar por nombre o cédula"
                className="w-full p-2 border rounded-lg"
                value={clienteSearch}
                onChange={(e) => setClienteSearch(e.target.value)}
              />
              {clienteSearch.trim() !== "" && ( // Mostrar lista solo si hay texto en el input
                <ul className="mt-2 bg-white border rounded-lg max-h-40 overflow-y-auto">
                  {clientes
                    .filter(
                      (c) =>
                        c.nombre
                          .toLowerCase()
                          .includes(clienteSearch.toLowerCase()) ||
                        c.cedula.includes(clienteSearch)
                    )
                    .map((cliente) => (
                      <li
                        key={cliente.id}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCliente(cliente);
                          setClienteSearch(cliente.nombre); // Mostrar el nombre del cliente seleccionado en el input
                        }}
                      >
                        {cliente.nombre} - {cliente.cedula}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Mostrar cliente seleccionado */}
            {selectedCliente && (
              <>
                <p className="font-semibold p-2">Cliente Seleccionado:</p>
                <div className="flex">
                  <p className="p-2">
                    {selectedCliente.nombre} {selectedCliente.apellidos} -{" "}
                    {selectedCliente.cedula}
                  </p>
                  <p className="p-2">
                    <span className="font-semibold">Correo:</span>{" "}
                    {selectedCliente.correo}
                  </p>
                  <p className="p-2">
                    <span className="font-semibold">Teléfono:</span>{" "}
                    {selectedCliente.telefono}
                  </p>
                </div>
              </>
            )}

            <p className="md:text-xl text-lg pt-3 font-bold text-blue-500">
              Datos de producto(s)
            </p>

            {/* Buscar y agregar productos */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Buscar Producto
              </label>
              <input
                type="text"
                placeholder="Buscar producto por nombre"
                className="w-full p-2 border rounded-lg"
                value={productoSearch}
                onChange={(e) => setProductoSearch(e.target.value)}
              />
              {productoSearch.trim() !== "" && (
                <ul className="mt-2 bg-white border rounded-lg max-h-40 overflow-y-auto">
                  {productos
                    .filter(
                      (p) =>
                        p.nombre &&
                        p.nombre
                          .toLowerCase()
                          .includes(productoSearch.toLowerCase())
                    )
                    .map((producto) => (
                      <li
                        key={producto.id}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          const cantidad = parseInt(
                            prompt("Ingrese la cantidad del producto:") || "0",
                            10
                          );
                          if (!isNaN(cantidad) && cantidad > 0) {
                            handleAddProducto(producto, cantidad);
                            setProductoSearch(""); // Limpia el campo de búsqueda
                          }
                        }}
                      >
                        {producto.nombre} - ${producto.valor}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Tabla de productos seleccionados */}
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Producto</th>
                  <th className="border border-gray-300 p-2">Cantidad</th>
                  <th className="border border-gray-300 p-2">
                    Precio Unitario
                  </th>
                  <th className="border border-gray-300 p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedProductos.map((p, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {p.producto.nombre}
                    </td>
                    <td className="border border-gray-300 p-2">{p.cantidad}</td>
                    <td className="border border-gray-300 p-2">
                      ${p.producto.valor.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${p.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Valor total */}
            <div className="mt-5 font-bold text-right">
              Valor Total: $
              {selectedProductos
                .reduce((acc, p) => acc + p.total, 0)
                .toFixed(2)}
            </div>

            {/* Botón de guardar */}
            <div className="text-center mt-5">
              <Button
                className="text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg px-5 py-3"
                onClick={() => formik.handleSubmit()}
                disabled={!selectedCliente} // Deshabilitar si no se ha seleccionado cliente
              >
                Guardar Venta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentasCreate;
