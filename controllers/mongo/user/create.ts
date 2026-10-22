import { NextApiRequest, NextApiResponse } from "next";
import { UserModel, AuditoryModel } from "../../../database/schemas";
import { Usuario } from "../../../models";
import FormatedDate from "../../utils/formated_date";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body as Usuario;
  const userName = req.headers.username as string;
  // fetch the posts
  const soli = new UserModel(user)

  await soli.save()

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo un Usuario: "+soli.name,
  });
  await auditory.save();

  return res.status(200).json({
    message: "Usuario Creado",
    success: true,
  });
}