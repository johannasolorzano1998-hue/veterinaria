import { NextApiRequest, NextApiResponse } from "next";
import { ProductoModel } from "../../../database/schemas";
import { Producto } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const producto = await ProductoModel.find({})

  return res.status(200).json({
    message: "todos los productos",
    data: producto as Array<Producto>,
    success: true,
  });
}