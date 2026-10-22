import { NextApiRequest, NextApiResponse } from "next";
import { Cita, Medico } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, CitaModel, MedicosModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const medico = req.body as Medico;
  const userName = req.headers.username as string;

  const newMedico = (): Medico => {
    return medico;
  };

  const resp = await MedicosModel.findOneAndUpdate(
    {
      _id: medico.id,
    },
    newMedico()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al medico:" + medico.nombres
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Medico no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Medico editado",
    success: true,
  });
}
