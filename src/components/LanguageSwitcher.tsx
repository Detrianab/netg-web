import { Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_META, useI18n } from "@/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        aria-label={t.common.language}
      >
        <Globe className="size-4 text-muted-foreground" aria-hidden />
        <span aria-hidden>{LOCALE_META[locale].flag}</span>
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {LOCALES.map((code) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => setLocale(code)}
            className={code === locale ? "font-semibold" : undefined}
          >
            <span aria-hidden className="mr-2 text-base">
              {LOCALE_META[code].flag}
            </span>
            {LOCALE_META[code].label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
