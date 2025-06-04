import React from "react";

/**
 * InventoryEmptyState - shown when there are no inventory items.
 */
export function InventoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-2">📦</div>
      <h2 className="text-xl font-bold mb-2">No products found</h2>
      <p className="text-muted-foreground mb-4">Get started by adding your first product.</p>
      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">Add Product</button>
    </div>
  );
}
