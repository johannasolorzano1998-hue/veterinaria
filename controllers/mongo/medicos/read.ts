import { NextApiRequest, NextApiResponse } from "next";
import { CitaModel, MedicosModel } from "../../../database/schemas";
import { Cita, Medico } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const medico = await MedicosModel.findById(id, { password: 0 })

  return res.status(200).json({
    message: "un medico",
    data: medico as Medico,
    success: true,
  });
}