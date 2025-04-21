// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todas las preguntas del cuestionario (divs con clase .pregunta)
    const preguntas = document.querySelectorAll(".pregunta");
  
    let score = 0;         // Total de respuestas correctas
    let respondidas = 0;   // Total de preguntas que ya se han contestado
  
    // Itera sobre cada bloque de pregunta
    preguntas.forEach((pregunta) => {
      const btn = pregunta.querySelector(".btn-comprobar");  // Botón de comprobar
      const tipo = pregunta.dataset.type;                    // Tipo de pregunta (radio, checkbox, text)
      const id = pregunta.dataset.id;                        // ID única de la pregunta
      const feedback = pregunta.querySelector(".feedback");  // Elemento donde se mostrará el feedback
  
      // Añade evento al botón de comprobación
      btn.addEventListener("click", () => {
        // Si la pregunta ya ha sido respondida, no se permite volver a evaluarla
        if (pregunta.classList.contains("respondida")) return;
  
        let correcto = false;
  
        // Evaluación según el tipo de pregunta
  
        // Tipo opción única (radio)
        if (tipo === "radio") {
          const seleccionada = pregunta.querySelector("input[type=radio]:checked");
          // Es correcta si el input seleccionado tiene data-correct="true"
          correcto = seleccionada?.dataset.correct === "true";
  
        // Tipo selección múltiple (checkbox)
        } else if (tipo === "checkbox") {
          const opciones = pregunta.querySelectorAll("input[type=checkbox]");
          // Es correcto si todas las opciones coinciden con su atributo data-correct
          correcto = Array.from(opciones).every(opt => {
            const esperado = opt.dataset.correct === "true";
            return opt.checked === esperado;
          });
  
        // Tipo respuesta de texto
        } else if (tipo === "text") {
          const input = pregunta.querySelector("input[type=text]");
          const respuesta = input.value.trim().toLowerCase();  // Normaliza el texto
          const esperada = pregunta.dataset.correct.toLowerCase(); // Respuesta correcta en data-correct
          correcto = respuesta === esperada;
        }
  
        // Muestra feedback visual
        feedback.textContent = correcto ? "✅ ¡Correcto!" : "❌ Incorrecto.";
        feedback.className = `feedback ${correcto ? "correcto" : "incorrecto"}`;
  
        // Marca la pregunta como respondida para evitar cambios posteriores
        pregunta.classList.add("respondida");
  
        // Desactiva botón y entradas
        btn.disabled = true;
        pregunta.querySelectorAll("input").forEach(i => i.disabled = true);
  
        // Suma a la puntuación si fue correcta
        if (correcto) score++;
        respondidas++;
  
        // Actualiza el marcador de puntuación en pantalla
        document.getElementById("total-score").textContent = `Puntuación: ${score} correctas de ${preguntas.length}`;
  
        // Si ya se respondieron todas las preguntas, muestra la nota final sobre 10
        if (respondidas === preguntas.length) {
          const nota = ((score / preguntas.length) * 10).toFixed(1);
          document.getElementById("final-score").textContent = `Nota final: ${nota} / 10 puntos`;
        }
      });
    });
  });
  