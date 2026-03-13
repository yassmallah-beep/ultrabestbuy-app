const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── MOCK DATA ──────────────────────────────────────────────────────────────────
const CJ_PRODUCTS = [
  { id:'cj1', emoji:'🔊', title:'Mini Portable Bluetooth Speaker Waterproof IPX5', cost:4.20, ship:6, rating:4.7, orders:18400, cat:'Electronics', usWarehouse:true, tag:'hot', sku:'CJ-BT-001' },
  { id:'cj2', emoji:'💡', title:'Smart LED Strip Lights RGB 5M App Control', cost:3.80, ship:5, rating:4.6, orders:22100, cat:'Smart Home', usWarehouse:true, tag:'trending', sku:'CJ-LED-002' },
  { id:'cj3', emoji:'🎧', title:'TWS Wireless Earbuds Noise Cancelling BT 5.3', cost:6.90, ship:7, rating:4.5, orders:31200, cat:'Electronics', usWarehouse:true, tag:'hot', sku:'CJ-EAR-003' },
  { id:'cj4', emoji:'🌀', title:'Portable Neck Fan USB Rechargeable 3 Speeds', cost:5.10, ship:6, rating:4.4, orders:9800, cat:'Outdoor', usWarehouse:true, tag:'new', sku:'CJ-FAN-004' },
  { id:'cj5', emoji:'🔪', title:'Electric Mini Food Chopper Vegetable Slicer', cost:7.30, ship:7, rating:4.7, orders:6400, cat:'Kitchen', usWarehouse:true, tag:'', sku:'CJ-KIT-005' },
  { id:'cj6', emoji:'🚗', title:'Magnetic Phone Car Mount Dashboard 360°', cost:1.80, ship:5, rating:4.8, orders:51000, cat:'Car', usWarehouse:true, tag:'hot', sku:'CJ-CAR-006' },
  { id:'cj7', emoji:'⚖️', title:'Digital Kitchen Scale Rechargeable 5kg Precision', cost:4.90, ship:6, rating:4.7, orders:7600, cat:'Kitchen', usWarehouse:true, tag:'', sku:'CJ-KIT-007' },
  { id:'cj8', emoji:'🏋️', title:'Resistance Bands Set 5 Levels Home Gym', cost:2.40, ship:5, rating:4.7, orders:24600, cat:'Fitness', usWarehouse:true, tag:'hot', sku:'CJ-FIT-008' },
  { id:'cj9', emoji:'🔦', title:'LED Tactical Flashlight 1000 Lumen Zoomable', cost:3.10, ship:5, rating:4.6, orders:16800, cat:'Outdoor', usWarehouse:true, tag:'', sku:'CJ-OUT-009' },
  { id:'cj10', emoji:'💻', title:'Adjustable Laptop Stand Foldable Aluminum', cost:6.80, ship:6, rating:4.5, orders:18700, cat:'Electronics', usWarehouse:true, tag:'', sku:'CJ-TECH-010' },
  { id:'cj11', emoji:'🔌', title:'Smart Power Strip 4 USB Surge Protector', cost:9.50, ship:8, rating:4.6, orders:4100, cat:'Smart Home', usWarehouse:true, tag:'trending', sku:'CJ-HOME-011' },
  { id:'cj12', emoji:'⌚', title:'Smart Fitness Tracker Heart Rate SpO2 GPS', cost:8.90, ship:9, rating:4.5, orders:15400, cat:'Fitness', usWarehouse:false, tag:'trending', sku:'CJ-FIT-012' },
  { id:'cj13', emoji:'🪥', title:'Electric Toothbrush USB Rechargeable 3 Modes', cost:5.60, ship:7, rating:4.5, orders:8900, cat:'Beauty', usWarehouse:true, tag:'', sku:'CJ-BEA-013' },
  { id:'cj14', emoji:'🍶', title:'Collapsible Silicone Water Bottle 600ml BPA Free', cost:3.20, ship:5, rating:4.6, orders:11200, cat:'Outdoor', usWarehouse:true, tag:'', sku:'CJ-OUT-014' },
  { id:'cj15', emoji:'☀️', title:'Solar Power Bank 20000mAh Outdoor Waterproof', cost:11.50, ship:10, rating:4.4, orders:3200, cat:'Outdoor', usWarehouse:false, tag:'new', sku:'CJ-OUT-015' },
  { id:'cj16', emoji:'📷', title:'Mini Clip Action Camera 4K Waterproof Sports', cost:12.40, ship:9, rating:4.3, orders:4200, cat:'Electronics', usWarehouse:false, tag:'new', sku:'CJ-CAM-016' },
];

let importedProducts = [
  { id:'p1', emoji:'🔊', title:'Mini Portable Bluetooth Speaker', cost:4.20, sellPrice:12.99, stock:94, status:'active', orders:12, profit:104.28, sku:'CJ-BT-001', lastSync: new Date(Date.now()-3600000).toISOString() },
  { id:'p2', emoji:'🚗', title:'Magnetic Phone Car Mount 360°', cost:1.80, sellPrice:9.99, stock:247, status:'active', orders:38, profit:313.86, sku:'CJ-CAR-006', lastSync: new Date(Date.now()-7200000).toISOString() },
  { id:'p3', emoji:'🏋️', title:'Resistance Bands Set 5 Levels', cost:2.40, sellPrice:14.99, stock:181, status:'active', orders:21, profit:264.39, sku:'CJ-FIT-008', lastSync: new Date(Date.now()-1800000).toISOString() },
];

let pendingOrders = [
  { id:'ORD-1001', product:'Mini Bluetooth Speaker', customer:'James R.', country:'US', total:12.99, cost:4.20, status:'awaiting', date: new Date(Date.now()-86400000).toISOString() },
  { id:'ORD-1002', product:'Car Phone Mount', customer:'Sarah M.', country:'CA', total:9.99, cost:1.80, status:'fulfilled', date: new Date(Date.now()-172800000).toISOString(), tracking:'CJ2024US8821' },
  { id:'ORD-1003', product:'Resistance Bands', customer:'Tom K.', country:'US', total:14.99, cost:2.40, status:'fulfilled', date: new Date(Date.now()-259200000).toISOString(), tracking:'CJ2024US7743' },
  { id:'ORD-1004', product:'Mini Bluetooth Speaker', customer:'Lisa P.', country:'US', total:12.99, cost:4.20, status:'awaiting', date: new Date(Date.now()-43200000).toISOString() },
];

// ── API ROUTES ─────────────────────────────────────────────────────────────────

// Search CJ products
app.get('/api/cj/search', (req, res) => {
  const { q='', cat='All', warehouse='us', maxDays=14, maxPrice=50, minRating=4.0 } = req.query;
  let results = CJ_PRODUCTS.filter(p => {
    const qOk = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.cat.toLowerCase().includes(q.toLowerCase());
    const catOk = cat === 'All' || p.cat === cat;
    const whOk = warehouse === 'both' || (warehouse === 'us' && p.usWarehouse) || (warehouse === 'cn' && !p.usWarehouse);
    const daysOk = p.ship <= parseInt(maxDays);
    const priceOk = p.cost <= parseFloat(maxPrice);
    const ratingOk = p.rating >= parseFloat(minRating);
    return qOk && catOk && whOk && daysOk && priceOk && ratingOk;
  });
  res.json({ results, total: results.length });
});

// Import product to Shopify
app.post('/api/import', (req, res) => {
  const { productId, markup = 2.5 } = req.body;
  const cjProduct = CJ_PRODUCTS.find(p => p.id === productId);
  if (!cjProduct) return res.status(404).json({ error: 'Product not found' });
  if (importedProducts.find(p => p.sku === cjProduct.sku)) {
    return res.status(400).json({ error: 'Product already imported' });
  }
  const newProduct = {
    id: 'p' + Date.now(),
    emoji: cjProduct.emoji,
    title: cjProduct.title,
    cost: cjProduct.cost,
    sellPrice: parseFloat((cjProduct.cost * markup).toFixed(2)),
    stock: Math.floor(Math.random() * 200) + 50,
    status: 'active',
    orders: 0,
    profit: 0,
    sku: cjProduct.sku,
    lastSync: new Date().toISOString(),
  };
  importedProducts.push(newProduct);
  res.json({ success: true, product: newProduct, shopifyUrl: `https://ultrabestbuy.com/products/${cjProduct.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}` });
});

// Get imported products
app.get('/api/products', (req, res) => {
  res.json({ products: importedProducts });
});

// Sync all products
app.post('/api/sync', (req, res) => {
  importedProducts = importedProducts.map(p => ({ ...p, lastSync: new Date().toISOString() }));
  res.json({ success: true, synced: importedProducts.length, timestamp: new Date().toISOString() });
});

// Get orders
app.get('/api/orders', (req, res) => {
  res.json({ orders: pendingOrders });
});

// Fulfill order
app.post('/api/orders/:id/fulfill', (req, res) => {
  const order = pendingOrders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'fulfilled';
  order.tracking = 'CJ' + Date.now().toString().slice(-8);
  res.json({ success: true, order, tracking: order.tracking });
});

// Analytics
app.get('/api/analytics', (req, res) => {
  const totalRevenue = pendingOrders.reduce((s,o) => s + o.total, 0);
  const totalCost = pendingOrders.reduce((s,o) => s + o.cost, 0);
  const totalProfit = totalRevenue - totalCost;
  const fulfilled = pendingOrders.filter(o => o.status === 'fulfilled').length;
  res.json({
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalProfit: parseFloat(totalProfit.toFixed(2)),
    totalOrders: pendingOrders.length,
    fulfilledOrders: fulfilled,
    avgOrderValue: parseFloat((totalRevenue / pendingOrders.length).toFixed(2)),
    profitMargin: parseFloat(((totalProfit / totalRevenue) * 100).toFixed(1)),
    topProducts: importedProducts.sort((a,b) => b.orders - a.orders).slice(0,3),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`UltraBestBuy App running on port ${PORT}`));
module.exports = app;
