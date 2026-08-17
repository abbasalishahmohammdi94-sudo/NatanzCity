document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Elements
  // =========================

  const questionInput = document.getElementById("aiQuestion");

  const askButton = document.getElementById("aiAskButton");

  const answerBox = document.getElementById("aiAnswer");

  const loading = document.getElementById("aiLoading");

  // =========================
  // Cloudflare Worker
  // =========================

  const API_URL = "https://7ae72182-natanz-ai.natanzcity-official.workers.dev";

  // =========================
  // Ask AI
  // =========================

  async function askAI() {
    const question = questionInput.value.trim();

    // =========================
    // Empty question
    // =========================

    if (!question) {
      answerBox.textContent = "لطفاً اول سؤال خود را بنویسید. 🤖";

      answerBox.hidden = false;

      return;
    }

    // =========================
    // Loading
    // =========================

    askButton.disabled = true;

    loading.hidden = false;

    answerBox.hidden = true;

    try {
      // =========================
      // Send POST Request
      // =========================

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: question,
        }),
      });

      // =========================
      // Read JSON
      // =========================

      const data = await response.json();

      // =========================
      // HTTP Error
      // =========================

      if (!response.ok) {
        console.error("Natanz-AI API Error:", data);

        throw new Error(data?.error || `HTTP Error: ${response.status}`);
      }

      // =========================
      // Get Worker Answer
      // =========================

      const answer = typeof data?.answer === "string" ? data.answer.trim() : "";

      // =========================
      // Empty Answer
      // =========================

      if (!answer) {
        console.error("Natanz-AI Empty Response:", data);

        throw new Error("AI response is empty.");
      }

      // =========================
      // Show Answer
      // =========================

      answerBox.textContent = answer;

      answerBox.hidden = false;
    } catch (error) {
      console.error("Natanz-AI Error:", error);

      answerBox.textContent =
        "متأسفانه در ارتباط با Natanz-AI مشکلی پیش آمد. لطفاً دوباره تلاش کنید.";

      answerBox.hidden = false;
    } finally {
      // =========================
      // Stop Loading
      // =========================

      askButton.disabled = false;

      loading.hidden = true;
    }
  }

  // =========================
  // Button Click
  // =========================

  askButton.addEventListener("click", askAI);

  // =========================
  // Enter Key
  // =========================

  questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!askButton.disabled) {
        askAI();
      }
    }
  });
});
