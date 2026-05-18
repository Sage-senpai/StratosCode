export default function HomePage() {
  return (
    <main className="bg-grid relative flex min-h-screen items-center justify-center">
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <span className="mono-label text-cyan-bright">
          // LEGACY CODE MODERNIZATION ENGINE
        </span>
        <h1 className="font-display text-5xl font-bold tracking-tight text-text-primary md:text-7xl">
          StratosCode
        </h1>
        <p className="font-body max-w-xl text-text-secondary">
          Legacy in. Cloud-native out. Landing page coming in Batch 6.
        </p>
        <div className="font-mono text-xs text-text-muted">
          {"{S}"} foundation ready · v0.1.0
        </div>
      </div>
    </main>
  );
}
