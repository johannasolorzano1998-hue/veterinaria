import { NextApiRequest, NextApiResponse } from "next";
import { PagoModel } from "../../../database/schemas";
import { Pago } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const pago = await PagoModel.findById(id, { password: 0 });

  return res.status(200).json({
    message: "un pago",
    data: pago as Pago,
    success: true,
  });
}
