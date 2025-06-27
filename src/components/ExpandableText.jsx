import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const ExpandableText = ({ text, lines = 2 }) => {
  const [open, setOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const [clampable, setClampable] = useState(false);
  const textRef = useRef(null);
  const scrollRef = useRef(null);
  const html = useMemo(() => {
    if (!text) return '';
    const raw = marked.parse(text);
    return DOMPurify.sanitize(raw);
  }, [text]);

  useLayoutEffect(() => {
    if (!text) return;
    const el = textRef.current;
    if (!el) return;

    // measure full height by cloning without line clamp
    const clone = el.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.pointerEvents = 'none';
    clone.classList.remove(`line-clamp-${lines}`);
    document.body.appendChild(clone);
    const fullHeight = clone.scrollHeight;
    document.body.removeChild(clone);

    const clampedHeight = el.scrollHeight;
    setClampable(fullHeight > clampedHeight + 1);
  }, [html, lines]);

  useLayoutEffect(() => {
    if (!open) return;
    const container = scrollRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    if (!container) return;

    const updateScrollState = () => {
      setScrollMax(container.scrollHeight - container.clientHeight);
      setScrollPos(container.scrollTop);
    };

    updateScrollState();
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    const handleScroll = () => setScrollPos(container.scrollTop);
    container.addEventListener('scroll', handleScroll);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', handleScroll);
    };
  }, [open, html]);

  if (!text) return null;

  const clamped = `line-clamp-${lines}`;

  return (
    <div className="space-y-1 max-w-xs">
      <div
        ref={textRef}
        className={cn('text-sm text-gray-700 whitespace-pre-wrap', clamped)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {clampable && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link" size="sm" className="p-0 h-auto">
              View All
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Advice</DialogTitle>
            </DialogHeader>
            <div className="flex items-start gap-2">
              <ScrollArea ref={scrollRef} className="max-h-80 flex-1">
                <div
                  className="text-sm text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </ScrollArea>
              <Slider
                orientation="vertical"
                className="h-80"
                min={0}
                max={scrollMax}
                value={[scrollPos]}
                onValueChange={(val) => {
                  const container = scrollRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
                  if (container) {
                    container.scrollTop = val[0];
                  }
                  setScrollPos(val[0]);
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExpandableText;
