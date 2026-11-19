/**
 * Mộc & Sắc Atelier - Core Application Logic & State Management
 */

// --- 1. STATE MANAGEMENT WITH PERSISTENCE ---
let currentLang = 'vi';
let currentCurrency = 'VND';
const USD_RATE = 25400;
let currentFilterTab = 'handmade';
let activeModalProductId = null;
let currentRoomPaintingId = 'NAG-GTNL-6080';
let checkoutStep = 1;
let cart = [];
let toastTimeout = null;

try {
    const savedLang = localStorage.getItem('mocsac_lang');
    if (savedLang) currentLang = savedLang;
    const savedCurr = localStorage.getItem('mocsac_currency');
    if (savedCurr) currentCurrency = savedCurr;
    const savedCart = localStorage.getItem('mocsac_cart');
    if (savedCart) cart = JSON.parse(savedCart);
    const savedPhotos = localStorage.getItem('mocsac_photos');
    if (savedPhotos && typeof customPhotoMap !== 'undefined') {
        Object.assign(customPhotoMap, JSON.parse(savedPhotos));
    }
} catch (e) {
    console.warn('Storage access restricted:', e);
}

function saveCartToStorage() {
    try {
        localStorage.setItem('mocsac_cart', JSON.stringify(cart));
    } catch (e) {}
}

function saveLangToStorage() {
    try {
        localStorage.setItem('mocsac_lang', currentLang);
    } catch (e) {}
}

function saveCurrencyToStorage() {
    try {
        localStorage.setItem('mocsac_currency', currentCurrency);
    } catch (e) {}
}

// --- 2. UI TRANSLATIONS DICTIONARY (VI / EN) ---
        const i18n = {
            vi: {
                managePhotosBtn: "Ảnh thật",
                brandTagline: "Mộc mạc trong tâm hồn, rực rỡ trong nghệ thuật",
                navAll: "Bộ Sưu Tập",
                navCraftStudio: "Phối Màu Đồ Len",
                navRoomStudio: "Ướm Thử Tranh",
                navCustom: "Đặt Làm Riêng",
                cartBtnText: "Giỏ hàng",
                heroTitlePart1: "Đồ Len Thêu Tay Có Hồn.",
                heroTitlePart2: "Tranh Sơn Dầu Độc Bản 1/1.",
                heroDesc: "Mỗi chiếc túi len, búp bê vải hay bức tranh sơn dầu đắp nổi tại Mộc & Sắc chỉ có một phiên bản duy nhất. Tự tay phối màu món đồ bạn thích hoặc ướm thử tranh lên tường nhà chỉ trong 3 giây.",
                heroCtaHandmade: "Phối Màu Đồ Len 3D",
                heroCtaRoom: "Ướm Thử Tranh Lên Tường",
                stat1Label: "Nhận khâu theo ảnh thú cưng",
                stat2Label: "Tranh 1/1 có giấy chứng nhận COA",
                heroCard1Tag: "🧶 Đồ Thêu & Len",
                heroCard1Title: "Túi Len & Búp Bê Khâu Tay",
                heroCard1Sub: "Bấm để tự phối màu & size",
                heroCard2Title: "Tranh Sơn Dầu Đắp Nổi",
                heroCard2Sub: "Bấm để ướm thử lên tường nhà",
                filterSpecAll: "Mọi kiểu dáng",
                filterSpecFramed: "Tranh Có Khung",
                filterSpecRaw: "Tranh Bản Mộc (Không khung)",
                filterSpecBag: "Túi & Nón Len Móc",
                filterSpecDoll: "Búp Bê & Ví Mèo Khâu Tay",
                tabAll: "Tất cả (35)",
                tabHandmade: "Đồ Thêu & Len (7)",
                tabOilPainting: "Tranh Sơn Dầu (28)",
                tabHealing: "Tranh Chữa Lành (12)",
                tabPeace: "Tranh Bình An (9)",
                tabProsperity: "Tranh Thịnh Vượng (7)",
                customBadge: "ĐẶT LÀM RIÊNG THEO YÊU CẦU",
                customTitle: "Gửi Ảnh Thú Cưng Hoặc Không Gian Nhà Bạn Cho Nghệ Nhân",
                customDesc: "Muốn làm một chiếc ví vải giống hệt bé mèo cam ở nhà? Hay cần tư vấn bức tranh sơn dầu hợp mệnh, hợp màu sofa? Để lại lời nhắn, tụi mình sẽ phác thảo và báo giá trong 2 giờ.",
                customFeat1Sub: "Hoàn thiện đồ thêu/len đặt riêng",
                customFeat2Sub: "Kèm giấy chứng nhận Tranh 1/1",
                formNameLabel: "Tên của bạn *",
                formContactLabel: "Số điện thoại / Zalo / Email *",
                formServiceLabel: "Bạn muốn đặt làm gì?",
                optPetPouch: "Khâu ví vải theo ảnh mèo / thú cưng",
                optCrochetBag: "Móc túi len / nón / búp bê phối màu riêng",
                optOilConsult: "Tư vấn chọn Tranh Sơn Dầu 1/1 hợp phòng",
                optGift: "Quà tặng Tân gia / Khai trương",
                formSpaceLabel: "Ghi chú nhanh (Màu sắc / Kích thước)",
                formNoteLabel: "Ý tưởng của bạn hoặc mã sản phẩm cần tư vấn *",
                formSubmitBtn: "Gửi Yêu Cầu Ngay",
                footerAbout: "Đồ Thêu Len Handmade & Tranh Sơn Dầu Độc Bản 1/1",
                specSize: "Kích thước:",
                specMaterial: "Chất liệu:",
                specSpace: "Phù hợp:",
                addToCartBtn: "Thêm Vào Giỏ Hàng",
                tryInRoomBtn: "Ướm Thử Lên Tường",
                customizeCraftBtn: "Phối Màu & Đổi Size",
                craftModalTitle: "Xưởng Tự Phối Màu & Thiết Kế Đồ Len Handmade",
                craftBgLabel: "Đổi nền:",
                phoneScaleLabel: "So sánh kích cỡ",
                craftStep1: "1. Chọn Mẫu Đồ Len Bạn Thích",
                craftStep2: "2. Chọn Vùng & Đổi Màu Sợi Len",
                craftStep3: "3. Đính Ảnh Thú Cưng (Tuỳ Chọn)",
                uploadCustomMotifBtn: "Tải ảnh thú cưng",
                removePatchBtn: "Bỏ ảnh",
                craftColorNote: "Màu trên ảnh chỉ để minh hoạ, màu len thực tế có thể chênh nhẹ.",
                craftStep4Acc: "4. Thêm Phụ Kiện (Tuỳ Chọn)",
                craftStep4Size: "5. Chọn Kích Cỡ",
                craftStep4Name: "6. Thêu Tên Lên Túi (Miễn Phí)",
                craftAddToCartBtn: "Chốt Mẫu Phối Này & Thêm Vào Giỏ",
                roomModalTitle: "Phòng Thử Tranh Ảo — Xem Trước Tranh Trên Tường Nhà Bạn",
                sofaScaleLabel: "Sofa Tiêu Chuẩn Dài 2.0m",
                roomSelectPainting: "1. Chọn Tranh Muốn Thử",
                roomLightLabel: "2. Ánh Sáng Trong Phòng",
                lightMorning: "Ban ngày",
                lightSunset: "Nắng 5h chiều",
                lightGallery: "Đèn Rọi Tranh",
                roomSpacePreset: "3. Màu Tường Nhà Bạn",
                roomFrameStyle: "4. Kiểu Khung Tranh",
                roomAddCartBtn: "Chốt Bức Tranh Này",
                cartDrawerTitle: "Giỏ Hàng Của Bạn",
                cartTotalLabel: "Tổng cộng (Miễn phí giao hàng):",
                proceedCheckoutBtn: "Tiến Hành Đặt Hàng",
                confirmOrderBtn: "Xác Nhận Đặt Hàng Ngay",
                replaceImgShort: "Thay ảnh thật",
                photoModalTitle: "Thay Ảnh Thật Từ Máy Tính / Điện Thoại",
                photoModalDesc: "Bấm nút 'Chọn ảnh' bên cạnh sản phẩm bất kỳ để tải ảnh chụp thật từ máy của bạn lên website:"
            },
            en: {
                managePhotosBtn: "Upload Photos",
                brandTagline: "Rustic in soul, vibrant in art",
                navAll: "Collection",
                navCraftStudio: "Customize Crochet",
                navRoomStudio: "Room Wall Preview",
                navCustom: "Custom Order",
                cartBtnText: "Bag",
                heroTitlePart1: "Soulful Hand-Stitched Crochet.",
                heroTitlePart2: "1/1 Original Impasto Oil Art.",
                heroDesc: "Every crochet bag, linen doll, and textured oil painting at Moc & Sac is one-of-a-kind. Customize your favorite handmade piece or preview paintings on your wall in seconds.",
                heroCtaHandmade: "Customize Crochet 3D",
                heroCtaRoom: "Try Paintings on Wall",
                stat1Label: "Custom pet portrait pouches",
                stat2Label: "1/1 Oil Art with signed COA",
                heroCard1Tag: "🧶 Crochet & Linen",
                heroCard1Title: "Handmade Crochet & Dolls",
                heroCard1Sub: "Click to customize color & size",
                heroCard2Title: "1/1 Impasto Oil Paintings",
                heroCard2Sub: "Click to preview on your wall",
                filterSpecAll: "All Styles",
                filterSpecFramed: "Framed Paintings",
                filterSpecRaw: "Unframed Raw Canvas",
                filterSpecBag: "Crochet Bags & Hats",
                filterSpecDoll: "Dolls & Pet Pouches",
                tabAll: "All (35)",
                tabHandmade: "Handmade Crochet (7)",
                tabOilPainting: "1/1 Oil Paintings (28)",
                tabHealing: "Healing Art (12)",
                tabPeace: "Inner Peace Art (9)",
                tabProsperity: "Prosperity Art (7)",
                customBadge: "BESPOKE COMMISSIONS",
                customTitle: "Send Us Your Pet Photo or Living Room Space",
                customDesc: "Want a quilted zipper pouch modelled after your chubby cat? Or need help picking a 1/1 oil painting that matches your sofa? Leave a note and get a sketch within 2 hours.",
                customFeat1Sub: "Custom handmade turnaround",
                customFeat2Sub: "Includes signed 1/1 COA",
                formNameLabel: "Your Name *",
                formContactLabel: "Phone / WhatsApp / Email *",
                formServiceLabel: "What would you like to commission?",
                optPetPouch: "Custom Pet Zipper Pouch from Photo",
                optCrochetBag: "Custom Color Crochet Bag / Hat / Doll",
                optOilConsult: "1/1 Oil Painting Interior Advice",
                optGift: "Housewarming / Grand Opening Gift",
                formSpaceLabel: "Quick Note (Colors / Size)",
                formNoteLabel: "Your Idea or Favorite Product Code *",
                formSubmitBtn: "Send Request Now",
                footerAbout: "Handmade Crochet & 1/1 Original Oil Paintings",
                specSize: "Dimensions:",
                specMaterial: "Material:",
                specSpace: "Best for:",
                addToCartBtn: "Add to Bag",
                tryInRoomBtn: "Preview on Wall",
                customizeCraftBtn: "Customize Color & Size",
                craftModalTitle: "3D Handmade Crochet Customizer Studio",
                craftBgLabel: "Backdrop:",
                phoneScaleLabel: "Size Comparison",
                craftStep1: "1. Choose Base Style",
                craftStep2: "2. Pick a Part & Yarn Color",
                craftStep3: "3. Add a Pet Photo Patch (Optional)",
                uploadCustomMotifBtn: "Upload Pet Photo",
                removePatchBtn: "Remove",
                craftColorNote: "Colors are illustrative; actual yarn may vary slightly.",
                craftStep4Acc: "4. Add Accessories (Optional)",
                craftStep4Size: "5. Select Size",
                craftStep4Name: "6. Free Embroidered Name",
                craftAddToCartBtn: "Save Design & Add to Bag",
                roomModalTitle: "Virtual Room Preview — See Artwork on Your Wall",
                sofaScaleLabel: "Standard 2.0m Sofa Reference",
                roomSelectPainting: "1. Choose Artwork",
                roomLightLabel: "2. Room Lighting",
                lightMorning: "Daylight",
                lightSunset: "5PM Sunset",
                lightGallery: "Spotlight",
                roomSpacePreset: "3. Wall Color",
                roomFrameStyle: "4. Frame Style",
                roomAddCartBtn: "Collect This Painting",
                cartDrawerTitle: "Your Shopping Bag",
                cartTotalLabel: "Total (Free Shipping):",
                proceedCheckoutBtn: "Proceed to Checkout",
                confirmOrderBtn: "Place Order Now",
                replaceImgShort: "Upload Photo",
                photoModalTitle: "Upload Original Photos from Your Device",
                photoModalDesc: "Click 'Choose Photo' next to any item to replace its image with your own camera photo:"
            }
        };

        // --- 5. CURRENCY & LANGUAGE FORMATTING ---
        function formatPrice(vndAmount) {
            if (currentCurrency === 'VND') {
                return vndAmount.toLocaleString('vi-VN') + ' ₫';
            } else {
                const usd = Math.round(vndAmount / USD_RATE);
                return '$' + usd.toLocaleString('en-US') + ' USD';
            }
        }

        function setLanguage(lang) {
            currentLang = lang;
            document.documentElement.lang = lang;

            // Update toggle buttons
            const viBtn = document.getElementById('langViBtn');
            const enBtn = document.getElementById('langEnBtn');
            if (lang === 'vi') {
                viBtn.className = "px-2 py-1 rounded-md text-xs font-bold transition-all bg-slateart text-white";
                enBtn.className = "px-2 py-1 rounded-md text-xs font-bold transition-all text-stone-600 hover:text-slateart";
            } else {
                enBtn.className = "px-2 py-1 rounded-md text-xs font-bold transition-all bg-slateart text-white";
                viBtn.className = "px-2 py-1 rounded-md text-xs font-bold transition-all text-stone-600 hover:text-slateart";
            }

            // Translate all [data-i18n] elements
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (i18n[lang][key]) {
                    el.textContent = i18n[lang][key];
                }
            });

            const brandTagline = document.getElementById('brandTagline');
            if (brandTagline && i18n[lang]) brandTagline.textContent = i18n[lang].brandTagline;

            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.placeholder = lang === 'vi'
                    ? 'Tìm túi len, mèo cam, tranh...'
                    : 'Search crochet bag, cat pouch, painting...';
            }

            if (typeof renderProducts === 'function' && document.getElementById('productGrid')) {
                renderProducts();
            }
            if (typeof renderFeaturedCards === 'function') {
                renderFeaturedCards();
            }
            if (typeof renderCart === 'function') {
                renderCart();
            }
            if (typeof populateRoomSelector === 'function' && document.getElementById('roomPaintingSelect')) {
                populateRoomSelector();
            }
            if (typeof populateCraftBaseSelector === 'function' && document.getElementById('craftBaseSelect')) {
                populateCraftBaseSelector();
                const craftModal = document.getElementById('handmadeCustomizerModal');
                if (craftModal && !craftModal.classList.contains('hidden')) {
                    refreshCraftControls();
                    renderCraftCustomCanvas();
                }
            }
            saveLangToStorage();
        }

        function toggleCurrency() {
            currentCurrency = currentCurrency === 'VND' ? 'USD' : 'VND';
            const curLabel = document.getElementById('currencyLabel');
            if (curLabel) curLabel.textContent = currentCurrency === 'VND' ? 'VND ₫' : 'USD $';
            
            if (typeof renderProducts === 'function' && document.getElementById('productGrid')) {
                renderProducts();
            }
            if (typeof renderFeaturedCards === 'function') {
                renderFeaturedCards();
            }
            if (typeof renderCart === 'function') {
                renderCart();
            }
            if (activeModalProductId) {
                const p = products.find(item => item.id === activeModalProductId);
                const modalPrice = document.getElementById('modalPrice');
                if (p && modalPrice) modalPrice.textContent = formatPrice(p.priceVND);
            }
            const craftModal = document.getElementById('handmadeCustomizerModal');
            if (craftModal && !craftModal.classList.contains('hidden') && typeof renderCraftCustomCanvas === 'function') {
                renderCraftCustomCanvas();
            }
            saveCurrencyToStorage();
        }

        // --- 6. RENDER PRODUCT CATALOG GRID ---
        function setMainCategory(cat) {
            if (cat === 'all' || cat === 'handmade') setFilterTab('handmade');
            else if (cat === 'oilpainting') setFilterTab('oilpainting');
        }

        function filterByPillar(pillar) {
            setFilterTab('oilpainting');
            document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
        }

        function setFilterTab(tab) {
            if (tab === 'all') tab = 'handmade';
            currentFilterTab = tab;
            document.querySelectorAll('.filter-tab').forEach(btn => {
                btn.className = "filter-tab px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all bg-transparent text-stone-700 hover:bg-white/80";
            });
            const activeBtn = document.getElementById('tab-' + tab);
            if (activeBtn) {
                activeBtn.className = "filter-tab px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all bg-slateart text-white shadow-xs";
            }
            renderProducts();
        }

        function renderProducts() {
            const grid = document.getElementById('productGrid');
            const query = (document.getElementById('searchInput').value || '').toLowerCase().trim();
            const specVal = document.getElementById('specFilter').value;

            const filtered = products.filter(p => {
                const matchesTab = currentFilterTab === 'all' 
                    || p.category === currentFilterTab 
                    || p.pillar === currentFilterTab;
                const matchesSpec = specVal === 'all' || p.spec === specVal || p.pillar === specVal;
                const title = (currentLang === 'vi' ? p.title_vi : p.title_en).toLowerCase();
                const desc = (currentLang === 'vi' ? p.desc_vi : p.desc_en).toLowerCase();
                const code = p.code.toLowerCase();
                const matchesQuery = !query || title.includes(query) || desc.includes(query) || code.includes(query);
                return matchesTab && matchesSpec && matchesQuery;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-stone-200 p-8">
                        <i class="fa-solid fa-sparkles text-3xl text-stone-400 mb-3"></i>
                        <p class="text-base font-bold text-slateart">
                            ${currentLang === 'vi' ? 'Chưa tìm thấy sản phẩm phù hợp.' : 'No matching items found.'}
                        </p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = filtered.map(p => {
                const title = currentLang === 'vi' ? p.title_vi : p.title_en;
                const shortHook = currentLang === 'vi' ? p.desc_vi : p.desc_en;
                const edition = currentLang === 'vi' ? p.edition_vi : p.edition_en;
                const imgSrc = getProductImageSrc(p);
                const isOil = p.category === 'oilpainting';

                return `
                    <article class="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                        <div>
                            <!-- Clean Product Image -->
                            <div onclick="openProductModal('${p.id}')" class="cursor-pointer relative aspect-square bg-rawcanvas overflow-hidden">
                                <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover impasto-card-img group-hover:scale-105 transition-transform duration-500">
                                <span class="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-xs ${isOil ? 'bg-slateart/90 text-ochre border border-ochre/30' : 'bg-white/95 text-slateart'}">
                                    ${edition}
                                </span>
                                ${isOil ? `
                                    <button onclick="event.stopPropagation(); openRoomPreviewModal('${p.id}')" class="absolute bottom-2 right-2 sm:bottom-3.5 sm:right-3.5 px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-ochre text-slateart text-[10px] sm:text-xs font-extrabold shadow-md hover:bg-amber-400 transition-all flex items-center gap-1">
                                        <i class="fa-solid fa-couch"></i>
                                        <span class="hidden sm:inline">${currentLang === 'vi' ? 'Ướm thử lên tường' : 'Try on Wall'}</span>
                                        <span class="sm:hidden">${currentLang === 'vi' ? 'Thử tường' : 'Preview'}</span>
                                    </button>
                                ` : `
                                    <button onclick="event.stopPropagation(); openHandmadeCustomizer('${p.id}')" class="absolute bottom-2 right-2 sm:bottom-3.5 sm:right-3.5 px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-blossom text-white text-[10px] sm:text-xs font-extrabold shadow-md hover:bg-pink-600 transition-all flex items-center gap-1">
                                        <i class="fa-solid fa-sliders"></i>
                                        <span class="hidden sm:inline">${currentLang === 'vi' ? 'Phối màu & Size' : 'Customize'}</span>
                                        <span class="sm:hidden">${currentLang === 'vi' ? 'Phối màu' : 'Custom'}</span>
                                    </button>
                                `}
                            </div>

                            <!-- Concise, Hooky Card Text -->
                            <div class="p-2.5 sm:p-5 space-y-1 sm:space-y-1.5">
                                <div class="text-[10px] sm:text-xs font-semibold text-stone-400 truncate">
                                    ${p.size.split('(')[0].trim()}
                                </div>
                                <h3 onclick="openProductModal('${p.id}')" class="cursor-pointer text-xs sm:text-lg font-extrabold text-slateart mt-0.5 sm:mt-1 group-hover:text-terracotta transition-colors line-clamp-1 leading-snug">
                                    ${title}
                                </h3>
                                <p class="text-[11px] sm:text-sm text-stone-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                                    ${shortHook}
                                </p>
                            </div>
                        </div>

                        <!-- Clean Price & Buy Footer -->
                        <div class="px-2.5 pb-2.5 pt-2 sm:px-5 sm:pb-5 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-1 sm:gap-3">
                            <div class="font-extrabold text-xs sm:text-lg text-terracotta truncate">
                                ${formatPrice(p.priceVND)}
                            </div>
                            <button onclick="addToCart('${p.id}')" class="px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-slateart hover:bg-terracotta text-white text-[11px] sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shrink-0 transition-colors">
                                <i class="fa-solid fa-bag-shopping text-xs"></i>
                                <span class="hidden sm:inline">${currentLang === 'vi' ? 'Chọn mua' : 'Add to Bag'}</span>
                                <span class="sm:hidden">${currentLang === 'vi' ? 'Mua' : 'Buy'}</span>
                            </button>
                        </div>
                    </article>
                `;
            }).join('');
        }

        // --- 7. PRODUCT DETAIL MODAL & SINGLE PHOTO UPLOAD ---
        function openProductModal(productId) {
            const p = products.find(item => item.id === productId);
            if (!p) return;
            activeModalProductId = productId;

            document.getElementById('modalCodeBadge').textContent = p.code;
            document.getElementById('modalEditionBadge').textContent = currentLang === 'vi' ? p.edition_vi : p.edition_en;
            document.getElementById('modalProductImg').src = getProductImageSrc(p);

            const pillarMap = {
                handmade: currentLang === 'vi' ? 'ĐỒ THÊU & ĐAN MÓC LEN HANDMADE THỦ CÔNG' : 'ARTISAN HANDMADE CROCHET & LINEN',
                healing: currentLang === 'vi' ? 'TRỤ CỘT 01: NĂNG LƯỢNG CHỮA LÀNH & SÁNG TẠO' : 'PILLAR 01: HEALING & CREATIVE ENERGY',
                peace: currentLang === 'vi' ? 'TRỤ CỘT 02: NĂNG LƯỢNG BÌNH AN & TỈNH THỨC' : 'PILLAR 02: INNER PEACE & MINDFULNESS',
                prosperity: currentLang === 'vi' ? 'TRỤ CỘT 03: NĂNG LƯỢNG THỊNH VƯỢNG & PHONG THỦY' : 'PILLAR 03: PROSPERITY & FENG SHUI'
            };
            document.getElementById('modalPillarLabel').textContent = pillarMap[p.pillar] || '';
            document.getElementById('modalTitle').textContent = currentLang === 'vi' ? p.title_vi : p.title_en;
            document.getElementById('modalPrice').textContent = formatPrice(p.priceVND);
            document.getElementById('modalDimensions').textContent = p.size;
            document.getElementById('modalMaterial').textContent = currentLang === 'vi' ? p.material_vi : p.material_en;
            document.getElementById('modalPlacement').textContent = currentLang === 'vi' ? p.placement_vi : p.placement_en;
            document.getElementById('modalDesc').textContent = currentLang === 'vi' ? p.desc_vi : p.desc_en;

            const isOil = p.category === 'oilpainting';
            document.getElementById('modalCoaNote').textContent = isOil
                ? (currentLang === 'vi'
                    ? 'Tác phẩm đi kèm Giấy Chứng Nhận Độc Bản 1/1 (COA) có chữ ký tay của họa sĩ và bảo hành bề mặt sơn dầu Impasto trọn đời.'
                    : 'Includes a hand-signed 1/1 Certificate of Authenticity (COA) and lifetime impasto surface care warranty.')
                : (currentLang === 'vi'
                    ? 'Sản phẩm đan móc & khâu tay thủ công 100%. Nhận tùy chỉnh màu sợi len hoặc khâu theo ảnh thú cưng riêng của khách.'
                    : '100% handcrafted stitchwork. Custom yarn colors or personalized pet portrait embroidery available upon request.');

            document.getElementById('modalAddToCartBtn').onclick = () => {
                addToCart(p.id);
                closeProductModal();
            };

            const roomBtn = document.getElementById('modalRoomPreviewBtn');
            const craftBtn = document.getElementById('modalCraftCustomBtn');
            if (isOil) {
                roomBtn.classList.remove('hidden');
                craftBtn.classList.add('hidden');
                roomBtn.onclick = () => {
                    closeProductModal();
                    openRoomPreviewModal(p.id);
                };
            } else {
                roomBtn.classList.add('hidden');
                craftBtn.classList.remove('hidden');
                craftBtn.onclick = () => {
                    closeProductModal();
                    openHandmadeCustomizer(p.id);
                };
            }

            document.getElementById('productModal').classList.remove('hidden');
        }

        function closeProductModal() {
            document.getElementById('productModal').classList.add('hidden');
        }

        function uploadSingleProductPhoto(event) {
            const file = event.target.files[0];
            if (!file || !activeModalProductId) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                customPhotoMap[activeModalProductId] = e.target.result;
                document.getElementById('modalProductImg').src = e.target.result;
                updateHeroImages();
                renderProducts();
                showToast(currentLang === 'vi' ? 'Đã cập nhật ảnh chụp thật thành công!' : 'Successfully updated product photo!');
            };
            reader.readAsDataURL(file);
        }

        // --- 8. VIRTUAL ROOM WALL PREVIEWER & 5PM IMPASTO LIGHT SIMULATOR ---
        function populateRoomSelector() {
            const select = document.getElementById('roomPaintingSelect');
            if (!select) return;
            const oilPaintings = products.filter(p => p.category === 'oilpainting');
            select.innerHTML = oilPaintings.map(p => {
                const title = currentLang === 'vi' ? p.title_vi : p.title_en;
                return `<option value="${p.id}" ${p.id === currentRoomPaintingId ? 'selected' : ''}>${title}</option>`;
            }).join('');
            if (typeof initCustomSelect === 'function') {
                initCustomSelect(select);
            }
        }

        function openRoomPreviewModal(paintingId) {
            const target = products.find(p => p.id === paintingId && p.category === 'oilpainting')
                || products.find(p => p.category === 'oilpainting');
            if (!target) return;
            currentRoomPaintingId = target.id;
            populateRoomSelector();
            changeRoomPainting(target.id);
            document.getElementById('roomPreviewModal').classList.remove('hidden');
        }

        function closeRoomPreviewModal() {
            document.getElementById('roomPreviewModal').classList.add('hidden');
        }

        function changeRoomPainting(paintingId) {
            const p = products.find(item => item.id === paintingId);
            if (!p) return;
            currentRoomPaintingId = p.id;
            document.getElementById('roomPreviewImg').src = getProductImageSrc(p);
            const title = currentLang === 'vi' ? p.title_vi : p.title_en;
            document.getElementById('roomPaintingCaption').textContent = `${p.code} • ${title} (${p.size})`;

            // Automatically set frame style matching catalogue spec (framed vs raw)
            setRoomFrame(p.spec === 'raw' ? 'raw' : 'classic');
        }

        function setRoomLight(mode) {
            const overlay = document.getElementById('sunlightOverlay');
            const img = document.getElementById('roomPreviewImg');
            const badge = document.getElementById('lightTimeBadge');

            if (mode === 'morning') {
                overlay.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(200,230,255,0.08) 100%)';
                img.style.filter = 'contrast(1.03) saturate(1.05) brightness(1.04)';
                badge.textContent = currentLang === 'vi' ? '10:00 (Ánh sáng ban ngày)' : '10:00 AM (Daylight)';
            } else if (mode === 'sunset') {
                overlay.style.background = 'linear-gradient(125deg, rgba(255,150,40,0.45) 0%, rgba(255,95,30,0.18) 55%, rgba(20,15,35,0.42) 100%)';
                img.style.filter = 'contrast(1.14) saturate(1.22) sepia(0.12)';
                badge.textContent = currentLang === 'vi' ? '17:00 (Hoàng hôn 5 giờ chiều)' : '5:00 PM (Golden Sunset)';
            } else {
                overlay.style.background = 'radial-gradient(circle at 50% 38%, rgba(255,240,190,0.35) 0%, rgba(10,12,16,0.75) 75%)';
                img.style.filter = 'contrast(1.18) saturate(1.1)';
                badge.textContent = currentLang === 'vi' ? '20:00 (Đèn Spotlight Gallery)' : '8:00 PM (Gallery Spotlight)';
            }
        }

        function setRoomWallBg(preset) {
            const stage = document.getElementById('roomWallStage');
            if (preset === 'penthouse') {
                stage.style.background = 'linear-gradient(180deg, #F6F2EA 0%, #E5DEC9 75%, #8C7A65 75%, #6E5D4B 100%)';
            } else if (preset === 'slate') {
                stage.style.background = 'linear-gradient(180deg, #23262A 0%, #1B1E22 75%, #3E352F 75%, #2A231E 100%)';
            } else if (preset === 'zen') {
                stage.style.background = 'linear-gradient(180deg, #EAE6DF 0%, #D8D2C7 75%, #796B59 75%, #5C5042 100%)';
            } else {
                stage.style.background = 'linear-gradient(180deg, #D9C3A4 0%, #C2A682 75%, #4A321F 75%, #362213 100%)';
            }
        }

        function setRoomFrame(style) {
            const container = document.getElementById('roomFrameContainer');
            container.className = 'transition-all duration-300 ' + (
                style === 'classic' ? 'frame-classic' :
                style === 'modern' ? 'frame-modern' : 'frame-raw'
            );
        }

        function addCurrentRoomPaintingToCart() {
            addToCart(currentRoomPaintingId);
            closeRoomPreviewModal();
        }

        // --- 8B. HANDMADE STUDIO CUSTOMIZER — RECOLOR REAL PRODUCT PHOTOS (COLOR ZONES, PET PATCH, SIZE, NAME) ---
        // Mỗi mẫu dùng ảnh chụp thật + 1 file mask PNG (kênh R/G/B = vùng 1/2/3) tạo bằng tools/mask-builder.html.
        // Tô màu trong không gian CIELAB: giữ độ sáng (vân len, bóng đổ), thay sắc độ bằng màu khách chọn.
        const craftPalettes = [
            { id: 'black', hex: '#1F2226', vi: 'Đen Tuyền', en: 'Jet Black' },
            { id: 'ivory', hex: '#F1EBDD', vi: 'Trắng Ngà', en: 'Ivory' },
            { id: 'cream', hex: '#E9D3B4', vi: 'Kem Sữa', en: 'Warm Cream' },
            { id: 'taupe', hex: '#9A8B7A', vi: 'Nâu Mộc Linen', en: 'Taupe Linen' },
            { id: 'yellow', hex: '#F2C94C', vi: 'Vàng Nắng Mai', en: 'Sunny Yellow' },
            { id: 'pink', hex: '#F4A6BE', vi: 'Hồng Phấn', en: 'Blossom Pink' },
            { id: 'fuchsia', hex: '#C2185B', vi: 'Hồng Cánh Sen', en: 'Fuchsia Rose' },
            { id: 'burgundy', hex: '#7E2233', vi: 'Đỏ Rượu Vang', en: 'Burgundy' },
            { id: 'lavender', hex: '#A48BC9', vi: 'Tím Oải Hương', en: 'Lavender' },
            { id: 'sage', hex: '#8FAF6A', vi: 'Xanh Lá Mạ', en: 'Sage Green' },
            { id: 'ocean', hex: '#2B7BB9', vi: 'Xanh Đại Dương', en: 'Ocean Blue' },
            { id: 'navy', hex: '#26365C', vi: 'Xanh Navy', en: 'Navy' }
        ];

        // patch = [x, y, r] vị trí đính ảnh thú cưng (pixel trên ảnh gốc 800x800)
        const craftPhotoBases = {
            'HM-BAG-SAKURA-04': {
                photo: 'img/products/len-12-tui-hoa-dao.jpg', mask: 'img/masks/len-12-tui-hoa-dao.png', patch: [150, 230, 62],
                zones: [{ vi: 'Thân túi & quai', en: 'Body & handle' }, { vi: 'Hoa đào', en: 'Blossoms' }]
            },
            'HM-BAG-FUCHSIA-05': {
                photo: 'img/products/len-13-tui-tim-no-hong.jpg', mask: 'img/masks/len-13-tui-tim-no-hong.png', patch: [590, 680, 64],
                zones: [{ vi: 'Thân túi', en: 'Body' }, { vi: 'Nơ & quai', en: 'Bow & strap' }]
            },
            'HM-BAG-OCEAN-02': {
                photo: 'img/products/len-15-tui-hong-soc-charm.jpg', mask: 'img/masks/len-15-tui-hong-soc-charm.png', patch: [560, 650, 58],
                zones: [{ vi: 'Thân túi', en: 'Body' }]
            },
            'HM-BAG-SUNFLOWER-03': {
                photo: 'img/products/len-11-tui-huong-duong.jpg', mask: 'img/masks/len-11-tui-huong-duong.png', patch: [420, 560, 66],
                zones: [{ vi: 'Sợi nền & quai', en: 'Base yarn & strap' }, { vi: 'Cánh hoa', en: 'Petals' }]
            },
            'HM-POUCH-CAT-06': {
                photo: 'img/products/len-09-tui-meo-cam.jpg', mask: 'img/masks/len-09-tui-meo-cam.png', patch: [650, 330, 44],
                zones: [{ vi: 'Thân ví', en: 'Pouch body' }, { vi: 'Mặt mèo', en: 'Cat face' }]
            },
            'HM-SET-YELLOW-07': {
                photo: 'img/products/len-02-set-mu-tui-vang.jpg', mask: 'img/masks/len-02-set-mu-tui-vang.png', patch: [379, 610, 64],
                zones: [{ vi: 'Nón', en: 'Hat' }, { vi: 'Túi', en: 'Bag' }]
            },
            // Tóc len và bàn tay cầm búp bê trùng màu nên chưa tách mask tự động được → chỉ xem ảnh gốc.
            'HM-DOLL-ROSE-01': {
                photo: 'img/products/len-18-bup-be-toc-hong.jpg', mask: null, patch: [400, 560, 42],
                zones: []
            }
        };

        let craftState = {
            baseProductId: 'HM-BAG-SAKURA-04',
            zoneColors: [],   // colorId hoặc null (= màu gốc) cho từng vùng
            activeZone: 0,
            customUploadedImg: null,
            accessories: [],  // { accId, anchorId, x, y } — x/y chuẩn hoá 0–1 (vị trí điểm pivot của phụ kiện)
            size: 'M', // 'S', 'M', 'L'
            customText: ''
        };

        // ---- Bước 4: phụ kiện ghép lên ảnh thật ----
        // Chỉ món có ảnh chụp thật mới hiện cho khách. Món `draft: true` dùng hình minh hoạ SVG nên đang ẩn:
        // khi có ảnh thật, tách nền thành PNG trong suốt, đặt vào img/accessories/, đổi `src`
        // (và `pivot` = điểm khoen treo / tâm, tính theo 0–1 của ảnh phụ kiện) rồi xoá `draft`.
        const craftAccessories = [
            // Ảnh thật: tách nền từ img/products/full_len-07-moc-khoa-meo.jpg (Apple Vision + viền cắt tay), khoen & dây vẽ thêm.
            { id: 'charm-cat', vi: 'Móc khoá mèo', en: 'Cat charm', type: 'hang', src: 'img/accessories/charm-cat-len07.png', width: 0.11, pivot: [0.515, 0.032], priceVND: 70000 },
            { id: 'charm-heart', draft: true, vi: 'Charm tim', en: 'Heart charm', type: 'hang', src: 'img/accessories/charm-heart.svg', width: 0.085, pivot: [0.5, 0.093], priceVND: 35000 },
            { id: 'charm-pompom', draft: true, vi: 'Pompom len', en: 'Yarn pompom', type: 'hang', src: 'img/accessories/charm-pompom.svg', width: 0.095, pivot: [0.5, 0.088], priceVND: 30000 },
            { id: 'pin-daisy', draft: true, vi: 'Huy hiệu cúc', en: 'Daisy pin', type: 'surface', src: 'img/accessories/pin-daisy.svg', width: 0.10, pivot: [0.5, 0.5], priceVND: 25000 },
            { id: 'bow-ribbon', draft: true, vi: 'Nơ satin', en: 'Satin bow', type: 'surface', src: 'img/accessories/bow-ribbon.svg', width: 0.14, pivot: [0.5, 0.5], priceVND: 30000 }
        ];
        const CRAFT_MAX_SURFACE_ITEMS = 4;

        // Toạ độ chuẩn hoá 0–1 theo ảnh sản phẩm. hang = điểm treo charm (mỗi điểm 1 món);
        // front = vùng thân trước, tâm ghim/nơ phải nằm trong đó; spots = chỗ đặt sẵn (tuỳ chọn). scale = cỡ phụ kiện so với khung ảnh.
        const craftAccessoryAnchors = {
            'HM-BAG-SAKURA-04': {
                scale: 1.25,
                hang: [{ id: 'handle-left', vi: 'Quai trái', en: 'Left handle', p: [0.30, 0.095] },
                       { id: 'handle-right', vi: 'Quai phải', en: 'Right handle', p: [0.615, 0.095] }],
                front: [[0.14, 0.18], [0.80, 0.17], [0.80, 0.66], [0.68, 0.70], [0.27, 0.70], [0.14, 0.66]],
                spots: [[0.70, 0.60], [0.22, 0.28], [0.40, 0.65], [0.74, 0.22]] // chỗ nền đen trống, tránh cành hoa
            },
            'HM-BAG-FUCHSIA-05': {
                scale: 0.9,
                hang: [{ id: 'handle-left', vi: 'Quai trái', en: 'Left handle', p: [0.578, 0.585] },
                       { id: 'bow-knot', vi: 'Nút nơ', en: 'Bow knot', p: [0.752, 0.48] },
                       { id: 'handle-right', vi: 'Quai phải', en: 'Right handle', p: [0.928, 0.585] }],
                front: [[0.56, 0.73], [0.94, 0.73], [0.95, 0.94], [0.55, 0.945]]
            },
            'HM-BAG-OCEAN-02': {
                scale: 1.1,
                hang: [{ id: 'rim-left', vi: 'Miệng túi trái', en: 'Left rim', p: [0.21, 0.44] },
                       { id: 'rim-right', vi: 'Miệng túi phải', en: 'Right rim', p: [0.81, 0.44] }],
                front: [[0.17, 0.52], [0.83, 0.52], [0.83, 0.93], [0.17, 0.93]],
                spots: [[0.74, 0.72], [0.24, 0.86], [0.76, 0.88], [0.45, 0.60]] // tránh cá & sao biển len có sẵn
            },
            'HM-BAG-SUNFLOWER-03': {
                scale: 1.1,
                hang: [{ id: 'strap-left', vi: 'Quai trái', en: 'Left strap', p: [0.40, 0.43] },
                       { id: 'strap-right', vi: 'Quai phải', en: 'Right strap', p: [0.61, 0.44] }],
                front: [[0.16, 0.52], [0.86, 0.51], [0.80, 0.93], [0.21, 0.93]]
            },
            'HM-POUCH-CAT-06': {
                scale: 0.75,
                hang: [{ id: 'zip-left', vi: 'Khoá kéo trái', en: 'Zip left', p: [0.33, 0.15] },
                       { id: 'zip-right', vi: 'Khoá kéo phải', en: 'Zip right', p: [0.71, 0.15] }],
                front: [[0.37, 0.22], [0.69, 0.22], [0.68, 0.47], [0.37, 0.47]],
                spots: [[0.41, 0.25], [0.64, 0.25], [0.41, 0.44], [0.65, 0.44]] // bốn góc, chừa mặt mèo
            },
            'HM-SET-YELLOW-07': {
                scale: 0.85,
                hang: [{ id: 'bag-left', vi: 'Góc túi trái', en: 'Bag left corner', p: [0.27, 0.56] },
                       { id: 'bag-right', vi: 'Góc túi phải', en: 'Bag right corner', p: [0.69, 0.56] }],
                front: [[0.28, 0.61], [0.69, 0.61], [0.69, 0.86], [0.28, 0.86]]
            }
            // HM-DOLL-ROSE-01: búp bê không có quai / mặt túi → không gắn phụ kiện.
        };

        // ---- Color math (sRGB <-> CIELAB D65) with lookup tables for speed ----
        const craftSrgbToLinear = new Float32Array(256);
        for (let i = 0; i < 256; i++) {
            const c = i / 255;
            craftSrgbToLinear[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        }
        const CRAFT_LIN_LUT_SIZE = 4096;
        const craftLinearToSrgb = new Uint8ClampedArray(CRAFT_LIN_LUT_SIZE + 1);
        for (let i = 0; i <= CRAFT_LIN_LUT_SIZE; i++) {
            const c = i / CRAFT_LIN_LUT_SIZE;
            craftLinearToSrgb[i] = Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055));
        }
        function craftLabF(t) { return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; }
        function craftLabFInv(t) { const t3 = t * t * t; return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787; }
        function craftRgbToLab(r, g, b) {
            const lr = craftSrgbToLinear[r], lg = craftSrgbToLinear[g], lb = craftSrgbToLinear[b];
            const fx = craftLabF((lr * 0.4124 + lg * 0.3576 + lb * 0.1805) / 0.95047);
            const fy = craftLabF(lr * 0.2126 + lg * 0.7152 + lb * 0.0722);
            const fz = craftLabF((lr * 0.0193 + lg * 0.1192 + lb * 0.9505) / 1.08883);
            return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
        }
        function craftLinToByte(v) {
            return craftLinearToSrgb[Math.round(Math.min(1, Math.max(0, v)) * CRAFT_LIN_LUT_SIZE)];
        }
        function craftHexToLab(hex) {
            const n = parseInt(hex.slice(1), 16);
            return craftRgbToLab(n >> 16, (n >> 8) & 255, n & 255);
        }

        // ---- Photo + mask loading (cached per product) ----
        const craftPhotoCache = {};   // prodId -> Promise<entry>
        const craftPhotoEntries = {}; // prodId -> entry (once loaded)

        function loadCraftImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Cannot load ' + src));
                img.src = src;
            });
        }

        function loadCraftPhotoBase(prodId) {
            const cfg = craftPhotoBases[prodId];
            if (!cfg) return Promise.resolve(null);
            if (craftPhotoCache[prodId]) return craftPhotoCache[prodId];

            craftPhotoCache[prodId] = Promise.all([
                loadCraftImage(cfg.photo),
                cfg.mask ? loadCraftImage(cfg.mask) : Promise.resolve(null)
            ]).then(([photo, maskImg]) => {
                const W = photo.naturalWidth, H = photo.naturalHeight, N = W * H;
                const entry = { cfg, photo, W, H, canRecolor: false, lastKey: null, lastImage: null };
                const work = document.createElement('canvas');
                work.width = W; work.height = H;
                const wctx = work.getContext('2d', { willReadFrequently: true });
                wctx.drawImage(photo, 0, 0);

                let base;
                try {
                    base = wctx.getImageData(0, 0, W, H);
                } catch (err) {
                    // Canvas bị "tainted" khi mở trang bằng file:// → chỉ hiển thị ảnh gốc.
                    return entry;
                }
                entry.base = base;
                if (!maskImg || !cfg.zones.length) return entry;

                // Source lightness L* for every pixel (a*/b* are replaced, so not stored)
                const L = new Float32Array(N), d = base.data;
                for (let i = 0, p = 0; i < N; i++, p += 4) {
                    const lr = craftSrgbToLinear[d[p]], lg = craftSrgbToLinear[d[p + 1]], lb = craftSrgbToLinear[d[p + 2]];
                    L[i] = 116 * craftLabF(lr * 0.2126 + lg * 0.7152 + lb * 0.0722) - 16;
                }

                wctx.clearRect(0, 0, W, H);
                wctx.drawImage(maskImg, 0, 0, W, H);
                const md = wctx.getImageData(0, 0, W, H).data;
                entry.zones = cfg.zones.map((z, k) => {
                    const idx = [], weight = [];
                    let sum = 0, sum2 = 0, n = 0;
                    for (let i = 0; i < N; i++) {
                        const m = md[i * 4 + k];
                        if (m < 2) continue;
                        idx.push(i); weight.push(m / 255);
                        if (m > 127) { sum += L[i]; sum2 += L[i] * L[i]; n++; }
                    }
                    const mean = n ? sum / n : 50;
                    const std = n ? Math.sqrt(Math.max(1, sum2 / n - mean * mean)) : 8;
                    return { idx: Uint32Array.from(idx), weight: Float32Array.from(weight), mean, std };
                });
                entry.L = L;
                entry.canRecolor = true;
                return entry;
            }).then(entry => {
                craftPhotoEntries[prodId] = entry;
                return entry;
            }).catch(err => {
                delete craftPhotoCache[prodId];
                throw err;
            });
            return craftPhotoCache[prodId];
        }

        // Recolor one zone: keep the yarn's relative light/shadow (normalized), swap hue & chroma.
        function recolorCraftZone(entry, zone, out, hex) {
            const [Lt, at, bt] = craftHexToLab(hex);
            // Texture contrast: follow the source, but keep it readable on very dark/light targets.
            const darkness = Math.min(1, Lt / 55);
            const targetStd = Math.min(13, Math.max(6, zone.std)) * (0.5 + 0.5 * darkness);
            const meanL = Math.min(Lt, 97 - 1.4 * targetStd);
            const k = targetStd / zone.std;
            const L = entry.L, { idx, weight } = zone;
            for (let j = 0; j < idx.length; j++) {
                const i = idx[j], m = weight[j];
                const Ln = Math.max(0, Math.min(100, meanL + (L[i] - zone.mean) * k));
                // shadows carry slightly less chroma, highlights slightly more → looks like real dyed yarn
                const c = 0.8 + 0.2 * Math.min(1.5, Ln / Math.max(8, meanL));
                const fy = (Ln + 16) / 116, fx = fy + (at * c) / 500, fz = fy - (bt * c) / 200;
                const x = craftLabFInv(fx) * 0.95047, y = craftLabFInv(fy), z = craftLabFInv(fz) * 1.08883;
                const r = craftLinToByte(x * 3.2406 - y * 1.5372 - z * 0.4986);
                const g = craftLinToByte(-x * 0.9689 + y * 1.8758 + z * 0.0415);
                const b = craftLinToByte(x * 0.0557 - y * 0.2040 + z * 1.0570);
                const p = i * 4;
                out[p] = out[p] * (1 - m) + r * m;
                out[p + 1] = out[p + 1] * (1 - m) + g * m;
                out[p + 2] = out[p + 2] * (1 - m) + b * m;
            }
        }

        function getRecoloredCraftImage(entry) {
            const key = craftState.zoneColors.map(c => c || '-').join('|');
            if (entry.lastKey === key) return entry.lastImage;
            const out = new ImageData(new Uint8ClampedArray(entry.base.data), entry.W, entry.H);
            entry.zones.forEach((zone, k) => {
                const pal = craftPalettes.find(c => c.id === craftState.zoneColors[k]);
                if (pal) recolorCraftZone(entry, zone, out.data, pal.hex);
            });
            entry.lastKey = key;
            entry.lastImage = out;
            return out;
        }

        // ---- UI ----
        function populateCraftBaseSelector(targetId) {
            const select = document.getElementById('craftBaseSelect');
            if (!select) return;
            const hmProducts = products.filter(p => p.category === 'handmade');
            const activeId = targetId || craftState.baseProductId || (hmProducts[0] ? hmProducts[0].id : '');
            select.innerHTML = hmProducts.map(p => {
                const title = currentLang === 'vi' ? p.title_vi : p.title_en;
                return `<option value="${p.id}" ${p.id === activeId ? 'selected' : ''}>${title}</option>`;
            }).join('');
            select.value = activeId;
            if (typeof initCustomSelect === 'function') {
                initCustomSelect(select);
            }
        }

        function openHandmadeCustomizer(productId) {
            const hmProducts = products.filter(p => p.category === 'handmade');
            const target = hmProducts.find(p => p.id === productId) || hmProducts[0];
            if (!target) return;

            initCraftAccessoryDrag();
            populateCraftBaseSelector(target.id);
            applyDefaultCraftPresetForProduct(target.id);
            refreshCraftControls();
            renderCraftCustomCanvas();

            document.getElementById('handmadeCustomizerModal').classList.remove('hidden');
        }

        function closeHandmadeCustomizer() {
            document.getElementById('handmadeCustomizerModal').classList.add('hidden');
        }

        function applyDefaultCraftPresetForProduct(prodId) {
            craftState.baseProductId = prodId;
            const cfg = craftPhotoBases[prodId];
            craftState.zoneColors = cfg ? cfg.zones.map(() => null) : [];
            craftState.activeZone = 0;
            craftState.accessories = [];
            craftAccDrag = null;
        }

        function onCraftBaseChange(prodId) {
            applyDefaultCraftPresetForProduct(prodId);
            refreshCraftControls();
            renderCraftCustomCanvas();
        }

        function refreshCraftControls() {
            renderCraftZoneTabs();
            renderCraftColorSwatches();
            renderCraftAccessoryControls();
            updateCraftUIButtons();
        }

        function craftZoneLabel(zone) {
            return currentLang === 'vi' ? zone.vi : zone.en;
        }

        function craftColorLabel(colorId) {
            const pal = craftPalettes.find(c => c.id === colorId);
            if (!pal) return currentLang === 'vi' ? 'Màu gốc' : 'Original';
            return currentLang === 'vi' ? pal.vi : pal.en;
        }

        function renderCraftZoneTabs() {
            const container = document.getElementById('craftZoneTabs');
            if (!container) return;
            const cfg = craftPhotoBases[craftState.baseProductId];
            const zones = cfg ? cfg.zones : [];
            if (zones.length < 2) {
                container.innerHTML = '';
                container.classList.add('hidden');
                return;
            }
            container.classList.remove('hidden');
            container.innerHTML = zones.map((z, k) => {
                const active = k === craftState.activeZone;
                const pal = craftPalettes.find(c => c.id === craftState.zoneColors[k]);
                const dot = pal
                    ? `<span class="w-3 h-3 rounded-full border border-black/10" style="background:${pal.hex}"></span>`
                    : `<span class="w-3 h-3 rounded-full border border-stone-400 bg-[conic-gradient(#F4A6BE,#F2C94C,#8FAF6A,#2B7BB9,#F4A6BE)]"></span>`;
                return `<button type="button" onclick="setCraftActiveZone(${k})"
                    class="px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1.5 border transition-colors ${active ? 'bg-slateart text-white border-slateart' : 'bg-linen text-slateart border-stone-300 hover:border-slateart'}">
                    ${dot}<span>${craftZoneLabel(z)}</span>
                </button>`;
            }).join('');
        }

        function setCraftActiveZone(k) {
            craftState.activeZone = k;
            renderCraftZoneTabs();
            renderCraftColorSwatches();
        }

        function renderCraftColorSwatches() {
            const container = document.getElementById('craftColorSwatches');
            const label = document.getElementById('craftColorNameLabel');
            const cfg = craftPhotoBases[craftState.baseProductId];
            if (!cfg || !cfg.zones.length) {
                label.textContent = '';
                container.innerHTML = `<p class="text-xs text-stone-600 leading-relaxed">${currentLang === 'vi'
                    ? 'Mẫu này phối màu theo tư vấn riêng — ghi màu mong muốn ở mục ghi chú khi đặt hàng, nghệ nhân sẽ gửi bảng sợi để bạn chọn.'
                    : 'Colors for this piece are chosen with our artisan — note your preferred colors when ordering and we will send yarn swatches.'}</p>`;
                return;
            }
            const currentId = craftState.zoneColors[craftState.activeZone] || null;
            label.textContent = craftColorLabel(currentId);

            const originalBtn = `
                <button type="button" onclick="selectCraftColor(null)"
                    class="w-9 h-9 rounded-full border-2 transition-transform flex items-center justify-center bg-white text-slateart ${!currentId ? 'scale-110 border-terracotta ring-2 ring-terracotta/40' : 'border-stone-300 hover:scale-105'}"
                    title="${currentLang === 'vi' ? 'Màu gốc' : 'Original'}">
                    <i class="fa-solid fa-rotate-left text-xs"></i>
                </button>`;
            container.innerHTML = originalBtn + craftPalettes.map(c => {
                const isSelected = c.id === currentId;
                const lightSwatch = ['ivory', 'cream', 'yellow', 'pink'].includes(c.id);
                return `
                    <button type="button" onclick="selectCraftColor('${c.id}')"
                        class="w-9 h-9 rounded-full border-2 transition-transform flex items-center justify-center ${isSelected ? 'scale-110 border-terracotta ring-2 ring-terracotta/40' : 'border-stone-300 hover:scale-105'}"
                        style="background-color: ${c.hex};"
                        title="${currentLang === 'vi' ? c.vi : c.en}">
                        ${isSelected ? `<i class="fa-solid fa-check text-xs ${lightSwatch ? 'text-slateart' : 'text-white'}"></i>` : ''}
                    </button>
                `;
            }).join('');
        }

        function selectCraftColor(colorId) {
            craftState.zoneColors[craftState.activeZone] = colorId;
            renderCraftZoneTabs();
            renderCraftColorSwatches();
            renderCraftCustomCanvas();
        }

        function uploadCraftCustomImage(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    craftState.customUploadedImg = img;
                    updateCraftUIButtons();
                    renderCraftCustomCanvas();
                    showToast(currentLang === 'vi'
                        ? 'Đã đính ảnh của bạn lên sản phẩm handmade!'
                        : 'Applied your photo patch onto the handmade preview!');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
            event.target.value = '';
        }

        function removeCraftCustomImage() {
            craftState.customUploadedImg = null;
            updateCraftUIButtons();
            renderCraftCustomCanvas();
        }

        function setCraftSize(sizeCode) {
            craftState.size = sizeCode;
            updateCraftUIButtons();
            renderCraftCustomCanvas();
        }

        function onCraftTextChange(val) {
            craftState.customText = val.trim();
            renderCraftCustomCanvas();
        }

        function setCraftStageBg(hex) {
            document.getElementById('craftStageBg').style.backgroundColor = hex;
        }

        function updateCraftUIButtons() {
            const removeBtn = document.getElementById('craftRemovePatchBtn');
            if (removeBtn) removeBtn.classList.toggle('hidden', !craftState.customUploadedImg);

            ['S', 'M', 'L'].forEach(sz => {
                const btn = document.getElementById('sizeBtn-' + sz);
                if (sz === craftState.size) {
                    btn.className = "py-2 rounded-lg border-2 border-slateart bg-slateart text-white font-bold";
                } else {
                    btn.className = "py-2 rounded-lg border border-stone-300 bg-linen font-bold text-slateart";
                }
            });

            const wrapper = document.getElementById('craftCanvasWrapper');
            const sizeTag = document.getElementById('craftSizeDimensionTag');
            if (craftState.size === 'S') {
                wrapper.style.transform = 'scale(0.86)';
                sizeTag.textContent = 'Size S (22x18cm)';
            } else if (craftState.size === 'M') {
                wrapper.style.transform = 'scale(1)';
                sizeTag.textContent = 'Size M (30x25cm)';
            } else {
                wrapper.style.transform = 'scale(1.1)';
                sizeTag.textContent = 'Size L (38x32cm)';
            }
        }

        function getCustomizedCraftPrice() {
            const baseProd = products.find(p => p.id === craftState.baseProductId) || products[0];
            const multiplier = craftState.size === 'S' ? 0.85 : craftState.size === 'L' ? 1.2 : 1.0;
            const accessoriesVND = craftState.accessories.reduce((sum, it) => sum + ((getCraftAccessory(it.accId) || {}).priceVND || 0), 0);
            return Math.round((baseProd.priceVND * multiplier) / 10000) * 10000 + accessoriesVND;
        }

        // "Thân túi: Xanh Đại Dương • Hoa đào: Màu gốc"
        function describeCraftColors() {
            const cfg = craftPhotoBases[craftState.baseProductId];
            if (!cfg || !cfg.zones.length) return currentLang === 'vi' ? 'Màu theo tư vấn' : 'Artisan-matched colors';
            if (cfg.zones.length === 1) return craftColorLabel(craftState.zoneColors[0]);
            return cfg.zones.map((z, k) => `${craftZoneLabel(z)}: ${craftColorLabel(craftState.zoneColors[k])}`).join(', ');
        }

        let craftRenderToken = 0;
        function renderCraftCustomCanvas() {
            const canvas = document.getElementById('craftCustomCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const prodId = craftState.baseProductId;
            const token = ++craftRenderToken;

            updateCraftSummary();

            const entry = craftPhotoEntries[prodId];
            if (!entry) {
                // Loading placeholder, then render once photo + mask are ready
                ctx.fillStyle = '#F7F4EE';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#8A8178';
                ctx.font = `bold ${Math.round(canvas.width / 26)}px "Be Vietnam Pro", sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(currentLang === 'vi' ? 'Đang tải ảnh mẫu…' : 'Loading photo…', canvas.width / 2, canvas.height / 2);
                loadCraftPhotoBase(prodId).then(() => {
                    if (token === craftRenderToken) renderCraftCustomCanvas();
                }).catch(() => {
                    if (token !== craftRenderToken) return;
                    ctx.fillStyle = '#F7F4EE';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#B2533E';
                    ctx.fillText(currentLang === 'vi' ? 'Không tải được ảnh mẫu' : 'Could not load photo', canvas.width / 2, canvas.height / 2);
                });
                return;
            }

            const { W, H } = entry;
            if (canvas.width !== W || canvas.height !== H) {
                canvas.width = W;
                canvas.height = H;
            }

            if (entry.canRecolor) {
                ctx.putImageData(getRecoloredCraftImage(entry), 0, 0);
            } else {
                ctx.drawImage(entry.photo, 0, 0, W, H);
                if (!entry.base && craftState.zoneColors.some(Boolean) && !renderCraftCustomCanvas.warned) {
                    renderCraftCustomCanvas.warned = true;
                    showToast(currentLang === 'vi'
                        ? 'Hãy mở trang qua máy chủ web (không phải file://) để xem phối màu.'
                        : 'Open the site through a web server (not file://) to preview colors.');
                }
            }

            // Pet photo patch: round, with a stitched yarn border
            const [px, py, pr] = entry.cfg.patch;
            if (craftState.customUploadedImg) {
                const img = craftState.customUploadedImg;
                const side = Math.min(img.naturalWidth, img.naturalHeight);
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.35)';
                ctx.shadowBlur = pr * 0.25;
                ctx.shadowOffsetY = pr * 0.06;
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(px, py, pr + pr * 0.12, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                ctx.save();
                ctx.beginPath();
                ctx.arc(px, py, pr, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side,
                    px - pr, py - pr, pr * 2, pr * 2);
                ctx.restore();
                ctx.strokeStyle = '#C86D51';
                ctx.lineWidth = Math.max(2, pr * 0.06);
                ctx.setLineDash([pr * 0.12, pr * 0.08]);
                ctx.beginPath();
                ctx.arc(px, py, pr + pr * 0.06, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            drawCraftAccessories(ctx, W, H);

            // Embroidered name tag (scaled to photo size)
            if (craftState.customText) {
                const s = W / 380;
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.25)';
                ctx.shadowBlur = 8 * s;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
                ctx.beginPath();
                ctx.roundRect(W / 2 - 85 * s, H - 52 * s, 170 * s, 32 * s, 10 * s);
                ctx.fill();
                ctx.restore();
                ctx.strokeStyle = '#C86D51';
                ctx.lineWidth = 1.5 * s;
                ctx.setLineDash([4 * s, 3 * s]);
                ctx.beginPath();
                ctx.roundRect(W / 2 - 81 * s, H - 48 * s, 162 * s, 24 * s, 8 * s);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = '#23262A';
                ctx.font = `bold ${Math.round(14 * s)}px "Be Vietnam Pro", sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(craftState.customText, W / 2, H - 31 * s);
            }
        }

        function updateCraftSummary() {
            const baseProd = products.find(p => p.id === craftState.baseProductId) || products[0];
            const baseTitle = currentLang === 'vi' ? baseProd.title_vi : baseProd.title_en;
            const patchLabel = craftState.customUploadedImg ? (currentLang === 'vi' ? ' • Đính ảnh riêng' : ' • Photo patch') : '';
            const accText = describeCraftAccessories(currentLang);
            const accLabel = accText ? ` • + ${accText}` : '';
            document.getElementById('craftSummaryTitle').textContent = baseTitle;
            document.getElementById('craftSummarySpecs').textContent =
                `${describeCraftColors()}${patchLabel}${accLabel} • Size ${craftState.size}${craftState.customText ? ` • "${craftState.customText}"` : ''}`;
            document.getElementById('craftSummaryPrice').textContent = formatPrice(getCustomizedCraftPrice());
        }

        // ---- Accessories: load, place, drag & snap, draw ----
        const craftAccessoryImages = {}; // accId -> HTMLImageElement
        let craftAccDrag = null;         // { item, ox, oy } while a placed accessory is being dragged

        function getCraftAccessory(accId) { return craftAccessories.find(a => a.id === accId); }

        function loadCraftAccessoryImage(acc) {
            if (!craftAccessoryImages[acc.id]) {
                const img = new Image();
                img.onload = () => renderCraftCustomCanvas();
                img.src = acc.src;
                craftAccessoryImages[acc.id] = img;
            }
            return craftAccessoryImages[acc.id];
        }

        function craftAccessoryLabel(acc) { return currentLang === 'vi' ? acc.vi : acc.en; }

        // Pixel box of a placed accessory on a W×H photo (null until its image has loaded)
        function craftAccessoryBox(item, W, H) {
            const acc = getCraftAccessory(item.accId);
            const img = acc && loadCraftAccessoryImage(acc);
            if (!img || !img.complete || !img.naturalWidth) return null;
            const anchors = craftAccessoryAnchors[craftState.baseProductId];
            const w = acc.width * W * (anchors ? anchors.scale : 1);
            const h = w * img.naturalHeight / img.naturalWidth;
            return { acc, img, w, h, x: item.x * W - acc.pivot[0] * w, y: item.y * H - acc.pivot[1] * h };
        }

        // Surface items are drawn first, hanging charms on top of them
        function craftAccessoriesInDrawOrder() {
            const rank = it => (getCraftAccessory(it.accId) || {}).type === 'hang' ? 1 : 0;
            return craftState.accessories.map((it, i) => [it, i])
                .sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(p => p[0]);
        }

        function craftPointInPolygon(x, y, poly) {
            let inside = false;
            for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                const [xi, yi] = poly[i], [xj, yj] = poly[j];
                if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
            }
            return inside;
        }

        function craftNearestPointOnPolygon(x, y, poly) {
            let best = poly[0], bestD = Infinity;
            for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                const [ax, ay] = poly[j], [bx, by] = poly[i];
                const dx = bx - ax, dy = by - ay;
                const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
                const px = ax + t * dx, py = ay + t * dy, d = (px - x) ** 2 + (py - y) ** 2;
                if (d < bestD) { bestD = d; best = [px, py]; }
            }
            return best;
        }

        function craftFreeHangAnchors(except) {
            const anchors = craftAccessoryAnchors[craftState.baseProductId];
            if (!anchors) return [];
            return anchors.hang.filter(h => !craftState.accessories.some(o => o !== except && o.anchorId === h.id));
        }

        // Charms jump to the nearest free hang point; pins/bows are pulled back inside the front panel
        function snapCraftAccessory(item) {
            const acc = getCraftAccessory(item.accId);
            const anchors = craftAccessoryAnchors[craftState.baseProductId];
            if (!acc || !anchors) return;
            if (acc.type === 'hang') {
                const free = craftFreeHangAnchors(item);
                if (!free.length) return;
                const near = free.reduce((a, b) =>
                    ((a.p[0] - item.x) ** 2 + (a.p[1] - item.y) ** 2) <= ((b.p[0] - item.x) ** 2 + (b.p[1] - item.y) ** 2) ? a : b);
                item.anchorId = near.id;
                [item.x, item.y] = near.p;
            } else {
                item.anchorId = 'front';
                if (!craftPointInPolygon(item.x, item.y, anchors.front)) {
                    [item.x, item.y] = craftNearestPointOnPolygon(item.x, item.y, anchors.front);
                }
            }
        }

        function addCraftAccessory(accId) {
            const acc = getCraftAccessory(accId);
            const anchors = craftAccessoryAnchors[craftState.baseProductId];
            if (!acc || !anchors) return;
            if (acc.type === 'hang') {
                const free = craftFreeHangAnchors(null)[0];
                if (!free) {
                    showToast(currentLang === 'vi'
                        ? 'Các điểm treo đã có charm. Bỏ bớt một charm để thêm món mới.'
                        : 'Every hanging point is taken. Remove a charm to add another.');
                    return;
                }
                craftState.accessories.push({ accId, anchorId: free.id, x: free.p[0], y: free.p[1] });
            } else {
                const used = craftState.accessories.filter(o => o.anchorId === 'front').length;
                if (used >= CRAFT_MAX_SURFACE_ITEMS) {
                    showToast(currentLang === 'vi'
                        ? `Tối đa ${CRAFT_MAX_SURFACE_ITEMS} ghim/nơ trên thân túi.`
                        : `Up to ${CRAFT_MAX_SURFACE_ITEMS} pins/bows on the front.`);
                    return;
                }
                const poly = anchors.front;
                const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length;
                const cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
                const spread = [[0, 0], [-0.13, -0.07], [0.13, 0.07], [0.12, -0.08]][used] || [0, 0];
                const spot = anchors.spots && anchors.spots[used];
                const item = spot ? { accId, anchorId: 'front', x: spot[0], y: spot[1] }
                    : { accId, anchorId: 'front', x: cx + spread[0], y: cy + spread[1] };
                snapCraftAccessory(item);
                craftState.accessories.push(item);
            }
            renderCraftAccessoryControls();
            renderCraftCustomCanvas();
        }

        function removeCraftAccessory(index) {
            craftState.accessories.splice(index, 1);
            renderCraftAccessoryControls();
            renderCraftCustomCanvas();
        }

        function renderCraftAccessoryControls() {
            const tray = document.getElementById('craftAccessoryTray');
            const placed = document.getElementById('craftAccessoryPlaced');
            const note = document.getElementById('craftAccessoryNote');
            if (!tray || !placed) return;
            const anchors = craftAccessoryAnchors[craftState.baseProductId];
            const vi = currentLang === 'vi';

            tray.classList.toggle('hidden', !anchors);
            if (note) {
                note.textContent = anchors
                    ? (vi ? 'Chạm để thêm, rồi kéo trên ảnh để đổi chỗ. Charm tự bám vào điểm treo gần nhất.'
                          : 'Tap to add, then drag on the photo to move it. Charms snap to the nearest hanging point.')
                    : (vi ? 'Mẫu này chưa hỗ trợ gắn phụ kiện — hãy ghi chú khi đặt hàng nhé.'
                          : 'Accessories are not available for this piece yet — add a note with your order.');
            }

            tray.innerHTML = craftAccessories.filter(acc => !acc.draft).map(acc => `
                <button type="button" onclick="addCraftAccessory('${acc.id}')"
                    class="flex flex-col items-center gap-1 p-2 rounded-xl border border-stone-300 bg-linen hover:border-terracotta transition-colors">
                    <img src="${acc.src}" alt="" class="h-9 w-9 object-contain pointer-events-none">
                    <span class="text-[10px] sm:text-[11px] font-bold text-slateart leading-tight text-center">${craftAccessoryLabel(acc)}</span>
                    <span class="text-[9px] sm:text-[10px] text-terracotta font-semibold">+${formatPrice(acc.priceVND)}</span>
                </button>`).join('');

            placed.innerHTML = craftState.accessories.map((item, i) => {
                const acc = getCraftAccessory(item.accId);
                return `<span class="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full bg-terracotta/10 text-terracotta text-[11px] font-bold">
                    ${craftAccessoryLabel(acc)}
                    <button type="button" onclick="removeCraftAccessory(${i})" class="w-5 h-5 rounded-full hover:bg-terracotta/20 flex items-center justify-center" aria-label="${vi ? 'Bỏ' : 'Remove'}">
                        <i class="fa-solid fa-xmark text-[10px]"></i>
                    </button></span>`;
            }).join('');
            placed.classList.toggle('hidden', !craftState.accessories.length);

            // Page can still scroll over the photo until there is something to drag
            const canvas = document.getElementById('craftCustomCanvas');
            if (canvas) {
                canvas.style.touchAction = craftState.accessories.length ? 'none' : '';
                canvas.style.cursor = craftState.accessories.length ? 'grab' : '';
            }
        }

        function drawCraftAccessories(ctx, W, H) {
            const anchors = craftAccessoryAnchors[craftState.baseProductId];
            if (!anchors || !craftState.accessories.length) return;

            if (craftAccDrag) {
                // Placement hints while dragging
                const s = W / 800;
                ctx.save();
                ctx.setLineDash([8 * s, 6 * s]);
                ctx.lineWidth = 2.5 * s;
                const dragType = getCraftAccessory(craftAccDrag.item.accId).type;
                if (dragType === 'surface') {
                    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
                    ctx.beginPath();
                    anchors.front.forEach(([x, y], k) => k ? ctx.lineTo(x * W, y * H) : ctx.moveTo(x * W, y * H));
                    ctx.closePath();
                    ctx.stroke();
                } else {
                    craftFreeHangAnchors(craftAccDrag.item).forEach(h => {
                        ctx.fillStyle = 'rgba(178,83,62,0.35)';
                        ctx.strokeStyle = '#FFFFFF';
                        ctx.beginPath();
                        ctx.arc(h.p[0] * W, h.p[1] * H, 16 * s, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.stroke();
                    });
                }
                ctx.restore();
            }

            craftAccessoriesInDrawOrder().forEach(item => {
                const b = craftAccessoryBox(item, W, H);
                if (!b) return;
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.32)';
                ctx.shadowBlur = W * 0.012;
                ctx.shadowOffsetY = W * 0.006;
                ctx.drawImage(b.img, b.x, b.y, b.w, b.h);
                ctx.restore();
            });
        }

        function initCraftAccessoryDrag() {
            const canvas = document.getElementById('craftCustomCanvas');
            if (!canvas || canvas.dataset.accDrag) return;
            canvas.dataset.accDrag = '1';

            const toNorm = e => {
                const r = canvas.getBoundingClientRect();
                return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
            };

            canvas.addEventListener('pointerdown', e => {
                if (!craftState.accessories.length) return;
                const [nx, ny] = toNorm(e);
                const W = canvas.width, H = canvas.height;
                const hit = craftAccessoriesInDrawOrder().reverse().find(item => {
                    const b = craftAccessoryBox(item, W, H);
                    return b && nx * W >= b.x && nx * W <= b.x + b.w && ny * H >= b.y && ny * H <= b.y + b.h;
                });
                if (!hit) return;
                e.preventDefault();
                canvas.setPointerCapture(e.pointerId);
                canvas.style.cursor = 'grabbing';
                craftAccDrag = { item: hit, ox: nx - hit.x, oy: ny - hit.y };
                renderCraftCustomCanvas();
            });

            canvas.addEventListener('pointermove', e => {
                if (!craftAccDrag) return;
                const [nx, ny] = toNorm(e);
                craftAccDrag.item.x = Math.max(0, Math.min(1, nx - craftAccDrag.ox));
                craftAccDrag.item.y = Math.max(0, Math.min(1, ny - craftAccDrag.oy));
                renderCraftCustomCanvas();
            });

            const endDrag = () => {
                if (!craftAccDrag) return;
                snapCraftAccessory(craftAccDrag.item);
                craftAccDrag = null;
                canvas.style.cursor = 'grab';
                renderCraftCustomCanvas();
            };
            canvas.addEventListener('pointerup', endDrag);
            canvas.addEventListener('pointercancel', endDrag);
        }

        // "Charm tim, Nơ satin ×2" in the given language ('' when none)
        function describeCraftAccessories(lang) {
            const counts = {};
            craftState.accessories.forEach(it => { counts[it.accId] = (counts[it.accId] || 0) + 1; });
            return Object.entries(counts).map(([id, n]) => {
                const acc = getCraftAccessory(id);
                return `${lang === 'vi' ? acc.vi : acc.en}${n > 1 ? ' ×' + n : ''}`;
            }).join(', ');
        }

        function addCustomizedHandmadeToCart() {
            const baseProd = products.find(p => p.id === craftState.baseProductId) || products[0];
            const canvas = document.getElementById('craftCustomCanvas');
            let customImgUrl = null;
            try {
                // cart thumbnail: downscale to keep memory small
                const thumb = document.createElement('canvas');
                thumb.width = 480;
                thumb.height = Math.round(480 * canvas.height / canvas.width);
                thumb.getContext('2d').drawImage(canvas, 0, 0, thumb.width, thumb.height);
                customImgUrl = thumb.toDataURL('image/jpeg', 0.88);
            } catch (err) {
                customImgUrl = null; // tainted canvas (file://) → cart falls back to the catalog image
            }
            const finalPrice = getCustomizedCraftPrice();

            const customId = `${baseProd.id}-CUSTOM-${Date.now()}`;
            const lang = currentLang;
            currentLang = 'vi';
            const colorsVi = describeCraftColors();
            currentLang = 'en';
            const colorsEn = describeCraftColors();
            currentLang = lang;
            const patchVi = craftState.customUploadedImg ? ', đính ảnh riêng' : '';
            const patchEn = craftState.customUploadedImg ? ', photo patch' : '';
            const accVi = craftState.accessories.length ? `, + ${describeCraftAccessories('vi')}` : '';
            const accEn = craftState.accessories.length ? `, + ${describeCraftAccessories('en')}` : '';
            const nameNoteVi = craftState.customText ? ` (Thêu tên: ${craftState.customText})` : '';
            const nameNoteEn = craftState.customText ? ` (Name: ${craftState.customText})` : '';

            const customizedProduct = {
                ...baseProd,
                id: customId,
                code: `${baseProd.code}-${craftState.size}`,
                priceVND: finalPrice,
                title_vi: `${baseProd.title_vi} [${colorsVi}${patchVi}${accVi}, Size ${craftState.size}]${nameNoteVi}`,
                title_en: `${baseProd.title_en} [${colorsEn}${patchEn}${accEn}, Size ${craftState.size}]${nameNoteEn}`
            };

            if (customImgUrl) customPhotoMap[customId] = customImgUrl;
            cart.push({ product: customizedProduct, qty: 1 });
            renderCart();
            closeHandmadeCustomizer();
            showToast(currentLang === 'vi'
                ? 'Đã lưu thiết kế handmade của bạn và thêm vào giỏ hàng!'
                : 'Saved your custom handmade design and added to bag!');
            toggleCartDrawer(true);
        }

        // --- 9. PHOTO MANAGER MODAL (FOR UPLOADING REAL CAMERA PHOTOS) ---
        function openPhotoManagerModal() {
            const list = document.getElementById('photoManagerList');
            list.innerHTML = products.slice(0, 14).map(p => {
                const title = currentLang === 'vi' ? p.title_vi : p.title_en;
                return `
                    <div class="p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <img src="${getProductImageSrc(p)}" class="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200">
                            <div class="min-w-0">
                                <div class="text-[10px] font-mono text-stone-400">${p.code} ${p.localFileHint ? `(${p.localFileHint})` : ''}</div>
                                <div class="text-xs font-bold text-slateart truncate">${title}</div>
                            </div>
                        </div>
                        <label class="shrink-0 px-2.5 py-1.5 rounded-lg bg-rawcanvas hover:bg-terracotta hover:text-white text-xs font-semibold cursor-pointer transition-colors">
                            <i class="fa-solid fa-upload mr-1"></i>Chọn ảnh
                            <input type="file" accept="image/*" class="hidden" onchange="uploadPhotoForId(event, '${p.id}')">
                        </label>
                    </div>
                `;
            }).join('');
            document.getElementById('photoManagerModal').classList.remove('hidden');
        }

        function closePhotoManagerModal() {
            document.getElementById('photoManagerModal').classList.add('hidden');
        }

        function uploadPhotoForId(event, prodId) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                customPhotoMap[prodId] = e.target.result;
                updateHeroImages();
                renderProducts();
                openPhotoManagerModal();
                showToast(currentLang === 'vi' ? 'Đã cập nhật ảnh sản phẩm!' : 'Product image updated!');
            };
            reader.readAsDataURL(file);
        }

        // --- 10. SHOPPING CART & CHECKOUT ---
        function addToCart(productId) {
            const p = products.find(item => item.id === productId);
            if (!p) return;

            const existing = cart.find(item => item.product.id === productId);
            if (existing) {
                if (p.category === 'oilpainting') {
                    showToast(currentLang === 'vi'
                        ? 'Tác phẩm Sơn Dầu Độc Bản 1/1 đã có trong giỏ hàng của bạn!'
                        : 'This 1/1 Original Oil Painting is already in your bag!');
                    toggleCartDrawer(true);
                    return;
                }
                existing.qty += 1;
            } else {
                cart.push({ product: p, qty: 1 });
            }

            renderCart();
            showToast(currentLang === 'vi'
                ? `Đã thêm "${p.title_vi}" vào giỏ hàng!`
                : `Added "${p.title_en}" to your bag!`);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.product.id !== productId);
            renderCart();
        }

        function toggleCartDrawer(open) {
            const drawer = document.getElementById('cartDrawer');
            const backdrop = document.getElementById('cartDrawerBackdrop');
            if (open) {
                backdrop.classList.remove('hidden');
                drawer.classList.remove('translate-x-full');
            } else {
                backdrop.classList.add('hidden');
                drawer.classList.add('translate-x-full');
                checkoutStep = 1;
                document.getElementById('checkoutFields').classList.add('hidden');
                document.getElementById('checkoutBtnText').textContent = i18n[currentLang].proceedCheckoutBtn;
            }
        }

        function renderCart() {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            document.getElementById('cartCountBadge').textContent = count;

            const container = document.getElementById('cartItemsContainer');
            const totalVND = cart.reduce((sum, item) => sum + item.product.priceVND * item.qty, 0);
            document.getElementById('cartTotalPrice').textContent = formatPrice(totalVND);

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="py-16 text-center text-stone-500 space-y-2">
                        <i class="fa-solid fa-bag-shopping text-3xl text-stone-300"></i>
                        <p class="text-sm">${currentLang === 'vi' ? 'Giỏ hàng của bạn đang trống.' : 'Your shopping bag is currently empty.'}</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = cart.map(({ product, qty }) => {
                const title = currentLang === 'vi' ? product.title_vi : product.title_en;
                return `
                    <div class="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-stone-200 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs">
                        <img src="${getProductImageSrc(product)}" class="w-14 h-16 sm:w-16 sm:h-20 rounded-lg sm:rounded-xl object-cover shrink-0 border border-stone-200">
                        <div class="flex-1 min-w-0">
                            <div class="text-[10px] font-mono text-stone-400">${product.code}</div>
                            <h4 class="text-xs sm:text-sm font-bold text-slateart truncate">${title}</h4>
                            <div class="text-xs font-bold text-terracotta mt-0.5 sm:mt-1">${formatPrice(product.priceVND)} × ${qty}</div>
                        </div>
                        <button onclick="removeFromCart('${product.id}')" class="text-stone-400 hover:text-red-600 p-1.5 shrink-0">
                            <i class="fa-solid fa-trash-can text-xs"></i>
                        </button>
                    </div>
                `;
            }).join('');
        }

        function handleCheckoutStep() {
            if (cart.length === 0) {
                showToast(currentLang === 'vi' ? 'Vui lòng chọn ít nhất 1 tác phẩm!' : 'Please add at least 1 item to your bag!');
                return;
            }
            if (checkoutStep === 1) {
                checkoutStep = 2;
                document.getElementById('checkoutFields').classList.remove('hidden');
                document.getElementById('checkoutBtnText').textContent = i18n[currentLang].confirmOrderBtn;
                return;
            }

            const name = document.getElementById('orderName').value.trim();
            const phone = document.getElementById('orderPhone').value.trim();
            if (!name || !phone) {
                showToast(currentLang === 'vi' ? 'Vui lòng nhập Họ tên và Số điện thoại nhận hàng!' : 'Please enter your Name and Phone number!');
                return;
            }

            cart = [];
            renderCart();
            toggleCartDrawer(false);
            showToast(currentLang === 'vi'
                ? `Cảm ơn ${name}! Đơn hàng của bạn đã được ghi nhận. Atelier sẽ liên hệ xác nhận ngay.`
                : `Thank you ${name}! Your order has been received. Our Atelier will contact you shortly.`);
        }

        // --- 11. CUSTOM REQUEST FORM & TOAST ---
        function submitCustomRequest(event) {
            event.preventDefault();
            const name = document.getElementById('custName').value;
            document.getElementById('customOrderForm').reset();
            showToast(currentLang === 'vi'
                ? `Cảm ơn ${name}! Yêu cầu đặt riêng & tư vấn tranh đã được gửi tới nghệ nhân.`
                : `Thank you ${name}! Your bespoke commission & art inquiry has been sent.`);
        }

        // toastTimeout already declared
        toastTimeout = null;
        function showToast(msg) {
            const toast = document.getElementById('toastNotification');
            document.getElementById('toastMessage').textContent = msg;
            toast.classList.remove('hidden');
            if (toastTimeout) clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.add('hidden');
            }, 4000);
        }

        function updateHeroImages() {
            const sakuraBag = products.find(p => p.id === 'HM-BAG-SAKURA-04');
            const gtnlPainting = products.find(p => p.id === 'NAG-GTNL-6080');
            if (sakuraBag) document.getElementById('heroHandmadeImg').src = getProductImageSrc(sakuraBag);
            if (gtnlPainting) document.getElementById('heroPaintingImg').src = getProductImageSrc(gtnlPainting);
        }


// Hook into cart functions to persist
const origAddToCart = addToCart;
addToCart = function(productId) {
    origAddToCart(productId);
    saveCartToStorage();
};

const origRemoveFromCart = removeFromCart;
removeFromCart = function(productId) {
    origRemoveFromCart(productId);
    saveCartToStorage();
};

const origAddCustomizedHandmadeToCart = addCustomizedHandmadeToCart;
addCustomizedHandmadeToCart = function() {
    origAddCustomizedHandmadeToCart();
    saveCartToStorage();
};

const origAddCurrentRoomPaintingToCart = addCurrentRoomPaintingToCart;
addCurrentRoomPaintingToCart = function() {
    origAddCurrentRoomPaintingToCart();
    saveCartToStorage();
};

// --- 13. CUSTOM LUXURY DROPDOWN / SELECT ENGINE ---
function initCustomSelect(selectEl) {
    if (!selectEl || selectEl.classList.contains('no-custom-select')) return;

    // Check if custom dropdown already exists
    let existingWrapper = selectEl.nextElementSibling;
    if (existingWrapper && existingWrapper.classList.contains('custom-dropdown-ui')) {
        existingWrapper.remove();
    }

    const isDark = selectEl.classList.contains('bg-stone-800') ||
                   selectEl.id === 'roomPaintingSelect' ||
                   Boolean(selectEl.closest && selectEl.closest('.bg-stone-900, .bg-stone-800, #roomPreviewModal'));

    const isFullWidth = selectEl.classList.contains('w-full') || selectEl.offsetWidth > 150;

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-dropdown-ui relative ' + (isFullWidth ? 'w-full' : 'inline-block min-w-[170px]');
    wrapper.dataset.targetId = selectEl.id || '';

    // Trigger button
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = isDark
        ? 'custom-dropdown-trigger w-full px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs sm:text-sm font-semibold text-stone-200 flex items-center justify-between gap-3 shadow-xs hover:border-ochre focus:outline-none transition-all cursor-pointer text-left'
        : 'custom-dropdown-trigger w-full px-3.5 py-2.5 rounded-xl bg-linen border border-stone-300 text-xs sm:text-sm font-semibold text-slateart flex items-center justify-between gap-3 shadow-xs hover:border-slateart focus:outline-none transition-all cursor-pointer text-left';

    const label = document.createElement('span');
    label.className = 'custom-dropdown-label truncate';
    const activeOpt = selectEl.options[selectEl.selectedIndex] || selectEl.options[0];
    label.textContent = activeOpt ? activeOpt.text : '';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-chevron-down text-[10px] text-stone-400 transition-transform duration-200 shrink-0';

    trigger.appendChild(label);
    trigger.appendChild(icon);
    wrapper.appendChild(trigger);

    // Dropdown list menu
    const menu = document.createElement('div');
    menu.className = isDark
        ? 'custom-dropdown-menu absolute left-0 right-0 top-full mt-1.5 bg-stone-900 rounded-2xl shadow-2xl border border-stone-700 p-1.5 z-50 hidden max-h-60 overflow-y-auto ring-1 ring-black/20'
        : 'custom-dropdown-menu absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-1.5 z-50 hidden max-h-60 overflow-y-auto ring-1 ring-black/5';

    function renderMenuItems() {
        menu.innerHTML = '';
        Array.from(selectEl.options).forEach(opt => {
            const isSelected = opt.value === selectEl.value;
            const item = document.createElement('div');
            item.className = 'custom-dropdown-item px-3 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between gap-2 ' +
                (isSelected
                    ? (isDark ? 'bg-stone-800 text-ochre font-bold' : 'bg-linen text-terracotta font-bold')
                    : (isDark ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-slateart hover:bg-linen hover:text-terracotta'));
            item.dataset.value = opt.value;

            const textSpan = document.createElement('span');
            textSpan.className = 'truncate';
            textSpan.textContent = opt.text;

            const checkIcon = document.createElement('i');
            checkIcon.className = 'fa-solid fa-check text-xs shrink-0 ' + (isSelected ? (isDark ? 'text-ochre opacity-100' : 'text-terracotta opacity-100') : 'opacity-0');

            item.appendChild(textSpan);
            item.appendChild(checkIcon);

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectEl.value = opt.value;
                label.textContent = opt.text;
                menu.classList.add('hidden');
                icon.classList.remove('rotate-180');
                wrapper.style.zIndex = '';

                renderMenuItems();

                selectEl.dispatchEvent(new Event('change', { bubbles: true }));
                if (typeof selectEl.onchange === 'function') {
                    selectEl.onchange();
                }
            });

            menu.appendChild(item);
        });
    }

    renderMenuItems();

    // Toggle menu
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = menu.classList.contains('hidden');
        // Close other dropdowns
        document.querySelectorAll('.custom-dropdown-menu').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.custom-dropdown-trigger i').forEach(ic => ic.classList.remove('rotate-180'));
        document.querySelectorAll('.custom-dropdown-ui').forEach(w => w.style.zIndex = '');

        if (willOpen) {
            menu.classList.remove('hidden');
            icon.classList.add('rotate-180');
            wrapper.style.zIndex = '60';
        }
    });

    // Listen to changes on original select
    selectEl.addEventListener('change', () => {
        const curOpt = selectEl.options[selectEl.selectedIndex];
        if (curOpt) {
            label.textContent = curOpt.text;
            renderMenuItems();
        }
    });

    wrapper.appendChild(menu);
    selectEl.style.display = 'none';
    selectEl.parentNode.insertBefore(wrapper, selectEl.nextSibling);
}

function initAllCustomSelects() {
    document.querySelectorAll('select').forEach(initCustomSelect);
}

// Global init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Set language UI
    if (currentLang !== 'vi') {
        setLanguage(currentLang);
    }
    
    // Set currency UI
    if (currentCurrency === 'USD') {
        const btn = document.getElementById('currencyBtn');
        if (btn) btn.textContent = 'USD ($)';
    }
    
    renderCart();
    if (typeof populateRoomSelector === 'function') {
        populateRoomSelector();
    }
    if (typeof populateCraftBaseSelector === 'function') {
        populateCraftBaseSelector();
    }
    if (typeof updateHeroImages === 'function') {
        updateHeroImages();
    }
    if (typeof initAllCustomSelects === 'function') {
        initAllCustomSelects();
    }
});

// Mobile navigation toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileNavMenu');
    if (menu) menu.classList.toggle('hidden');
}

// Automatically close modal & custom select dropdowns when clicking outside
document.addEventListener('click', (event) => {
    // Close custom dropdown menus if clicked outside
    if (!event.target.closest('.custom-dropdown-ui')) {
        document.querySelectorAll('.custom-dropdown-menu').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.custom-dropdown-trigger i').forEach(ic => ic.classList.remove('rotate-180'));
        document.querySelectorAll('.custom-dropdown-ui').forEach(w => w.style.zIndex = '');
    }

    const modalMap = {
        'productModal': closeProductModal,
        'roomPreviewModal': closeRoomPreviewModal,
        'photoManagerModal': closePhotoManagerModal,
        'handmadeCustomizerModal': closeHandmadeCustomizer
    };

    if (event.target && modalMap[event.target.id] && typeof modalMap[event.target.id] === 'function') {
        modalMap[event.target.id]();
    }
});

// Also close active modal & custom select on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.custom-dropdown-menu').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.custom-dropdown-trigger i').forEach(ic => ic.classList.remove('rotate-180'));
        document.querySelectorAll('.custom-dropdown-ui').forEach(w => w.style.zIndex = '');
        if (typeof closeProductModal === 'function') closeProductModal();
        if (typeof closeRoomPreviewModal === 'function') closeRoomPreviewModal();
        if (typeof closePhotoManagerModal === 'function') closePhotoManagerModal();
        if (typeof closeHandmadeCustomizer === 'function') closeHandmadeCustomizer();
        if (typeof toggleCartDrawer === 'function') toggleCartDrawer(false);
    }
});
