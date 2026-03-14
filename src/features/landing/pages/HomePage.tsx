import banhNgotHero from "@/assets/gallery/banh-ngot-hero.png";
import banhNgot1 from "@/assets/gallery/banh-ngot-1.png";
import banhNgot2 from "@/assets/gallery/banh-ngot-2.png";
import banhNgot3 from "@/assets/gallery/banh-ngot-3.png";
import banhNgot4 from "@/assets/gallery/banh-ngot-4.png";
import banhNgot5 from "@/assets/gallery/banh-ngot-5.png";
import banhNgot6 from "@/assets/gallery/banh-ngot-6.png";

const GALLERY_IMAGES = [
  { src: banhNgot1, alt: "Bộ sưu tập bánh ngọt: bánh mousse, shortcake dâu, tiramisu, parfait" },
  { src: banhNgot2, alt: "Bánh vuông phủ berries, bánh sô-cô-la swirl trong tủ trưng bày" },
  { src: banhNgot3, alt: "Macaron phủ mâm xôi, bánh Pháp cao cấp" },
  { src: banhNgot4, alt: "Bánh mì brioche topping trái cây: cam, dâu, bơ, xoài" },
  { src: banhNgot5, alt: "Macarons nhiều màu và kẹo" },
  { src: banhNgot6, alt: "Cupcake Red Velvet với kem phô mai và dâu tươi" },
];

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 text-center space-y-12 pb-16">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Chào mừng đến Sweet Crumbs Bakery
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Hương vị bánh nướng tươi mới mỗi ngày, từ croissant bơ thơm đến mousse
          trái cây nhẹ mịn.
          <br className="hidden md:block" />
          Đặt bánh nhanh gọn, xem menu dễ dàng, và nhận ưu đãi theo mùa.
        </p>
      </div>

      <div className="relative group w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img
          src={banhNgotHero}
          alt="Các loại bánh ngọt, bánh bông lan phổ biến tại Việt Nam - Sweet Crumbs Bakery"
          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      <section className="w-full max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Bộ sưu tập bánh ngọt
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative group rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-muted/30"
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 rounded-2xl" />
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-56 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
