/**
 * Mộc & Sắc Atelier - Product Catalog Data & Procedural Artwork Engine
 */

const customPhotoMap = {}; // Stores user-uploaded Overrides

        // --- 3. COMPLETE PRODUCT CATALOG DATA (7 UPLOADED HANDMADE ITEMS + 28 REPRESENTATIVE 1/1 OIL PAINTINGS FROM THE 2026 PDF) ---
        const products = [
            // ================= HANDMADE CROCHET, EMBROIDERY & LINEN (7 UPLOADED ITEMS) =================
            {
                id: "HM-DOLL-ROSE-01",
                code: "HM-DOLL-01",
                category: "handmade",
                pillar: "handmade",
                spec: "doll",
                localFileHint: "image_c1a7d1.jpg",
                artStyle: "doll_pink",
                priceVND: 480000,
                size: "Cao 16cm (Nằm gọn lòng bàn tay / Palm-sized)",
                edition_vi: "Thủ công Khâu Tay",
                edition_en: "Hand-Stitched Artisan",
                title_vi: "Búp Bê Vải Linen Tóc Len Hồng Đính Hoa Hồng",
                title_en: "Blossom Pink Yarn & Linen Handmade Doll",
                material_vi: "Vải Linen tự nhiên, tóc sợi len dệt hồng phấn, váy hoa nhí viền ren trắng",
                material_en: "Natural Linen cloth, blush pink textured yarn hair, floral dress with lace trim",
                placement_vi: "Quà tặng thủ công tinh tế, treo túi xách, trang trí bàn làm việc & góc đọc sách",
                placement_en: "Thoughtful artisan gift, bag charm, desk & reading nook companion",
                desc_vi: "Bé búp bê vải linen khâu tay tỉ mỉ từng đường kim, đôi má ửng hồng lấm tấm tàn nhang đáng yêu, mái tóc len hồng buộc hai bên điểm xuyết hoa hồng ruy băng và chiếc váy hoa nhí phối ren trắng tinh khôi.",
                desc_en: "Delicately hand-sewn natural linen doll featuring rosy freckled cheeks, twin-tail blush pink yarn hair adorned with ribbon roses, and a vintage floral dress with white lace trim."
            },
            {
                id: "HM-BAG-OCEAN-02",
                code: "HM-OCEAN-02",
                category: "handmade",
                pillar: "handmade",
                spec: "bag",
                localFileHint: "image_c1a7cb.jpg",
                artStyle: "bag_ocean_pink",
                priceVND: 1250000,
                size: "34cm x 28cm x 10cm",
                edition_vi: "Thiết Kế Độc Bản",
                edition_en: "One-of-a-Kind Crochet",
                title_vi: "Túi Len Móc Đại Dương Hồng Ombre & Sinh Vật Biển 3D",
                title_en: "Ocean Dream Ombre Pink Crochet Tote with 3D Sea Life",
                material_vi: "Sợi len cotton cao cấp chuyển sắc hồng phấn - hồng sen, quai cầu vồng, charm sứa & sao biển móc nổi 3D",
                material_en: "Ombre pink crochet cotton cord, rainbow straps, 3D crocheted jellyfish, yellow fish, starfish & coral",
                placement_vi: "Dạo phố, du lịch biển, phụ kiện thời trang nghệ thuật nổi bật",
                placement_en: "Beach resort getaway, art-walk statement tote, summer vacation",
                desc_vi: "Chiếc túi len móc chuyển sắc hồng ombre ngọt ngào như rặng san hô đại dương. Điểm nhấn độc đáo là chú sứa tua rua xanh vàng, cá vàng nhỏ, sao biển xanh biếc và rặng san hô được móc nổi 3D thủ công kết hợp đường luồn chỉ đa sắc dọc thân túi.",
                desc_en: "Hand-crocheted gradient pink tote bag evoking a whimsical coral reef, complete with rainbow multi-strand handles and 3D crocheted jellyfish, yellow fish, blue starfish, and sea plants."
            },
            {
                id: "HM-BAG-SUNFLOWER-03",
                code: "HM-SUN-03",
                category: "handmade",
                pillar: "handmade",
                spec: "bag",
                localFileHint: "image_c1a792.jpg",
                artStyle: "bag_sunflower",
                priceVND: 1180000,
                size: "36cm x 30cm",
                edition_vi: "Móc Tay Thủ Công",
                edition_en: "Hand-Crocheted",
                title_vi: "Túi Len Móc Hoa Hướng Dương Rực Rỡ Nền Nâu Mộc",
                title_en: "Sunburst Granny-Square Sunflower Crochet Tote Bag",
                material_vi: "Sợi dệt mộc màu nâu xám phối hoa hướng dương vàng rực nhụy nâu đan ghép thủ công",
                material_en: "Taupe-brown artisan yarn with vibrant golden-yellow 3D sunflower granny squares",
                placement_vi: "Phối đồ Boho, Vintage, dạo phố mùa thu, chụp ảnh ngoại cảnh",
                placement_en: "Boho-chic styling, vintage outfits, sunny weekend markets",
                desc_vi: "Ghép nối từ hàng chục đóa hoa hướng dương vàng rực rỡ đan nổi 3D trên nền sợi màu nâu đất ấm áp, miệng túi lượn sóng vỏ sò tinh tế cùng quai tết bính chắc chắn.",
                desc_en: "Crafted from interconnected 3D golden sunflower crochet motifs set against earthy taupe yarn, finished with a scalloped shell-stitch top edge and braided handles."
            },
            {
                id: "HM-BAG-SAKURA-04",
                code: "HM-SAKURA-04",
                category: "handmade",
                pillar: "handmade",
                spec: "bag",
                localFileHint: "image_c1a78f.jpg",
                artStyle: "bag_sakura_black",
                priceVND: 1450000,
                size: "30cm x 25cm x 9cm",
                edition_vi: "Thêu & Móc Độc Bản",
                edition_en: "Artisan 3D Embroidery",
                title_vi: "Túi Xách Len Đen Thêu Nổi Nhành Hoa Đào Xuân",
                title_en: "Sakura Branch 3D Embroidered Black Crochet Handbag",
                material_vi: "Sợi dệt đen tuyền đan hạt gạo dày dặn, quai tròn quấn sợi, nhành hoa đào hồng phấn - trắng thêu móc nổi 3D",
                material_en: "Structured jet-black textured crochet body, wrapped ring handles, 3D embroidered pink & white cherry blossom branch",
                placement_vi: "Dự tiệc, phối áo dài truyền thống, trang phục công sở thanh lịch & quà tặng cao cấp",
                placement_en: "Evening events, Ao Dai pairing, elegant smart-casual & luxury gifting",
                desc_vi: "Sự giao thoa tuyệt mỹ giữa phông nền túi len đen sang trọng và nhành đào mùa xuân uốn lượn mềm mại. Từng cánh hoa đào hồng phấn, trắng tinh khôi và nụ non xanh biếc được đính kết và thêu nổi 3D đầy sống động.",
                desc_en: "An exquisite contrast between a structured jet-black crochet handbag and a sweeping golden-brown branch blooming with 3D hand-crocheted pink and white sakura blossoms."
            },
            {
                id: "HM-BAG-FUCHSIA-05",
                code: "HM-BOW-05",
                category: "handmade",
                pillar: "handmade",
                spec: "bag",
                localFileHint: "image_c1a78c.jpg",
                artStyle: "bag_fuchsia_bow",
                priceVND: 1090000,
                size: "28cm x 22cm x 8cm",
                edition_vi: "Thủ Công Tinh Xảo",
                edition_en: "Handcrafted Statement",
                title_vi: "Túi Len Đan Ô Cờ Hồng Cánh Sen Đính Nơ Bản Lớn",
                title_en: "Fuchsia Basketweave Crochet Handbag with Statement Bow",
                material_vi: "Sợi dệt bóng cao cấp màu hồng magenta đan họa tiết ô cờ nổi, quai xách đính nơ bản to",
                material_en: "Lustrous fuchsia-magenta cord in 3D basketweave stitch with sculpted bow handle",
                placement_vi: "Tiệc trà chiều, dạo phố nữ tính, chụp ảnh thời trang",
                placement_en: "Afternoon tea, feminine chic outings, statement styling",
                desc_vi: "Nổi bật với sắc hồng cánh sen (fuchsia) tràn đầy năng lượng và kỹ thuật đan ô cờ (basketweave) tạo độ phồng dày dặn, điểm xuyết chiếc nơ lớn kiêu kỳ ngay phần quai xách.",
                desc_en: "Radiant fuchsia handbag crafted with tactile basketweave crochet stitchery and crowned with a sculpted oversized bow on the shoulder strap."
            },
            {
                id: "HM-POUCH-CAT-06",
                code: "HM-CAT-06",
                category: "handmade",
                pillar: "handmade",
                spec: "doll",
                localFileHint: "image_c1a772.jpg",
                artStyle: "pouch_orange_cat",
                priceVND: 590000,
                size: "18cm x 15cm (Đựng thẻ, tiền, son, tai nghe)",
                edition_vi: "Thiết Kế Theo Thú Cưng",
                edition_en: "Custom Pet Portrait Pouch",
                title_vi: "Ví Vải Khâu Tay Mèo Cam Bụng Bự (Nhận Làm Theo Thú Cưng)",
                title_en: "Custom Chubby Orange Tabby Cat Hand-Quilted Zipper Pouch",
                material_vi: "Vải linen & cotton nhuộm tự nhiên chần bông khâu tay, thêu mặt mèo, chân và đuôi 3D có khóa kéo",
                material_en: "Hand-quilted natural linen & cotton, 3D appliqued paws and striped tail, brass zipper",
                placement_vi: "Ví cầm tay hàng ngày, quà tặng cá nhân hóa cho người yêu mèo & thú cưng",
                placement_en: "Everyday card & coin pouch, personalized keepsake for cat lovers",
                desc_vi: "Khách nuôi mèo cam nên nhờ tiệm làm riêng 1 bé meo meo cam bụng bự siêu cưng! Từng vằn lông trên tai, hai chân trước ôm bụng và chiếc đuôi ngoắc 3D đều được cắt ghép, chần bông và khâu tay tỉ mỉ.",
                desc_en: "Originally commissioned by a customer to match their beloved chubby orange tabby! Hand-quilted linen body with 3D striped paws, expressive embroidered eyes, and a curling striped tail."
            },
            {
                id: "HM-SET-YELLOW-07",
                code: "HM-SUNSET-07",
                category: "handmade",
                pillar: "handmade",
                spec: "bag",
                localFileHint: "image_c1a755.jpg",
                artStyle: "set_yellow_hat_bag",
                priceVND: 1550000,
                size: "Túi 35x26cm + Nón rộng vành chuẩn vòng đầu 55-58cm",
                edition_vi: "Set Đôi Thủ Công",
                edition_en: "Artisan Resort Set",
                title_vi: "Set Nón Rộng Vành & Túi Len Móc Vàng Nắng Mai Điểm Hoa Hồng",
                title_en: "Sunny Yellow Crochet Wide-Brim Hat & Tote Bag Resort Set",
                material_vi: "Sợi cói cotton mềm màu vàng nắng mai thoáng khí, kèm charm đôi hoa hồng lá xanh móc nổi",
                material_en: "Breathable sunny-yellow raffia-cotton yarn with 3D pink twin-blossom charm",
                placement_vi: "Nghỉ dưỡng Resort, dạo biển, picnic mùa hè & quà tặng du lịch",
                placement_en: "Resort vacations, beach strolls, garden picnics",
                desc_vi: "Bộ đôi nón rộng vành che nắng thanh lịch và túi tote len móc đồng điệu mang sắc vàng tươi tắn như nắng mai, điểm xuyết nhành hoa đôi màu hồng ngọt ngào.",
                desc_en: "Matching wide-brim crochet sun hat and structured tote bag in cheerful sunshine yellow, accented with a dangling twin pink rosebud crochet charm."
            },

            // ================= TRỤ CỘT 01: NĂNG LƯỢNG CHỮA LÀNH (HEALING & CREATIVE ENERGY) =================
            {
                id: "NAG-GTNL-6080",
                code: "NAG-GTNL-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_gtnl",
                priceVND: 14800000,
                size: "60cm x 80cm (Có khung cổ điển)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Giao Thoa Năng Lượng",
                title_en: "Energy Convergence (Impasto 1/1)",
                material_vi: "Sơn dầu trên vải Canvas | Đắp nổi Impasto dày | Khung gấm cổ điển",
                material_en: "Heavy Impasto Oil on Canvas | Classic Ornate Frame",
                placement_vi: "Phòng khách hiện đại, Penthouse, Phòng làm việc Lãnh đạo & Không gian sáng tạo",
                placement_en: "Modern Living Room, Penthouse, Executive Office & Creative Studio",
                desc_vi: "Bùng nổ thị giác với các mảng khối hình học đa sắc hướng thẳng về tâm mặt trời rực rỡ, giải phóng nguồn cảm hứng sáng tạo mạnh mẽ và phá vỡ mọi rào cản trì trệ. Kỹ thuật đắp nổi Impasto dày dặn giúp tái tạo sinh lực và khơi thông vận khí.",
                desc_en: "A visual explosion of geometric color blocks converging toward a radiant golden sun, unleashing creative inspiration and breaking through stagnation with rich impasto relief."
            },
            {
                id: "NAG-BMHV-6080",
                code: "NAG-BMHV-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_bmhv",
                priceVND: 12500000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Bình Minh Hồng Vàng",
                title_en: "Pink & Golden Dawn",
                material_vi: "Sơn dầu trên vải Canvas | Đắp nổi Impasto",
                material_en: "Impasto Oil on Canvas | Framed",
                placement_vi: "Phòng khách hiện đại, Penthouse & Phòng ngủ Master",
                placement_en: "Modern Living Room, Penthouse & Master Suite",
                desc_vi: "Tựa như ánh nắng đầu ngày xoa dịu tâm hồn, tác phẩm dẫn dắt thị giác qua sự giao hòa lãng mạn giữa hồng tím mộng mơ và dải vàng kim ấm áp. Những nhát dao đắp nổi Impasto gân guốc bắt sáng đa chiều.",
                desc_en: "Like the first light of dawn soothing the soul, blending dreamy magenta-pink with warm golden cascades sculpted by bold palette-knife impasto."
            },
            {
                id: "NAG-GTBM-6080",
                code: "NAG-GTBM-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_gtbm",
                priceVND: 12800000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Giao Thoa Bốn Mùa",
                title_en: "Four Seasons Symphony",
                material_vi: "Sơn dầu trên vải Canvas | Khung viền vàng sang trọng",
                material_en: "Impasto Oil on Canvas | Gold Gallery Frame",
                placement_vi: "Phòng khách hiện đại, Không gian sáng tạo & Sảnh đón",
                placement_en: "Contemporary Living Space, Creative Studio & Foyer",
                desc_vi: "Thu trọn nhịp luân chuyển đất trời vào bốn mảng màu vàng, xanh lá, đỏ và tím bạc, tạo nên bản giao hưởng thị giác đánh thức năng lượng sáng tạo với lớp vân nổi 3D đầy nội lực.",
                desc_en: "Captures the rhythm of the four seasons in quadrants of gold, emerald green, crimson, and violet-silver with 3D palette-knife textures."
            },
            {
                id: "NAG-SMTL-6080",
                code: "NAG-SMTL-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_smtl",
                priceVND: 12500000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Sắc Màu Thung Lũng",
                title_en: "Valley of Geometric Colors",
                material_vi: "Sơn dầu trên vải Canvas | Đắp hạt nổi Impasto",
                material_en: "Pointillist & Impasto Oil on Canvas | Framed",
                placement_vi: "Phòng khách, Penthouse & Studio nghệ thuật",
                placement_en: "Living Room, Penthouse & Art Studio",
                desc_vi: "Ghép nối những triền đồi hình học rực rỡ dưới bầu trời khoáng đạt, mở ra miền thiên nhiên tươi trẻ giúp gột rửa căng thẳng thị giác như bức phù điêu sống động.",
                desc_en: "Interlocking geometric hills of vibrant textured dots beneath a cerulean sky, refreshing visual fatigue and sparking new ideas."
            },
            {
                id: "NAG-BHMM-6080",
                code: "NAG-BHMM-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_bhmm",
                priceVND: 13200000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Bến Hoa Mộng Mơ",
                title_en: "Dreamy Cherry Blossom Dock",
                material_vi: "Sơn dầu trên vải Canvas | Hoa đắp nổi Impasto",
                material_en: "Impasto Oil on Canvas | Double Frame",
                placement_vi: "Phòng khách, Spa trị liệu & Phòng ngủ lãng mạn",
                placement_en: "Living Room, Wellness Spa & Romantic Bedroom",
                desc_vi: "Tái hiện khoảnh khắc con thuyền nhỏ neo đậu bình yên dưới tán hoa anh đào rực rỡ, chạm nhẹ vào những miền cảm xúc sâu kín để chữa lành tâm trí.",
                desc_en: "A tranquil boat moored beneath cascading pink cherry blossoms over deep cobalt waters, crafted with raised impasto petals."
            },
            {
                id: "NAG-RCTBN-6080",
                code: "NAG-RCTBN-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_rctbn",
                priceVND: 13500000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Ráng Chiều Trên Biển Ngọc",
                title_en: "Sunset Glow Over Violet-Emerald Sea",
                material_vi: "Sơn dầu trên vải Canvas | Khúc xạ ánh sáng 5 giờ chiều",
                material_en: "Impasto Oil on Canvas | Classic Frame",
                placement_vi: "Phòng khách, Lounge thư giãn & Căn hộ cao cấp",
                placement_en: "Living Room, Relaxation Lounge & Luxury Apartment",
                desc_vi: "Lưu giữ khoảnh khắc mặt trời từ từ khuất sau dãy núi xa, nhuộm ấm không gian bằng dải màu cam rực hòa quyện cùng sắc biển tím biếc.",
                desc_en: "Captures the sun dipping behind coastal cliffs, bathing the sky in fiery orange and the sea in soothing violet ripples."
            },
            {
                id: "NAG-NVBCS-7080",
                code: "NAG-NVBCS-7080",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_nvbcs",
                priceVND: 14500000,
                size: "70cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Nắng Vàng Bên Cửa Sổ",
                title_en: "Golden Blossoms by the European Arched Window",
                material_vi: "Sơn dầu trên vải Canvas | Khung gỗ viền vàng cổ điển",
                material_en: "Impasto Oil on Canvas | Classic Wood & Gold Frame",
                placement_vi: "Căn hộ chung cư hiện đại, Phòng ăn & Phòng khách",
                placement_en: "Modern Apartment, Dining Room & Living Area",
                desc_vi: "Mở ra khung cửa vòm ngập tràn gió biển Châu Âu, đưa người xem đắm mình vào sắc hoa vàng rực rỡ đang đón nắng mai bên bờ tường đá thô nhám.",
                desc_en: "Opens an arched stone window to a European coastal breeze where a vase of radiant yellow flowers catches the morning sun."
            },
            {
                id: "NAG-BHWCKS-4060",
                code: "NAG-BHWCKS-4060",
                category: "oilpainting",
                pillar: "healing",
                spec: "framed",
                artStyle: "oil_calla",
                priceVND: 9800000,
                size: "40cm x 60cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Bách Hợp White Calla Kiêu Sa",
                title_en: "Noble White Calla Lilies",
                material_vi: "Sơn dầu trên vải Canvas | Tối giản Minimalism",
                material_en: "Impasto Oil on Canvas | Dark Wood Frame",
                placement_vi: "Phòng ngủ, Phòng đọc sách, Spa & Góc tối giản",
                placement_en: "Bedroom, Study, Spa & Minimalist Corners",
                desc_vi: "Vươn mình kiêu hãnh trên phông nền trầm tĩnh lặng, hai đóa hoa Calla Lily trắng muốt toát lên vẻ đẹp vượt thời gian của sự thuần khiết.",
                desc_en: "Two luminous white Calla Lilies rising gracefully against a deep contemplative background, soothing visual tension."
            },
            {
                id: "NAG-MOC-HMTNTX-6080",
                code: "NAG-MOC-HMTNTX-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "raw",
                artStyle: "oil_apricot_sky",
                priceVND: 11800000,
                size: "60cm x 80cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Hoa Mơ Trắng Nền Trời Xanh",
                title_en: "White Apricot Blossoms Against Cerulean Sky",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc tràn viền)",
                material_en: "Impasto Oil on Unframed Stretched Canvas",
                placement_vi: "Không gian Wabi-Sabi, Bắc Âu (Scandinavian) & Phòng khách trẻ trung",
                placement_en: "Wabi-Sabi, Scandinavian & Modern Living Spaces",
                desc_vi: "Tái hiện cành mơ cổ thụ bung nở chùm hoa trắng tinh khôi giữa vòm trời xanh cerulean trong vắt, mang trọn hơi thở mùa xuân tươi trẻ vào nhà.",
                desc_en: "Ancient apricot branches bursting with pure white impasto blossoms against a vibrant cerulean sky on raw-edge canvas."
            },
            {
                id: "NAG-MOC-DTTDTA-7080",
                code: "NAG-MOC-DTTDTA-7080",
                category: "oilpainting",
                pillar: "healing",
                spec: "raw",
                artStyle: "oil_trangan",
                priceVND: 13200000,
                size: "70cm x 80cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Du Thuyền Trên Dòng Tràng An",
                title_en: "Boat Ride on Emerald Trang An River",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc)",
                material_en: "Impasto Oil on Unframed Canvas",
                placement_vi: "Phòng khách, Sảnh khách sạn, Quà tặng đối tác quốc tế",
                placement_en: "Living Room, Boutique Hotel Lobby, International Gift",
                desc_vi: "Đưa vẻ đẹp thơ mộng của di sản Việt Nam vào hội họa chữa lành với hình ảnh chiếc thuyền nhỏ lướt nhẹ trên làn nước ngọc bích giữa núi đá vôi.",
                desc_en: "Celebrates Vietnam's Trang An heritage with a wooden sampan gliding across emerald waters between majestic limestone karsts."
            },
            {
                id: "NAG-MOC-PMHH-6080",
                code: "NAG-MOC-PMHH-6080",
                category: "oilpainting",
                pillar: "healing",
                spec: "raw",
                artStyle: "oil_rainy_street",
                priceVND: 13800000,
                size: "60cm x 80cm (Bản mộc tiêu điểm)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Phố Mưa Hoàng Hôn",
                title_en: "Rainy Street at Sunset (Couple Under Umbrella)",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc đắp nổi cao)",
                material_en: "Heavy Impasto Oil on Raw Canvas",
                placement_vi: "Điểm nhấn Phòng ngủ ấm cúng, Phòng khách & Quà kỷ niệm tình yêu",
                placement_en: "Cozy Bedroom Focal Point, Living Room & Anniversary Gift",
                desc_vi: "Ghi lại khoảnh khắc đôi tình nhân che ô dạo bước dưới hàng đèn phố cổ kính giữa bầu trời chiều nhuộm sắc đỏ vàng ấm áp phản chiếu trên mặt đường ướt mưa.",
                desc_en: "A romantic couple sharing an umbrella along a vintage streetlamp avenue beneath a fiery red-and-gold sunset reflecting on rain-slicked pavement."
            },
            {
                id: "NAG-MOC-HDVMN-7080",
                code: "NAG-MOC-HDVMN-7080",
                category: "oilpainting",
                pillar: "healing",
                spec: "raw",
                artStyle: "oil_sunflower",
                priceVND: 12900000,
                size: "70cm x 80cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Hướng Dương Vươn Mây Ngàn",
                title_en: "Giant Sunflower Reaching the Mountain Clouds",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc)",
                material_en: "Impasto Oil on Raw Canvas",
                placement_vi: "Phòng khách, Phòng ăn & Không gian khởi nghiệp",
                placement_en: "Living Room, Dining Area & Startup Office",
                desc_vi: "Tượng trưng cho năng lượng mặt trời tích cực và niềm tin bất diệt, đặc tả đóa hướng dương vàng rực rỡ vươn mình kiêu hãnh trước dãy núi xanh bao la.",
                desc_en: "Symbolizing unwavering optimism and solar vitality, a sculpted impasto sunflower stands tall before distant green mountain peaks."
            },

            // ================= TRỤ CỘT 02: NĂNG LƯỢNG BÌNH AN (INNER PEACE & MINDFULNESS) =================
            {
                id: "NAG-BTLVCBX-8060",
                code: "NAG-BTLVCBX-8060",
                category: "oilpainting",
                pillar: "peace",
                spec: "framed",
                artStyle: "oil_tranquil_sail",
                priceVND: 14600000,
                size: "80cm x 60cm (Khổ ngang có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Bến Tĩnh Lặng Và Cánh Buồm Xa",
                title_en: "Tranquil Shore & Distant Sailboat",
                material_vi: "Sơn dầu trên vải Canvas | Khung bạc thanh lịch",
                material_en: "Impasto Oil on Canvas | Silver Gallery Frame",
                placement_vi: "Phòng khách, Phòng đọc sách & Không gian nghỉ dưỡng",
                placement_en: "Living Room, Reading Sanctuary & Holiday Villa",
                desc_vi: "Giữa nhịp sống vội vã, tác phẩm mở ra một khoảng lặng khoáng đạt nơi đám mây vờn nắng phản chiếu xuống mặt nước trong veo cùng chiếc ghế gỗ bình yên ven bờ.",
                desc_en: "Opens a serene horizon where golden-lined clouds mirror onto crystal waters beside a quiet wooden bench on a pebble shore."
            },
            {
                id: "NAG-BMBBDN-7080",
                code: "NAG-BMBBDN-7080",
                category: "oilpainting",
                pillar: "peace",
                spec: "framed",
                artStyle: "oil_cloud_sea",
                priceVND: 14200000,
                size: "70cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Biển Mây Bồng Bềnh Đại Ngàn",
                title_en: "Floating Sea of Clouds Over Majestic Peaks",
                material_vi: "Sơn dầu trên vải Canvas | Đắp nổi vách đá & vân mây",
                material_en: "Impasto Oil on Canvas | Framed",
                placement_vi: "Phòng khách lớn, Phòng làm việc & Sảnh tiếp khách",
                placement_en: "Grand Living Room, Study & Reception Hall",
                desc_vi: "Tái hiện dãy núi xanh trùng điệp ẩn hiện giữa dòng mây trắng cuộn trào trên đỉnh cao khoáng đạt, thanh lọc áp lực và trả lại sự cân bằng tự tại.",
                desc_en: "Emerald and cobalt mountain ridges emerging above a surging sea of white impasto clouds, restoring mental clarity and balance."
            },
            {
                id: "NAG-NCS-6080",
                code: "NAG-NCS-6080",
                category: "oilpainting",
                pillar: "peace",
                spec: "framed",
                artStyle: "oil_sapa_smile",
                priceVND: 13500000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Nụ Cười Sapa",
                title_en: "The Radiant Smile of Sapa",
                material_vi: "Sơn dầu trên vải Canvas | Đắp nổi cướm bạc thổ cẩm",
                material_en: "Impasto Oil on Canvas | Ornate Silver Frame",
                placement_vi: "Không gian văn hóa, Phòng khách, Nhà hàng & Quà tặng ngoại giao",
                placement_en: "Cultural Lounge, Living Room & Diplomatic Gift",
                desc_vi: "Mang hơi thở trong trẻo của núi rừng Tây Bắc qua chân dung cô gái vùng cao trong trang phục thổ cẩm cùng nụ cười tỏa nắng và chi tiết cướm bạc đắp nổi.",
                desc_en: "Portrays the pure warmth of Vietnam's Northwest highlands through a smiling Sapa girl wearing textured silver-beaded brocade."
            },
            {
                id: "NAG-SNBDHST-6060",
                code: "NAG-SNBDHST-6060",
                category: "oilpainting",
                pillar: "peace",
                spec: "framed",
                artStyle: "oil_koi_lily",
                priceVND: 12600000,
                size: "60cm x 60cm (Khổ vuông có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Song Ngư Bơi Dưới Hoa Súng Trắng",
                title_en: "Twin Koi Swimming Beneath White Water Lily",
                material_vi: "Sơn dầu trên vải Canvas | Khung gỗ nâu trầm",
                material_en: "Impasto Oil on Canvas | Mahogany Frame",
                placement_vi: "Phòng trà Zen, Không gian Indochine, Spa Wellness & Sảnh đón",
                placement_en: "Zen Tea Room, Indochine Interior, Wellness Spa & Foyer",
                desc_vi: "Tái hiện vẻ đẹp thanh tao của đóa súng trắng tinh khôi cùng đôi cá Koi cam uyển chuyển dưới làn nước thẫm, vừa làm dịu nội tâm vừa kích hoạt năng lượng cát tường.",
                desc_en: "A pure white water lily blooming above two graceful orange-and-white Koi fish amidst emerald lily pads, cultivating harmony and Zen stillness."
            },
            {
                id: "NAG-BCXCTDB-8060",
                code: "NAG-BCXCTDB-8060",
                category: "oilpainting",
                pillar: "peace",
                spec: "framed",
                artStyle: "oil_white_egret",
                priceVND: 13600000,
                size: "80cm x 60cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Bạch Cò Xòe Cánh Trên Dòng Biếc",
                title_en: "White Egret Spreading Wings Over Azure Water",
                material_vi: "Sơn dầu trên vải Canvas | Vờn cọ lông vũ đắp nổi",
                material_en: "Impasto Oil on Canvas | Silver Frame",
                placement_vi: "Phòng trà, Không gian Indochine & Phòng khách thanh lịch",
                placement_en: "Tea Room, Indochine Villa & Elegant Living Room",
                desc_vi: "Đặc tả khoảnh khắc cánh cò trắng muốt xòe rộng thanh thoát trên nền nước xanh biếc, tôn vinh khí chất thanh cao và sự tĩnh lặng thuần khiết của tự nhiên.",
                desc_en: "Captures a snow-white egret poising its wings over shimmering sapphire waters, symbolizing grace, resilience, and domestic peace."
            },
            {
                id: "NAG-PTTVSH-6080",
                code: "NAG-PTTVSH-6080",
                category: "oilpainting",
                pillar: "peace",
                spec: "framed",
                artStyle: "oil_serene_buddha",
                priceVND: 15200000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Phật Tự Tại Và Sen Hồng",
                title_en: "Serene Buddha & Blooming Pink Lotuses",
                material_vi: "Sơn dầu trên vải Canvas | Khung cổ điển trang nghiêm",
                material_en: "Impasto Oil on Canvas | Classic Sanctuary Frame",
                placement_vi: "Phòng thiền, Không gian thờ tự hiện đại & Spa Tĩnh tâm",
                placement_en: "Meditation Room, Mindful Sanctuary & Wellness Center",
                desc_vi: "Giữa sắc nền trầm mặc huyền ảo, gương mặt từ hòa với ánh mắt khép nhẹ của Đức Phật bên những đóa sen hồng vươn nở mở ra miền an lạc tĩnh tại.",
                desc_en: "Against a contemplative violet-umber backdrop, the compassionate visage of the Buddha beside raised impasto pink lotuses guides the breath to peace."
            },
            {
                id: "NAG-MOC-BDTA-6080",
                code: "NAG-MOC-BDTA-6080",
                category: "oilpainting",
                pillar: "peace",
                spec: "raw",
                artStyle: "oil_bodhi_leaf",
                priceVND: 14500000,
                size: "60cm x 80cm (Bản mộc tiêu điểm)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Bồ Đề Tâm An",
                title_en: "Golden Bodhi Leaf of Inner Peace",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc đắp nổi gân lá vàng kim)",
                material_en: "Heavy Impasto Oil on Raw Canvas",
                placement_vi: "Phòng thiền, Phòng trà Zen & Không gian thờ tự hiện đại",
                placement_en: "Meditation Space, Zen Tea Room & Modern Sanctuary",
                desc_vi: "Đặt bóng dáng Đức Phật tọa thiền tĩnh lặng nằm trọn trong chiếc lá Bồ Đề vàng rực rỡ trên nền đỏ đô gân guốc đắp nổi Impasto, biểu tượng cô đọng của trí tuệ giác ngộ.",
                desc_en: "The meditating silhouette of the Buddha resting within a luminous golden Bodhi leaf over a richly textured crimson-burgundy impasto ground."
            },
            {
                id: "NAG-MOC-TTGNG-6080",
                code: "NAG-MOC-TTGNG-6080",
                category: "oilpainting",
                pillar: "peace",
                spec: "raw",
                artStyle: "oil_canyon_zen",
                priceVND: 13800000,
                size: "60cm x 80cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Tĩnh Tọa Giữa Nhân Gian",
                title_en: "Meditating in Stillness Amidst the World",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc)",
                material_en: "Impasto Oil on Unframed Canvas",
                placement_vi: "Phòng làm việc, Phòng thiền & Không gian tĩnh tâm",
                placement_en: "Private Study, Meditation Room & Mindful Retreat",
                desc_vi: "Khắc họa dáng Phật dát vàng tọa thiền bất động trong khe sáng xanh lam giữa hai vách đá xám trầm mặc, ẩn dụ sâu sắc về sự an định giữa biến động thế gian.",
                desc_en: "A golden meditating figure seated within a vertical beam of serene blue light between two rugged charcoal impasto rock walls."
            },
            {
                id: "NAG-MOC-TDTTSX-5050",
                code: "NAG-MOC-TDTTSX-5050",
                category: "oilpainting",
                pillar: "peace",
                spec: "raw",
                artStyle: "oil_cyan_lotus",
                priceVND: 11200000,
                size: "50cm x 50cm (Khổ vuông Bản mộc)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Thiền Định Trên Tòa Sen Xanh",
                title_en: "Meditation on the Luminous Cyan Lotus",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc)",
                material_en: "Impasto Oil on Raw Canvas",
                placement_vi: "Góc thiền định, Phòng ngủ & Spa",
                placement_en: "Meditation Corner, Bedroom & Wellness Spa",
                desc_vi: "Khép lại chương Bình An bằng sắc xanh ngọc lam (cyan) thanh khiết, khắc họa bóng dáng Đức Phật tọa thiền tĩnh lặng trên tòa sen xanh phát sáng giữa màn đêm.",
                desc_en: "A tranquil silhouette meditating upon a glowing cyan-blue lotus blossom against vertical midnight-blue impasto brushwork."
            },

            // ================= TRỤ CỘT 03: NĂNG LƯỢNG THỊNH VƯỢNG (PROSPERITY & FENG SHUI) =================
            {
                id: "NAG-TSHV-6080",
                code: "NAG-TSHV-6080",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "framed",
                artStyle: "oil_snow_peak",
                priceVND: 15500000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Tuyết Sơn Hùng Vĩ (Thế Tựa Sơn)",
                title_en: "Majestic Snow Peak (Feng Shui Mountain Backing)",
                material_vi: "Sơn dầu trên vải Canvas | Đắp bay Impasto dày | Có khung",
                material_en: "Heavy Palette-Knife Impasto Oil on Canvas | Framed",
                placement_vi: "Phía sau ghế Chủ tịch / Bàn làm việc, Phòng khách lớn & Sảnh công ty",
                placement_en: "Behind Executive Desk, Main Living Room & Corporate Lobby",
                desc_vi: "Khắc họa đỉnh núi tuyết phủ trắng xóa vươn mình kiêu hãnh giữa nền trời xanh lam sâu thẳm, gửi gắm thế phong thủy 'tựa sơn' vững chãi để đón vận hội sung túc.",
                desc_en: "A towering snow-clad peak sculpted with bold palette-knife strokes against a deep azure sky, providing solid Feng Shui 'Mountain Backing' for leadership."
            },
            {
                id: "NAG-GTDMBT-6080",
                code: "NAG-GTDMBT-6080",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "framed",
                artStyle: "oil_apple_basket",
                priceVND: 13900000,
                size: "60cm x 80cm (Dòng có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Giỏ Táo Đỏ Mùa Bội Thu",
                title_en: "Abundant Harvest Basket of Crimson Apples",
                material_vi: "Sơn dầu trên vải Canvas | Ánh sáng Chiaroscuro cổ điển",
                material_en: "Classical Chiaroscuro & Impasto Oil on Canvas | Framed",
                placement_vi: "Phòng ăn sang trọng, Phòng khách & Quà mừng Tân gia viên mãn",
                placement_en: "Formal Dining Room, Living Room & Housewarming Gift",
                desc_vi: "Tôn vinh vẻ đẹp của mùa màng viên mãn với chiếc giỏ mây mộc mạc đầy ắp những quả táo đỏ chín mọng trên nền lá xanh trầm ấm, tượng trưng cho phúc lộc dồi dào.",
                desc_en: "Celebrates abundant harvest with a woven wicker basket overflowing with glossy crimson apples against a deep emerald classical background."
            },
            {
                id: "NAG-VDCVDT-5050",
                code: "NAG-VDCVDT-5050",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "framed",
                artStyle: "oil_whale_moon",
                priceVND: 12400000,
                size: "50cm x 50cm (Khổ vuông có khung)",
                edition_vi: "Độc Bản 1/1",
                edition_en: "1/1 Original",
                title_vi: "Vũ Điệu Cá Voi Dưới Trăng",
                title_en: "Whale Tail Dance Beneath the Full Golden Moon",
                material_vi: "Sơn dầu trên vải Canvas | Khung viền vàng hiện đại",
                material_en: "Impasto Oil on Canvas | Gold-Trimmed Frame",
                placement_vi: "Phòng khách, Phòng làm việc sáng tạo & Quà mừng Khai trương",
                placement_en: "Living Room, Executive Suite & Grand Opening Gift",
                desc_vi: "Lấy cảm hứng từ hình tượng ngư thủy chiêu tài và năng lượng bảo hộ của đại dương, khắc họa đuôi cá voi vươn cao nâng trọn vầng trăng vàng rực rỡ.",
                desc_en: "Inspired by ocean prosperity symbolism, a mighty whale fluke rises from sapphire waters cradling the full golden moon amidst cascading spray."
            },
            {
                id: "NAG-MOC-KSTC-6080",
                code: "NAG-MOC-KSTC-6080",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "raw",
                artStyle: "oil_golden_mountain",
                priceVND: 14200000,
                size: "60cm x 80cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Kim Sơn Thắng Cảnh",
                title_en: "Golden Mountain Panorama (Sunlit Peaks)",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc đắp nổi ánh kim)",
                material_en: "Heavy Impasto Oil on Raw Canvas",
                placement_vi: "Phòng khách, Văn phòng Công ty & Quà tặng Khai trương Hồng phát",
                placement_en: "Living Room, Corporate Office & Prosperity Gift",
                desc_vi: "Phô diễn vẻ đẹp tráng lệ của dãy núi dát vàng phủ tuyết lấp lánh dưới vòm trời xanh ngắt, biểu trưng cho nền tảng sự nghiệp vững chãi và tài lộc dồi dào.",
                desc_en: "Radiant golden sunlit mountain ridges rising above snow-covered slopes beneath a vivid blue sky, symbolizing unshakeable career prosperity."
            },
            {
                id: "NAG-MOC-TBXGHH-4060",
                code: "NAG-MOC-TBXGHH-4060",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "raw",
                artStyle: "oil_sunset_sail",
                priceVND: 9900000,
                size: "40cm x 60cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Thuận Buồm Xuôi Gió Hoàng Hôn",
                title_en: "Smooth Sailing at Rose-Gold Sunset",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc)",
                material_en: "Impasto Oil on Raw Canvas",
                placement_vi: "Bàn làm việc, Phòng khách, Quà tặng Doanh nhân",
                placement_en: "Office, Living Room & Entrepreneur Gift",
                desc_vi: "Giương cánh buồm no gió giữa mặt biển nhuộm ánh hoàng hôn hồng tím, gửi gắm lời chúc 'thuận buồm xuôi gió' đưa tài lộc vượt sóng tiến vào nhà.",
                desc_en: "Full billowing sails catching the evening breeze across a rose-and-violet sunset sea, wishing smooth sailing and business success."
            },
            {
                id: "NAG-MOC-SHCTBDKT-6080",
                code: "NAG-MOC-SHCTBDKT-6080",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "raw",
                artStyle: "oil_twin_deer",
                priceVND: 14500000,
                size: "60cm x 80cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Song Hươu Cát Tường",
                title_en: "Auspicious Twin Deer by the Golden Stream",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc)",
                material_en: "Impasto Oil on Raw Canvas",
                placement_vi: "Phòng khách gia đình, Sảnh biệt thự & Quà mừng Tân gia",
                placement_en: "Family Living Room, Villa Foyer & Housewarming Gift",
                desc_vi: "Hình tượng đôi hươu sao ('Lộc') đứng bên dòng sông ánh vàng dưới bóng cổ thụ và bầu trời ngũ sắc hội tụ ý nghĩa trường thọ, phú quý và vượng khí bốn mùa.",
                desc_en: "Two spotted deer ('Loc' - Prosperity) standing beside a sunlit golden stream under an autumn tree and iridescent sky."
            },
            {
                id: "NAG-MOC-KLDSVPQ-4060",
                code: "NAG-MOC-KLDSVPQ-4060",
                category: "oilpainting",
                pillar: "prosperity",
                spec: "raw",
                artStyle: "oil_golden_lotus",
                priceVND: 10500000,
                size: "40cm x 60cm (Bản mộc tràn viền)",
                edition_vi: "Độc Bản 1/1 • Bản Mộc",
                edition_en: "1/1 Original • Raw Canvas",
                title_vi: "Kim Lotus - Sen Vàng Phú Quý",
                title_en: "Golden Lotus of Noble Prosperity",
                material_vi: "Sơn dầu trên vải Canvas (Bản mộc đắp nổi cánh sen)",
                material_en: "Impasto Oil on Raw Canvas",
                placement_vi: "Phòng khách, Phòng trà, Không gian thờ tự & Spa cao cấp",
                placement_en: "Living Room, Tea Room, Sanctuary & Luxury Spa",
                desc_vi: "Khép lại chương Thịnh Vượng bằng vẻ đẹp đài các, đặc tả cận cảnh đóa sen vàng bừng nở kiêu hãnh giữa đầm lá xanh tràn đầy sinh lực, chiêu cảm tài lộc sung túc.",
                desc_en: "Close-up of a radiant golden lotus blossom in full bloom amidst textured emerald pond leaves, attracting noble abundance."
            }
        ];

        // --- 4. BESPOKE PROCEDURAL CANVAS ILLUSTRATION ENGINE (FAITHFULLY RECREATES EACH UPLOADED PHOTO & PAINTING) ---
        const generatedDataUrls = {};

        function getProductImageSrc(product) {
            if (customPhotoMap[product.id]) {
                return customPhotoMap[product.id];
            }
            if (generatedDataUrls[product.id]) {
                return generatedDataUrls[product.id];
            }
            const dataUrl = renderArtworkToDataURL(product);
            generatedDataUrls[product.id] = dataUrl;
            return dataUrl;
        }

        function addImpastoTexture(ctx, w, h, intensity = 0.12) {
            for (let i = 0; i < 380; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const len = 10 + Math.random() * 28;
                const angle = (Math.random() - 0.5) * 0.6;
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.fillStyle = i % 2 === 0 ? `rgba(255,255,255,${intensity})` : `rgba(0,0,0,${intensity * 0.7})`;
                ctx.fillRect(0, 0, len, 2.2);
                ctx.restore();
            }
        }

        function renderArtworkToDataURL(product) {
            const canvas = document.createElement('canvas');
            const w = 480;
            const h = 600;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            const style = product.artStyle;

            // Render specific visual composition matching the user's exact images & PDF paintings
            if (style === 'doll_pink') {
                // Purple studio backdrop + warm border like image_c1a7d1.jpg
                const bgGrad = ctx.createLinearGradient(0, 0, w, h);
                bgGrad.addColorStop(0, '#D9A7EB');
                bgGrad.addColorStop(1, '#B37CD9');
                ctx.fillStyle = bgGrad;
                ctx.fillRect(0, 0, w, h);

                // Twin-tail fluffy pink yarn hair
                ctx.fillStyle = '#F2B8B5';
                ctx.beginPath();
                ctx.ellipse(135, 315, 65, 85, 0.35, 0, Math.PI * 2);
                ctx.ellipse(345, 315, 65, 85, -0.35, 0, Math.PI * 2);
                ctx.fill();

                // Linen legs
                ctx.fillStyle = '#E8DFD1';
                ctx.beginPath();
                ctx.roundRect(205, 440, 32, 85, 16);
                ctx.roundRect(243, 440, 32, 85, 16);
                ctx.fill();

                // Linen arms
                ctx.beginPath();
                ctx.ellipse(165, 340, 20, 62, 0.35, 0, Math.PI * 2);
                ctx.ellipse(315, 340, 20, 62, -0.35, 0, Math.PI * 2);
                ctx.fill();

                // Floral dress with white lace hem
                ctx.fillStyle = '#D96B78';
                ctx.beginPath();
                ctx.moveTo(195, 275);
                ctx.lineTo(285, 275);
                ctx.lineTo(338, 435);
                ctx.lineTo(142, 435);
                ctx.closePath();
                ctx.fill();
                // Tiny floral print on dress
                for (let i = 0; i < 42; i++) {
                    const fx = 165 + Math.random() * 150;
                    const fy = 290 + Math.random() * 125;
                    ctx.fillStyle = i % 2 === 0 ? '#FCE4EC' : '#81C784';
                    ctx.beginPath();
                    ctx.arc(fx, fy, 4.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                // White lace hem
                ctx.fillStyle = '#F7F7F7';
                ctx.fillRect(140, 420, 200, 42);
                // White neck ribbon bow
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(240, 280);
                ctx.lineTo(195, 312);
                ctx.moveTo(240, 280);
                ctx.lineTo(290, 295);
                ctx.stroke();

                // Linen Head
                ctx.fillStyle = '#EFE7DA';
                ctx.beginPath();
                ctx.arc(240, 210, 74, 0, Math.PI * 2);
                ctx.fill();

                // Eyes & Rosy Cheeks
                ctx.fillStyle = '#222';
                ctx.beginPath();
                ctx.roundRect(212, 202, 7, 19, 3);
                ctx.roundRect(258, 202, 7, 19, 3);
                ctx.fill();
                ctx.fillStyle = 'rgba(235, 100, 120, 0.55)';
                ctx.beginPath();
                ctx.ellipse(202, 232, 16, 9, 0, 0, Math.PI * 2);
                ctx.ellipse(274, 232, 16, 9, 0, 0, Math.PI * 2);
                ctx.fill();

                // Pink Yarn Hair Bangs
                ctx.fillStyle = '#F4C1BE';
                ctx.beginPath();
                ctx.arc(240, 195, 78, Math.PI * 0.95, Math.PI * 2.05);
                ctx.fill();
                ctx.fillStyle = '#EFE7DA';
                ctx.beginPath();
                ctx.moveTo(240, 148);
                ctx.lineTo(192, 210);
                ctx.lineTo(288, 210);
                ctx.closePath();
                ctx.fill();

                // Rose Hair Clips
                ctx.fillStyle = '#D46A7E';
                ctx.beginPath();
                ctx.arc(160, 245, 18, 0, Math.PI * 2);
                ctx.arc(320, 245, 18, 0, Math.PI * 2);
                ctx.fill();

            } else if (style === 'bag_ocean_pink') {
                // Wood background like image_c1a7cb.jpg
                ctx.fillStyle = '#6D3F20';
                ctx.fillRect(0, 0, w, h);
                // Rainbow straps
                const rainbow = ['#F48FB1', '#FFF176', '#81D4FA', '#A5D6A7'];
                rainbow.forEach((col, idx) => {
                    ctx.strokeStyle = col;
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(135 + idx * 6, 275);
                    ctx.quadraticCurveTo(240, 15, 345 - idx * 6, 275);
                    ctx.stroke();
                });
                // Pink top handle wrap
                ctx.strokeStyle = '#FF80AB';
                ctx.lineWidth = 20;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.arc(240, 130, 52, Math.PI * 1.1, Math.PI * 1.9);
                ctx.stroke();

                // Ombre Pink Crochet Tote Body
                const tiers = ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A'];
                tiers.forEach((col, i) => {
                    ctx.fillStyle = col;
                    ctx.fillRect(75, 270 + i * 54, 330, 56);
                });
                // Crochet grid holes
                ctx.fillStyle = 'rgba(110, 30, 60, 0.25)';
                for (let r = 0; r < 16; r++) {
                    for (let c = 0; c < 22; c++) {
                        ctx.fillRect(86 + c * 14.5, 282 + r * 16, 5, 5);
                    }
                }
                // 3D Jellyfish on left
                ctx.fillStyle = '#E6EE9C';
                ctx.beginPath();
                ctx.arc(155, 315, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFA000';
                ctx.beginPath();
                ctx.arc(155, 312, 20, 0, Math.PI * 2);
                ctx.fill();
                // 3D Blue Starfish on right
                ctx.fillStyle = '#00B0FF';
                ctx.beginPath();
                ctx.arc(335, 315, 22, 0, Math.PI * 2);
                ctx.fill();
                // 3D Yellow Fish in center
                ctx.fillStyle = '#FFD600';
                ctx.beginPath();
                ctx.ellipse(225, 385, 22, 15, 0, 0, Math.PI * 2);
                ctx.fill();

            } else if (style === 'bag_sunflower') {
                // Outdoor softly blurred greenery background like image_c1a792.jpg
                ctx.fillStyle = '#D7E3D4';
                ctx.fillRect(0, 0, w, h);
                // Braided taupe straps
                ctx.strokeStyle = '#8D7B68';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(165, 250);
                ctx.quadraticCurveTo(240, 20, 315, 250);
                ctx.stroke();
                // Bag Body in Taupe
                ctx.fillStyle = '#9A8B7A';
                ctx.beginPath();
                ctx.roundRect(70, 240, 340, 290, 40);
                ctx.fill();
                // 9 Crochet Sunflowers (3x3 grid)
                const pos = [
                    [135, 300], [240, 300], [345, 300],
                    [135, 390], [240, 390], [345, 390],
                    [145, 475], [240, 475], [335, 475]
                ];
                pos.forEach(([sx, sy]) => {
                    // Yellow petals
                    ctx.fillStyle = '#FFC107';
                    for (let a = 0; a < 12; a++) {
                        ctx.save();
                        ctx.translate(sx, sy);
                        ctx.rotate((a * Math.PI) / 6);
                        ctx.beginPath();
                        ctx.ellipse(22, 0, 14, 6, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                    // Dark brown center
                    ctx.fillStyle = '#3E2723';
                    ctx.beginPath();
                    ctx.arc(sx, sy, 13, 0, Math.PI * 2);
                    ctx.fill();
                });

            } else if (style === 'bag_sakura_black') {
                // Warm wood door backdrop like image_c1a78f.jpg
                ctx.fillStyle = '#8D4E2A';
                ctx.fillRect(0, 0, w, h);
                // Black ring handle
                ctx.strokeStyle = '#26292E';
                ctx.lineWidth = 22;
                ctx.beginPath();
                ctx.arc(240, 145, 65, 0, Math.PI * 2);
                ctx.stroke();
                // Black textured crochet bag body
                ctx.fillStyle = '#1C1E22';
                ctx.beginPath();
                ctx.roundRect(65, 165, 350, 330, 32);
                ctx.fill();
                // Golden-brown embroidered branch sweeping diagonally
                ctx.strokeStyle = '#C59B27';
                ctx.lineWidth = 10;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(115, 445);
                ctx.quadraticCurveTo(250, 345, 345, 225);
                ctx.stroke();
                // 3D Pink & White Sakura blossoms
                const sakura = [
                    [175, 355, '#F48FB1'], [230, 345, '#F8BBD0'], [280, 330, '#F06292'],
                    [215, 295, '#FFFFFF'], [315, 280, '#F48FB1'], [345, 235, '#FCE4EC'],
                    [235, 390, '#FFFFFF'], [335, 195, '#F8BBD0']
                ];
                sakura.forEach(([bx, by, bcol]) => {
                    ctx.fillStyle = bcol;
                    for (let p = 0; p < 5; p++) {
                        ctx.beginPath();
                        const px = bx + Math.cos((p * 2 * Math.PI) / 5) * 10;
                        const py = by + Math.sin((p * 2 * Math.PI) / 5) * 10;
                        ctx.arc(px, py, 8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.fillStyle = '#AD1457';
                    ctx.beginPath();
                    ctx.arc(bx, by, 3, 0, Math.PI * 2);
                    ctx.fill();
                });

            } else if (style === 'bag_fuchsia_bow') {
                // Garden & purple daisy background like image_c1a78c.jpg
                ctx.fillStyle = '#DCE3DC';
                ctx.fillRect(0, 0, w, h);
                // Wicker flower basket on left
                ctx.fillStyle = '#6D4C41';
                ctx.beginPath();
                ctx.arc(155, 390, 75, 0, Math.PI);
                ctx.fill();
                for (let i = 0; i < 28; i++) {
                    ctx.fillStyle = i % 2 === 0 ? '#CE93D8' : '#4CAF50';
                    ctx.beginPath();
                    ctx.arc(85 + Math.random() * 145, 210 + Math.random() * 165, 8, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Fuchsia Basketweave Bag on right
                ctx.fillStyle = '#D5008F';
                ctx.beginPath();
                ctx.roundRect(215, 335, 215, 175, 18);
                ctx.fill();
                // Handle & Big Bow
                ctx.strokeStyle = '#D5008F';
                ctx.lineWidth = 16;
                ctx.beginPath();
                ctx.arc(322, 335, 82, Math.PI, 0);
                ctx.stroke();
                // Big Bow at top of handle
                ctx.fillStyle = '#E0119D';
                ctx.beginPath();
                ctx.moveTo(322, 245);
                ctx.lineTo(255, 215);
                ctx.lineTo(255, 275);
                ctx.closePath();
                ctx.moveTo(322, 245);
                ctx.lineTo(390, 215);
                ctx.lineTo(390, 275);
                ctx.closePath();
                ctx.fill();

            } else if (style === 'pouch_orange_cat') {
                // Stone countertop background like image_c1a772.jpg
                ctx.fillStyle = '#9EA4A8';
                ctx.fillRect(0, 0, w, h);
                // Chubby Cream-Orange Linen Cat Body
                ctx.fillStyle = '#F2DEC4';
                ctx.beginPath();
                ctx.ellipse(245, 320, 130, 155, -0.08, 0, Math.PI * 2);
                ctx.fill();
                // Cat Ears
                ctx.beginPath();
                ctx.moveTo(165, 185);
                ctx.lineTo(205, 120);
                ctx.lineTo(245, 170);
                ctx.moveTo(275, 170);
                ctx.lineTo(340, 145);
                ctx.lineTo(345, 215);
                ctx.fill();
                // Striped Tail at bottom left
                ctx.fillStyle = '#E5A965';
                ctx.beginPath();
                ctx.roundRect(95, 445, 130, 36, 18);
                ctx.fill();
                // 3D Paws on belly with brown stripes
                ctx.fillStyle = '#EFE0CA';
                ctx.beginPath();
                ctx.roundRect(145, 245, 58, 115, 28);
                ctx.roundRect(285, 275, 58, 105, 28);
                ctx.fill();
                ctx.fillStyle = '#5D4037';
                ctx.fillRect(152, 275, 44, 12);
                ctx.fillRect(152, 302, 44, 12);
                ctx.fillRect(292, 300, 44, 12);
                ctx.fillRect(292, 326, 44, 12);
                // Expressive Cat Eyes & Whiskers
                ctx.fillStyle = '#1E1B18';
                ctx.beginPath();
                ctx.arc(225, 200, 11, 0, Math.PI * 2);
                ctx.arc(298, 218, 11, 0, Math.PI * 2);
                ctx.fill();

            } else if (style === 'set_yellow_hat_bag') {
                // Stone pebble wall background like image_c1a755.jpg
                ctx.fillStyle = '#5D5348';
                ctx.fillRect(0, 0, w, h);
                // Sunny Yellow Crochet Tote at bottom
                ctx.fillStyle = '#FDD835';
                ctx.beginPath();
                ctx.roundRect(115, 320, 250, 175, 14);
                ctx.fill();
                // Wide-brim Yellow Sun Hat above
                ctx.fillStyle = '#FBC02D';
                ctx.beginPath();
                ctx.arc(225, 225, 105, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FDD835';
                ctx.beginPath();
                ctx.arc(225, 225, 50, 0, Math.PI * 2);
                ctx.fill();
                // Pink twin floral charm on bag
                ctx.strokeStyle = '#2E7D32';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(295, 320);
                ctx.lineTo(295, 370);
                ctx.stroke();
                ctx.fillStyle = '#F06292';
                ctx.beginPath();
                ctx.arc(285, 365, 11, 0, Math.PI * 2);
                ctx.arc(302, 382, 11, 0, Math.PI * 2);
                ctx.fill();

            } else if (style === 'oil_gtnl') {
                // Page 1: Giao Thoa Năng Lượng (Blue & dark green blocks, yellow center circle, red & black wedges)
                ctx.fillStyle = '#0D74D1';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#0B4628';
                ctx.fillRect(0, 160, 170, 380);
                ctx.fillRect(140, 250, 240, 160);
                // Golden Yellow Sun Circle
                ctx.fillStyle = '#F9A825';
                ctx.beginPath();
                ctx.arc(240, 300, 72, 0, Math.PI * 2);
                ctx.fill();
                // Red Triangle Wedge from Top Right pointing to Sun
                ctx.fillStyle = '#D32F2F';
                ctx.beginPath();
                ctx.moveTo(w, 40);
                ctx.lineTo(w, 290);
                ctx.lineTo(275, 310);
                ctx.closePath();
                ctx.fill();
                // Black Triangle Wedge from Bottom Left pointing to Sun
                ctx.fillStyle = '#111618';
                ctx.beginPath();
                ctx.moveTo(0, 340);
                ctx.lineTo(0, 560);
                ctx.lineTo(205, 305);
                ctx.closePath();
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_bmhv') {
                // Page 2: Bình Minh Hồng Vàng
                ctx.fillStyle = '#C2185B';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FFD600';
                ctx.beginPath();
                ctx.moveTo(w, 30);
                ctx.lineTo(230, 180);
                ctx.lineTo(260, 350);
                ctx.lineTo(w, 290);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#689F38';
                ctx.fillRect(190, 310, 290, 290);
                addImpastoTexture(ctx, w, h, 0.22);

            } else if (style === 'oil_gtbm') {
                // Page 2: Giao Thoa Bốn Mùa (4 color quadrants: yellow, blue-violet, green, crimson)
                ctx.fillStyle = '#FBC02D';
                ctx.fillRect(0, 0, w / 2, h / 2);
                ctx.fillStyle = '#5C6BC0';
                ctx.fillRect(w / 2, 0, w / 2, h / 2);
                ctx.fillStyle = '#2E7D32';
                ctx.fillRect(0, h / 2, w / 2, h / 2);
                ctx.fillStyle = '#C62828';
                ctx.fillRect(w / 2, h / 2, w / 2, h / 2);
                addImpastoTexture(ctx, w, h, 0.25);

            } else if (style === 'oil_smtl') {
                // Page 2: Sắc Màu Thung Lũng
                ctx.fillStyle = '#29B6F6';
                ctx.fillRect(0, 0, w, 240);
                ctx.fillStyle = '#EC407A';
                ctx.beginPath(); ctx.moveTo(0, 120); ctx.lineTo(180, 240); ctx.lineTo(0, 420); ctx.fill();
                ctx.fillStyle = '#26A69A';
                ctx.beginPath(); ctx.moveTo(w, 50); ctx.lineTo(290, 240); ctx.lineTo(w, 360); ctx.fill();
                ctx.fillStyle = '#8D6E63';
                ctx.fillRect(0, 400, w, 200);
                addImpastoTexture(ctx, w, h, 0.24);

            } else if (style === 'oil_bhmm') {
                // Page 3: Bến Hoa Mộng Mơ
                ctx.fillStyle = '#0D47A1';
                ctx.fillRect(0, 260, w, 340);
                ctx.fillStyle = '#FFF59D';
                ctx.fillRect(0, 0, w, 260);
                // Cherry blossom branches & boat
                ctx.fillStyle = '#F48FB1';
                for (let i = 0; i < 90; i++) {
                    ctx.beginPath();
                    ctx.arc(Math.random() * w, Math.random() * 320, 9, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = '#212121';
                ctx.beginPath();
                ctx.ellipse(270, 430, 48, 18, -0.2, 0, Math.PI * 2);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.18);

            } else if (style === 'oil_rctbn') {
                // Page 3: Ráng Chiều Trên Biển Ngọc
                const sky = ctx.createLinearGradient(0, 0, 0, 320);
                sky.addColorStop(0, '#0277BD');
                sky.addColorStop(0.6, '#EF6C00');
                sky.addColorStop(1, '#FFD54F');
                ctx.fillStyle = sky;
                ctx.fillRect(0, 0, w, 320);
                ctx.fillStyle = '#311B92';
                ctx.fillRect(0, 320, w, 280);
                ctx.fillStyle = '#1B5E20';
                ctx.beginPath();
                ctx.moveTo(250, 320);
                ctx.lineTo(380, 170);
                ctx.lineTo(w, 190);
                ctx.lineTo(w, 320);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.15);

            } else if (style === 'oil_nvbcs') {
                // Page 4: Nắng Vàng Bên Cửa Sổ
                ctx.fillStyle = '#795548';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#B3E5FC';
                ctx.beginPath();
                ctx.arc(240, 260, 140, Math.PI, 0);
                ctx.lineTo(380, 480);
                ctx.lineTo(100, 480);
                ctx.closePath();
                ctx.fill();
                // Yellow flowers in green vase
                ctx.fillStyle = '#FFD600';
                for (let i = 0; i < 85; i++) {
                    ctx.beginPath();
                    ctx.arc(120 + Math.random() * 240, 150 + Math.random() * 170, 10, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = '#AED581';
                ctx.fillRect(205, 320, 70, 130);
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_calla') {
                // Page 5: Bách Hợp White Calla
                ctx.fillStyle = '#141E19';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FAFAFA';
                ctx.beginPath();
                ctx.ellipse(275, 180, 65, 95, 0.25, 0, Math.PI * 2);
                ctx.ellipse(235, 360, 85, 60, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FDD835';
                ctx.fillRect(268, 150, 10, 45);
                ctx.fillRect(235, 340, 10, 40);
                addImpastoTexture(ctx, w, h, 0.12);

            } else if (style === 'oil_apricot_sky') {
                // Page 6: Hoa Mơ Trắng Nền Trời Xanh
                ctx.fillStyle = '#0288D1';
                ctx.fillRect(0, 0, w, h);
                ctx.strokeStyle = '#263238';
                ctx.lineWidth = 14;
                ctx.beginPath();
                ctx.moveTo(140, h); ctx.lineTo(260, 80);
                ctx.moveTo(320, h); ctx.lineTo(380, 60);
                ctx.stroke();
                ctx.fillStyle = '#FFFFFF';
                for (let i = 0; i < 140; i++) {
                    ctx.beginPath();
                    ctx.arc(Math.random() * w, Math.random() * h, 7, 0, Math.PI * 2);
                    ctx.fill();
                }
                addImpastoTexture(ctx, w, h, 0.18);

            } else if (style === 'oil_trangan') {
                // Page 6: Du Thuyền Trên Dòng Tràng An
                ctx.fillStyle = '#009688';
                ctx.fillRect(0, 290, w, 310);
                ctx.fillStyle = '#1B5E20';
                ctx.beginPath();
                ctx.moveTo(0, 320); ctx.lineTo(0, 30); ctx.lineTo(290, 60); ctx.lineTo(295, 290); ctx.fill();
                ctx.beginPath();
                ctx.moveTo(310, 290); ctx.lineTo(330, 80); ctx.lineTo(w, 20); ctx.lineTo(w, 300); ctx.fill();
                // Sampan boat
                ctx.fillStyle = '#D84315';
                ctx.beginPath();
                ctx.ellipse(210, 410, 62, 18, -0.15, 0, Math.PI * 2);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.14);

            } else if (style === 'oil_rainy_street') {
                // Page 7: Phố Mưa Hoàng Hôn (Yellow & red sky, streetlamps, silhouette couple under umbrella)
                ctx.fillStyle = '#FFC107';
                ctx.fillRect(0, 0, 220, 330);
                ctx.fillStyle = '#D32F2F';
                ctx.fillRect(220, 0, 260, 330);
                ctx.fillStyle = '#E1BEE7';
                ctx.fillRect(0, 330, w, 270);
                // Streetlamps
                ctx.fillStyle = '#111';
                [95, 155, 205].forEach((lx, i) => {
                    ctx.fillRect(lx, 230 + i * 25, 6, 280 - i * 45);
                });
                // Couple under umbrella
                ctx.beginPath();
                ctx.arc(245, 440, 24, Math.PI, 0);
                ctx.fill();
                ctx.fillRect(235, 442, 8, 45);
                ctx.fillRect(249, 442, 8, 45);
                addImpastoTexture(ctx, w, h, 0.2);

            } else if (style === 'oil_sunflower') {
                // Page 8: Hướng Dương Vươn Mây Ngàn
                ctx.fillStyle = '#CFD8DC';
                ctx.fillRect(0, 0, w, 200);
                ctx.fillStyle = '#689F38';
                ctx.fillRect(0, 150, w, 450);
                ctx.fillStyle = '#FFC107';
                ctx.beginPath();
                ctx.arc(255, 245, 92, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#4E342E';
                ctx.beginPath();
                ctx.arc(255, 245, 44, 0, Math.PI * 2);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.18);

            } else if (style === 'oil_tranquil_sail') {
                // Page 11: Bến Tĩnh Lặng Và Cánh Buồm Xa
                ctx.fillStyle = '#0288D1';
                ctx.fillRect(0, 0, w, 460);
                ctx.fillStyle = '#FFFDE7';
                ctx.beginPath();
                ctx.arc(250, 220, 145, 0, Math.PI * 2);
                ctx.fill();
                // Pebble shore & wooden bench
                ctx.fillStyle = '#8D6E63';
                ctx.fillRect(0, 440, w, 160);
                ctx.fillStyle = '#3E2723';
                ctx.fillRect(100, 475, 95, 32);
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_cloud_sea') {
                // Page 12: Biển Mây Bồng Bềnh Đại Ngàn
                ctx.fillStyle = '#E1F5FE';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#01579B';
                ctx.beginPath();
                ctx.moveTo(0, 290); ctx.lineTo(120, 110); ctx.lineTo(270, 220); ctx.lineTo(390, 70); ctx.lineTo(w, 190); ctx.lineTo(w, 340); ctx.lineTo(0, 340);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.18);

            } else if (style === 'oil_sapa_smile') {
                // Page 12: Nụ Cười Sapa
                ctx.fillStyle = '#1A365D';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#D32F2F';
                ctx.fillRect(160, 360, 160, 240);
                ctx.fillStyle = '#F5CBA7';
                ctx.beginPath();
                ctx.arc(240, 290, 62, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#B0BEC5';
                ctx.beginPath();
                ctx.arc(240, 245, 68, Math.PI, 0);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.15);

            } else if (style === 'oil_koi_lily') {
                // Page 13: Song Ngư Bơi Dưới Hoa Súng Trắng
                ctx.fillStyle = '#07211B';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#1B5E20';
                [[110, 140], [260, 120], [380, 190], [360, 460]].forEach(([lx, ly]) => {
                    ctx.beginPath(); ctx.arc(lx, ly, 58, 0, Math.PI * 2); ctx.fill();
                });
                // White Water Lily
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(225, 295, 68, 0, Math.PI * 2);
                ctx.fill();
                // Two Orange Koi Fish
                ctx.fillStyle = '#FF6D00';
                ctx.beginPath();
                ctx.ellipse(150, 420, 52, 18, 0.4, 0, Math.PI * 2);
                ctx.ellipse(320, 365, 55, 18, -0.5, 0, Math.PI * 2);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.15);

            } else if (style === 'oil_white_egret') {
                // Page 13: Bạch Cò Xòe Cánh
                ctx.fillStyle = '#0D47A1';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.ellipse(245, 245, 55, 130, -0.1, 0, Math.PI * 2);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.15);

            } else if (style === 'oil_serene_buddha') {
                // Page 14: Phật Tự Tại Và Sen Hồng
                ctx.fillStyle = '#4A154B';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#E1BEE7';
                ctx.beginPath();
                ctx.arc(230, 260, 68, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#F06292';
                [[310, 420], [335, 330], [350, 240]].forEach(([sx, sy]) => {
                    ctx.beginPath(); ctx.arc(sx, sy, 28, 0, Math.PI * 2); ctx.fill();
                });
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_bodhi_leaf') {
                // Page 15: Bồ Đề Tâm An (Crimson ground, radiant yellow Bodhi leaf, dark Buddha silhouette)
                ctx.fillStyle = '#6A1B29';
                ctx.fillRect(0, 0, w, h);
                // Golden Yellow Bodhi Leaf
                ctx.fillStyle = '#FFEA00';
                ctx.beginPath();
                ctx.arc(245, 310, 135, 0, Math.PI * 2);
                ctx.fill();
                // Buddha Silhouette inside leaf
                ctx.fillStyle = '#3E2723';
                ctx.beginPath();
                ctx.arc(240, 215, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(190, 260);
                ctx.lineTo(290, 260);
                ctx.lineTo(325, 415);
                ctx.lineTo(155, 415);
                ctx.closePath();
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.2);

            } else if (style === 'oil_canyon_zen') {
                // Page 16: Tĩnh Tọa Giữa Nhân Gian
                ctx.fillStyle = '#263238';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#1565C0';
                ctx.fillRect(190, 0, 100, h);
                ctx.fillStyle = '#FFB300';
                ctx.beginPath();
                ctx.arc(240, 335, 22, 0, Math.PI * 2);
                ctx.fillRect(212, 360, 56, 75);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.18);

            } else if (style === 'oil_cyan_lotus') {
                // Page 17: Thiền Định Trên Tòa Sen Xanh
                ctx.fillStyle = '#08182B';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#00B0FF';
                ctx.beginPath();
                ctx.ellipse(240, 340, 145, 75, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#E1F5FE';
                ctx.beginPath();
                ctx.ellipse(240, 260, 42, 85, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#050B14';
                ctx.beginPath();
                ctx.arc(240, 285, 22, 0, Math.PI * 2);
                ctx.fillRect(210, 310, 60, 75);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_snow_peak') {
                // Page 18: Tuyết Sơn Hùng Vĩ
                ctx.fillStyle = '#1565C0';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.moveTo(40, 390);
                ctx.lineTo(235, 115);
                ctx.lineTo(445, 360);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#212121';
                ctx.beginPath();
                ctx.moveTo(0, 350);
                ctx.lineTo(w, 460);
                ctx.lineTo(w, h);
                ctx.lineTo(0, h);
                ctx.closePath();
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.2);

            } else if (style === 'oil_apple_basket') {
                // Page 19: Giỏ Táo Đỏ Mùa Bội Thu
                ctx.fillStyle = '#1B4D2E';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#8D5B2B';
                ctx.beginPath();
                ctx.arc(285, 365, 85, 0, Math.PI);
                ctx.fill();
                ctx.fillStyle = '#D32F2F';
                [[85, 415], [155, 415], [245, 330], [290, 330], [335, 330]].forEach(([ax, ay]) => {
                    ctx.beginPath(); ctx.arc(ax, ay, 28, 0, Math.PI * 2); ctx.fill();
                });
                addImpastoTexture(ctx, w, h, 0.15);

            } else if (style === 'oil_whale_moon') {
                // Page 20: Vũ Điệu Cá Voi Dưới Trăng
                ctx.fillStyle = '#0277BD';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FFEB3B';
                ctx.beginPath();
                ctx.arc(245, 135, 54, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#102027';
                ctx.beginPath();
                ctx.moveTo(245, 195);
                ctx.lineTo(135, 225);
                ctx.lineTo(215, 370);
                ctx.lineTo(275, 370);
                ctx.lineTo(355, 225);
                ctx.closePath();
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_golden_mountain') {
                // Page 21: Kim Sơn Thắng Cảnh
                ctx.fillStyle = '#0288D1';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FFB300';
                ctx.beginPath();
                ctx.moveTo(0, 380);
                ctx.lineTo(170, 210);
                ctx.lineTo(345, 110);
                ctx.lineTo(w, 290);
                ctx.lineTo(w, 450);
                ctx.lineTo(0, 450);
                ctx.closePath();
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.22);

            } else if (style === 'oil_sunset_sail') {
                // Page 22: Thuận Buồm Xuôi Gió Hoàng Hôn
                ctx.fillStyle = '#8E6C88';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#F48FB1';
                ctx.beginPath();
                ctx.moveTo(275, 65);
                ctx.quadraticCurveTo(155, 240, 210, 415);
                ctx.lineTo(275, 415);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#212121';
                ctx.fillRect(195, 435, 165, 75);
                addImpastoTexture(ctx, w, h, 0.16);

            } else if (style === 'oil_twin_deer') {
                // Page 22: Song Hươu Cát Tường
                ctx.fillStyle = '#FFF59D';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FBC02D';
                ctx.beginPath();
                ctx.arc(110, 160, 125, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#3E2723';
                ctx.beginPath();
                ctx.moveTo(0, 320); ctx.lineTo(215, h); ctx.lineTo(0, h);
                ctx.moveTo(w, 370); ctx.lineTo(285, h); ctx.lineTo(w, h);
                ctx.fill();
                addImpastoTexture(ctx, w, h, 0.18);

            } else {
                // Page 22: Kim Lotus - Sen Vàng Phú Quý
                ctx.fillStyle = '#33691E';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#FFD600';
                for (let i = -3; i <= 3; i++) {
                    ctx.save();
                    ctx.translate(240, 395);
                    ctx.rotate(i * 0.28);
                    ctx.beginPath();
                    ctx.ellipse(0, -95, 38, 105, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
                addImpastoTexture(ctx, w, h, 0.18);
            }

            return canvas.toDataURL('image/jpeg', 0.9);
        }

        if (typeof window !== 'undefined') {
            window.products = products;
            window.customPhotoMap = customPhotoMap;
        }


