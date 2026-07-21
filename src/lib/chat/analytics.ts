import { getConsent } from "@/lib/consent";
import { isAnalyticsConfigured } from "@/lib/analytics";

export type ChatAnalyticsEvent =
  | "chat_open"
  | "chat_message_sent"
  | "chat_option_click"
  | "chat_lead_form_open"
  | "chat_lead_form_submit";

export function trackChatEvent(event: ChatAnalyticsEvent, params?: Record<string, unknown>) {
  if (!isAnalyticsConfigured()) return;
  if (getConsent() !== "accepted") return;
  window.gtag?.("event", event, params);
}
