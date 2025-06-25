import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Search, Download, Eye, EyeOff } from 'lucide-react';

const DataTable = ({ 
  title = "Data Table", 
  data = [], 
  columns = [], 
  searchable = true,
  downloadable = true,
  pageSize = 10,
  hiddenColumns = [],
  onColumnVisibilityChange = () => {}
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [localHiddenColumns, setLocalHiddenColumns] = useState(hiddenColumns);

  // Filter visible columns based on hidden columns
  const visibleColumns = useMemo(() => {
    return columns.filter(column => !localHiddenColumns.includes(column.key));
  }, [columns, localHiddenColumns]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(row =>
      Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDownload = () => {
    const csvContent = [
      visibleColumns.map(col => col.header).join(','),
      ...data.map(row => visibleColumns.map(col => {
        const value = row[col.key];
        // Handle complex objects by converting to string
        if (typeof value === 'object' && value !== null) {
          return JSON.stringify(value).replace(/,/g, ';');
        }
        return value || '';
      }).join(','))
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\\s+/g, '_').toLowerCase()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleColumnVisibility = (columnKey) => {
    const newHiddenColumns = localHiddenColumns.includes(columnKey)
      ? localHiddenColumns.filter(key => key !== columnKey)
      : [...localHiddenColumns, columnKey];
    
    setLocalHiddenColumns(newHiddenColumns);
    onColumnVisibilityChange(newHiddenColumns);
  };

  // Get toggleable columns (exclude the first column which should always be visible)
  // Determine which columns can be toggled. If the caller didn't
  // specify any, default to all except the first column so the
  // primary column is always visible.
  const toggleableColumnDefs = useMemo(() => {
    if (toggleableColumns && toggleableColumns.length > 0) {
      return columns.filter((col) => toggleableColumns.includes(col.key));
    }
    return columns.slice(1);
  }, [columns, toggleableColumns]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          )}
          
          {downloadable && (
            <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Download CSV
            </Button>
          )}
        </div>
      </div>

      {/* Column Visibility Controls */}
      {toggleableColumnDefs.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Show/Hide Columns:</h4>
          <div className="flex flex-wrap gap-2">
            {toggleableColumnDefs.map((column) => (
              <Button
                key={column.key}
                variant={localHiddenColumns.includes(column.key) ? "outline" : "default"}
                size="sm"
                onClick={() => toggleColumnVisibility(column.key)}
                className="flex items-center gap-2"
              >
                {localHiddenColumns.includes(column.key) ? (
                  <EyeOff size={14} />
                ) : (
                  <Eye size={14} />
                )}
                {column.header}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead 
                  key={column.key}
                  className={`${column.sortable !== false ? 'cursor-pointer hover:bg-gray-50' : ''} font-semibold`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {sortConfig.key === column.key && (
                      <span className="text-blue-600">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key} className="py-3">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="text-center py-8 text-gray-500">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

