import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";
import { Cliente } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const cliente = await ClientModel.findById(id, { password: 0 }).lean();

  if (!cliente) {
    return res.status(404).json({
      message: "Cliente no encontrado",
      success: false,
    });
  }

  // Transformar las mascotas para incluir el campo id
  const clienteTransformado = {
    ...cliente,
    id: cliente._id.toString(),
    mascotas: (cliente.mascotas || []).map((mascota: any, index: number) => ({
      ...mascota,
      id: mascota._id ? mascota._id.toString() : `temp-${cliente._id}-${index}`,
    })),
  };

  return res.status(200).json({
    message: "un Cliente",
    data: clienteTransformado as Cliente,
    success: true,
  });
}