// Initial Mock Data for Restaurant Inventory & Operations
// Preserving all terminology, metrics, items, and branch info

export const INITIAL_BRANCH = "Main Branch";

export const STORAGE_LOCATIONS = [
  "Main Store",
  "Walk-in Cooler",
  "Dry Store",
  "Kitchen Prep"
];

export const CURRENT_USER = {
  name: "Ahmed Raza",
  role: "Operations Lead",
  initials: "AR",
  email: "ahmed.raza@restaurant.internal",
  phone: "+92 300 5551234"
};

export const INITIAL_INGREDIENTS = [
  {
    id: "ing-1",
    name: "Chicken Breast",
    sku: "SKU-9021",
    category: "Proteins",
    currentStock: 8,
    minStock: 20,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 920,
    location: "Walk-in Cooler",
    supplier: "Fresh Foods Supplier",
    shelfLifeDays: 5,
    packageUnit: "Bag",
    packageSize: 10,
    status: "Critical"
  },
  {
    id: "ing-2",
    name: "Mozzarella Cheese",
    sku: "SKU-4012",
    category: "Dairy",
    currentStock: 18,
    minStock: 15,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 1250,
    location: "Walk-in Cooler",
    supplier: "Dairy King Ltd",
    shelfLifeDays: 14,
    packageUnit: "Block",
    packageSize: 5,
    status: "Healthy"
  },
  {
    id: "ing-3",
    name: "Cooking Oil",
    sku: "SKU-1084",
    category: "Dry Goods",
    currentStock: 6,
    minStock: 15,
    stockUnit: "L",
    recipeUnit: "ml",
    conversionRate: 1000,
    unitCost: 410,
    location: "Dry Store",
    supplier: "Metro Wholesale",
    shelfLifeDays: 90,
    packageUnit: "Tin",
    packageSize: 16,
    status: "Low Stock"
  },
  {
    id: "ing-4",
    name: "Rice (Basmati)",
    sku: "SKU-2091",
    category: "Dry Goods",
    currentStock: 42,
    minStock: 30,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 230,
    location: "Main Store",
    supplier: "Metro Wholesale",
    shelfLifeDays: 180,
    packageUnit: "Sack",
    packageSize: 25,
    status: "Healthy"
  },
  {
    id: "ing-5",
    name: "Tomatoes",
    sku: "SKU-5501",
    category: "Produce",
    currentStock: 12,
    minStock: 15,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 140,
    location: "Walk-in Cooler",
    supplier: "Local Food Supplier",
    shelfLifeDays: 7,
    packageUnit: "Crate",
    packageSize: 15,
    status: "Low Stock"
  },
  {
    id: "ing-6",
    name: "Heavy Cream",
    sku: "SKU-4089",
    category: "Dairy",
    currentStock: 14,
    minStock: 10,
    stockUnit: "L",
    recipeUnit: "ml",
    conversionRate: 1000,
    unitCost: 580,
    location: "Walk-in Cooler",
    supplier: "Dairy King Ltd",
    shelfLifeDays: 10,
    packageUnit: "Pack",
    packageSize: 1,
    status: "Healthy"
  },
  {
    id: "ing-7",
    name: "Potatoes",
    sku: "SKU-3320",
    category: "Produce",
    currentStock: 35,
    minStock: 25,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 90,
    location: "Dry Store",
    supplier: "Local Food Supplier",
    shelfLifeDays: 20,
    packageUnit: "Sack",
    packageSize: 20,
    status: "Healthy"
  },
  {
    id: "ing-8",
    name: "Onions",
    sku: "SKU-3325",
    category: "Produce",
    currentStock: 28,
    minStock: 20,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 110,
    location: "Dry Store",
    supplier: "Local Food Supplier",
    shelfLifeDays: 30,
    packageUnit: "Sack",
    packageSize: 10,
    status: "Healthy"
  },
  {
    id: "ing-9",
    name: "Garlic",
    sku: "SKU-3330",
    category: "Produce",
    currentStock: 4,
    minStock: 5,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 350,
    location: "Dry Store",
    supplier: "Local Food Supplier",
    shelfLifeDays: 45,
    packageUnit: "Net Bag",
    packageSize: 5,
    status: "Low Stock"
  },
  {
    id: "ing-10",
    name: "Beef Mince",
    sku: "SKU-9025",
    category: "Proteins",
    currentStock: 15,
    minStock: 12,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 1450,
    location: "Walk-in Cooler",
    supplier: "Fresh Foods Supplier",
    shelfLifeDays: 4,
    packageUnit: "Pack",
    packageSize: 5,
    status: "Healthy"
  },
  {
    id: "ing-11",
    name: "Burger Buns",
    sku: "SKU-7710",
    category: "Packaging",
    currentStock: 120,
    minStock: 50,
    stockUnit: "pcs",
    recipeUnit: "pcs",
    conversionRate: 1,
    unitCost: 45,
    location: "Dry Store",
    supplier: "Metro Wholesale",
    shelfLifeDays: 4,
    packageUnit: "Tray",
    packageSize: 12,
    status: "Healthy"
  },
  {
    id: "ing-12",
    name: "Takeaway Boxes",
    sku: "SKU-8801",
    category: "Packaging",
    currentStock: 240,
    minStock: 100,
    stockUnit: "pcs",
    recipeUnit: "pcs",
    conversionRate: 1,
    unitCost: 22,
    location: "Main Store",
    supplier: "Metro Wholesale",
    shelfLifeDays: 365,
    packageUnit: "Carton",
    packageSize: 100,
    status: "Healthy"
  },
  {
    id: "ing-13",
    name: "Black Pepper",
    sku: "SKU-1090",
    category: "Dry Goods",
    currentStock: 0,
    minStock: 2,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 950,
    location: "Dry Store",
    supplier: "Metro Wholesale",
    shelfLifeDays: 365,
    packageUnit: "Pouch",
    packageSize: 1,
    status: "Out of Stock"
  },
  {
    id: "ing-14",
    name: "Fresh Basil",
    sku: "SKU-5520",
    category: "Produce",
    currentStock: 0,
    minStock: 1,
    stockUnit: "kg",
    recipeUnit: "g",
    conversionRate: 1000,
    unitCost: 450,
    location: "Walk-in Cooler",
    supplier: "Local Food Supplier",
    shelfLifeDays: 3,
    packageUnit: "Bunch",
    packageSize: 0.5,
    status: "Out of Stock"
  }
];

export const INITIAL_BALANCES = [
  // ing-1: Chicken Breast (Total 8 kg in Walk-in Cooler)
  { ingredientId: "ing-1", location: "Walk-in Cooler", quantity: 8 },
  { ingredientId: "ing-1", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-1", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-1", location: "Kitchen Prep", quantity: 0 },

  // ing-2: Mozzarella Cheese (Total 18 kg in Walk-in Cooler)
  { ingredientId: "ing-2", location: "Walk-in Cooler", quantity: 18 },
  { ingredientId: "ing-2", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-2", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-2", location: "Kitchen Prep", quantity: 0 },

  // ing-3: Cooking Oil (Total 6 L in Dry Store)
  { ingredientId: "ing-3", location: "Dry Store", quantity: 6 },
  { ingredientId: "ing-3", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-3", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-3", location: "Kitchen Prep", quantity: 0 },

  // ing-4: Rice (Basmati) (Total 42 kg in Main Store)
  { ingredientId: "ing-4", location: "Main Store", quantity: 42 },
  { ingredientId: "ing-4", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-4", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-4", location: "Kitchen Prep", quantity: 0 },

  // ing-5: Tomatoes (Total 12 kg in Walk-in Cooler)
  { ingredientId: "ing-5", location: "Walk-in Cooler", quantity: 12 },
  { ingredientId: "ing-5", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-5", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-5", location: "Kitchen Prep", quantity: 0 },

  // ing-6: Heavy Cream (Total 14 L in Walk-in Cooler)
  { ingredientId: "ing-6", location: "Walk-in Cooler", quantity: 14 },
  { ingredientId: "ing-6", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-6", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-6", location: "Kitchen Prep", quantity: 0 },

  // ing-7: Potatoes (Total 35 kg in Dry Store)
  { ingredientId: "ing-7", location: "Dry Store", quantity: 35 },
  { ingredientId: "ing-7", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-7", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-7", location: "Kitchen Prep", quantity: 0 },

  // ing-8: Onions (Total 28 kg in Dry Store)
  { ingredientId: "ing-8", location: "Dry Store", quantity: 28 },
  { ingredientId: "ing-8", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-8", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-8", location: "Kitchen Prep", quantity: 0 },

  // ing-9: Garlic (Total 4 kg in Dry Store)
  { ingredientId: "ing-9", location: "Dry Store", quantity: 4 },
  { ingredientId: "ing-9", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-9", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-9", location: "Kitchen Prep", quantity: 0 },

  // ing-10: Beef Mince (Total 15 kg in Walk-in Cooler)
  { ingredientId: "ing-10", location: "Walk-in Cooler", quantity: 15 },
  { ingredientId: "ing-10", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-10", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-10", location: "Kitchen Prep", quantity: 0 },

  // ing-11: Burger Buns (Total 120 pcs in Dry Store)
  { ingredientId: "ing-11", location: "Dry Store", quantity: 120 },
  { ingredientId: "ing-11", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-11", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-11", location: "Kitchen Prep", quantity: 0 },

  // ing-12: Takeaway Boxes (Total 240 pcs in Main Store)
  { ingredientId: "ing-12", location: "Main Store", quantity: 240 },
  { ingredientId: "ing-12", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-12", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-12", location: "Kitchen Prep", quantity: 0 },

  // ing-13: Black Pepper (Total 0 kg in Dry Store)
  { ingredientId: "ing-13", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-13", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-13", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-13", location: "Kitchen Prep", quantity: 0 },

  // ing-14: Fresh Basil (Total 0 kg in Walk-in Cooler)
  { ingredientId: "ing-14", location: "Walk-in Cooler", quantity: 0 },
  { ingredientId: "ing-14", location: "Main Store", quantity: 0 },
  { ingredientId: "ing-14", location: "Dry Store", quantity: 0 },
  { ingredientId: "ing-14", location: "Kitchen Prep", quantity: 0 }
];

export const INITIAL_MOVEMENTS = [
  {
    id: "mov-1",
    type: "STOCK_IN",
    ingredientId: "ing-1",
    location: "Walk-in Cooler",
    quantity: 8,
    date: "2026-09-24T08:00:00Z",
    reference: "PO-8820",
    notes: "Initial inventory setup"
  },
  {
    id: "mov-2",
    type: "STOCK_IN",
    ingredientId: "ing-2",
    location: "Walk-in Cooler",
    quantity: 18,
    date: "2026-09-24T08:00:00Z",
    reference: "PO-8820",
    notes: "Initial inventory setup"
  }
];

export const INITIAL_STOCK_COUNTS = [
  {
    id: "CNT-1047",
    date: "2026-09-23 15:30",
    displayDate: "23 Sep 2026, 3:30 PM",
    location: "Walk-in Cooler",
    scope: "12 ingredients",
    countedItemsCount: 5,
    totalItemsCount: 12,
    progress: 42,
    differencesCount: 2,
    status: "In Progress",
    countedBy: "Ahmed Raza",
    items: [
      { id: "ing-1", name: "Chicken Breast", systemStock: 20, countedStock: 16, unit: "kg", unitCost: 920, diff: -4, status: "Variance" },
      { id: "ing-2", name: "Mozzarella Cheese", systemStock: 18, countedStock: 18, unit: "kg", unitCost: 1250, diff: 0, status: "Match" },
      { id: "ing-5", name: "Tomatoes", systemStock: 15, countedStock: 12, unit: "kg", unitCost: 140, diff: -3, status: "Variance" },
      { id: "ing-6", name: "Heavy Cream", systemStock: 14, countedStock: 14, unit: "L", unitCost: 580, diff: 0, status: "Match" },
      { id: "ing-10", name: "Beef Mince", systemStock: 15, countedStock: 15, unit: "kg", unitCost: 1450, diff: 0, status: "Match" },
      { id: "ing-14", name: "Fresh Basil", systemStock: 1, countedStock: null, unit: "kg", unitCost: 450, diff: null, status: "Uncounted" },
      { id: "ing-3", name: "Butter Blocks", systemStock: 10, countedStock: null, unit: "kg", unitCost: 800, diff: null, status: "Uncounted" },
      { id: "ing-4", name: "Cheddar Cheese", systemStock: 8, countedStock: null, unit: "kg", unitCost: 1100, diff: null, status: "Uncounted" },
      { id: "ing-7", name: "Yogurt", systemStock: 12, countedStock: null, unit: "kg", unitCost: 220, diff: null, status: "Uncounted" },
      { id: "ing-8", name: "Mushrooms", systemStock: 6, countedStock: null, unit: "kg", unitCost: 650, diff: null, status: "Uncounted" },
      { id: "ing-9", name: "Bell Peppers", systemStock: 9, countedStock: null, unit: "kg", unitCost: 180, diff: null, status: "Uncounted" },
      { id: "ing-11", name: "Marinated Patties", systemStock: 25, countedStock: null, unit: "pcs", unitCost: 280, diff: null, status: "Uncounted" }
    ]
  },
  {
    id: "CNT-1046",
    date: "2026-09-21 10:00",
    displayDate: "21 Sep 2026, 10:00 AM",
    location: "Dry Store",
    scope: "18 ingredients",
    countedItemsCount: 18,
    totalItemsCount: 18,
    progress: 100,
    differencesCount: 0,
    status: "Completed",
    countedBy: "Ahmed Raza"
  },
  {
    id: "CNT-1045",
    date: "2026-09-18 14:15",
    displayDate: "18 Sep 2026, 2:15 PM",
    location: "Main Store",
    scope: "32 ingredients",
    countedItemsCount: 32,
    totalItemsCount: 32,
    progress: 100,
    differencesCount: 3,
    status: "Completed",
    countedBy: "Ahmed Raza"
  },
  {
    id: "CNT-1044",
    date: "2026-09-14 16:45",
    displayDate: "14 Sep 2026, 4:45 PM",
    location: "Kitchen Prep",
    scope: "15 ingredients",
    countedItemsCount: 15,
    totalItemsCount: 15,
    progress: 100,
    differencesCount: 1,
    status: "Completed",
    countedBy: "Ahmed Raza"
  }
];

export const INITIAL_WASTAGE = [
  {
    id: "WST-2041",
    ingredientName: "Cooking Oil",
    ingredientId: "ing-3",
    quantity: 2,
    unit: "L",
    reason: "Deep frying burn / overheated",
    category: "Dry Goods",
    cost: 820,
    location: "Kitchen Prep",
    recordedBy: "Ahmed Raza",
    date: "2026-09-24 11:30",
    displayDate: "Today, 11:30 AM",
    notes: "Oil temperature sensor malfunctioned causing scorch."
  },
  {
    id: "WST-2040",
    ingredientName: "Chicken Breast",
    ingredientId: "ing-1",
    quantity: 2.5,
    unit: "kg",
    reason: "Expired prep batch",
    category: "Proteins",
    cost: 2300,
    location: "Walk-in Cooler",
    recordedBy: "Ahmed Raza",
    date: "2026-09-24 09:15",
    displayDate: "Today, 09:15 AM",
    notes: "Batch reached 5-day shelf life past marination."
  },
  {
    id: "WST-2039",
    ingredientName: "Tomatoes",
    ingredientId: "ing-5",
    quantity: 4,
    unit: "kg",
    reason: "Spoiled in crate on delivery",
    category: "Produce",
    cost: 560,
    location: "Walk-in Cooler",
    recordedBy: "Ahmed Raza",
    date: "2026-09-23 17:00",
    displayDate: "Yesterday, 5:00 PM",
    notes: "Overripe tomatoes crushed at bottom of bottom crate."
  },
  {
    id: "WST-2038",
    ingredientName: "Heavy Cream",
    ingredientId: "ing-6",
    quantity: 3,
    unit: "L",
    reason: "Curdled / temperature fault",
    category: "Dairy",
    cost: 1740,
    location: "Walk-in Cooler",
    recordedBy: "Ahmed Raza",
    date: "2026-09-22 14:20",
    displayDate: "22 Sep 2026",
    notes: "Carton left unsealed overnight in prep line chiller."
  }
];

export const INITIAL_TRANSFERS = [
  {
    id: "TRF-5011",
    fromLocation: "Main Store",
    toLocation: "Walk-in Cooler",
    itemCount: 4,
    status: "In Transit",
    requestedBy: "Ahmed Raza",
    date: "2026-09-24",
    displayDate: "24 Sep 2026",
    items: [
      { name: "Chicken Breast", qty: "20 kg" },
      { name: "Heavy Cream", qty: "10 L" },
      { name: "Mozzarella Cheese", qty: "15 kg" },
      { name: "Beef Mince", qty: "10 kg" }
    ]
  },
  {
    id: "TRF-5010",
    fromLocation: "Dry Store",
    toLocation: "Kitchen Prep",
    itemCount: 2,
    status: "Completed",
    requestedBy: "Ahmed Raza",
    date: "2026-09-23",
    displayDate: "23 Sep 2026",
    items: [
      { name: "Cooking Oil", qty: "16 L" },
      { name: "Rice (Basmati)", qty: "25 kg" }
    ]
  },
  {
    id: "TRF-5009",
    fromLocation: "Main Store",
    toLocation: "Dry Store",
    itemCount: 1,
    status: "Completed",
    requestedBy: "Ahmed Raza",
    date: "2026-09-22",
    displayDate: "22 Sep 2026",
    items: [
      { name: "Takeaway Boxes", qty: "100 pcs" }
    ]
  }
];

export const INITIAL_PURCHASES = [
  {
    id: "PO-8821",
    supplier: "Fresh Foods Supplier",
    totalAmount: 84500,
    itemCount: 6,
    status: "Awaiting Receiving",
    orderDate: "2026-09-24",
    displayDate: "24 Sep 2026",
    expectedDelivery: "24 Sep 2026, 4:00 PM",
    createdBy: "Ahmed Raza",
    items: [
      { ingredient: "Chicken Breast", quantity: 50, unit: "kg", unitCost: 920, total: 46000 },
      { ingredient: "Beef Mince", quantity: 25, unit: "kg", unitCost: 1450, total: 36250 },
      { ingredient: "Chicken Wings", quantity: 15, unit: "kg", unitCost: 150, total: 2250 }
    ]
  },
  {
    id: "PO-8820",
    supplier: "Metro Wholesale",
    totalAmount: 122400,
    itemCount: 12,
    status: "Received",
    orderDate: "2026-09-21",
    displayDate: "21 Sep 2026",
    expectedDelivery: "21 Sep 2026",
    createdBy: "Ahmed Raza",
    items: [
      { ingredient: "Cooking Oil", quantity: 80, unit: "L", unitCost: 410, total: 32800 },
      { ingredient: "Rice (Basmati)", quantity: 200, unit: "kg", unitCost: 230, total: 46000 },
      { ingredient: "Takeaway Boxes", quantity: 2000, unit: "pcs", unitCost: 21.8, total: 43600 }
    ]
  },
  {
    id: "PO-8819",
    supplier: "Local Food Supplier",
    totalAmount: 34200,
    itemCount: 4,
    status: "Received",
    orderDate: "2026-09-18",
    displayDate: "18 Sep 2026",
    expectedDelivery: "18 Sep 2026",
    createdBy: "Ahmed Raza",
    items: [
      { ingredient: "Tomatoes", quantity: 100, unit: "kg", unitCost: 140, total: 14000 },
      { ingredient: "Potatoes", quantity: 120, unit: "kg", unitCost: 90, total: 10800 },
      { ingredient: "Onions", quantity: 80, unit: "kg", unitCost: 110, total: 8800 },
      { ingredient: "Garlic", quantity: 2, unit: "kg", unitCost: 300, total: 600 }
    ]
  }
];

export const INITIAL_SUPPLIERS = [
  {
    id: "sup-1",
    name: "Fresh Foods Supplier",
    category: "Proteins & Meats",
    contactPerson: "Tariq Mehmood",
    phone: "+92 300 1234567",
    email: "orders@freshfoods.pk",
    address: "Plot 42, Wholesale Meat Market, Lahore",
    leadTimeDays: 1,
    paymentTerms: "Net 15 Days",
    rating: 4.8,
    activeItemCount: 12,
    status: "Active"
  },
  {
    id: "sup-2",
    name: "Metro Wholesale",
    category: "Dry Goods & Packaging",
    contactPerson: "Sarah Khan",
    phone: "+92 321 9876543",
    email: "supply@metrowholesale.pk",
    address: "Thokar Niaz Baig, Commercial Area, Lahore",
    leadTimeDays: 2,
    paymentTerms: "Net 30 Days",
    rating: 4.6,
    activeItemCount: 45,
    status: "Active"
  },
  {
    id: "sup-3",
    name: "Local Food Supplier",
    category: "Fresh Produce & Vegetables",
    contactPerson: "Bilal Farooq",
    phone: "+92 333 4567890",
    email: "bilal@localproduce.pk",
    address: "Sabzi Mandi Sector B, Lahore",
    leadTimeDays: 1,
    paymentTerms: "Weekly Cash",
    rating: 4.5,
    activeItemCount: 18,
    status: "Active"
  },
  {
    id: "sup-4",
    name: "Dairy King Ltd",
    category: "Dairy & Cheese",
    contactPerson: "Kamran Ali",
    phone: "+92 345 6789012",
    email: "sales@dairyking.pk",
    address: "Industrial Estate Kot Lakhpat, Lahore",
    leadTimeDays: 1,
    paymentTerms: "Net 15 Days",
    rating: 4.9,
    activeItemCount: 8,
    status: "Active"
  }
];

export const INITIAL_RECIPES = [
  {
    id: "RCP-1026",
    name: "Chicken Zinger Burger",
    category: "Burgers",
    prepTime: "15 min",
    cost: 420,
    price: 950,
    margin: 55.8,
    status: "Active",
    ingredients: [
      { ingredientId: "ing-1", name: "Chicken Breast", quantity: "150 g", cost: 138 },
      { ingredientId: "ing-11", name: "Burger Buns", quantity: "1 pcs", cost: 45 },
      { ingredientId: "ing-2", name: "Mozzarella Cheese", quantity: "40 g", cost: 50 },
      { ingredientId: "ing-3", name: "Cooking Oil", quantity: "20 ml", cost: 8 },
      { ingredientId: "ing-5", name: "Tomatoes", quantity: "50 g", cost: 7 },
      { ingredientId: "ing-12", name: "Takeaway Boxes", quantity: "1 pcs", cost: 22 }
    ]
  },
  {
    id: "rcp-1",
    name: "Grilled Chicken Burger",
    category: "Burgers",
    prepTime: "15 min",
    cost: 420,
    price: 950,
    margin: 55.8,
    status: "Active",
    ingredients: [
      { ingredientId: "ing-1", name: "Chicken Breast", quantity: "200 g", cost: 184 },
      { ingredientId: "ing-11", name: "Burger Buns", quantity: "1 pcs", cost: 45 },
      { ingredientId: "ing-2", name: "Mozzarella Cheese", quantity: "40 g", cost: 50 },
      { ingredientId: "ing-3", name: "Cooking Oil", quantity: "20 ml", cost: 8 },
      { ingredientId: "ing-5", name: "Tomatoes", quantity: "50 g", cost: 7 },
      { ingredientId: "ing-12", name: "Packaging Box", quantity: "1 pcs", cost: 22 }
    ]
  },
  {
    id: "rcp-2",
    name: "Margherita Pizza",
    category: "Pizza",
    prepTime: "20 min",
    cost: 380,
    price: 890,
    margin: 57.3,
    status: "Active",
    ingredients: [
      { name: "Pizza Dough Batch", quantity: "250 g", cost: 65 },
      { name: "Mozzarella Cheese", quantity: "180 g", cost: 225 },
      { name: "Tomatoes (Sauce)", quantity: "120 g", cost: 17 },
      { name: "Cooking Oil", quantity: "15 ml", cost: 6 },
      { name: "Fresh Basil", quantity: "10 g", cost: 5 },
      { name: "Packaging Box", quantity: "1 pcs", cost: 25 }
    ]
  },
  {
    id: "rcp-3",
    name: "Crispy Fries (Large)",
    category: "Sides",
    prepTime: "8 min",
    cost: 95,
    price: 280,
    margin: 66.1,
    status: "Active",
    ingredients: [
      { name: "Potatoes", quantity: "350 g", cost: 32 },
      { name: "Cooking Oil", quantity: "80 ml", cost: 33 },
      { name: "Packaging Box", quantity: "1 pcs", cost: 15 }
    ]
  },
  {
    id: "rcp-4",
    name: "Creamy Fettuccine Alfredo",
    category: "Pasta",
    prepTime: "18 min",
    cost: 480,
    price: 1150,
    margin: 58.3,
    status: "Active",
    ingredients: [
      { name: "Chicken Breast", quantity: "150 g", cost: 138 },
      { name: "Heavy Cream", quantity: "120 ml", cost: 70 },
      { name: "Mozzarella Cheese", quantity: "50 g", cost: 62 },
      { name: "Garlic", quantity: "15 g", cost: 5 },
      { name: "Pasta (Fettuccine)", quantity: "180 g", cost: 85 }
    ]
  }
];

export const INITIAL_PRODUCTIONS = [
  {
    id: "PB-1025",
    recipeName: "Chicken Zinger Burger",
    recipeId: "RCP-1026",
    plannedQuantity: 100,
    actualOutput: 95,
    productionWastage: 5,
    batchSize: "100 pcs",
    yieldPortions: "95 pcs",
    location: "Kitchen Prep",
    producedBy: "Ahmed Raza",
    date: "2026-09-24",
    displayDate: "Today, 11:00 AM",
    status: "Completed",
    notes: "Signature crispy chicken fillets with house spicy glaze."
  },
  {
    id: "PRD-301",
    recipeName: "Pizza Dough Batch",
    batchSize: "20 kg",
    yieldPortions: "40 portions",
    location: "Kitchen Prep",
    producedBy: "Ahmed Raza",
    date: "2026-09-24",
    displayDate: "Today, 8:00 AM",
    status: "Completed",
    notes: "High gluten flour used. Proofed for 12 hours."
  },
  {
    id: "PRD-302",
    recipeName: "Secret Burger Sauce",
    batchSize: "10 L",
    yieldPortions: "50 bottles",
    location: "Kitchen Prep",
    producedBy: "Ahmed Raza",
    date: "2026-09-24",
    displayDate: "Today, 10:30 AM",
    status: "In Progress",
    notes: "Currently blending mayo, mustard, relish and spices."
  },
  {
    id: "PRD-303",
    recipeName: "Marinated Chicken Breast",
    batchSize: "25 kg",
    yieldPortions: "100 fillets",
    location: "Walk-in Cooler",
    producedBy: "Ahmed Raza",
    date: "2026-09-23",
    displayDate: "Yesterday, 2:00 PM",
    status: "Completed",
    notes: "Stored in food-grade tubs with batch expiry date labels."
  }
];

export const INITIAL_STAFF = [
  {
    id: "stf-1",
    name: "Ahmed Raza",
    role: "Operations Lead",
    department: "Operations & Management",
    email: "ahmed.raza@restaurant.internal",
    phone: "+92 300 5551234",
    status: "Active",
    initials: "AR",
    joinedDate: "15 Jan 2024",
    accessLevel: "Manager"
  },
  {
    id: "stf-2",
    name: "Tariq Jameel",
    role: "Head Chef",
    department: "Kitchen",
    email: "tariq.chef@restaurant.internal",
    phone: "+92 321 4445566",
    status: "Active",
    initials: "TJ",
    joinedDate: "01 Mar 2024",
    accessLevel: "Kitchen Lead"
  },
  {
    id: "stf-3",
    name: "Zainab Noor",
    role: "Inventory Supervisor",
    department: "Receiving & Inventory",
    email: "zainab.noor@restaurant.internal",
    phone: "+92 333 8889900",
    status: "Active",
    initials: "ZN",
    joinedDate: "10 Jun 2024",
    accessLevel: "Supervisor"
  },
  {
    id: "stf-4",
    name: "Hamza Malik",
    role: "Line Cook",
    department: "Kitchen Prep",
    email: "hamza.cook@restaurant.internal",
    phone: "+92 345 1112233",
    status: "Active",
    initials: "HM",
    joinedDate: "20 Aug 2024",
    accessLevel: "Staff"
  },
  {
    id: "stf-5",
    name: "Bilal Siddiqui",
    role: "Storekeeper",
    department: "Main Store & Warehousing",
    email: "bilal.store@restaurant.internal",
    phone: "+92 312 3337788",
    status: "Active",
    initials: "BS",
    joinedDate: "05 Nov 2024",
    accessLevel: "Staff"
  }
];

export const INITIAL_SETTINGS = {
  restaurantName: "Inventory & Operations",
  branchName: "Main Branch",
  currency: "PKR",
  timezone: "Asia/Karachi (PKT, UTC+5)",
  lowStockAlertThreshold: 20,
  emailNotifications: true,
  autoReorderSuggestions: false,
  dateFormat: "DD MMM YYYY",
  defaultLanguage: "English (US)"
};
