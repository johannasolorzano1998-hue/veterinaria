import { NextApiRequest, NextApiResponse } from "next";
import { Cita, Medico, Pago } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import {
  AuditoryModel,
  CitaModel,
  MedicosModel,
  PagoModel,
} from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pago = req.body as Pago;
  const userName = req.headers.username as string;

  const newPago = (): Pago => {
    return pago;
  };

  const resp = await PagoModel.findOneAndUpdate(
    {
      _id: pago.id,
    },
    newPago()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al pago:" + pago.number,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Pago no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Pago editado",
    success: true,
  });
}
