"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  primitiveGroups,
  semanticTokens,
  componentTokens,
  allPrimitives,
  primRefCount,
  semRefCount,
  getHoverChain,
  groupedSemantics,
  groupedComponents,
  type PrimitiveGroup,
  type SemanticToken,
  type ComponentToken,
} from "@/lib/tokens";
import { cn } from "@/lib/utils";

// ─── LAYOUT CONSTANTS ─────────────────────────────────────────────────────────
const COL_PRIM_W = 296;
const GAP1_W     = 112;
const COL_SEM_W  = 256;
const GAP2_W     = 112;
const COL_COMP_W = 256;
// Side columns are "1fr" — they expand to fill remaining space and center the content.
// X coords for SVG are measured dynamically from gap element refs.

// ─── TYPES ────────────────────────────────────────────────────────────────────
// y is measured in graph-area-relative px (visual, accounts for column scroll)
type Positions = Record<string, number>;

function bezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const cx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TokenGraph() {
  // The fixed-height graph area — SVG is measured relative to this
  const graphAreaRef = useRef<HTMLDivElement>(null);
  // Gap divs — used to measure dynamic SVG X connection points
  const gap1Ref = useRef<HTMLDivElement>(null);
  const gap2Ref = useRef<HTMLDivElement>(null);
  // Per-column scroll containers (so each scrolls independently)
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  // Individual token element refs for y-position measurement
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [positions,   setPositions]   = useState<Positions>({});
  const [graphHeight, setGraphHeight] = useState(0);
  const [xCoords,     setXCoords]     = useState({ primRight: 0, semLeft: 0, semRight: 0, compLeft: 0 });
  const [hoveredId,   setHoveredId]   = useState<string | null>(null);
  const [search,      setSearch]      = useState("");
  const [expanded,    setExpanded]    = useState<Set<string>>(new Set(["brand", "neutral"]));

  // Measure every token's VISUAL y-center relative to the graph area top.
  // getBoundingClientRect already accounts for each column's scroll offset,
  // so this stays accurate no matter which column has scrolled.
  const measure = useCallback(() => {
    const area = graphAreaRef.current;
    if (!area) return;
    const areaRect = area.getBoundingClientRect();
    const areaTop  = areaRect.top;
    const areaLeft = areaRect.left;
    const areaH    = areaRect.height;

    // Measure SVG X connection points from the gap divs
    if (gap1Ref.current && gap2Ref.current) {
      const g1 = gap1Ref.current.getBoundingClientRect();
      const g2 = gap2Ref.current.getBoundingClientRect();
      setXCoords({
        primRight: g1.left  - areaLeft,
        semLeft:   g1.right - areaLeft,
        semRight:  g2.left  - areaLeft,
        compLeft:  g2.right - areaLeft,
      });
    }

    // Measure token y-centers (visual, accounts for each column's scroll)
    const next: Positions = {};
    for (const [id, el] of Object.entries(itemRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const y = rect.top - areaTop + rect.height / 2;
      if (y > -rect.height && y < areaH + rect.height) {
        next[id] = y;
      }
    }
    setPositions(next);
    setGraphHeight(areaH);
  }, []);

  // Re-measure whenever layout changes
  useLayoutEffect(() => { measure(); }, [measure, expanded, search]);

  useEffect(() => {
    const observer = new ResizeObserver(measure);
    if (graphAreaRef.current) observer.observe(graphAreaRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const hoverChain = hoveredId ? getHoverChain(hoveredId) : null;
  const semGroups  = groupedSemantics();
  const compGroups = groupedComponents();

  const primCount = allPrimitives.length;
  const semCount  = semanticTokens.length;
  const compCount = componentTokens.length;
  const connCount = semanticTokens.length + componentTokens.length;

  const searchLower = search.toLowerCase();
  const matchToken  = (id: string) => !search || id.toLowerCase().includes(searchLower);

  const toggleExpand = (groupId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    itemRefs.current[id] = el;
  };

  // Build SVG paths — only drawn when both endpoints are visible
  const renderConnections = () => {
    const { primRight, semLeft, semRight, compLeft } = xCoords;
    if (!primRight) return null; // not yet measured

    const primSem = semanticTokens.map((sem) => {
      const y1 = positions[sem.primitiveRef];
      const y2 = positions[sem.id];
      if (y1 === undefined || y2 === undefined) return null;

      const inChain = hoverChain
        ? hoverChain.has(sem.primitiveRef) && hoverChain.has(sem.id)
        : false;
      const dimmed = !!hoverChain && !inChain;

      return (
        <path
          key={`ps-${sem.id}`}
          d={bezierPath(primRight, y1, semLeft, y2)}
          fill="none"
          stroke={inChain ? "#2563EB" : "#94a3b8"}
          strokeWidth={inChain ? 2 : 1}
          strokeOpacity={dimmed ? 0.04 : inChain ? 0.9 : 0.18}
          style={{ transition: "stroke-opacity 120ms, stroke 120ms, stroke-width 120ms" }}
        />
      );
    });

    const semComp = componentTokens.map((comp) => {
      const y1 = positions[comp.semanticRef];
      const y2 = positions[comp.id];
      if (y1 === undefined || y2 === undefined) return null;

      const inChain = hoverChain
        ? hoverChain.has(comp.semanticRef) && hoverChain.has(comp.id)
        : false;
      const dimmed = !!hoverChain && !inChain;

      return (
        <path
          key={`sc-${comp.id}`}
          d={bezierPath(semRight, y1, compLeft, y2)}
          fill="none"
          stroke={inChain ? "#2563EB" : "#94a3b8"}
          strokeWidth={inChain ? 2 : 1}
          strokeOpacity={dimmed ? 0.04 : inChain ? 0.9 : 0.18}
          style={{ transition: "stroke-opacity 120ms, stroke 120ms, stroke-width 120ms" }}
        />
      );
    });

    return [...primSem, ...semComp];
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Fixed header ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Token Graph</h1>
          <p className="text-xs text-gray-400 mt-0.5">Hover any token to trace its full reference chain</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{primCount} primitives</span>
          <span className="px-3 py-1 rounded-full bg-brand-200/60 text-brand-700 font-medium">{semCount} semantic</span>
          <span className="px-3 py-1 rounded-full bg-gray-900 text-white font-medium">{compCount} component</span>
          <span className="px-3 py-1 rounded-full border border-gray-200 text-gray-500 font-medium">{connCount} connections</span>
        </div>
      </div>

      {/* ── Fixed search bar ── */}
      <div className="flex-shrink-0 px-8 py-3 border-b border-gray-200 bg-white">
        <div className="relative max-w-lg">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tokens (e.g. brand, button, neutral…)"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:bg-white"
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Click a palette to expand · <span className="inline-block w-5 border-t border-gray-400 border-dashed mx-1 translate-y-[-2px]" /> resolves to · line thickness = reference weight
        </p>
      </div>

      {/* ── Graph area: fixed height, no page scroll ── */}
      <div
        ref={graphAreaRef}
        className="flex-1 overflow-hidden relative bg-gray-100"
      >
        {/* SVG overlay — covers the full graph area, pointer-events:none so columns stay interactive */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%", zIndex: 5 }}
          aria-hidden
        >
          {renderConnections()}
        </svg>

        {/* 3-column grid with independent scrollers — 1fr side columns center the content */}
        <div
          className="h-full"
          style={{
            display: "grid",
            gridTemplateColumns: `1fr ${COL_PRIM_W}px ${GAP1_W}px ${COL_SEM_W}px ${GAP2_W}px ${COL_COMP_W}px 1fr`,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* left pad — expands to fill, centering the 3 columns */}
          <div className="bg-gray-100" />

          {/* ─── Column 1: Primitives ─── */}
          <div
            ref={col1Ref}
            className="overflow-y-auto bg-gray-100 h-full"
            onScroll={measure}
          >
            <div className="py-5 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1 sticky top-0 bg-gray-100 pb-2 z-10">
                Primitives
              </p>
              {primitiveGroups.map((group) => (
                <PaletteGroup
                  key={group.id}
                  group={group}
                  expanded={expanded.has(group.id)}
                  onToggle={() => toggleExpand(group.id)}
                  hoverChain={hoverChain}
                  setHoveredId={setHoveredId}
                  setRef={setRef}
                  search={searchLower}
                  matchToken={matchToken}
                  onScroll={measure}
                />
              ))}
            </div>
          </div>

          {/* gap 1 — lines flow through here; ref used to measure SVG X coords */}
          <div ref={gap1Ref} />

          {/* ─── Column 2: Semantic ─── */}
          <div
            ref={col2Ref}
            className="overflow-y-auto bg-gray-100 h-full"
            onScroll={measure}
          >
            <div className="py-5 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1 sticky top-0 bg-gray-100 pb-2 z-10">
                Semantic Tokens
              </p>
              {Object.entries(semGroups).map(([category, tokens]) => (
                <SemanticGroup
                  key={category}
                  category={category}
                  tokens={tokens}
                  hoverChain={hoverChain}
                  setHoveredId={setHoveredId}
                  setRef={setRef}
                  matchToken={matchToken}
                />
              ))}
            </div>
          </div>

          {/* gap 2 — ref used to measure SVG X coords */}
          <div ref={gap2Ref} />

          {/* ─── Column 3: Component ─── */}
          <div
            ref={col3Ref}
            className="overflow-y-auto bg-gray-100 h-full"
            onScroll={measure}
          >
            <div className="py-5 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1 sticky top-0 bg-gray-100 pb-2 z-10">
                Component Tokens
              </p>
              {Object.entries(compGroups).map(([component, tokens]) => (
                <ComponentGroup
                  key={component}
                  component={component}
                  tokens={tokens}
                  hoverChain={hoverChain}
                  setHoveredId={setHoveredId}
                  setRef={setRef}
                  matchToken={matchToken}
                />
              ))}
            </div>
          </div>

          {/* right pad */}
          <div className="bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// ─── PALETTE GROUP ────────────────────────────────────────────────────────────
function PaletteGroup({
  group, expanded, onToggle, hoverChain, setHoveredId, setRef, search, matchToken, onScroll,
}: {
  group: PrimitiveGroup;
  expanded: boolean;
  onToggle: () => void;
  hoverChain: Set<string> | null;
  setHoveredId: (id: string | null) => void;
  setRef: (id: string) => (el: HTMLDivElement | null) => void;
  search: string;
  matchToken: (id: string) => boolean;
  onScroll: () => void;
}) {
  const isColorGroup  = group.type === "color";
  const visibleTokens = search ? group.tokens.filter((t) => matchToken(t.id)) : group.tokens;
  const totalRefs     = group.tokens.reduce((acc, t) => acc + primRefCount(t.id), 0);

  if (search && visibleTokens.length === 0) return null;

  return (
    <div className="mb-1">
      {/* Group header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/70 transition-colors text-left"
      >
        <svg
          className={cn("h-3 w-3 text-gray-400 flex-shrink-0 transition-transform", expanded && "rotate-90")}
          viewBox="0 0 12 12"
        >
          <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-medium text-gray-700 flex-1">{group.name}</span>

        {/* Collapsed color strip inside header */}
        {isColorGroup && !expanded && (
          <div className="flex gap-0.5 w-[72px]">
            {group.tokens.map((t) => (
              <div key={t.id} className="h-3.5 flex-1 rounded-sm" style={{ backgroundColor: t.value }} />
            ))}
          </div>
        )}

        <span className="text-[10px] text-gray-400">{totalRefs} refs</span>
      </button>

      {/* Expanded rows */}
      {expanded && (
        <div className="ml-5 mt-0.5 space-y-px">
          {visibleTokens.map((token) => {
            const refs    = primRefCount(token.id);
            const inChain = hoverChain?.has(token.id) ?? false;
            const dimmed  = !!hoverChain && !inChain;
            return (
              <div
                key={token.id}
                ref={setRef(token.id)}
                onMouseEnter={() => { setHoveredId(token.id); }}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-default transition-all",
                  inChain  && "bg-brand-200/50 ring-1 ring-brand-300",
                  dimmed   && "opacity-25",
                  !hoverChain && "hover:bg-white/70"
                )}
              >
                {isColorGroup ? (
                  <div className="w-5 h-5 rounded-sm flex-shrink-0 border border-black/10 shadow-sm" style={{ backgroundColor: token.value }} />
                ) : (
                  <div className="w-5 h-5 rounded-sm flex-shrink-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-gray-500">T</span>
                  </div>
                )}
                <span className={cn("text-xs font-medium flex-shrink-0 w-8", inChain ? "text-brand-700 font-semibold" : "text-gray-600")}>
                  {token.name}
                </span>
                <span className="text-[10px] font-mono text-gray-400 flex-1 truncate">{token.value}</span>
                {refs > 0 && (
                  <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0",
                    inChain ? "bg-brand-600 text-white" : "bg-white text-gray-500"
                  )}>
                    {refs}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Collapsed: hoverable color strip */}
      {!expanded && isColorGroup && (
        <div className="ml-5 flex gap-px mt-0.5 mb-1">
          {visibleTokens.map((token) => {
            const inChain = hoverChain?.has(token.id) ?? false;
            return (
              <div
                key={token.id}
                ref={setRef(token.id)}
                onMouseEnter={() => setHoveredId(token.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn("h-6 flex-1 rounded-sm cursor-default transition-all", inChain && "ring-2 ring-brand-600 scale-y-110")}
                style={{ backgroundColor: token.value }}
                title={`${token.id} · ${token.value}`}
              />
            );
          })}
        </div>
      )}

      {/* Collapsed: non-color compact list */}
      {!expanded && !isColorGroup && (
        <div className="ml-5 mt-0.5 space-y-px">
          {visibleTokens.slice(0, 4).map((token) => {
            const inChain = hoverChain?.has(token.id) ?? false;
            const dimmed  = !!hoverChain && !inChain;
            return (
              <div
                key={token.id}
                ref={setRef(token.id)}
                onMouseEnter={() => setHoveredId(token.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded-md cursor-default transition-all",
                  inChain  && "bg-brand-200/50 ring-1 ring-brand-300",
                  dimmed   && "opacity-25",
                  !hoverChain && "hover:bg-white/70"
                )}
              >
                <span className="text-xs text-gray-500 w-10 flex-shrink-0 font-mono">{token.name}</span>
                <span className="text-[10px] text-gray-400 font-mono flex-1">{token.value}</span>
              </div>
            );
          })}
          {group.tokens.length > 4 && !search && (
            <button onClick={onToggle} className="ml-2 text-[10px] text-brand-600 hover:underline">
              +{group.tokens.length - 4} more
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SEMANTIC GROUP ────────────────────────────────────────────────────────────
function SemanticGroup({
  category, tokens, hoverChain, setHoveredId, setRef, matchToken,
}: {
  category: string;
  tokens: SemanticToken[];
  hoverChain: Set<string> | null;
  setHoveredId: (id: string | null) => void;
  setRef: (id: string) => (el: HTMLDivElement | null) => void;
  matchToken: (id: string) => boolean;
}) {
  const visible    = tokens.filter((t) => matchToken(t.id));
  const isColorCat = !["Space", "Radius", "Typography"].includes(category);
  if (visible.length === 0) return null;

  return (
    <div className="mb-2">
      <p className="text-[10px] font-semibold text-gray-400 px-2 py-0.5 uppercase tracking-wider">{category}</p>
      <div className="space-y-px">
        {visible.map((token) => {
          const refs    = semRefCount(token.id);
          const inChain = hoverChain?.has(token.id) ?? false;
          const dimmed  = !!hoverChain && !inChain;
          return (
            <div
              key={token.id}
              ref={setRef(token.id)}
              onMouseEnter={() => setHoveredId(token.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-default transition-all bg-white border border-transparent",
                inChain  && "bg-brand-200/50 border-brand-300 shadow-sm",
                dimmed   && "opacity-20",
                !hoverChain && "hover:bg-white hover:border-gray-200"
              )}
            >
              {isColorCat && (
                <div className="w-4 h-4 rounded-sm flex-shrink-0 border border-black/10" style={{ backgroundColor: token.value }} />
              )}
              <span className={cn("text-xs flex-1 font-mono truncate", inChain ? "text-brand-700 font-semibold" : "text-gray-700")}>
                {token.name}
              </span>
              {refs > 0 && (
                <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0",
                  inChain ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-500"
                )}>
                  {refs}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COMPONENT GROUP ──────────────────────────────────────────────────────────
function ComponentGroup({
  component, tokens, hoverChain, setHoveredId, setRef, matchToken,
}: {
  component: string;
  tokens: ComponentToken[];
  hoverChain: Set<string> | null;
  setHoveredId: (id: string | null) => void;
  setRef: (id: string) => (el: HTMLDivElement | null) => void;
  matchToken: (id: string) => boolean;
}) {
  const visible = tokens.filter((t) => matchToken(t.id));
  if (visible.length === 0) return null;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between px-2 py-0.5 mb-0.5">
        <p className="text-xs font-semibold text-gray-700 capitalize">{component}</p>
        <span className="text-[10px] text-gray-400">{visible.length}</span>
      </div>
      <div className="space-y-px">
        {visible.map((token) => {
          const inChain = hoverChain?.has(token.id) ?? false;
          const dimmed  = !!hoverChain && !inChain;
          return (
            <div
              key={token.id}
              ref={setRef(token.id)}
              onMouseEnter={() => setHoveredId(token.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-default transition-all bg-white border border-transparent",
                inChain  && "bg-brand-200/50 border-brand-300 shadow-sm",
                dimmed   && "opacity-20",
                !hoverChain && "hover:bg-white hover:border-gray-200"
              )}
            >
              <span className={cn("text-xs font-mono flex-1 truncate", inChain ? "text-brand-700 font-semibold" : "text-gray-600")}>
                {token.name.replace(`${component}.`, "")}
              </span>
              {/^#[0-9A-Fa-f]{3,8}$/.test(token.value) && (
                <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border border-black/10" style={{ backgroundColor: token.value }} />
              )}
              {!/^#/.test(token.value) && (
                <span className="text-[10px] font-mono text-gray-400 flex-shrink-0">{token.value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
