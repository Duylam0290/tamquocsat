"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "latest", label: "Moi Nhat" },
  { id: "announcement", label: "Cao Thi" },
  { id: "event", label: "Su Kien" },
  { id: "news", label: "Tin Tuc" },
];

const newsItems = [
  {
    id: 1,
    tag: "Cao Thi",
    tagColor: "bg-secondary",
    title: "Tam Quoc Sat Vu Tuong Giac Tinh chinh thuc ra mat",
    date: "2026-03-31",
    category: "announcement",
  },
  {
    id: 2,
    tag: "Cao Thi",
    tagColor: "bg-secondary",
    title: "Thong bao bao tri he thong ngay 30/03",
    date: "2026-03-30",
    category: "announcement",
  },
  {
    id: 3,
    tag: "Su Kien",
    tagColor: "bg-primary",
    title: "Su kien Lac Kim Dao - Nhan qua gia tri",
    date: "2026-03-30",
    category: "event",
  },
  {
    id: 4,
    tag: "Tin Tuc",
    tagColor: "bg-green-700",
    title: "Chuc mung can moc 1 trieu nguoi choi!",
    date: "2026-03-24",
    category: "news",
  },
  {
    id: 5,
    tag: "Su Kien",
    tagColor: "bg-primary",
    title: "Dang ky som - Nhan qua VIP doc quyen",
    date: "2026-03-20",
    category: "event",
  },
];

export function NewsSection() {
  const [activeTab, setActiveTab] = useState("latest");

  const filteredNews =
    activeTab === "latest"
      ? newsItems
      : newsItems.filter((item) => item.category === activeTab);

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gold-gradient mb-4">
            TIN TUC MOI NHAT
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Banner */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden ancient-border group">
              <Image
                src="/swip1.jpg"
                alt="Featured News"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-sm rounded mb-2">
                  Noi Bat
                </span>
                <h3 className="text-lg font-bold text-foreground line-clamp-2">
                  Giac Tinh Tap Ket - Phat Kim Dao
                </h3>
              </div>
            </div>

            {/* Additional banner */}
            <div className="relative aspect-video rounded-lg overflow-hidden ancient-border mt-4 group">
              <Image
                src="/swip2.jpg"
                alt="Event Banner"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* News List */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-2.5 font-medium rounded-lg transition-all duration-300 whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {tab.label}
                </button>
              ))}
              <button className="ml-auto flex items-center gap-1 text-primary hover:text-accent transition-colors">
                Xem Them <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* News Items */}
            <div className="space-y-3">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="group flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                >
                  <span
                    className={cn(
                      "shrink-0 px-3 py-1 text-sm font-medium text-white rounded",
                      item.tagColor
                    )}
                  >
                    {item.tag}
                  </span>
                  <h4 className="flex-1 font-medium text-foreground/80 group-hover:text-primary transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <time className="shrink-0 text-sm text-muted-foreground">
                    {item.date}
                  </time>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
