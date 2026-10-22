const FormatedDate = (): string => new Date().toLocaleString('es-ES', {
    timeZone: 'America/Guayaquil'
  });
export default FormatedDate