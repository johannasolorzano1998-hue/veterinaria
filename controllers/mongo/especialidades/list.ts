import { NextApiRequest, NextApiResponse } from "next";
import { EspecialidadModel } from "../../../database/schemas";
import { Especialidad } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const especialidad = await EspecialidadModel.find({})

  return res.status(200).json({
    message: "todas las especialidades",
    data: especialidad as Array<Especialidad>,
    success: true,
  });
}