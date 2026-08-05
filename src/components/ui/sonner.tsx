import * as React from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Toast notifications. Mount <Toaster /> once near the app root (e.g. in App.tsx),
// then call `toast(...)` from "sonner" anywhere. Tracks the `.dark` class on
// <html> so toasts follow the theme (this is a Vite app, so no next-themes).
const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = React.useState<ToasterProps["theme"]>(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  React.useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setTheme(el.classList.contains("dark") ? "dark" : "light"),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-secondary-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-secondary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
