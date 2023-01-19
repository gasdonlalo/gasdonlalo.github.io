const format = {
  formatFechaLocale: (date) =>
    new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000),
  formatFecha: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
    }).format(
      new Date(
        new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
      )
    ),

  formatDinero: (monto) =>
    Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(monto),

  formatMes: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      month: "long",
    }).format(
      new Date(
        new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
      )
    ),
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

  formatFechaComplete: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      dateStyle: "short",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),
  formatHourMinute: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),

  formatFechaDB: (date) => new Date(date).toISOString().split("T")[0],

  formatFechaPractica: (date) =>
    new Date(date).getTime() + new Date().getTimezoneOffset() * 60000,
};

export default format;
