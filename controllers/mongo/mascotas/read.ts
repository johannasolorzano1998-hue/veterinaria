import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";
import { Cliente, Mascota } from "../../../models";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Método no permitido", success: false });
  }

  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID no proporcionado", success: false });
  }

  try {
    // Buscar todos los clientes
    const clientes: Cliente[] = await ClientModel.find({}).lean();

    // Buscar la mascota dentro de los clientes
    let mascota: Mascota | null = null;
    let cliente: Cliente | null = null;

    for (const c of clientes) {
      // Buscar la mascota por `_id`
      const found = c.mascotas?.find((m: any) => {
        if (!m._id) return false;
        try {
          const mascotaId = new mongoose.Types.ObjectId(m._id as string);
          const searchId = new mongoose.Types.ObjectId(id as string);
          return mascotaId.equals(searchId);
        } catch {
          return false;
        }
      });

      if (found) {
        mascota = {
          ...found,
          id: found._id?.toString(),
        } as Mascota;
        cliente = {
          ...c,
          id: c._id.toString(),
        } as Cliente;
        break;
      }
    }

    if (!mascota || !cliente) {
      console.log("Mascota no encontrada con ID:", id);
      return res
        .status(404)
        .json({ message: "Mascota no encontrada", success: false });
    }

    return res.status(200).json({
      message: "Mascota encontrada",
      success: true,
      data: { mascota, cliente },
    });
  } catch (error) {
    console.error("Error al buscar la mascota:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
}
