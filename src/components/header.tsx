/* eslint-disable prettier/prettier */
import { ChevronDown, LogOut } from "lucide-react";

import { ThemeToggle } from "./theme/theme-toggle";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  return (
    <header className="w-full dark:bg-zinc-900 bg-zinc-200 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-3">
        <div className="flex items-center gap-10">
          <figure>
            <img src="/logo.svg" alt="Logo da Nitro HUB" className="w-10" />
          </figure>

          <div className="hidden items-center gap-3 text-sm text-zinc-300 xl:flex">
            <DatePicker />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden md:block pointer-events-none select-none text-sm text-muted-foreground">
            Pesquisar{" "}
            <kbd className="pointer-events-none ml-1 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘ | ctrl +</span>K
            </kbd>
          </p>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="account-menu">
              <Button
                variant="outline"
                className="flex h-11 select-none items-center gap-2"
              >
                Rafael Pereira
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="flex flex-col">
                <span>Rafael Pereira</span>
                <span className="text-sm font-normal text-muted-foreground">
                  rafaelsantospereira03@gmail.com
                </span>
              </DropdownMenuLabel>

              <DropdownMenuLabel className="flex flex-col">
                <span>Empresa: Nitro HUB</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Criado em: 15 de setembro de 2024
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                className="cursor-pointer text-rose-500 dark:text-rose-400"
              >
                <button type="button" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
