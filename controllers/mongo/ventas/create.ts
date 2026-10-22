import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  BackupVentasModel,
  VentaModel,
} from "../../../database/schemas";
import { Venta } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const venta = req.body as Venta;
  const userName = req.headers.username as string;
  const count: number = await BackupVentasModel.countDocuments();
  // fetch the posts
  const ventapost = new VentaModel({ ...venta, number: count + 1 });

  await ventapost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo una venta: " + ventapost.number,
  });
  await auditory.save();

  const backup = new BackupVentasModel({ venta: ventapost._id });

  await backup.save();

  return res.status(200).json({
    message: "venta Creada",
    success: true,
  });
}
