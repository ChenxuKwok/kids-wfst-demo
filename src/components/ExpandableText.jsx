import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ExpandableText = ({ text, lines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const toggle = () => setExpanded((prev) => !prev);
  const clamped = expanded ? '' : `line-clamp-${lines}`;

  return (
    <div className="space-y-1 max-w-xs">
      <p className={cn('text-sm text-gray-700 whitespace-pre-wrap', clamped)}>
        {text}
      </p>
      {text.length > 0 && (
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto"
          onClick={toggle}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
};

export default ExpandableText;
