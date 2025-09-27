// ===== Modal root =====
const modalRoot = document.getElementById('modalRoot');

function closeModalAndGoShop(){
  if (modalRoot) {
    modalRoot.hidden = true;
    modalRoot.className = '';
    modalRoot.innerHTML = '';
  }
  const shop = document.getElementById('shop');
  if (shop && shop.scrollIntoView) shop.scrollIntoView({ behavior: 'smooth', block: 'start' });
  try { location.hash = '#shop'; } catch (_) {}
}

if (modalRoot) {
  modalRoot.addEventListener('click', (e) => { if (e.target === modalRoot) closeModalAndGoShop(); });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalRoot && !modalRoot.hidden) closeModalAndGoShop();
});

// ===== Images & helpers =====
const IMG_END_GRAIN = "https://lh3.googleusercontent.com/d/1vggTWisV_18mpzu9JbhAsUROT45LpPwW=w1200";
const IMG_HEADER    = "https://lh3.googleusercontent.com/d/1hlPfySWy2U2LZZV-H-xjy-6JUQMhamn7=w2400";
const IMG_CHARCUTERIE = "https://lh3.googleusercontent.com/d/10dpdbdjME2lQqBZvpryICR5uChvJw0gE=w1200";
const IMG_CLASSIC   = "https://lh3.googleusercontent.com/d/1HZQ2X1oxJAeFru9wn0AwWJSQkbaCc3fE=w1200";
const IMG_PEN       = "https://lh3.googleusercontent.com/d/1GPyfsackQ9aqlwVxa7tW6mKdNbbnI0vU=w1200";
const IMG_FALLBACK  = "data:image/webp;base64,UklGRgYIAABXRUJQVlA4IPoHAAAwVgCdASqQAZABPp1Oo0w8rCsiJBbo6r4cJk1oFQdjZpwnu7wkARVCgXo9a3Gh1GxhPZAD0eezz4wW8wwJb6K6h6Xjz97pI35zV0m1F6engvC6pUd7f5S+Kcw7d1j9pKJXfUskl2thK7O2b3Lx9XG3mYqFGE4cN1H7H5v3D7z0zRTeVJGAUiBOiJNVwB9v3X8XjALYy2LMBzBKOeGJao0YZ1WwEeACj9dRhKVrNhuZEAqE+oIfUEPjpbwWuzFEYgJY+jjyryUCqAaIyA0QIo/SEclo6BCtnPDkvbH1Tx7k1H0o4sWMT6kPj3T3lW9rCzgS0q9eIgJu0kh5o6QpSYsP+Sz1iE/l5Lrw7+Laxu9Y3esgD6MUfl6+bR2c+oIfUEPqCH1BD6gh9QQ+oIfUEPqCH1BD6gh9QQ+oIfUEPqCH1BD6gh9QQ+oIfUEPqCH1BD6gh9QQ+oIfUWTNctOqlci8LAvJkwopVwcuWwC0k+vCejCbH46PEUvD4jowEaVeiwGFLxZ+opdIDiZg5ln7l7r/gqE7ATzUpdeluOJoKLq/9h3LPmlPnjHtqvB+ld92C3n1F8b8tR8s7C6FZqPzv8aSy9kHhh7nCODQidG9kj+HKhCYj0B8jNCcHVO/rXQggQT6WO/XyXNU3c7PBHE7nftlnqJWldJC0cZlpJdcot2l6rDKmSMDMzrfEBJJA2LgYDIdz17srSsZ1gnu2NVBuok02p1ggakX/yCI4lDfHZT024I/G/30HB/zEw8NbTpWzM7ZZFhcllwwkCoHcsZkkoWyWOogXkP1mw/ufYtq5c7za4wJlbg70fwh97j6/vclQ3b3toqiktj6+XjnpbKl/Ma+L0v8Zaz7o/wi9X9fNhVQLIc4vk9XqXyvild9zSOh65SXUulxpTUWndZW9AWG7s7otU98fH3QlawrVhzFsMtvTfxD9TRn+Bqjo93yZgAAAAAAAAAAAAAAAAAAAAAA==";

function tryLoad(imgEl, urls){
  const list = Array.isArray(urls) ? urls.slice() : [urls];
  const next = list.shift();
  if(!next){ imgEl.src = IMG_FALLBACK; return; }
  imgEl.src = next;
  imgEl.onerror = () => tryLoad(imgEl, list);
  imgEl.setAttribute('referrerpolicy','no-referrer');
}

// ===== Products =====
const WOOD_SWATCH = { Maple: '#f5deb3', Walnut: '#6b4423', Cherry: '#c87543', Hickory: '#caa26a' };
const woodImg = (label) => {
  const c = WOOD_SWATCH[label] || '#e5e7eb';
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c}'/><stop offset='1' stop-color='${c}' stop-opacity='0.9'/></linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif' font-size='72' fill='rgba(0,0,0,.55)'>${label}</text>
    </svg>`
  );
};

const products = [
  {
    id: "classic-board",
    title: "Classic Cutting Board",
    price: 35,
    blurb: "Reliable Everyday board",
    woods: ["Hickory", "Walnut", "Cherry", "Maple"],
    sizes: ["Small (8×12)", "Medium (14×14)", "Large (16×18)"],
    image: IMG_CLASSIC,
    variantImages: { Hickory: IMG_CLASSIC, Walnut: woodImg("Walnut"), Cherry: woodImg("Cherry"), Maple: woodImg("Maple") },
    sizePrices: { "Small (8×12)": 35, "Medium (14×14)": 50, "Large (16×18)": 60 },
    woodUpcharge: { Maple: 0, Walnut: 10, Cherry: 5, Hickory: 5 },
  },
  {
    id: "end-grain",
    title: "End-Grain Board",
    price: 65,
    blurb: "Knife-friendly checker pattern built to last.",
    woods: ["Hickory", "Maple + Walnut", "Walnut + Cherry", "Custom Mix"],
    sizes: ["Small (12×14)", "Medium (14×16)", "Large (16×18)" ],
    image: IMG_END_GRAIN,
    variantImages: { "Hickory": IMG_END_GRAIN, "Maple + Walnut": IMG_END_GRAIN, "Walnut + Cherry": IMG_END_GRAIN, "Custom Mix": IMG_END_GRAIN },
    // (fixed case for "Small")
    sizePrices: { "Small (12×14)": 65, "Medium (14×16)": 80, "Large (16×18)": 90 },
    woodUpcharge: { "Hickory": 5, "Walnut": 5, "Maple": 0, "Custom Mix": 10 },
  },
  {
    id: "handle-board",
    title: "Charcuterie Board",
    price: 65,
    blurb: "Perfect for charcuterie nights and gifts.",
    woods: ["Walnut", "Cherry", "Maple", "Hickory"],
    sizes: ["Small", "Medium", "Large"],
    image: IMG_CHARCUTERIE,
    variantImages: { "Walnut": woodImg("Walnut"), "Cherry": woodImg("Cherry"), "Maple": woodImg("Maple"), "Hickory": woodImg("Hickory") },
    sizePrices: { "Small": 55, "Medium": 70, "Large": 80 },
    woodUpcharge: { "Maple": 0, "Walnut": 10, "Cherry": 5, "Hickory": 5 },
  },
  {
    id: "pen",
    title: "Hand-Turned Wood Pen",
    price: 15,
    blurb: "Smooth ballpoint or rollerball — a perfect gift.",
    woods: ["Walnut", "Cherry", "Maple"],
    sizes: ["Standard"],
    image: IMG_PEN,
    variantImages: { "Walnut": IMG_PEN, "Cherry": IMG_PEN, "Maple": IMG_PEN },
    sizePrices: { "Standard": 15 },
    woodUpcharge: { "Walnut": 0, "Cherry": 0, "Maple": 0 },
  },
];

// ===== Pricing helpers =====
function computePriceFor(product, wood, size) {
  const sizePrice = (product.sizePrices && product.sizePrices[size]) ?? product.price ?? 0;
  const woodAdj   = (product.woodUpcharge && product.woodUpcharge[wood]) ?? 0;
  return sizePrice + woodAdj;
}
function minPrice(product) {
  const sizes = product.sizes?.length ? product.sizes : [''];
  const woods = product.woods?.length ? product.woods : [''];
  let m = Infinity;
  for (const s of sizes) for (const w of woods) m = Math.min(m, computePriceFor(product, w, s));
  return isFinite(m) ? m : (product.price || 0);
}

// ===== Toast / Badge UI =====
let toastTimer = null;
function showToast(text){
  let toast = document.getElementById('toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    Object.assign(toast.style, {
      position:'fixed', right:'16px', bottom:'16px', zIndex:9999,
      background:'#fff', border:'1px solid rgba(127,157,189,.45)',
      borderRadius:'12px', boxShadow:'0 8px 20px rgba(0,0,0,.12)',
      padding:'10px 14px', display:'flex', alignItems:'center', gap:'10px',
      fontFamily:'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
    });
    const msg = document.createElement('span');
    msg.id = 'toastMsg'; msg.style.fontSize='14px'; toast.appendChild(msg);

    const link = document.createElement('a');
    link.textContent = 'View cart'; link.href = '#order';
    Object.assign(link.style, { marginLeft:'6px', fontSize:'13px', color:'#324a73', textDecoration:'underline' });
    link.addEventListener('click', (e)=>{
      const form = document.getElementById('orderForm');
      const table = document.getElementById('orderCartTable') || document.getElementById('cartTable');
      if(form || table){ e.preventDefault(); (form||table).scrollIntoView({behavior:'smooth', block:'start'}); }
      hideToast();
    });
    toast.appendChild(link);

    const close = document.createElement('button');
    close.textContent = '✕';
    Object.assign(close.style, { marginLeft:'4px', border:'0', background:'transparent', cursor:'pointer', fontSize:'14px', color:'#7f9dbd' });
    close.onclick = hideToast; toast.appendChild(close);
    document.body.appendChild(toast);
  }
  document.getElementById('toastMsg').textContent = text;
  toast.style.opacity = '0'; toast.style.transform = 'translateY(6px)';
  requestAnimationFrame(()=>{
    toast.style.transition = 'all .18s ease';
    toast.style.opacity = '1'; toast.style.transform = 'translateY(0)';
  });
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2200);
}
function hideToast(){
  const toast = document.getElementById('toast'); if(!toast) return;
  toast.style.transition = 'all .18s ease';
  toast.style.opacity = '0'; toast.style.transform = 'translateY(6px)';
  setTimeout(()=> toast.remove(), 220);
}
function flashButton(btn, label='Added ✓'){
  if(!btn) return;
  const old = { html: btn.innerHTML, disabled: btn.disabled };
  btn.disabled = true; btn.innerHTML = label;
  btn.style.transition = 'transform .12s ease'; btn.style.transform = 'scale(0.98)';
  setTimeout(()=>{ btn.disabled = old.disabled; btn.innerHTML = old.html; btn.style.transform = 'scale(1)'; }, 1200);
}
function updateCartBadge(cart){
  const total = cart.reduce((n, it)=> n + (it.qty||1), 0);
  let link = document.querySelector('a[href="#order"]');
  if(!link) return;
  let badge = document.getElementById('cartBadge');
  if(!badge){
    badge = document.createElement('span'); badge.id = 'cartBadge';
    Object.assign(badge.style, {
      marginLeft:'8px', minWidth:'20px', height:'20px', display:'inline-flex',
      alignItems:'center', justifyContent:'center', borderRadius:'9999px',
      background:'rgba(50,74,115,.14)', color:'#324a73', fontSize:'12px', padding:'0 6px'
    });
    link.appendChild(badge);
  }
  if(total > 0){ badge.textContent = String(total); badge.style.display = 'inline-flex'; }
  else { badge.textContent = ''; badge.style.display = 'none'; }
}

// ===== Cart state =====
const cart = [];

// ===== Render products =====
function renderProducts(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML = '';
  products.forEach((p)=>{
    const card = document.createElement('article');
    card.className = 'card pad';
    card.innerHTML = `
      <img class="thumb ${p.id==='pen' ? 'thumb--contain' : ''}" alt="${p.title}">
      <h3 style="margin:12px 0 4px">${p.title}</h3>
      <p class="muted">${p.blurb}</p>
      <div class="row" style="margin-top:8px">
        <strong style="font-size:18px">$${minPrice(p).toFixed(2)}</strong><span class="muted">starting</span>
      </div>
      <div class="row gap" style="margin-top:12px">
        <button class="btn outline">Customize</button>
        <button class="btn">Add</button>
      </div>
    `;
    const img = card.querySelector('img');
    tryLoad(img, [p.image, IMG_FALLBACK]);

    const [btnCustomize, btnAdd] = card.querySelectorAll('button');

    btnCustomize.addEventListener('click', ()=> openModal(p));
    btnAdd.addEventListener('click', (e)=>{
      const wood = p.woods?.[0] || '';
      const size = p.sizes?.[0] || '';
      const price = computePriceFor(p, wood, size);
      addToCart({ ...p, selectedWood: wood, selectedSize: size, price, custom: '' }, e.currentTarget); // include empty custom
    });

    grid.appendChild(card);
  });
}

// ===== Cart renderers =====
function renderCart(){
  // Shop-side
  const cartEmpty = document.getElementById('cartEmpty');
  const cartTable = document.getElementById('cartTable');
  const subtotalEl = document.getElementById('subtotal');

  if(cartTable){
    if(cart.length===0){
      if(cartEmpty) cartEmpty.hidden=false;
      cartTable.hidden=true;
      if(subtotalEl) subtotalEl.textContent='$0.00';
    } else {
      if(cartEmpty) cartEmpty.hidden=true;
      cartTable.hidden=false; cartTable.innerHTML='';
      let subtotal=0;
      cart.forEach((item, i)=>{
        subtotal += (item.price||0) * (item.qty||1);
        const line = document.createElement('div');
        line.className='line';
        line.innerHTML =
          `<span>${item.title}${item.selectedWood? ' — '+item.selectedWood:''}${item.selectedSize? ' / '+item.selectedSize:''}</span>
           <div class="row">
             <button class="qtybtn" data-i="${i}" data-d="-1">−</button>
             <span style="width:24px;text-align:center">${item.qty||1}</span>
             <button class="qtybtn" data-i="${i}" data-d="1">+</button>
             <span>$${(item.price||0).toFixed(2)} ea</span>
             <a href="#" data-i="${i}" class="muted rm">Remove</a>
           </div>`;
        // ✨ show per-item custom note (if any)
        if (item.custom && item.custom.trim()){
          const note = document.createElement('div');
          note.className = 'small muted';
          note.textContent = `Custom: ${item.custom}`;
          line.insertBefore(note, line.querySelector('.row'));
        }
        cartTable.appendChild(line);
      });
      if(subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

      cartTable.querySelectorAll('.rm').forEach(a=>{
        a.addEventListener('click', (e)=>{e.preventDefault(); cart.splice(Number(a.dataset.i),1); renderCart();});
      });
      cartTable.querySelectorAll('.qtybtn').forEach(btn=>{
        btn.addEventListener('click', (e)=>{
          e.preventDefault();
          const i = Number(btn.dataset.i);
          const d = Number(btn.dataset.d);
          cart[i].qty = Math.max(1, (cart[i].qty||1) + d);
          renderCart();
        });
      });
    }
  }

  // Order-side mirror
  const orderCartEmpty = document.getElementById('orderCartEmpty');
  const orderCartTable = document.getElementById('orderCartTable');
  const orderSubtotalEl = document.getElementById('orderSubtotal');

  if(orderCartTable){
    if(cart.length===0){
      if(orderCartEmpty) orderCartEmpty.hidden = false;
      orderCartTable.hidden = true;
      if(orderSubtotalEl) orderSubtotalEl.textContent = '$0.00';
    } else {
      if(orderCartEmpty) orderCartEmpty.hidden = true;
      orderCartTable.hidden = false; orderCartTable.innerHTML = '';
      let subtotal=0;
      cart.forEach((item)=>{
        subtotal += (item.price||0) * (item.qty||1);
        const line = document.createElement('div');
        line.className='line';
        line.innerHTML =
          `<span>${item.qty||1}× ${item.title}${item.selectedWood? ' — '+item.selectedWood:''}${item.selectedSize? ' / '+item.selectedSize:''}</span>
           <div class="row"><span>$${(item.price||0).toFixed(2)} ea</span></div>`;
        // ✨ show per-item custom note (if any)
        if (item.custom && item.custom.trim()){
          const note = document.createElement('div');
          note.className = 'small muted';
          note.textContent = `Custom: ${item.custom}`;
          line.insertBefore(note, line.querySelector('.row'));
        }
        orderCartTable.appendChild(line);
      });
      if(orderSubtotalEl) orderSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }
  }

  updateCartBadge(cart);
  buildMailto(); // keep links in sync
}

function addToCart(p, sourceBtn){
  const wood = p.selectedWood || (p.woods && p.woods[0]) || '';
  const size = p.selectedSize || (p.sizes && p.sizes[0]) || '';
  const price = (typeof p.price === 'number') ? p.price : computePriceFor(p, wood, size);
  cart.push({ ...p, qty: p.qty || 1, selectedWood: wood, selectedSize: size, price });
  renderCart();
  showToast(`Added to cart — ${p.title}${wood ? ' — ' + wood : ''}`);
  flashButton(sourceBtn);
}

// ===== Modal (Customize) =====
function openModal(product){
  if(!modalRoot) return;
  modalRoot.hidden=false;
  modalRoot.className='modal';
  modalRoot.innerHTML = '';

  const panel = document.createElement('div');
  panel.className='panel';
  panel.innerHTML = `
    <button class="close" title="Close">✕</button>
    <h3 style="margin:0 0 12px">${product.title}</h3>
    <div class="grid">
      <img class="thumb ${product.id==='pen'?'thumb--contain':''}" alt="${product.title}">
      <div class="grid gap">
        <div>
          <div class="small" style="font-weight:600;margin-bottom:6px">Wood</div>
          <div class="grid three gap" id="woodGrid"></div>
        </div>
        <label class="small" style="font-weight:600">Size
          <select id="sizeSel" style="margin-top:6px"></select>
        </label>
        <!-- ✨ Custom request note -->
        <label class="small" style="font-weight:600">Custom request (optional)
          <textarea id="customText" rows="2"
            placeholder="e.g., custom wood, custom size, edge profile, engraving text"
            style="margin-top:6px; resize:vertical"></textarea>
        </label>
        <div class="small muted" id="priceHint"></div>
        <button class="btn" id="addBtn">🛒 Add to cart</button>
      </div>
    </div>
  `;
  modalRoot.appendChild(panel);

  panel.querySelector('.close').onclick = closeModalAndGoShop;

  const img = panel.querySelector('img');
  tryLoad(img, [product.image, IMG_FALLBACK]);

  // wood options
  const woodGrid = panel.querySelector('#woodGrid');
  let selectedWood = product.woods?.[0] || '';
  (product.woods||[]).forEach(w=>{
    const b = document.createElement('button');
    b.className='variant-btn';
    b.innerHTML =
      `<img class="thumb ${product.id==='pen'?'thumb--contain-sm':''}" style="margin-bottom:6px"
            src="${(product.variantImages && product.variantImages[w]) || woodImg(w)}"
            alt="${w}">
       <div class="small">${w}</div>`;
    b.onclick = ()=>{ selectedWood=w; update(); woodGrid.querySelectorAll('.variant-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); };
    woodGrid.appendChild(b);
  });
  woodGrid.querySelector('.variant-btn')?.classList.add('active');

  // sizes
  const sizeSel = panel.querySelector('#sizeSel');
  let selectedSize = product.sizes?.[0] || '';
  (product.sizes||[]).forEach(s=>{
    const opt=document.createElement('option'); opt.textContent=s; sizeSel.appendChild(opt);
  });
  sizeSel.onchange=()=>{ selectedSize=sizeSel.value; update(); };

  const priceHint = panel.querySelector('#priceHint');
  const addBtn = panel.querySelector('#addBtn');
  // ✨ grab custom note element
  const customEl = panel.querySelector('#customText');

  function update(){
    const url = (product.variantImages && product.variantImages[selectedWood]) || product.image;
    tryLoad(img, [url, IMG_FALLBACK]);
    const price = computePriceFor(product, selectedWood, selectedSize);
    priceHint.textContent = `Price: $${price.toFixed(2)}`;
    addBtn.textContent = `🛒 Add to cart — $${price.toFixed(2)}`;
  }
  update();

  addBtn.onclick = ()=>{
    const price = computePriceFor(product, selectedWood, selectedSize);
    const custom = (customEl.value || '').trim(); // ✨ include note
    addToCart({
      ...product,
      title: product.title+ (selectedWood? ' — '+selectedWood:''),
      selectedWood, selectedSize, price, qty: 1,
      custom
    }, addBtn);
    modalRoot.hidden=true;
  };
}

// ===== Order form + email links =====
function buildMailto(){
  const formEl = document.getElementById('orderForm');
  const mailBtn = document.getElementById('mailtoBtn');
  const gmailBtn = document.getElementById('gmailBtn');
  const copyBtn  = document.getElementById('copyBtn');
  if(!formEl) return; // nothing to do

  const data = Object.fromEntries(new FormData(formEl).entries());
  const subtotal = cart.reduce((s, it)=> s + (it.price||0) * (it.qty||1), 0);
  const cartLines = cart.map(it =>
    `${it.qty||1}× ${it.title}` +
    `${it.selectedWood? ' — '+it.selectedWood:''}` +
    `${it.selectedSize? ' / '+it.selectedSize:''}` +
    `${it.custom && it.custom.trim() ? ' — custom: ' + it.custom.trim() : ''}` + // ✨ include custom
    ` — $${(it.price||0).toFixed(2)} ea`
  ).join('\n');

  const hasCart = cart.length > 0;
  const itemsBlock = hasCart
    ? `Cart items:\n${cartLines}\nSubtotal: $${subtotal.toFixed(2)}\n\n`
    : `Item from form:\n${data.quantity||1}× ${data.product||''} — ${data.wood||''} / ${data.size||''}\n\n`;

  const subject = hasCart
    ? `Order inquiry (Cart: ${cart.length} item${cart.length>1?'s':''}, $${subtotal.toFixed(2)})`
    : `Order: ${data.quantity||1}× ${data.product||''}`;

  const body =
    `Hi! I'd like to order the following:\n\n`+
    itemsBlock +
    `Engraving: ${data.engraving||'None'}\n`+
    `Notes: ${data.notes||''}\n\n`+
    `Name: ${data.name||''}\nEmail: ${data.email||''}\nPhone: ${data.phone||''}`;

  const mailtoHref = `mailto:doublecutwoodworking@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (mailBtn) mailBtn.href = mailtoHref;

  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=doublecutwoodworking@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (gmailBtn) { gmailBtn.href = gmailHref; gmailBtn.target = '_blank'; gmailBtn.rel = 'noopener'; }

  if (copyBtn) {
    copyBtn.onclick = async () => {
      try { await navigator.clipboard.writeText(body); alert('Order details copied! Paste into any email or DM.'); }
      catch { alert('Copy failed. You can still use Gmail or Email App.'); }
    };
  }
}

function hookOrderForm(){
  const formEl = document.getElementById('orderForm');
  if(!formEl) return;
  formEl.addEventListener('input', buildMailto);

  // “Add this selection to cart” button if present
  const addSelectionBtn = document.getElementById('addSelectionBtn');
  const orderProduct = document.getElementById('orderProduct');
  const orderWood = document.getElementById('orderWood');
  const orderSize = document.getElementById('orderSize');

  if(orderProduct){
    // populate product select if empty
    if(orderProduct.options.length === 0){
      products.forEach(p=>{ const o=document.createElement('option'); o.textContent=p.title; orderProduct.appendChild(o); });
    }
    const refreshOrderSelectors = ()=>{
      const p = products.find(x=> x.title===orderProduct.value );
      if(orderWood){ orderWood.innerHTML=''; (p?.woods||[]).forEach(w=>{ const o=document.createElement('option'); o.textContent=w; orderWood.appendChild(o); }); }
      if(orderSize){ orderSize.innerHTML=''; (p?.sizes||[]).forEach(s=>{ const o=document.createElement('option'); o.textContent=s; orderSize.appendChild(o); }); }
    };
    orderProduct.onchange = refreshOrderSelectors; refreshOrderSelectors();
  }

  if(addSelectionBtn){
    addSelectionBtn.addEventListener('click', ()=>{
      const p = products.find(x=> x.title===orderProduct?.value );
      if(!p) return;
      const wood = (orderWood && orderWood.value) || (p.woods?.[0]||'');
      const size = (orderSize && orderSize.value) || (p.sizes?.[0]||'');
      const price = computePriceFor(p, wood, size);
      addToCart({ ...p,
        title: p.title + (wood? ' — '+wood:''),
        selectedWood: wood,
        selectedSize: size,
        price,
        qty: Number((new FormData(formEl).get('quantity'))||1),
        custom: '' // no custom field on form; keep blank
      }, addSelectionBtn);
    });
  }
}

// ===== Init =====
window.addEventListener('DOMContentLoaded', () => {
  // optional intro image
  const introImg = document.getElementById('introImg'); if (introImg) tryLoad(introImg, [IMG_HEADER, IMG_FALLBACK]);

  renderProducts();
  renderCart();
  hookOrderForm();
  buildMailto();

  // smoke tests (console)
  try {
    console.assert(Array.isArray(products) && products.length >= 3, 'products[] defined');
    const grid = document.getElementById('productGrid');
    if(grid) console.assert(grid.children.length === products.length, 'product cards rendered');
  } catch(e) { console.warn(e); }
});