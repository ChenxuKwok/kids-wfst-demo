import React, { useState, useRef, useEffect, useMemo } from 'react';
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

const ExpandableText = ({ text, lines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const textRef = useRef(null);
  const scrollRef = useRef(null);
  const html = useMemo(() => (text ? marked.parse(text) : ''), [text]);

  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    if (!container) return;
    const update = () => {
      setScrollMax(container.scrollHeight - container.clientHeight);
      setScrollPos(container.scrollTop);
    };
    update();
    const handleScroll = () => setScrollPos(container.scrollTop);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [open, html]);

  if (!text) return null;

  const toggle = () => setExpanded((prev) => !prev);
  const clamped = expanded ? '' : `line-clamp-${lines}`;

  // const html = useMemo(() => (text ? marked.parse(text) : ''), [text]);

  return (
    <div className="space-y-1 max-w-xs">
      <div
        ref={textRef}
        className={cn('text-sm text-gray-700 whitespace-pre-wrap', clamped)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="flex gap-2">
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto"
          onClick={toggle}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
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
      </div>
    </div>
  );
};

export default ExpandableText;
