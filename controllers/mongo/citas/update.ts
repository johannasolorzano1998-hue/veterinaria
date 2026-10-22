import { NextApiRequest, NextApiResponse } from "next";
import { Cita } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, CitaModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cita = req.body as Cita;
  const userName = req.headers.username as string;

  const newcita = (): Cita => {
    return cita;
  };

  const resp = await CitaModel.findOneAndUpdate(
    {
      _id: cita.id,
    },
    newcita()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo la cita:" + cita.number
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Cita no encontrada",
      success: false,
    });

  return res.status(200).json({
    message: "Cita editada",
    success: true,
  });
}
