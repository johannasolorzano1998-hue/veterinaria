import { NextApiRequest, NextApiResponse } from "next";
import { EspecialidadModel } from "../../../database/schemas";
import { Especialidad } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const especialidad = await EspecialidadModel.findById(id, { password: 0 })

  return res.status(200).json({
    message: "una especialidad",
    data: especialidad as Especialidad,
    success: true,
  });
}