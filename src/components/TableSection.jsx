import React, { useState } from 'react';
import DataTable from './DataTable';

const TableSection = ({ tableConfig }) => {
  const [hiddenColumnsState, setHiddenColumnsState] = useState(() => {
    const initialState = {};
    tableConfig.tables.forEach((table, index) => {
      if (table.toggleableColumns) {
        initialState[index] = []; // Initialize all toggleable columns as visible
      }
    });
    return initialState;
  });

  const handleColumnVisibilityChange = (tableIndex, newHiddenColumns) => {
    setHiddenColumnsState(prev => ({
      ...prev,
      [tableIndex]: newHiddenColumns
    }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {tableConfig.sectionTitle || "Research Data"}
            </h2>
            {tableConfig.sectionDescription && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {tableConfig.sectionDescription}
              </p>
            )}
          </div>

          {/* Multiple Tables Support */}
          <div className="space-y-8">
            {tableConfig.tables.map((table, index) => (
              <DataTable
                key={index}
                title={table.title}
                data={table.data}
                columns={table.columns}
                searchable={table.searchable !== false}
                downloadable={table.downloadable !== false}
                pageSize={table.pageSize || 10}
                // Pass toggleable columns and current hidden state
                toggleableColumns={table.toggleableColumns || []}
                hiddenColumns={hiddenColumnsState[index] || []}
                onColumnVisibilityChange={(newHiddenColumns) => 
                  handleColumnVisibilityChange(index, newHiddenColumns)
                }
              />
            ))}
          </div>

          {/* Additional Content */}
          {tableConfig.additionalContent && (
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <div dangerouslySetInnerHTML={{ __html: tableConfig.additionalContent }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TableSection;

