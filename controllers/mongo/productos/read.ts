import { NextApiRequest, NextApiResponse } from "next";
import { ProductoModel } from "../../../database/schemas";
import { Producto } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const producto = await ProductoModel.findById(id, { password: 0 });

  return res.status(200).json({
    message: "un producto",
    data: producto as Producto,
    success: true,
  });
}
