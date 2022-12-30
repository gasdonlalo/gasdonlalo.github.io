const format = {
  formatFecha: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
    }).format(new Date(date)),

  formatDinero: (monto) =>
    Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(monto),

  formatMes: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      month: "long",
    }).format(new Date(date)),
  formatYear: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
    }).format(new Date(date)),

  obtenerDiaMes: (date) =>
    new Date(
      new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
    ).getDate(),

  formatTextoMayusPrimeraLetra: (string) => {
    string = string.toLocaleLowerCase();
    let primeraLetra = string.charAt(0).toLocaleUpperCase();
    let textoEntero = string
      .replace(/\s\w|[á,é,ó,í,ú,ñ]/g, (math) => math.toLocaleUpperCase())
      .slice(1);
    return primeraLetra + textoEntero;
  },
  formatFechaComplete: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      dateStyle: "short",
    }).format(new Date(date)),
};

export default format;
