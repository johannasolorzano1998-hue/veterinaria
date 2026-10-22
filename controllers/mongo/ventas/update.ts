import { NextApiRequest, NextApiResponse } from "next";
import { Venta } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, VentaModel,  } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const venta = req.body as Venta;
  const userName = req.headers.username as string;

  const newVenta = (): Venta => {
    return venta;
  };

  const resp = await VentaModel.findOneAndUpdate(
    {
      _id: venta.id,
    },
    newVenta()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo a la venta:" + venta.number,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Venta no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Venta editado",
    success: true,
  });
}
