import React from "react";

interface InventoryFiltersProps {
  onSearch?: (query: string) => void;
}

/**
 * InventoryFilters - search and filter bar for inventory.
 */
export function InventoryFilters({ onSearch }: InventoryFiltersProps) {
  // TODO: Implement real search/filter state
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full sm:w-64 px-3 py-2 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      {/* TODO: Add more filters (vendor, quantity, etc) */}
    </div>
  );
}
