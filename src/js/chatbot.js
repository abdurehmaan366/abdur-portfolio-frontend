import { chat } from "./config.js";

const state = {
  open: false,
  loading: false,
  history: [], // { role: "user" | "assistant", content: string }
};

function chatIconSvg() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
}

function closeIconSvg() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
}

function buildWidget() {
  const wrapper = document.createElement("div");
  wrapper.id = "chatbot-widget";
  wrapper.className = "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3";
  wrapper.innerHTML = `
    <div id="chatbot-panel" class="hidden w-[calc(100vw-2.5rem)] max-w-sm h-[29rem] liquid-card glass shadow-2xl flex flex-col overflow-hidden border border-white/15">
      <div class="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-black/40 text-ink">
        <div class="flex items-center gap-2.5">
          <span class="status-dot"></span>
          <span class="font-display font-semibold text-sm">Ask about Abdur</span>
        </div>
        <button id="chatbot-close" aria-label="Close chat" class="text-ink-40 hover:text-accent transition-colors p-1 rounded-md hover:bg-white/5">
          ${closeIconSvg()}
        </button>
      </div>

      <div id="chatbot-messages" class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-sm"></div>

      <div id="chatbot-starters" class="px-4 pb-3 flex flex-wrap gap-1.5"></div>

      <form id="chatbot-form" class="border-t border-white/10 p-3 flex gap-2 bg-black/20">
        <input
          id="chatbot-input"
          type="text"
          placeholder="Ask a question…"
          autocomplete="off"
          class="flex-1 glass-input px-3.5 py-2 text-sm"
        />
        <button type="submit" class="liquid-button btn-primary !px-3.5 !py-2 !text-sm" aria-label="Send">&rarr;</button>
      </form>
    </div>

    <button id="chatbot-toggle" aria-label="Open chat" class="w-14 h-14 rounded-full glass flex items-center justify-center text-ink shadow-xl hover:border-accent/60 transition-all duration-300 hover:scale-105 active:scale-95 group">
      <span class="transition-transform duration-200 group-hover:scale-110 group-hover:text-accent">${chatIconSvg()}</span>
    </button>
  `;
  document.body.appendChild(wrapper);
  return wrapper;
}

function renderMessage(role, content) {
  const isUser = role === "user";
  return `
    <div class="flex ${isUser ? "justify-end" : "justify-start"}">
      <div class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
        isUser
          ? "bg-accent/20 border border-accent/40 text-white font-medium"
          : "glass border border-white/10 text-ink-60 bg-white/[0.04]"
      }">${content}</div>
    </div>`;
}

function renderLoadingBubble() {
  return `
    <div id="chatbot-loading" class="flex justify-start">
      <div class="glass border border-white/10 rounded-2xl px-3.5 py-2.5 flex gap-1.5 items-center">
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style="animation-delay:0ms"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style="animation-delay:150ms"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style="animation-delay:300ms"></span>
      </div>
    </div>`;
}

export function mountChatbot() {
  const wrapper = buildWidget();
  const panel = wrapper.querySelector("#chatbot-panel");
  const toggle = wrapper.querySelector("#chatbot-toggle");
  const close = wrapper.querySelector("#chatbot-close");
  const messages = wrapper.querySelector("#chatbot-messages");
  const starters = wrapper.querySelector("#chatbot-starters");
  const form = wrapper.querySelector("#chatbot-form");
  const input = wrapper.querySelector("#chatbot-input");

  function openChat() {
    state.open = true;
    panel.classList.remove("hidden");
    input.focus();
    if (state.history.length === 0) {
      addMessage("assistant", "Hi! I can answer questions about Abdur's background, projects, and backend experience. What would you like to know?");
      renderStarters();
    }
  }

  function closeChat() {
    state.open = false;
    panel.classList.add("hidden");
  }

  toggle.addEventListener("click", () => (state.open ? closeChat() : openChat()));
  close.addEventListener("click", closeChat);

  function addMessage(role, content) {
    state.history.push({ role, content });
    messages.innerHTML += renderMessage(role, content);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderStarters() {
    if (!chat?.starterQuestions?.length) return;
    starters.innerHTML = chat.starterQuestions
      .map(
        (q) => `
        <button type="button" class="tag hover:border-accent text-xs cursor-pointer transition-colors" data-starter="${q}">
          ${q}
        </button>`
      )
      .join("");

    starters.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = btn.dataset.starter;
        starters.innerHTML = "";
        sendMessage(q);
      });
    });
  }

  async function sendMessage(text) {
    if (!text || state.loading) return;
    addMessage("user", text);
    input.value = "";
    state.loading = true;
    messages.innerHTML += renderLoadingBubble();
    messages.scrollTop = messages.scrollHeight;

    try {
      if (chat?.endpoint) {
        const res = await fetch(chat.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: state.history.slice(0, -1) }),
        });
        const data = await res.json();
        removeLoading();
        addMessage("assistant", data.reply || "Thanks for your message!");
      } else {
        // Fallback demo response if no endpoint configured yet
        await new Promise((r) => setTimeout(r, 600));
        removeLoading();
        addMessage(
          "assistant",
          "Abdur is a Software Engineering student at COMSATS Islamabad and Backend AI Engineering intern at FlyRank, specializing in Node.js, Express, MongoDB, and secure session authentication."
        );
      }
    } catch (err) {
      removeLoading();
      addMessage("assistant", "Sorry, I had trouble answering that right now. Please feel free to email Abdur directly!");
    } finally {
      state.loading = false;
    }
  }

  function removeLoading() {
    const el = document.getElementById("chatbot-loading");
    if (el) el.remove();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage(input.value.trim());
  });
}
