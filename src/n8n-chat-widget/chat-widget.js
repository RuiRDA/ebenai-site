import { marked } from "marked";
import { createDebugButton } from "./debug-button.js";

// Interactive Chat Widget for n8n
(function () {
  // Initialize widget only once
  if (window.N8nChatWidgetLoaded) return;
  window.N8nChatWidgetLoaded = true;

  // Load font resource - using Poppins for a fresh look
  const fontElement = document.createElement("link");
  fontElement.rel = "stylesheet";
  fontElement.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
  document.head.appendChild(fontElement);

  // --- START: Scroll Behavior Configuration ---
  const SCROLL_THRESHOLD = 20; // Pixels from bottom to be considered "at the bottom"
  // --- END: Scroll Behavior Configuration ---

  let scrollToBottomIndicator;
  let scrollToBottomIndicatorTimeout;

  // Apply widget styles with completely different design approach
  const widgetStyles = document.createElement("style");
  widgetStyles.textContent = `
        .chat-assist-widget {
            --chat-color-primary: var(--chat-widget-primary, #0284C7);
            --chat-color-secondary: var(--chat-widget-secondary, #0284C7);
            --chat-color-tertiary: var(--chat-widget-tertiary, #0369a1);
            --chat-color-light: var(--chat-widget-light, #23243a);
            --chat-color-surface: var(--chat-widget-surface, #181829);
            --chat-color-text: var(--chat-widget-text, #F3F4F6);
            --chat-color-text-light: var(--chat-widget-text-light, #b6bad5);
            --chat-color-border: var(--chat-widget-border, #23243a);
            --chat-shadow-sm: 0 1px 3px rgba(2, 132, 199, 0.08);
            --chat-shadow-md: 0 4px 6px rgba(2, 132, 199, 0.12);
            --chat-shadow-lg: 0 10px 15px rgba(2, 132, 199, 0.18);
            --chat-radius-sm: 8px;
            --chat-radius-md: 12px;
            --chat-radius-lg: 20px;
            --chat-radius-full: 9999px;
            --chat-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Poppins', sans-serif;
        }

        .chat-assist-widget .chat-window {
            position: fixed;
            bottom: 90px;
            z-index: 1000; /* High z-index for overlay */
            width: 400px;
            height: 580px;
            background: var(--chat-color-surface);
            border-radius: var(--chat-radius-lg);
            box-shadow: var(--chat-shadow-lg);
            border: 1px solid var(--chat-color-light);
            overflow: hidden;
            display: none;
            flex-direction: column;
            transition: var(--chat-transition);
            opacity: 0;
            transform: translateY(20px) scale(0.95);
        }

        /* Responsive styles for mobile - FULL SCREEN */
        @media (max-width: 768px) { /* Updated breakpoint */
            .chat-assist-widget .chat-window {
                width: 100vw;
                height: 100vh; /* Full viewport height */
                top: 0;
                left: 0;
                right: auto; /* Override side-specific positioning */
                bottom: auto; /* Override bottom positioning */
                border-radius: 0; /* Full screen, no rounded corners */
                max-width: none; /* Ensure it can go full width */
                max-height: none; /* Ensure it can go full height */
                /* The existing transform transition for visibility will apply */
            }

            .chat-assist-widget .chat-header-logo {
                width: 40px;
                height: 40px;
            }
            .chat-assist-widget .chat-header-title {
                font-size: 16px; /* Adjusted for mobile */
            }

            /* Launcher styles for mobile - making it wide */
            .chat-assist-widget .chat-launcher {
                right: 16px !important;
                left: 16px !important;
                bottom: 16px !important;
                max-width: calc(100vw - 32px);
                width: auto; /* Stretches due to left and right */
                font-size: 14px;
                justify-content: center; /* Center content in wide button */
                height: 50px;
                padding: 0 15px;
            }
             /* No need for .chat-launcher.left-side specific left/right here as it's full width */


            .chat-assist-widget .chat-body,
            .chat-assist-widget .chat-messages {
                padding: 12px; /* Adjusted padding for full screen */
            }

            .chat-assist-widget .scroll-to-bottom-indicator {
                bottom: 10px; /* Adjust if input area is larger */
            }

            .chat-assist-widget .chat-textarea {
                font-size: 15px;
                min-height: 44px; /* Slightly taller min-height */
            }
            .chat-assist-widget .chat-submit {
                width: 44px;
                height: 44px;
            }
            .chat-assist-widget .chat-footer {
                padding: 8px;
            }
            .chat-assist-widget .chat-footer-link {
                font-size: 11px;
            }
        }

        /* Extra small device scaling - Removed scaling for .chat-window */
        @media (max-width: 400px), (max-height: 700px) { /* Adjusted height breakpoint slightly */
            /* .chat-window scaling removed for fullscreen mobile */

            .chat-assist-widget .chat-launcher { /* Launcher scaling can remain */
                transform: scale(0.9) !important;
                /* transform-origin depends on its actual position which is now centered/wide */
                transform-origin: bottom center !important;
            }
             /* If launcher is full width, its transform origin might be center */
            .chat-assist-widget .chat-launcher.right-side { /* Fallback if not full width */
                transform-origin: bottom right !important;
            }
            .chat-assist-widget .chat-launcher.left-side { /* Fallback if not full width */
                transform-origin: bottom left !important;
            }


            /* Further adjustments for very small screens */
            .chat-assist-widget .chat-header-logo {
                width: 36px;
                height: 36px;
            }
            .chat-assist-widget .chat-header-title {
                font-size: 15px;
            }
            .chat-assist-widget .chat-body,
            .chat-assist-widget .chat-messages {
                padding: 10px;
            }
            .chat-assist-widget .chat-textarea {
                font-size: 14px;
            }
        }

        .chat-assist-widget .chat-window.right-side {
            right: 20px;
        }

        .chat-assist-widget .chat-window.left-side {
            left: 20px;
        }

        .chat-assist-widget .chat-window.visible {
            display: flex;
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        .chat-assist-widget .chat-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white;
            position: relative; /* Keep for close button positioning */
            flex-shrink: 0; /* Prevent header from shrinking */
        }

        .chat-assist-widget .chat-header-logo {
            width: 56px;
            height: 56px;
            border-radius: var(--chat-radius-full);
            object-fit: cover;
            background: white;
            padding: 0;
        }

        .chat-assist-widget .chat-header-title {
            font-size: 16px;
            font-weight: 600;
            color: white;
            flex-grow: 1; /* Allow title to take available space */
            margin-right: 30px; /* Space for close button */
        }

        .chat-assist-widget .chat-close-btn {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--chat-transition);
            font-size: 18px;
            border-radius: var(--chat-radius-full);
            width: 28px;
            height: 28px;
        }

        .chat-assist-widget .chat-close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
        }

        .chat-assist-widget .chat-welcome {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 24px;
            text-align: center;
            width: 100%;
            max-width: 320px;
        }

        .chat-assist-widget .chat-welcome-title {
            font-size: 22px;
            font-weight: 700;
            color: var(--chat-color-text);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .chat-assist-widget .chat-start-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 14px 20px;
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white;
            border: none;
            border-radius: var(--chat-radius-md);
            cursor: pointer;
            font-size: 15px;
            transition: var(--chat-transition);
            font-weight: 600;
            font-family: inherit;
            margin-bottom: 16px;
            box-shadow: var(--chat-shadow-md);
        }

        .chat-assist-widget .chat-start-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--chat-shadow-lg);
        }

        .chat-assist-widget .chat-response-time {
            font-size: 14px;
            color: var(--chat-color-text-light);
            margin: 0;
        }

        .chat-assist-widget .chat-body {
            display: none; /* Initially hidden, shown by .active */
            flex-direction: column;
            flex: 1; /* Takes remaining space in chat-window */
            min-height: 0; /* Crucial for flex shrinking */
            overflow: hidden; /* Contains children like messages and controls */
        }

        .chat-assist-widget .chat-body.active {
            display: flex;
        }

        .chat-assist-widget .chat-messages {
            flex: 1; /* Takes most space in chat-body */
            overflow-y: auto; /* Allows scrolling for messages */
            padding: 20px;
            background: #202133; /* Darker background for messages area */
            display: flex;
            flex-direction: column;
            gap: 12px;
            position: relative; /* For scroll-to-bottom indicator */
        }

        /* --- START: New Message Indicator CSS --- */
        .chat-assist-widget .scroll-to-bottom-indicator {
            position: fixed;
            bottom: 130px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--chat-color-primary);
            color: white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--chat-shadow-md);
            z-index: 10; /* Above messages */
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
            pointer-events: none;
        }

        .chat-assist-widget .scroll-to-bottom-indicator.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .chat-assist-widget .scroll-to-bottom-indicator:hover {
            transform: translateX(-50%) scale(1.1);
        }
        
        .chat-assist-widget .scroll-to-bottom-indicator svg {
            width: 18px;
            height: 18px;
            stroke: white;
            stroke-width: 2.5;
        }
        /* --- END: New Message Indicator CSS --- */

        .chat-assist-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .chat-assist-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .chat-assist-widget .chat-messages::-webkit-scrollbar-thumb {
            background-color: rgba(16, 185, 129, 0.3); /* Using primary color with alpha */
            border-radius: var(--chat-radius-full);
        }

        .chat-assist-widget .chat-bubble {
            padding: 14px 18px;
            border-radius: var(--chat-radius-md);
            max-width: 85%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.6;
            position: relative;
            white-space: pre-line;
        }

    .chat-assist-widget .chat-bubble p {
        margin-top: 0;
        margin-bottom: 0;
    }

    .chat-assist-widget .chat-bubble ul,
    .chat-assist-widget .chat-bubble ol {
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0px; 
    }

    .chat-assist-widget .chat-bubble li {
        margin-bottom: 0.0em; 
    }

    .chat-assist-widget .chat-bubble h1,
    .chat-assist-widget .chat-bubble h2,
    .chat-assist-widget .chat-bubble h3,
    .chat-assist-widget .chat-bubble h4,
    .chat-assist-widget .chat-bubble h5,
    .chat-assist-widget .chat-bubble h6 {
        margin-top: 0;
        margin-bottom: 0.0em;
    }

    .chat-assist-widget .chat-bubble p:first-child {
        margin-top: 0;
    }
    .chat-assist-widget .chat-bubble p:last-child {
        margin-bottom: 0;
    }
    .chat-assist-widget .chat-bubble ul:first-child,
    .chat-assist-widget .chat-bubble ol:first-child {
        margin-top: 0;
    }
    .chat-assist-widget .chat-bubble ul:last-child,
    .chat-assist-widget .chat-bubble ol:last-child {
        margin-bottom: 0;
    }

        .chat-assist-widget .chat-bubble.user-bubble {
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            box-shadow: var(--chat-shadow-sm);
        }

        .chat-assist-widget .chat-bubble.bot-bubble {
            background: #23243a; /* Slightly different from surface for contrast */
            color: var(--chat-color-text);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: var(--chat-shadow-sm);
            border: 1px solid var(--chat-color-border);
        }

       /* Typing animation */
        .chat-assist-widget .typing-indicator {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 14px 18px;
            background: #23243a;
            border-radius: var(--chat-radius-md);
            border-bottom-left-radius: 4px;
            max-width: 80px; /* Fit the 3 dots comfortably */
            align-self: flex-start;
            box-shadow: var(--chat-shadow-sm);
            border: 1px solid var(--chat-color-border);
        }

        .chat-assist-widget .typing-dot {
            width: 8px;
            height: 8px;
            background: var(--chat-color-primary); /* Use primary color for dots */
            border-radius: var(--chat-radius-full);
            opacity: 1;
            animation: typingAnimation 1.4s infinite ease-in-out;
        }

        .chat-assist-widget .typing-dot:nth-child(1) {
            animation-delay: 0s;
        }

        .chat-assist-widget .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .chat-assist-widget .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typingAnimation {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-4px);
            }
        }

        .chat-assist-widget .chat-controls {
            padding: 16px;
            background: var(--chat-color-surface); /* Match window background */
            border-top: 1px solid var(--chat-color-light);
            display: flex;
            gap: 10px;
            align-items: flex-end; /* Align items to bottom for multi-line text area */
            flex-shrink: 0; /* Prevent controls from shrinking */
        }

        .chat-assist-widget .chat-textarea {
            flex: 1;
            padding: 14px 16px;
            border: 1px solid var(--chat-color-light);
            border-radius: var(--chat-radius-md);
            background: var(--chat-color-surface); /* Consistent background */
            color: var(--chat-color-text);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            max-height: 120px; /* Max height before scrolling within textarea */
            min-height: 48px; /* Default single line height */
            transition: var(--chat-transition);
            overflow-y: auto; /* Scroll if content exceeds max-height */
        }

        .chat-assist-widget .chat-textarea:focus {
            outline: none;
            border-color: var(--chat-color-primary);
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.2); /* Adjusted glow color */
        }

        .chat-assist-widget .chat-textarea::placeholder {
            color: var(--chat-color-text-light);
        }

        .chat-assist-widget .chat-submit {
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white;
            border: none;
            border-radius: var(--chat-radius-md);
            width: 48px;
            height: 48px; /* Match min-height of textarea for alignment */
            cursor: pointer;
            transition: var(--chat-transition);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: var(--chat-shadow-sm);
        }

        .chat-assist-widget .chat-submit:hover {
            transform: scale(1.05);
            box-shadow: var(--chat-shadow-md);
        }

        .chat-assist-widget .chat-submit svg {
            width: 22px;
            height: 22px;
        }

        .chat-assist-widget .chat-launcher {
            position: fixed;
            bottom: 20px;
            height: 56px;
            border-radius: var(--chat-radius-full);
            background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: var(--chat-shadow-md);
            z-index: 999; /* Below chat window */
            transition: var(--chat-transition);
            display: flex;
            align-items: center;
            padding: 0 20px 0 16px;
            gap: 8px;
        }

        .chat-assist-widget .chat-launcher.right-side {
            right: 20px;
        }

        .chat-assist-widget .chat-launcher.left-side {
            left: 20px;
        }

        .chat-assist-widget .chat-launcher:hover {
            transform: scale(1.05);
            box-shadow: var(--chat-shadow-lg);
        }

        .chat-assist-widget .chat-launcher svg {
            width: 24px;
            height: 24px;
        }
        
        .chat-assist-widget .chat-launcher-text {
            font-weight: 600;
            font-size: 15px;
            white-space: nowrap;
        }

        .chat-assist-widget .chat-footer {
            padding: 10px;
            text-align: center;
            background: var(--chat-color-surface);
            border-top: 1px solid var(--chat-color-light);
            flex-shrink: 0; /* Prevent footer from shrinking */
        }

        .chat-assist-widget .chat-footer-link {
            color: var(--chat-color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: var(--chat-transition);
            font-family: inherit;
        }

        .chat-assist-widget .chat-footer-link:hover {
            opacity: 1;
        }

        .chat-assist-widget .suggested-questions {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin: 12px 0; /* Spacing around questions */
            align-self: flex-start; /* Align to the start of message flow */
            max-width: 85%;
            margin-top: auto; /* Push to bottom if messages are few initially */
        }

        .chat-assist-widget .suggested-question-btn {
            background: #202133; /* Darker, distinct from bot bubble */
            border: 1px solid var(--chat-color-primary);
            border-radius: var(--chat-radius-md);
            padding: 10px 14px;
            text-align: left;
            font-size: 13px;
            color: var(--chat-color-primary); /* Primary color text */
            cursor: pointer;
            transition: var(--chat-transition);
            font-family: inherit;
            line-height: 1.4;
        }

        .chat-assist-widget .suggested-question-btn:hover {
            background: #23243a; /* Match bot bubble bg on hover */
            border-color: var(--chat-color-secondary);
        }

        .chat-assist-widget .chat-link {
            color: var(--chat-color-primary);
            text-decoration: underline;
            word-break: break-all;
            transition: var(--chat-transition);
        }

        .chat-assist-widget .chat-link:hover {
            color: var(--chat-color-secondary);
            text-decoration: underline;
        }

        /* User Registration styles remain unchanged */
        .chat-assist-widget .user-registration {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 24px;
            text-align: center;
            width: 100%;
            max-width: 320px;
            display: none;
        }
        .chat-assist-widget .user-registration.active { display: block; }
        .chat-assist-widget .registration-title { font-size: 18px; font-weight: 600; color: var(--chat-color-text); margin-bottom: 16px; line-height: 1.3; }
        .chat-assist-widget .registration-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .chat-assist-widget .form-field { display: flex; flex-direction: column; gap: 4px; text-align: left; }
        .chat-assist-widget .form-label { font-size: 14px; font-weight: 500; color: var(--chat-color-text); }
        .chat-assist-widget .form-input { padding: 12px 14px; border: 1px solid var(--chat-color-border); border-radius: var(--chat-radius-md); font-family: inherit; font-size: 14px; transition: var(--chat-transition); }
        .chat-assist-widget .form-input:focus { outline: none; border-color: var(--chat-color-primary); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); }
        .chat-assist-widget .form-input.error { border-color: #ef4444; }
        .chat-assist-widget .error-text { font-size: 12px; color: #ef4444; margin-top: 2px; }
        .chat-assist-widget .submit-registration { display: flex; align-items: center; justify-content: center; width: 100%; padding: 14px 20px; background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%); color: white; border: none; border-radius: var(--chat-radius-md); cursor: pointer; font-size: 15px; transition: var(--chat-transition); font-weight: 600; font-family: inherit; box-shadow: var(--chat-shadow-md); }
        .chat-assist-widget .submit-registration:hover { transform: translateY(-2px); box-shadow: var(--chat-shadow-lg); }
        .chat-assist-widget .submit-registration:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
    `;
  document.head.appendChild(widgetStyles);

  // Default configuration
  const defaultSettings = {
    webhook: { url: "", route: "" },
    branding: {
      logo: "",
      name: "",
      welcomeText: "",
      initialBotMessage: "Hi there! How can I help you today?",
      responseTimeText: "",
      poweredBy: {
        text: "Powered by Eben AI",
        link: "https://ebenaisolutions.pt/",
      },
    },
    style: {
      primaryColor: "#10b981",
      secondaryColor: "#059669",
      position: "right",
      backgroundColor: "#ffffff",
      fontColor: "#1f2937",
    },
    suggestedQuestions: [],
  };

  // Merge user settings with defaults
  const settings = window.ChatWidgetConfig
    ? {
        webhook: {
          ...defaultSettings.webhook,
          ...window.ChatWidgetConfig.webhook,
        },
        branding: {
          ...defaultSettings.branding,
          ...window.ChatWidgetConfig.branding,
          welcomeText:
            window.ChatWidgetConfig.branding?.welcomeText ||
            defaultSettings.branding.welcomeText,
          initialBotMessage:
            window.ChatWidgetConfig.branding?.initialBotMessage ||
            defaultSettings.branding.initialBotMessage,
          responseTimeText:
            window.ChatWidgetConfig.branding?.responseTimeText ||
            defaultSettings.branding.responseTimeText,
        },
        style: {
          ...defaultSettings.style,
          ...window.ChatWidgetConfig.style,
          primaryColor:
            window.ChatWidgetConfig.style?.primaryColor === "#854fff"
              ? "#10b981"
              : window.ChatWidgetConfig.style?.primaryColor || "#10b981",
          secondaryColor:
            window.ChatWidgetConfig.style?.secondaryColor === "#6b3fd4"
              ? "#059669"
              : window.ChatWidgetConfig.style?.secondaryColor || "#059669",
        },
        suggestedQuestions:
          window.ChatWidgetConfig.suggestedQuestions ||
          defaultSettings.suggestedQuestions,
      }
    : defaultSettings;

  // Session tracking
  let conversationId = "";
  let isWaitingForResponse = false;

  // Create widget DOM structure
  const widgetRoot = document.createElement("div");
  widgetRoot.className = "chat-assist-widget";

  // Apply custom colors
  widgetRoot.style.setProperty(
    "--chat-widget-primary",
    settings.style.primaryColor
  );
  widgetRoot.style.setProperty(
    "--chat-widget-secondary",
    settings.style.secondaryColor
  );
  widgetRoot.style.setProperty(
    "--chat-widget-tertiary",
    settings.style.secondaryColor
  ); // Assuming tertiary is same as secondary
  widgetRoot.style.setProperty(
    "--chat-widget-surface",
    settings.style.backgroundColor
  );
  widgetRoot.style.setProperty("--chat-widget-text", settings.style.fontColor);
  // Additional color variables derived or fixed, ensure they match the new dark theme if needed
  // For the new theme provided in the CSS:
  // --chat-color-light: #23243a (border/light bg element)
  // --chat-color-surface: #181829 (main bg)
  // --chat-color-text: #F3F4F6 (main text)
  // --chat-color-text-light: #b6bad5 (placeholder/subtle text)
  // --chat-color-border: #23243a (borders)
  // If settings.style.backgroundColor or fontColor are meant to override these, ensure it's logical.
  // The provided CSS uses these fixed dark theme colors unless overridden by primary/secondary.
  // For now, we assume the CSS variable defaults are the dark theme, and primary/secondary are configurable.

  // Create chat panel
  const chatWindow = document.createElement("div");
  chatWindow.className = `chat-window ${
    settings.style.position === "left" ? "left-side" : "right-side"
  }`;

  // Create header (welcome screen merged into main chat window)
  const headerHTML = `
        <div class="chat-header">
            <img class="chat-header-logo" src="${
              settings.branding.logo
            }" alt="${settings.branding.name || "Chat Bot"}">
            <span class="chat-header-title">${
              settings.branding.name || "Chat Assistant"
            }</span>
            <button class="chat-close-btn" aria-label="Close chat">×</button>
        </div>`;

  // Create chat interface (body, messages, controls, footer)
  const chatInterfaceHTML = `
        <div class="chat-body">
            <div class="chat-messages"></div>
            <div class="chat-controls">
                <textarea class="chat-textarea" placeholder="Introduza a sua mensagem..." rows="1" aria-label="Message input"></textarea>
                <button class="chat-submit" aria-label="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a class="chat-footer-link" href="${settings.branding.poweredBy.link}" target="_blank" rel="noopener noreferrer">${settings.branding.poweredBy.text}</a>
            </div>
        </div>`;

  chatWindow.innerHTML = headerHTML + chatInterfaceHTML; // Combine header and chat interface

  // Create toggle button
  const launchButton = document.createElement("button");
  launchButton.className = `chat-launcher ${
    settings.style.position === "left" ? "left-side" : "right-side"
  }`;
  launchButton.setAttribute("aria-label", "Open chat");
  launchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span class="chat-launcher-text">Precisa de Ajuda?</span>`;

  // Add elements to DOM
  widgetRoot.appendChild(chatWindow);
  widgetRoot.appendChild(launchButton);
  document.body.appendChild(widgetRoot);

  // Get DOM elements
  const chatBody = chatWindow.querySelector(".chat-body");
  const messagesContainer = chatWindow.querySelector(".chat-messages");
  const messageTextarea = chatWindow.querySelector(".chat-textarea");
  const sendButton = chatWindow.querySelector(".chat-submit");
  const closeButton = chatWindow.querySelector(".chat-close-btn");

  if (import.meta.env.DEV) {
    const chatControls = chatWindow.querySelector(".chat-controls");
    if (chatControls) {
      // Create and append debug button
      const debugButton = createDebugButton(
        messagesContainer,
        displayBotMessagesSequentially
      );
      chatControls.appendChild(debugButton);
    }
  }
  // Helper function to generate unique session ID
  function createSessionId() {
    return crypto.randomUUID();
  }

  // Create typing indicator element
  function createTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>`;
    return indicator;
  }

  // Function to convert URLs in text to clickable links
  function linkifyText(text) {
    const urlPattern =
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    return text.replace(urlPattern, function (url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`;
    });
  }

  // --- START: Scroll Helper Functions ---
  function isScrolledToBottom(element, threshold = SCROLL_THRESHOLD) {
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <
      threshold
    );
  }

  function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
  }

  function getOrCreateScrollToBottomIndicator() {
    if (!scrollToBottomIndicator) {
      scrollToBottomIndicator = document.createElement("div");
      scrollToBottomIndicator.className = "scroll-to-bottom-indicator";
      scrollToBottomIndicator.innerHTML = `<svg viewBox="0 0 24 24" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`;
      scrollToBottomIndicator.addEventListener("click", () => {
        scrollToBottom(messagesContainer);
        hideScrollToBottomIndicator();
      });
      messagesContainer.appendChild(scrollToBottomIndicator);
    }
    return scrollToBottomIndicator;
  }

  function showScrollToBottomIndicator() {
    const indicator = getOrCreateScrollToBottomIndicator();
    indicator.classList.add("visible");
    clearTimeout(scrollToBottomIndicatorTimeout);
  }

  function hideScrollToBottomIndicator() {
    if (scrollToBottomIndicator) {
      scrollToBottomIndicator.classList.remove("visible");
    }
  }
  // --- END: Scroll Helper Functions ---

  async function displayBotMessagesSequentially(
    messages,
    betweenMessagesDelay = 2000,
    initialUserIsAtBottom
  ) {
    let currentUserIsAtBottom = initialUserIsAtBottom;

    for (let i = 0; i < messages.length; i++) {
      let localTypingIndicator;
      if (i > 0) {
        currentUserIsAtBottom = isScrolledToBottom(
          messagesContainer,
          SCROLL_THRESHOLD
        );
        localTypingIndicator = createTypingIndicator();
        messagesContainer.appendChild(localTypingIndicator);
        if (currentUserIsAtBottom) {
          scrollToBottom(messagesContainer);
        }
        await new Promise((res) => setTimeout(res, betweenMessagesDelay));
        if (
          localTypingIndicator &&
          messagesContainer.contains(localTypingIndicator)
        ) {
          messagesContainer.removeChild(localTypingIndicator);
        }
        currentUserIsAtBottom = isScrolledToBottom(
          messagesContainer,
          SCROLL_THRESHOLD
        );
      }

      const botMessage = document.createElement("div");
      botMessage.className = "chat-bubble bot-bubble";
      let rawHtml = marked.parse(
        linkifyText((messages[i].text || String(messages[i])).trim())
      );
      let finalHtml = rawHtml.replace(/<\/?ul[^>]*>/gi, "");
      finalHtml = finalHtml.replace(/<li>/gi, "• ");
      finalHtml = finalHtml.replace(/<\/li>/gi, "<br>");
      botMessage.innerHTML = finalHtml.trim();
      messagesContainer.appendChild(botMessage);

      if (currentUserIsAtBottom) {
        scrollToBottom(messagesContainer);
      } else {
        showScrollToBottomIndicator();
      }
    }
  }

  async function initiateChatSession() {
    chatBody.classList.add("active"); // Show chat messages area and controls
    if (!conversationId) {
      // Only create new session if one doesn't exist
      conversationId = createSessionId();
    }

    if (settings.branding.initialBotMessage) {
      const botMessageElement = document.createElement("div");
      botMessageElement.className = "chat-bubble bot-bubble";
      botMessageElement.innerHTML = linkifyText(
        settings.branding.initialBotMessage
      );
      messagesContainer.appendChild(botMessageElement);
      scrollToBottom(messagesContainer);
    }

    if (
      settings.suggestedQuestions &&
      Array.isArray(settings.suggestedQuestions) &&
      settings.suggestedQuestions.length > 0
    ) {
      const suggestedQuestionsContainer = document.createElement("div");
      suggestedQuestionsContainer.className = "suggested-questions";
      settings.suggestedQuestions.forEach((question) => {
        const questionButton = document.createElement("button");
        questionButton.className = "suggested-question-btn";
        questionButton.textContent = question;
        questionButton.addEventListener("click", () => {
          submitMessage(question);
          if (suggestedQuestionsContainer.parentNode) {
            suggestedQuestionsContainer.parentNode.removeChild(
              suggestedQuestionsContainer
            );
          }
        });
        suggestedQuestionsContainer.appendChild(questionButton);
      });
      messagesContainer.appendChild(suggestedQuestionsContainer);
      scrollToBottom(messagesContainer);
    }

    const genericEmail = "guest-" + conversationId + "@example.com";
    const genericName = "Guest";
    const sessionData = [
      {
        action: "loadPreviousSession",
        sessionId: conversationId,
        route: settings.webhook.route,
        metadata: { userId: genericEmail, userName: genericName },
      },
    ];

    try {
      await fetch(settings.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });
    } catch (error) {
      console.error("Chat session initialization with webhook failed:", error);
    }
  }

  async function submitMessage(messageText) {
    if (isWaitingForResponse || !messageText.trim()) return;
    isWaitingForResponse = true;

    // Remove suggested questions if they exist
    const existingSuggestedQuestions = messagesContainer.querySelector(
      ".suggested-questions"
    );
    if (existingSuggestedQuestions) {
      existingSuggestedQuestions.remove();
    }

    const genericEmail = "guest-" + conversationId + "@example.com";
    const genericName = "Guest";
    const requestData = {
      action: "sendMessage",
      sessionId: conversationId,
      route: settings.webhook.route,
      chatInput: messageText,
      metadata: { userId: genericEmail, userName: genericName },
    };

    const userMessage = document.createElement("div");
    userMessage.className = "chat-bubble user-bubble";
    userMessage.textContent = messageText;
    messagesContainer.appendChild(userMessage);
    scrollToBottom(messagesContainer);

    const typingIndicator = createTypingIndicator();
    messagesContainer.appendChild(typingIndicator);
    scrollToBottom(messagesContainer);

    try {
      const response = await fetch(settings.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();

      if (typingIndicator && messagesContainer.contains(typingIndicator)) {
        messagesContainer.removeChild(typingIndicator);
      }

      const userIsAtBottom = isScrolledToBottom(
        messagesContainer,
        SCROLL_THRESHOLD
      );
      let messagesArray = null;
      if (
        Array.isArray(responseData) &&
        responseData[0]?.output?.messages &&
        Array.isArray(responseData[0].output.messages)
      ) {
        messagesArray = responseData[0].output.messages;
      } else if (
        responseData?.output?.messages &&
        Array.isArray(responseData.output.messages)
      ) {
        messagesArray = responseData.output.messages;
      }

      if (messagesArray && messagesArray.length > 0) {
        await displayBotMessagesSequentially(
          messagesArray,
          2000,
          userIsAtBottom
        );
      } else {
        const botMessage = document.createElement("div");
        botMessage.className = "chat-bubble bot-bubble";
        const responseText = Array.isArray(responseData)
          ? responseData[0].output
          : responseData.output;
        let rawHtml = marked.parse(linkifyText(String(responseText).trim()));
        let finalHtml = rawHtml.replace(/<\/?ul[^>]*>/gi, "");
        finalHtml = finalHtml.replace(/<li>/gi, "• ");
        finalHtml = finalHtml.replace(/<\/li>/gi, "<br>");
        botMessage.innerHTML = finalHtml.trim();
        messagesContainer.appendChild(botMessage);
        if (userIsAtBottom) {
          scrollToBottom(messagesContainer);
        } else {
          showScrollToBottomIndicator();
        }
      }
    } catch (error) {
      console.error("Message submission error:", error);
      if (typingIndicator && messagesContainer.contains(typingIndicator)) {
        messagesContainer.removeChild(typingIndicator);
      }
      const userIsAtBottom = isScrolledToBottom(
        messagesContainer,
        SCROLL_THRESHOLD
      );
      const errorMessage = document.createElement("div");
      errorMessage.className = "chat-bubble bot-bubble";
      errorMessage.textContent =
        "Sorry, I couldn't send your message. Please try again.";
      messagesContainer.appendChild(errorMessage);
      if (userIsAtBottom) {
        scrollToBottom(messagesContainer);
      } else {
        showScrollToBottomIndicator();
      }
    } finally {
      isWaitingForResponse = false;
      messageTextarea.focus(); // Keep focus on textarea
    }
  }

  function autoResizeTextarea() {
    messageTextarea.style.height = "auto"; // Reset height
    let scrollHeight = messageTextarea.scrollHeight;
    const maxHeight =
      parseInt(getComputedStyle(messageTextarea).maxHeight, 10) || 120;
    messageTextarea.style.height =
      (scrollHeight > maxHeight ? maxHeight : scrollHeight) + "px";
  }

  sendButton.addEventListener("click", () => {
    const messageText = messageTextarea.value.trim();
    if (messageText) {
      // No need to check isWaitingForResponse here, submitMessage handles it
      submitMessage(messageText);
      messageTextarea.value = "";
      autoResizeTextarea();
    }
  });

  messageTextarea.addEventListener("input", autoResizeTextarea);

  messageTextarea.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const messageText = messageTextarea.value.trim();
      if (messageText) {
        submitMessage(messageText);
        messageTextarea.value = "";
        autoResizeTextarea();
      }
    }
  });

  launchButton.addEventListener("click", () => {
    const becomingVisible = !chatWindow.classList.contains("visible");
    chatWindow.classList.toggle("visible");
    launchButton.setAttribute("aria-expanded", becomingVisible.toString());

    if (becomingVisible) {
      if (!conversationId || messagesContainer.children.length === 0) {
        // Start session if no ID or no messages
        // Clear any old messages if re-opening without a session
        while (messagesContainer.firstChild) {
          messagesContainer.removeChild(messagesContainer.firstChild);
        }
        // Re-add scroll indicator if it was removed
        if (
          scrollToBottomIndicator &&
          !messagesContainer.contains(scrollToBottomIndicator)
        ) {
          messagesContainer.appendChild(scrollToBottomIndicator);
        }
        initiateChatSession();
      }
      messageTextarea.focus(); // Focus input when chat opens
      // Scroll lock for mobile
      if (window.innerWidth <= 768) {
        document.body.style.overflow = "hidden";
      }
    } else {
      // Remove scroll lock if it was applied
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
    }
  });

  closeButton.addEventListener("click", () => {
    chatWindow.classList.remove("visible");
    launchButton.setAttribute("aria-expanded", "false");
    // Remove scroll lock if it was applied
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
    }
  });

  // --- START: Event listener for scroll on messages container ---
  messagesContainer.addEventListener("scroll", () => {
    if (
      scrollToBottomIndicator &&
      scrollToBottomIndicator.classList.contains("visible")
    ) {
      if (isScrolledToBottom(messagesContainer, SCROLL_THRESHOLD + 5)) {
        hideScrollToBottomIndicator();
      }
    }
  });
  // --- END: Event listener for scroll on messages container ---
})();
