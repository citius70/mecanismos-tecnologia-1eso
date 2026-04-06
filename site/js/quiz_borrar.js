let score = 0;
let answered = {
  q1: false,
  q2: false,
  q3: false,
  q4: false,
  q5: false,
};

// Actualiza la puntuación si es la primera vez que se responde la pregunta
function updateScore(correct, qid) {
  if (!answered[qid]) {
    answered[qid] = true;
    if (correct) {
      score += 1;
      document.getElementById("total-score").innerText = `Puntuación: ${score} cuestiones correctas de 5`;
    }
  }
}

// Muestra feedback visual y desactiva la pregunta
function setFeedback(id, correcto, texto, qid) {
  const el = document.getElementById(id);
  el.className = correcto ? "correcto" : "incorrecto";
  el.innerText = texto;
  updateScore(correcto, qid);
  disableQuestion(qid);
  showFinalScoreIfComplete();
}

// Desactiva los inputs y el botón de una pregunta
function disableQuestion(qid) {
  const inputs = document.querySelectorAll(`[id^="${qid}"]`);
  inputs.forEach(input => input.disabled = true);
  const btn = document.getElementById(`btn-${qid}`);
  if (btn) btn.disabled = true;
}

// Muestra la nota final sobre 10 cuando se han respondido todas las preguntas
function showFinalScoreIfComplete() {
  const totalRespondidas = Object.values(answered).filter(v => v).length;
  if (totalRespondidas === 5) {
    const notaFinal = (score / 5) * 10;
    const mensaje = notaFinal === 10
      ? "🎉 ¡Perfecto! Nota final: 10/10"
      : `Nota final: ${notaFinal.toFixed(1)} / 10`;

    const el = document.getElementById("final-score");
    if (el) {
      el.innerText = mensaje;
      el.style.fontWeight = "bold";
      el.style.marginTop = "20px";
      el.style.fontSize = "20px";
    }
  }
}

// Funciones de evaluación por pregunta

function checkQ1() {
  const correcto = document.getElementById("q1b").checked;
  setFeedback("feedback-q1", correcto, correcto ? "✅ ¡Correcto!" : "❌ Incorrecto. Es un mecanismo simple.", "q1");
}

function checkQ2() {
  const a = document.getElementById("q2a").checked;
  const b = document.getElementById("q2b").checked;
  const c = document.getElementById("q2c").checked;
  const d = document.getElementById("q2d").checked;
  const correcto = a && c && !b && !d;
  setFeedback("feedback-q2", correcto, correcto ? "✅ ¡Correcto!" : "❌ Leva y Tornillo no son mecanismos de transmisión.", "q2");
}

function checkQ3() {
  const correcto = document.getElementById("q3b").checked;
  setFeedback("feedback-q3", correcto, correcto ? "✅ ¡Correcto!" : "❌ Es la leva.", "q3");
}

function checkQ4() {
  const a = document.getElementById("q4a").checked;
  const b = document.getElementById("q4b").checked;
  const c = document.getElementById("q4c").checked;
  const d = document.getElementById("q4d").checked;
  const correcto = b && d && !a && !c;
  setFeedback("feedback-q4", correcto, correcto ? "✅ ¡Correcto!" : "❌ Solo reloj y taladro tienen engranajes.", "q4");
}

function checkQ5() {
  const correcto = document.getElementById("q5b").checked;
  setFeedback("feedback-q5", correcto, correcto ? "✅ ¡Correcto!" : "❌ Transmiten fuerza y movimiento.", "q5");
}
