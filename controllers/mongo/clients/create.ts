import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  BackupClientsModel,
  ClientModel,
} from "../../../database/schemas";
import { Cliente } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = req.body as Cliente;
  const userName = req.headers.username as string;
  const count: number = await BackupClientsModel.countDocuments();
  const mongoose = require('mongoose');
  
  // Limpiar las mascotas - remover campos que no son parte del schema
  if (client.mascotas && Array.isArray(client.mascotas)) {
    client.mascotas = client.mascotas.map((mascota: any) => {
      const mascotaId = mascota._id && mongoose.Types.ObjectId.isValid(mascota._id)
        ? new mongoose.Types.ObjectId(mascota._id)
        : new mongoose.Types.ObjectId();
      
      return {
        _id: mascotaId,
        nombre: mascota.nombre,
        tipo: mascota.tipo,
        raza: mascota.raza,
        fechaNacimiento: mascota.fechaNacimiento,
        number: mascota.number || 0,
      };
    });
  }
  
  // fetch the posts
  const clientpost = new ClientModel({ ...client, number: count + 1 });

  await clientpost.save();

  console.log("Cliente creado con mascotas:", clientpost.mascotas);

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo un Cliente: " + clientpost.nombre,
  });
  await auditory.save();

  const backup = new BackupClientsModel({ client: clientpost._id });

  await backup.save();

  return res.status(200).json({
    message: "Cliente Creado",
    success: true,
  });
}
