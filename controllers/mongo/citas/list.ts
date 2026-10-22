import { NextApiRequest, NextApiResponse } from "next";
import { CitaModel } from "../../../database/schemas";
import { Cita } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const citas = await CitaModel.find({});

  return res.status(200).json({
    message: "todas las citas",
    data: citas as Array<Cita>,
    success: true,
  });
}