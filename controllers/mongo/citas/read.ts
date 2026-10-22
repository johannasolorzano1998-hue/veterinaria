import { NextApiRequest, NextApiResponse } from "next";
import { CitaModel } from "../../../database/schemas";
import { Cita } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const cita = await CitaModel.findById(id, { password: 0 })

  return res.status(200).json({
    message: "una cita",
    data: cita as Cita,
    success: true,
  });
}