import { Wordmark } from "./wordmark";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-void">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Wordmark size="sm" />
          <p className="font-mono text-xs italic text-text-muted">
            &ldquo;Built for the systems that keep the world running.&rdquo;
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-text-secondary">
          <a className="hover:text-cyan-bright" href="#how-it-works">
            How it works
          </a>
          <a className="hover:text-cyan-bright" href="#architecture">
            Architecture
          </a>
          <a className="hover:text-cyan-bright" href="#pricing">
            Pricing
          </a>
          <a className="hover:text-cyan-bright" href="#docs">
            Documentation
          </a>
        </nav>
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} StratosCode
        </p>
      </div>
    </footer>
  );
}
