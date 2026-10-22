import { NextApiRequest, NextApiResponse } from "next";
import { PagoModel } from "../../../database/schemas";
import { Pago } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const pagos = await PagoModel.find({});

  if (req.query.dates !== undefined) {
    const dates: Array<string> = (req.query.dates as string).split("¡");
    const date1 = new Date(dates[0]);
    const date2 = new Date(dates[1]);
    date2.setDate(date2.getDate() + 1);

    const filtered = [];

    pagos.forEach((soli: Pago) => {
      const soliDates = soli.fechaCreacion
        .replace(",", "")
        .split(" ")[0]
        .split("/");
      const soliDate = new Date(
        soliDates[2] +
          "-" +
          (soliDates[1].length < 2 ? "0" + soliDates[1] : soliDates[1]) +
          "-" +
          (soliDates[1].length < 2 ? "0" + soliDates[0] : soliDates[0])
      );
      if (
        date1.getTime() <= soliDate.getTime() &&
        soliDate.getTime() < date2.getTime()
      ) {
        filtered.push(soli);
      }
    });

    return res.status(200).json({
      message: "todos los pagos",
      data: filtered as Array<Pago>,
      success: true,
    });
  } else {
    return res.status(200).json({
      message: "todos los pagos",
      data: pagos as Array<Pago>,
      success: true,
    });
  }
}
