import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalComWidget() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#0752ce" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return <Cal
    namespace="30min"
    calLink="ebenai/30min"
    style={{ width: "100%", height: "100%", minHeight: "480px", overflow: "auto" }}
    config={{ layout: "month_view", theme: "light" }}
  />;
}
