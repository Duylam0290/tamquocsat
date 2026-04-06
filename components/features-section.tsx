"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: 1,
    title: "Che Do Tran Dau Da Dang",
    description: "Tham gia nhieu che do choi hap dan tu PvP den PvE",
    image: "/feature_img1.jpg",
  },
  {
    id: 2,
    title: "He Thong Tuong Phong Phu",
    description: "Hon 200 tuong voi ky nang doc dao",
    image: "/feature_img2.jpg",
  },
  {
    id: 3,
    title: "Do Hoa Tuyet Dep",
    description: "Hinh anh chat luong cao, hieu ung an tuong",
    image: "/feature_img3.jpg",
  },
  {
    id: 4,
    title: "Chien Thuat Sau Sac",
    description: "Ket hop tuong va ky nang de tao chien thuat rieng",
    image: "/feature_img4.jpg",
  },
  {
    id: 5,
    title: "Su Kien Lien Tuc",
    description: "Cap nhat thuong xuyen voi nhieu su kien hap dan",
    image: "/feature_img5.jpg",
  },
];

export function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="guide" className="py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gold-gradient mb-4">
            TINH NANG NOI BAT
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Features Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden ancient-border">
            <Image
              src={features[currentIndex].image}
              alt={features[currentIndex].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {features[currentIndex].title}
              </h3>
              <p className="text-lg text-foreground/80">
                {features[currentIndex].description}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 hover:bg-primary rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 hover:bg-primary rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-primary w-8"
                  : "bg-muted hover:bg-primary/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
