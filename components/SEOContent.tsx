import Link from "next/link";

export default function SEOContent() {
  return (
    <section className="py-16 bg-gray-50 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-dm-serif text-gray-900 mb-6">
            Best Car Washing Center in Satara - CAR STYLE Detailing Shop
          </h2>
          <div className="prose prose-sm md:prose-base text-gray-600 leading-relaxed space-y-4">
            <p>
              Looking for the <strong>best car washing center in Satara</strong>? <strong>CAR STYLE Premium Detailing Studio</strong> at{" "}
              <strong>Karanje Peth, Satara</strong> is the most trusted <strong>car washing shop in Satara</strong> and{" "}
              <strong>car detailing center in Satara</strong> with 127+ five-star reviews. Located at 307/24 Basappa peth, Opp.
              Yashwant Hospital, we are the go-to <strong>car wash center near you in Satara</strong> for all vehicle types.
            </p>
            <p>
              As a top-rated <strong>car detailing shop in Satara</strong>, we offer <Link href="/services" className="text-primary hover:underline font-semibold">car washing & detailing services in Satara</Link> starting at just ₹450. Our popular
              services include Standard Wash, Deluxe Wash, Premium Wash, <strong>ceramic coating in Satara</strong>,{" "}
              <strong>PPF coating in Satara</strong>, graphene coating, interior detailing, engine cleaning, and headlight
              restoration. Whether you search for <em>car washing shop near me</em>, <em>car care center in Satara</em>, or{" "}
              <em>car cleaning center Satara</em>, CAR STYLE delivers showroom shine with eco-friendly products and expert
              detailers.
            </p>
            <p>
              Why choose our <strong>car washing center in Satara</strong>? We use biodegradable soaps, water-saving techniques,
              and premium ceramic & PPF protection. Open daily 9AM-6PM at Karanje Peth. Call{" "}
              <a href="tel:+917058623593" className="text-primary font-bold hover:underline">+91 7058623593</a> to book your
              wash at the best car detailing center in Satara today.
            </p>
          </div>

          {/* Keyword cluster for local SEO - natural */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "car washing center in Satara",
              "car detailing center in Satara",
              "best car washing shop Satara",
              "car wash Karanje Peth",
              "ceramic coating Satara",
              "PPF Satara",
              "car cleaning Satara",
            ].map((k) => (
              <Link
                key={k}
                href="/services"
                className="text-[11px] font-semibold tracking-wide uppercase bg-white border border-black/5 px-3 py-1.5 rounded-full text-gray-500 hover:text-primary hover:border-primary/20 transition-colors"
              >
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
