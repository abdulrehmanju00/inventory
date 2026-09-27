export const ROUTES = {
  dashboard: '01_dashboard',
  inventory: '02_inventory',
  'add-ingredient': '03_add_ingredient',
  'ingredient-detail': '04_ingredient_detail',
  'add-stock': '05_add_stock',
  'stock-counts': '06_stock_counts_overview',
  'new-stock-count': '07_start_new_stock_count',
  'stock-count-detail': '08_stock_count_detail',
  'stock-count-review': '09_review_finalize_stock_count',
  wastage: '10_wastage_overview',
  'new-wastage': '11_record_wastage',
  'wastage-detail': '12_wastage_detail',
  transfers: '13_transfers_overview',
  'new-transfer': '14_new_transfer',
  'transfer-detail': '15_transfer_detail',
  purchases: '16_purchases_overview',
  'new-purchase': '17_create_purchase',
  'purchase-detail': '18_purchase_detail',
  suppliers: '19_suppliers_overview',
  'add-supplier': '20_add_supplier',
  'supplier-detail': '21_supplier_detail',
  recipes: '22_recipes_overview',
  'add-recipe': '23_add_recipe',
  'recipe-detail': '24_recipe_detail',
  production: '25_production_overview',
  'record-production': '26_record_production',
  reports: '27_reports',
  staff: '28_staff',
  settings: '29_settings'
};

export const DEFAULT_ROUTE = 'dashboard';

export function normalizeRoute(hash) {
  const route = String(hash || '').replace(/^#\/?/, '').split('?')[0].trim();
  return ROUTES[route] ? route : DEFAULT_ROUTE;
}
