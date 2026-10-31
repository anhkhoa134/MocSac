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
                craftStep2: "2. Đổi Màu Sợi Len / Vải",
                craftStep3: "3. Chọn Họa Tiết Đính Nổi Hoặc Tải Ảnh Lên",
                uploadCustomMotifBtn: "Tải ảnh thú cưng",
                craftStep4Size: "4. Chọn Kích Cỡ",
                craftStep4Name: "5. Thêu Tên Lên Túi (Miễn Phí)",
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
                craftStep2: "2. Pick Yarn / Fabric Color",
                craftStep3: "3. Pick 3D Motif or Upload Pet Photo",
                uploadCustomMotifBtn: "Upload Pet Photo",
                craftStep4Size: "4. Select Size",
                craftStep4Name: "5. Free Embroidered Name",
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

        // --- 8B. HANDMADE 3D STUDIO CUSTOMIZER (COLOR, MOTIF, CUSTOM IMAGE, SIZE, TEXT) ---
        const craftPalettes = [
            { id: 'black', hex: '#1F2226', accent: '#373B42', vi: 'Đen Tuyền', en: 'Jet Black' },
            { id: 'pink', hex: '#F48FB1', accent: '#FCE4EC', vi: 'Hồng Phấn Ombre', en: 'Blossom Pink' },
            { id: 'fuchsia', hex: '#D81B60', accent: '#F06292', vi: 'Hồng Cánh Sen', en: 'Fuchsia Rose' },
            { id: 'yellow', hex: '#FDD835', accent: '#FFF59D', vi: 'Vàng Nắng Mai', en: 'Sunny Yellow' },
            { id: 'taupe', hex: '#9A8B7A', accent: '#D7CCC8', vi: 'Nâu Mộc Linen', en: 'Taupe Linen' },
            { id: 'cream', hex: '#F2DEC4', accent: '#FFF8E1', vi: 'Kem Mèo Cam', en: 'Warm Cream' },
            { id: 'sage', hex: '#689F38', accent: '#C5E1A5', vi: 'Xanh Lá Mạ', en: 'Sage Green' },
            { id: 'ocean', hex: '#0288D1', accent: '#B3E5FC', vi: 'Xanh Đại Dương', en: 'Ocean Blue' }
        ];

        let craftState = {
            baseProductId: 'HM-BAG-SAKURA-04',
            colorId: 'black',
            motif: 'sakura', // 'sakura', 'sunflower', 'ocean', 'cat', 'bow', 'custom_img'
            customUploadedImg: null,
            size: 'M', // 'S', 'M', 'L'
            customText: ''
        };

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

            // Populate base item selector & build custom dropdown
            populateCraftBaseSelector(target.id);

            // Set initial defaults based on chosen product
            applyDefaultCraftPresetForProduct(target.id);
            renderCraftColorSwatches();
            updateCraftUIButtons();
            renderCraftCustomCanvas();

            document.getElementById('handmadeCustomizerModal').classList.remove('hidden');
        }

        function closeHandmadeCustomizer() {
            document.getElementById('handmadeCustomizerModal').classList.add('hidden');
        }

        function applyDefaultCraftPresetForProduct(prodId) {
            craftState.baseProductId = prodId;
            if (prodId === 'HM-DOLL-ROSE-01') {
                craftState.colorId = 'pink';
                craftState.motif = 'bow';
            } else if (prodId === 'HM-BAG-OCEAN-02') {
                craftState.colorId = 'pink';
                craftState.motif = 'ocean';
            } else if (prodId === 'HM-BAG-SUNFLOWER-03') {
                craftState.colorId = 'taupe';
                craftState.motif = 'sunflower';
            } else if (prodId === 'HM-BAG-SAKURA-04') {
                craftState.colorId = 'black';
                craftState.motif = 'sakura';
            } else if (prodId === 'HM-BAG-FUCHSIA-05') {
                craftState.colorId = 'fuchsia';
                craftState.motif = 'bow';
            } else if (prodId === 'HM-POUCH-CAT-06') {
                craftState.colorId = 'cream';
                craftState.motif = 'cat';
            } else {
                craftState.colorId = 'yellow';
                craftState.motif = 'sakura';
            }
        }

        function onCraftBaseChange(prodId) {
            applyDefaultCraftPresetForProduct(prodId);
            renderCraftColorSwatches();
            updateCraftUIButtons();
            renderCraftCustomCanvas();
        }

        function renderCraftColorSwatches() {
            const container = document.getElementById('craftColorSwatches');
            const activePal = craftPalettes.find(c => c.id === craftState.colorId) || craftPalettes[0];
            document.getElementById('craftColorNameLabel').textContent = currentLang === 'vi' ? activePal.vi : activePal.en;

            container.innerHTML = craftPalettes.map(c => {
                const isSelected = c.id === craftState.colorId;
                return `
                    <button type="button" onclick="selectCraftColor('${c.id}')"
                        class="w-9 h-9 rounded-full border-2 transition-transform flex items-center justify-center ${isSelected ? 'scale-110 border-terracotta ring-2 ring-terracotta/40' : 'border-stone-300 hover:scale-105'}"
                        style="background-color: ${c.hex};"
                        title="${currentLang === 'vi' ? c.vi : c.en}">
                        ${isSelected ? `<i class="fa-solid fa-check text-xs ${c.id === 'yellow' || c.id === 'cream' || c.id === 'pink' ? 'text-slateart' : 'text-white'}"></i>` : ''}
                    </button>
                `;
            }).join('');
        }

        function selectCraftColor(colorId) {
            craftState.colorId = colorId;
            renderCraftColorSwatches();
            renderCraftCustomCanvas();
        }

        function setCraftMotif(motifId) {
            craftState.motif = motifId;
            updateCraftUIButtons();
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
                    craftState.motif = 'custom_img';
                    updateCraftUIButtons();
                    renderCraftCustomCanvas();
                    showToast(currentLang === 'vi'
                        ? 'Đã gắn ảnh mẫu của bạn lên sản phẩm handmade!'
                        : 'Applied your custom image onto the handmade preview!');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
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
            // Update Motif Buttons
            document.querySelectorAll('.motif-btn').forEach(btn => {
                btn.className = "motif-btn px-3 py-2 rounded-xl border border-stone-300 bg-linen font-semibold text-left flex items-center gap-2";
            });
            const activeMotifBtn = document.getElementById('motif-' + craftState.motif);
            if (activeMotifBtn) {
                activeMotifBtn.className = "motif-btn px-3 py-2 rounded-xl border-2 border-slateart bg-slateart text-white font-semibold text-left flex items-center gap-2";
            }

            // Update Size Buttons & Canvas Scale
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
            return Math.round((baseProd.priceVND * multiplier) / 10000) * 10000;
        }

        function renderCraftCustomCanvas() {
            const canvas = document.getElementById('craftCustomCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;

            const baseProd = products.find(p => p.id === craftState.baseProductId) || products[0];
            const pal = craftPalettes.find(c => c.id === craftState.colorId) || craftPalettes[0];

            // Clear & Soft Studio Backdrop
            ctx.fillStyle = '#F7F4EE';
            ctx.fillRect(0, 0, w, h);

            const isDoll = baseProd.id === 'HM-DOLL-ROSE-01';
            const isPouch = baseProd.id === 'HM-POUCH-CAT-06';
            const isHatSet = baseProd.id === 'HM-SET-YELLOW-07';

            if (isDoll) {
                // Draw Customizable Linen Doll with chosen yarn hair & dress color
                ctx.fillStyle = pal.hex;
                ctx.beginPath();
                ctx.ellipse(105, 235, 52, 68, 0.35, 0, Math.PI * 2);
                ctx.ellipse(275, 235, 52, 68, -0.35, 0, Math.PI * 2);
                ctx.fill();

                // Linen Legs & Arms
                ctx.fillStyle = '#E8DFD1';
                ctx.beginPath();
                ctx.roundRect(158, 330, 26, 70, 12);
                ctx.roundRect(196, 330, 26, 70, 12);
                ctx.ellipse(125, 255, 16, 48, 0.35, 0, Math.PI * 2);
                ctx.ellipse(255, 255, 16, 48, -0.35, 0, Math.PI * 2);
                ctx.fill();

                // Dress in selected color + lace trim
                ctx.fillStyle = pal.hex;
                ctx.beginPath();
                ctx.moveTo(150, 200);
                ctx.lineTo(230, 200);
                ctx.lineTo(275, 335);
                ctx.lineTo(105, 335);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(105, 320, 170, 26);

                // Linen Head & Eyes
                ctx.fillStyle = '#EFE7DA';
                ctx.beginPath();
                ctx.arc(190, 148, 56, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#222';
                ctx.fillRect(168, 142, 6, 15);
                ctx.fillRect(206, 142, 6, 15);
                // Bangs
                ctx.fillStyle = pal.accent;
                ctx.beginPath();
                ctx.arc(190, 136, 60, Math.PI, 0);
                ctx.fill();

            } else if (isPouch) {
                // Draw Customizable Chubby Cat / Pet Zipper Pouch in chosen color
                ctx.fillStyle = pal.hex;
                ctx.beginPath();
                ctx.ellipse(190, 240, 108, 125, 0, 0, Math.PI * 2);
                ctx.fill();
                // Ears
                ctx.beginPath();
                ctx.moveTo(115, 140); ctx.lineTo(150, 80); ctx.lineTo(185, 125);
                ctx.moveTo(205, 125); ctx.lineTo(250, 85); ctx.lineTo(268, 150);
                ctx.fill();
                // Tail
                ctx.fillStyle = pal.accent;
                ctx.beginPath();
                ctx.roundRect(65, 340, 105, 28, 14);
                ctx.fill();
                // Paws & Eyes
                ctx.fillStyle = pal.accent;
                ctx.beginPath();
                ctx.roundRect(110, 185, 45, 85, 22);
                ctx.roundRect(225, 195, 45, 85, 22);
                ctx.fill();
                ctx.fillStyle = '#1E1B18';
                ctx.beginPath();
                ctx.arc(165, 150, 9, 0, Math.PI * 2);
                ctx.arc(220, 155, 9, 0, Math.PI * 2);
                ctx.fill();

            } else {
                // Draw Crochet Handbag (and optional Matching Sun Hat if Set)
                if (isHatSet) {
                    ctx.fillStyle = pal.hex;
                    ctx.beginPath();
                    ctx.arc(190, 125, 78, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = pal.accent;
                    ctx.beginPath();
                    ctx.arc(190, 125, 38, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Bag Handles
                    ctx.strokeStyle = pal.hex;
                    ctx.lineWidth = 16;
                    ctx.beginPath();
                    ctx.arc(190, 130, 55, Math.PI, 0);
                    ctx.stroke();
                }

                // Crochet Bag Body in selected Primary Color
                const bagTop = isHatSet ? 215 : 135;
                const bagHeight = isHatSet ? 175 : 245;
                ctx.fillStyle = pal.hex;
                ctx.beginPath();
                ctx.roundRect(55, bagTop, 270, bagHeight, 24);
                ctx.fill();

                // Realistic Crochet Stitch Texture Grid
                ctx.fillStyle = 'rgba(255,255,255,0.16)';
                for (let r = 0; r < bagHeight - 25; r += 14) {
                    for (let c = 0; c < 240; c += 14) {
                        ctx.beginPath();
                        ctx.arc(70 + c, bagTop + 16 + r, 3.2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Draw Selected 3D Motif or User's Uploaded Image in Center
            const centerY = isHatSet ? 300 : 255;
            if (craftState.motif === 'custom_img' && craftState.customUploadedImg) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(190, centerY, 68, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(craftState.customUploadedImg, 122, centerY - 68, 136, 136);
                ctx.restore();
                // Stitched border around uploaded photo
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 4;
                ctx.setLineDash([6, 4]);
                ctx.beginPath();
                ctx.arc(190, centerY, 68, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            } else if (craftState.motif === 'sakura') {
                ctx.strokeStyle = '#C59B27';
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.moveTo(95, centerY + 65);
                ctx.quadraticCurveTo(195, centerY, 275, centerY - 65);
                ctx.stroke();
                [[145, centerY + 20, '#F48FB1'], [190, centerY - 5, '#FFFFFF'], [235, centerY - 30, '#F8BBD0'], [265, centerY - 55, '#F48FB1']].forEach(([bx, by, col]) => {
                    ctx.fillStyle = col;
                    for (let p = 0; p < 5; p++) {
                        ctx.beginPath();
                        ctx.arc(bx + Math.cos((p * 2 * Math.PI) / 5) * 9, by + Math.sin((p * 2 * Math.PI) / 5) * 9, 7, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            } else if (craftState.motif === 'sunflower') {
                [[135, centerY], [245, centerY], [190, centerY - 45]].forEach(([sx, sy]) => {
                    ctx.fillStyle = '#FFC107';
                    for (let a = 0; a < 10; a++) {
                        ctx.beginPath();
                        ctx.arc(sx + Math.cos((a * Math.PI) / 5) * 18, sy + Math.sin((a * Math.PI) / 5) * 18, 8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.fillStyle = '#3E2723';
                    ctx.beginPath();
                    ctx.arc(sx, sy, 11, 0, Math.PI * 2);
                    ctx.fill();
                });
            } else if (craftState.motif === 'ocean') {
                // Jellyfish & Blue Starfish
                ctx.fillStyle = '#FFF176';
                ctx.beginPath();
                ctx.arc(135, centerY - 20, 22, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#00B0FF';
                ctx.beginPath();
                ctx.arc(248, centerY - 15, 20, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFD600';
                ctx.beginPath();
                ctx.ellipse(190, centerY + 25, 20, 13, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (craftState.motif === 'cat') {
                // Cute Applique Cat Face
                ctx.fillStyle = '#FFE0B2';
                ctx.beginPath();
                ctx.arc(190, centerY, 45, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#222';
                ctx.beginPath();
                ctx.arc(174, centerY - 6, 5, 0, Math.PI * 2);
                ctx.arc(206, centerY - 6, 5, 0, Math.PI * 2);
                ctx.fill();
            } else if (craftState.motif === 'bow') {
                // Oversized Sculpted Crochet Bow
                ctx.fillStyle = pal.accent;
                ctx.beginPath();
                ctx.moveTo(190, centerY - 25);
                ctx.lineTo(130, centerY - 55);
                ctx.lineTo(130, centerY + 5);
                ctx.closePath();
                ctx.moveTo(190, centerY - 25);
                ctx.lineTo(250, centerY - 55);
                ctx.lineTo(250, centerY + 5);
                ctx.closePath();
                ctx.fill();
            }

            // Draw Custom Embroidered Name Tag if entered
            if (craftState.customText) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
                ctx.beginPath();
                ctx.roundRect(110, h - 52, 160, 32, 10);
                ctx.fill();
                ctx.strokeStyle = '#C86D51';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.fillStyle = '#23262A';
                ctx.font = 'bold 14px "Be Vietnam Pro", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('✨ ' + craftState.customText, 190, h - 31);
            }

            // Update Live Summary Labels & Price
            const motifLabels = {
                sakura: currentLang === 'vi' ? 'Hoa Đào 3D' : '3D Sakura',
                sunflower: currentLang === 'vi' ? 'Hướng Dương' : 'Sunflower',
                ocean: currentLang === 'vi' ? 'Sứa & Sao Biển' : 'Ocean Life',
                cat: currentLang === 'vi' ? 'Mèo Cam 3D' : 'Orange Tabby',
                bow: currentLang === 'vi' ? 'Nơ Bản Lớn' : 'Statement Bow',
                custom_img: currentLang === 'vi' ? 'Ảnh Riêng Của Khách' : 'Custom Uploaded Photo'
            };
            const baseTitle = currentLang === 'vi' ? baseProd.title_vi : baseProd.title_en;
            const colorName = currentLang === 'vi' ? pal.vi : pal.en;
            const finalPrice = getCustomizedCraftPrice();

            document.getElementById('craftSummaryTitle').textContent = baseTitle;
            document.getElementById('craftSummarySpecs').textContent =
                `${colorName} • ${motifLabels[craftState.motif]} • Size ${craftState.size}${craftState.customText ? ` • "${craftState.customText}"` : ''}`;
            document.getElementById('craftSummaryPrice').textContent = formatPrice(finalPrice);
        }

        function addCustomizedHandmadeToCart() {
            const baseProd = products.find(p => p.id === craftState.baseProductId) || products[0];
            const pal = craftPalettes.find(c => c.id === craftState.colorId) || craftPalettes[0];
            const canvas = document.getElementById('craftCustomCanvas');
            const customImgUrl = canvas.toDataURL('image/jpeg', 0.9);
            const finalPrice = getCustomizedCraftPrice();

            const customId = `${baseProd.id}-CUSTOM-${Date.now()}`;
            const colorVi = pal.vi;
            const colorEn = pal.en;
            const nameNoteVi = craftState.customText ? ` (Thêu tên: ${craftState.customText})` : '';
            const nameNoteEn = craftState.customText ? ` (Name: ${craftState.customText})` : '';

            const customizedProduct = {
                ...baseProd,
                id: customId,
                code: `${baseProd.code}-${craftState.size}`,
                priceVND: finalPrice,
                title_vi: `${baseProd.title_vi} [Phối màu: ${colorVi}, Size ${craftState.size}]${nameNoteVi}`,
                title_en: `${baseProd.title_en} [Color: ${colorEn}, Size ${craftState.size}]${nameNoteEn}`
            };

            customPhotoMap[customId] = customImgUrl;
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
