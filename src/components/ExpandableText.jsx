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
import { cn } from '@/lib/utils';
import { marked } from 'marked';

const ExpandableText = ({ text, lines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);
  const [open, setOpen] = useState(false);
  const textRef = useRef(null);
  useEffect(() => {
    if (!text) return;
    const el = textRef.current;
    if (!el) return;
    if (!expanded) {
      setClampable(el.scrollHeight > el.clientHeight + 1);
    }
  }, [text, lines, expanded]);

  if (!text) return null;

  const toggle = () => setExpanded((prev) => !prev);
  const clamped = expanded ? '' : `line-clamp-${lines}`;

  const html = useMemo(() => (text ? marked.parse(text) : ''), [text]);
  if (!text) return null;

  return (
    <div className="space-y-1 max-w-xs">
      <div
        ref={textRef}
        className={cn('text-sm text-gray-700 whitespace-pre-wrap', clamped)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {clampable && (
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
              <ScrollArea className="max-h-80">
                <div
                  className="text-sm text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
