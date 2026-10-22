import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";
import { Cliente } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const clientes = await ClientModel.find({}).lean();

  // Transformar las mascotas para incluir el campo id
  const clientesTransformados = clientes.map((cliente: any) => ({
    ...cliente,
    id: cliente._id.toString(),
    mascotas: (cliente.mascotas || []).map((mascota: any, index: number) => ({
      ...mascota,
      id: mascota._id ? mascota._id.toString() : `temp-${cliente._id}-${index}`,
    })),
  }));

  return res.status(200).json({
    message: "todas los Clientes",
    data: clientesTransformados as Array<Cliente>,
    success: true,
  });
}