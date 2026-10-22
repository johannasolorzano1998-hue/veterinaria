import { NextApiRequest, NextApiResponse } from "next";
import { VentaModel } from "../../../database/schemas";
import { Venta } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const venta = await VentaModel.findById(id, { password: 0 })

  return res.status(200).json({
    message: "un venta",
    data: venta as Venta,
    success: true,
  });
}