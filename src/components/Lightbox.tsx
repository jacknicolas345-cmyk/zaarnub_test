import { useEffect, useState, useCallback } from "react";
import { X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut } from "lucide-react";

type Props = { images: string[]; startIndex: number; onClose: () => void };

export function Lightbox({ images, startIndex, onClose }: Props) {
  const [idx, setIdx] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => { setIdx((i) => (i + 1) % images.length); setZoom(1); setPos({ x: 0, y: 0 }); }, [images.length]);
  const prev = useCallback(() => { setIdx((i) => (i - 1 + images.length) % images.length); setZoom(1); setPos({ x: 0, y: 0 }); }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") prev();
      if (e.key === "ArrowLeft") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [next, prev, onClose]);

  const onTouchStart = (e: React.TouchEvent) => { if (zoom === 1) setTouchStart(e.touches[0].clientX); };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || zoom !== 1) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) { if (diff > 0) prev(); else next(); }
    setTouchStart(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" dir="ltr">
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-sm">{idx + 1} / {images.length}</span>
        <div className="flex gap-2">
          <button onClick={() => setZoom((z) => Math.max(1, z - 0.5))} className="p-2 hover:bg-white/10 rounded"><ZoomOut className="h-5 w-5" /></button>
          <button onClick={() => setZoom((z) => Math.min(4, z + 0.5))} className="p-2 hover:bg-white/10 rounded"><ZoomIn className="h-5 w-5" /></button>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden flex items-center justify-center"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        onMouseDown={(e) => zoom > 1 && setDrag({ x: e.clientX - pos.x, y: e.clientY - pos.y })}
        onMouseMove={(e) => drag && setPos({ x: e.clientX - drag.x, y: e.clientY - drag.y })}
        onMouseUp={() => setDrag(null)} onMouseLeave={() => setDrag(null)}
      >
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={next} className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"><ChevronRight className="h-6 w-6" /></button>
          </>
        )}
        <img src={images[idx]} alt="" draggable={false}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`, cursor: zoom > 1 ? (drag ? "grabbing" : "grab") : "zoom-in" }}
          onClick={() => zoom === 1 && setZoom(2)}
          className="max-h-full max-w-full object-contain transition-transform duration-200 select-none" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto justify-center">
          {images.map((url, i) => (
            <button key={i} onClick={() => { setIdx(i); setZoom(1); setPos({ x: 0, y: 0 }); }}
              className={`w-16 h-16 rounded overflow-hidden shrink-0 border-2 ${i === idx ? "border-gold" : "border-transparent opacity-60"}`}>
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
