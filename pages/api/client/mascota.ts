import { NextApiRequest, NextApiResponse } from "next";
import { AuditoryModel, ClientModel } from "../../../database/schemas";
import FormatedDate from "../../../controllers/utils/formated_date";
import dbConnect from "../../../database/connect/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Conectar a la base de datos
    await dbConnect();

    console.log("Método:", req.method);
    console.log("Query params:", req.query);

    if (req.method === "GET") {
      const { clienteId, mascotaId } = req.query;

      // Validar parámetros
      if (!clienteId || !mascotaId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "ClienteId y MascotaId son requeridos",
          });
      }

      // Buscar cliente por ID
      const cliente = await ClientModel.findById(clienteId);

      if (!cliente) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente no encontrado" });
      }

      // Buscar mascota específica dentro de las mascotas del cliente
      const mascota = cliente.mascotas.find((m: any) => 
        m._id.toString() === mascotaId || m.id === mascotaId
      );

      if (!mascota) {
        return res
          .status(404)
          .json({ success: false, message: "Mascota no encontrada" });
      }

      // Devolver los datos de la mascota
      return res.status(200).json({ success: true, data: mascota });
    } else if (req.method === "DELETE") {
      const { clienteId, mascotaId } = req.query;
      const userName = req.headers.username as string;

      // Validar parámetros
      if (!clienteId || !mascotaId) {
        return res.status(400).json({
          success: false,
          message: "ClienteId y MascotaId son requeridos",
        });
      }

      // Buscar cliente y eliminar la mascota del array
      const cliente = await ClientModel.findById(clienteId);

      if (!cliente) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente no encontrado" });
      }

      // Encontrar la mascota antes de eliminarla (para auditoría)
      const mascota = cliente.mascotas.find((m: any) => 
        m._id.toString() === mascotaId || m.id === mascotaId
      );

      if (!mascota) {
        return res
          .status(404)
          .json({ success: false, message: "Mascota no encontrada" });
      }

      // Eliminar la mascota del array
      cliente.mascotas = cliente.mascotas.filter((m: any) => 
        m._id.toString() !== mascotaId && m.id !== mascotaId
      );
      await cliente.save();

      // Registrar en auditoría
      const auditory = new AuditoryModel({
        date: FormatedDate(),
        user: userName,
        action: `Eliminó la mascota: ${mascota.nombre} del cliente: ${cliente.nombre} ${cliente.apellidos}`,
      });
      await auditory.save();

      return res.status(200).json({
        success: true,
        message: "Mascota eliminada correctamente",
      });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en la API:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
