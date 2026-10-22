import { NextApiRequest, NextApiResponse } from "next";
import { Producto } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import {
  AuditoryModel,
  ProductoModel,
} from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const producto = req.body as Producto;
  const userName = req.headers.username as string;

  const newProducto = (): Producto => {
    return producto;
  };

  const resp = await ProductoModel.findOneAndUpdate(
    {
      _id: producto.id,
    },
    newProducto()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al producto:" + producto.nombre,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Producto no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Producto editado",
    success: true,
  });
}
