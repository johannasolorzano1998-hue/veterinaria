import { NextApiRequest, NextApiResponse } from "next";
import { AuditoryModel, ProductoModel } from "../../../database/schemas";
import { Producto } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const producto = req.body as Producto;
  const userName = req.headers.username as string;
  // fetch the posts
  const productopost = new ProductoModel({ ...producto });

  await productopost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo un producto: " + productopost.nombre,
  });
  await auditory.save();

  return res.status(200).json({
    message: "Producto Creado",
    success: true,
  });
}
