import React, { useContext } from 'react';
import { Badge } from '@/components/ui/badge';
import { RowHighlightContext } from './DataTable';

const colorMap = {
  sub: 'bg-yellow-100 text-yellow-800',
  del: 'bg-red-100 text-red-800',
  ins: 'bg-green-100 text-green-800',
};

const ErrorStatsBadges = ({ stats = {} }) => {
  const { setHighlight } = useContext(RowHighlightContext);
  const items = [
    { key: 'sub', label: 'Substitutions', value: stats.substitutions },
    { key: 'del', label: 'Deletions', value: stats.deletions },
    { key: 'ins', label: 'Insertions', value: stats.insertions },
  ];

  return (
    <div className="flex flex-col space-y-1">
      {items.map(item => (
        <Badge
          key={item.key}
          className={`${colorMap[item.key]} cursor-pointer px-2 rounded-full w-fit`}
          onMouseEnter={() => setHighlight(item.key)}
          onMouseLeave={() => setHighlight(null)}
        >
          {item.label}: {item.value}
        </Badge>
      ))}
    </div>
  );
};

export default ErrorStatsBadges;
