import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
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

const VIEWPORT_SELECTOR = '[data-radix-scroll-area-viewport]';

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

  const clampStyle = useMemo(
    () => ({
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
    [lines],
  );

  useLayoutEffect(() => {
    if (!text) return;
    const el = textRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      setClampable(el.scrollHeight > el.clientHeight + 1);
    });
    return () => cancelAnimationFrame(id);
  }, [html, lines]);

useLayoutEffect(() => {
  if (!open) return;

  let container = null;
  let resizeObserver = null;
  let handleScroll = null;
  let rafId = null;

  const setup = () => {
    container = scrollRef.current?.querySelector(VIEWPORT_SELECTOR);
    if (!container) {
      // The viewport is not in the DOM yet – try again on the next frame.
      rafId = requestAnimationFrame(setup);
      return;
    }

    const updateScrollState = () => {
      setScrollMax(container.scrollHeight - container.clientHeight);
      setScrollPos(container.scrollTop);
    };

    // Initial measurement
    updateScrollState();

    // Keep slider in sync on resize
    resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    // Keep slider in sync while the user scrolls
    handleScroll = () => setScrollPos(container.scrollTop);
    container.addEventListener('scroll', handleScroll);
  };

  rafId = requestAnimationFrame(setup);

  return () => {
    cancelAnimationFrame(rafId);
    if (resizeObserver) resizeObserver.disconnect();
    if (container && handleScroll) container.removeEventListener('scroll', handleScroll);
  };
}, [open, html]);

  if (!text) return null;

  return (
    <div className="space-y-1 max-w-xs">
      <div
        ref={textRef}
        className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto"
        style={clampStyle}
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
              <ScrollArea ref={scrollRef} className="h-80 w-full overflow-hidden">
                <div
                  className="text-sm text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </ScrollArea>
              <Slider
                orientation="vertical"
                className="h-80"
                min={0}
                max={Math.max(scrollMax, 1)}
                step={1}
                value={[scrollPos]}
                onValueChange={(val) => {
                  if (scrollMax <= 0) return;
                  const container = scrollRef.current?.querySelector(VIEWPORT_SELECTOR);
                  if (container) {
                    container.scrollTop = val[0];
                  }
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
