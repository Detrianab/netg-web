import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso del equipo | Next G Solutions Telecom" },
      { name: "description", content: "Área privada de Next G Solutions Telecom, C.A." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acceso del equipo | Next G Solutions Telecom" },
      { property: "og:description", content: "Área privada del equipo comercial." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch {
      toast.error(t.auth.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero title={t.auth.title} subtitle={t.auth.subtitle} />
      <section className="py-16">
        <div className="container-page max-w-md">
          <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-surface p-8">
            <div>
              <Label htmlFor="a-email">{t.auth.email}</Label>
              <Input id="a-email" name="email" type="email" required className="mt-1.5" />
            </div>
            <div className="mt-4">
              <Label htmlFor="a-password">{t.auth.password}</Label>
              <Input
                id="a-password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1.5"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-60"
            >
              {loading ? t.common.loading : mode === "signin" ? t.auth.signIn : t.auth.signUp}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-primary"
            >
              {mode === "signin" ? t.auth.toggleToSignUp : t.auth.toggleToSignIn}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
