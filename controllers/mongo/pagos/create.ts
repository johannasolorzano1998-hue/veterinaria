import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  BackupPagosModel,
  PagoModel,
} from "../../../database/schemas";
import {Pago } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pago = req.body as Pago;
  const userName = req.headers.username as string;
  const count: number = await BackupPagosModel.countDocuments();
  // fetch the posts
  const pagopost = new PagoModel({ ...pago, number: count + 1 });

  await pagopost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo un pago: " + pagopost.nombres,
  });
  await auditory.save();

  const backup = new BackupPagosModel({ pago: pagopost._id });

  await backup.save();

  return res.status(200).json({
    message: "Pago Creado",
    success: true,
  });
}
