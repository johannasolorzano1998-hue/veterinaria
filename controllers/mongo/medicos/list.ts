import { NextApiRequest, NextApiResponse } from "next";
import { MedicosModel } from "../../../database/schemas";
import { Medico } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const medicos = await MedicosModel.find({})

  return res.status(200).json({
    message: "todos los medicos",
    data: medicos as Array<Medico>,
    success: true,
  });
}