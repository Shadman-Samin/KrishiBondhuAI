import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { MARKET_LISTINGS, PRICE_TREND } from "@/data/marketplace";
import { TrendingUp, TrendingDown, MapPin, Calendar, Tag } from "lucide-react";

export const Route = createFileRoute("/dashboard/marketplace")({
  component: MarketplacePage,
});

function MarketplacePage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | "sell" | "buy">("all");

  const listings =
    filter === "all" ? MARKET_LISTINGS : MARKET_LISTINGS.filter((l) => l.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">{t("Marketplace", "বাজার")}</h1>
        <p className="text-muted-foreground mt-1">
          {t("Buy and sell agricultural products", "কৃষি পণ্য কিনুন ও বিক্রি করুন")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PRICE_TREND.map((item) => (
          <div key={item.crop} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="text-sm font-medium">{t(item.crop, item.cropBn)}</div>
            <div className="text-xl font-bold font-display mt-1">৳{item.price}</div>
            <div className="flex items-center gap-1 mt-1">
              {item.change >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span className={`text-xs ${item.change >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                {item.change >= 0 ? "+" : ""}
                {item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <h2 className="font-semibold font-display">{t("Listings", "তালিকা")}</h2>
        <div className="flex gap-1 bg-accent rounded-lg p-1">
          {(["all", "sell", "buy"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all"
                ? t("All", "সব")
                : f === "sell"
                  ? t("Selling", "বিক্রি")
                  : t("Buying", "ক্রয়")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{t(listing.title, listing.titleBn)}</h3>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    listing.type === "sell"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {listing.type === "sell"
                    ? t("For Sale", "বিক্রি")
                    : t("Want to Buy", "কিনতে চাই")}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold font-display">৳{listing.price}</div>
                <div className="text-xs text-muted-foreground">/{listing.unit}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> {listing.quantity}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {t(listing.location, listing.locationBn)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {listing.date}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-sm">{t(listing.seller, listing.sellerBn)}</span>
              <button className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {t("Contact", "যোগাযোগ")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
