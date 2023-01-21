document.addEventListener("keyup", (e) => {
  if (e.target.matches("buscador")) {
    if (e.key === "Escape") e.target.value = "";

    document.querySelectorAll(".nombre").forEach((empleado) => {
      empleado.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? empleado.classList.remove("filtro")
        : empleado.classList.add("filtro");
    });
  }
});
