import { chat } from "./config.js";

const state = {
  open: false,
  loading: false,
  history: [], // { role: "user" | "assistant", content: string }
};

function chatIconSvg() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
}

function closeIconSvg() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
}

function buildWidget() {
  const wrapper = document.createElement("div");
  wrapper.id = "chatbot-widget";
  wrapper.className = "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3";
  wrapper.innerHTML = `
    <div id="chatbot-panel" class="hidden w-[calc(100vw-2.5rem)] max-w-sm h-[28rem] card shadow-2xl flex flex-col overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-ink text-bg">
        <div class="flex items-center gap-2">
          <span class="status-dot"></span>
          <span class="font-display font-semibold text-sm">Ask about Abdur</span>
        </div>
        <button id="chatbot-close" aria-label="Close chat" class="text-bg/70 hover:text-accent transition-colors">
          ${closeIconSvg()}
        </button>
      </div>

      <div id="chatbot-messages" class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-sm"></div>

      <div id="chatbot-starters" class="px-4 pb-3 flex flex-wrap gap-2"></div>

      <form id="chatbot-form" class="border-t border-border p-3 flex gap-2">
        <input
          id="chatbot-input"
          type="text"
          placeholder="Ask a question…"
          autocomplete="off"
          class="flex-1 rounded-lg border border-border px-3 py-2 text-sm bg-white outline-none focus:border-ink transition-colors"
        />
        <button type="submit" class="btn-primary !px-3 !py-2 !text-sm" aria-label="Send">&rarr;</button>
      </form>
    </div>

    <button id="chatbot-toggle" aria-label="Open chat" class="w-14 h-14 rounded-full bg-ink text-bg flex items-center justify-center shadow-lg hover:bg-accent hover:text-ink transition-all duration-200 hover:scale-110 active:scale-95">
      ${chatIconSvg()}
    </button>
  `;
  document.body.appendChild(wrapper);
  return wrapper;
}

function renderMessage(role, content) {
  const isUser = role === "user";
  return `
    <div class="flex ${isUser ? "justify-end" : "justify-start"}">
      <div class="max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
        isUser ? "bg-ink text-bg" : "bg-[#F5F5F5] text-ink"
      }">${content}</div>
    </div>`;
}

function renderLoadingBubble() {
  return `
    <div id="chatbot-loading" class="flex justify-start">
      <div class="bg-[#F5F5F5] rounded-xl px-3 py-2 flex gap-1 items-center">
        <span class="w-1.5 h-1.5 rounded-full bg-ink-40 animate-bounce" style="animation-delay:0ms"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-ink-40 animate-bounce" style="animation-delay:150ms"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-ink-40 animate-bounce" style="animation-delay:300ms"></span>
      </div>
    </div>`;
}

export function mountChatbot() {
  const wrapper = buildWidget();

  const panel = wrapper.querySelector("#chatbot-panel");
  const toggle = wrapper.querySelector("#chatbot-toggle");
  const closeBtn = wrapper.querySelector("#chatbot-close");
  const messagesEl = wrapper.querySelector("#chatbot-messages");
  const startersEl = wrapper.querySelector("#chatbot-starters");
  const form = wrapper.querySelector("#chatbot-form");
  const input = wrapper.querySelector("#chatbot-input");

  function renderStarters() {
    if (state.history.length > 0) {
      startersEl.innerHTML = "";
      return;
    }
    startersEl.innerHTML = chat.starterQuestions
      .map((q) => `<button class="starter-chip tag hover:border-accent hover:text-accent transition-colors">${q}</button>`)
      .join("");
    startersEl.querySelectorAll(".starter-chip").forEach((chip) => {
      chip.addEventListener("click", () => sendMessage(chip.textContent));
    });
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderAll() {
    messagesEl.innerHTML =
      state.history.length === 0
        ? `<p class="text-ink-40 text-sm leading-relaxed">Hi! I can answer questions about Abdur's background, skills, and projects — try a question below, or type your own.</p>`
        : state.history.map((m) => renderMessage(m.role, m.content)).join("");
    if (state.loading) messagesEl.insertAdjacentHTML("beforeend", renderLoadingBubble());
    renderStarters();
    scrollToBottom();
  }

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || state.loading) return;

    state.history.push({ role: "user", content: trimmed });
    state.loading = true;
    input.value = "";
    renderAll();

    try {
      const res = await fetch(chat.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: state.history }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      state.history.push({ role: "assistant", content: data.reply });
    } catch (err) {
      state.history.push({
        role: "assistant",
        content: "Sorry, I couldn't reach the server just now. Please try again, or reach Abdur directly via the Contact page.",
      });
    } finally {
      state.loading = false;
      renderAll();
    }
  }

  toggle.addEventListener("click", () => {
    state.open = !state.open;
    panel.classList.toggle("hidden", !state.open);
    if (state.open) {
      renderAll();
      input.focus();
    }
  });

  closeBtn.addEventListener("click", () => {
    state.open = false;
    panel.classList.add("hidden");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage(input.value);
  });
}