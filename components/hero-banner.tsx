"use client";

import Image from "next/image";
import { Play, Gamepad2 } from "lucide-react";

export function HeroBanner() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-njcQpntlhV2aZxTgdB8NmL03gB9UX7.png"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen pt-20">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <Image
            src="/slogan3-BVWTqWOa.png"
            alt="Game Slogan"
            width={500}
            height={200}
            className="w-[280px] md:w-[400px] lg:w-[500px] h-auto drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gold-gradient mb-4 tracking-wider">
          Chien Luoc Giac Tinh
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl">
          Trai nghiem the gioi Tam Quoc huyen thoai - Noi hoi tu nhung vu tuong kiet xuat
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary via-red-700 to-secondary text-white font-bold text-lg rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-900/50 min-w-[200px] justify-center">
            <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Choi Ngay
          </button>
          <button className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-primary text-primary font-bold text-lg rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-w-[200px] justify-center">
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Xem Trailer
          </button>
        </div>

        {/* Download Options */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur rounded-lg border border-border">
            <Image src="/qr_code.jpg" alt="QR Code" width={60} height={60} className="rounded" />
            <span className="text-sm text-muted-foreground">Quet ma tai game</span>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-card/80 backdrop-blur rounded-lg border border-border hover:border-primary transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 12.5c0-1.58-.79-2.96-2-3.79l-1.17.79c.74.52 1.25 1.35 1.25 2.25 0 1.5-1.25 2.75-2.75 2.75s-2.75-1.25-2.75-2.75c0-.9.51-1.73 1.25-2.25l-1.17-.79c-1.21.83-2 2.21-2 3.79 0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5zM12.83 2.5l-.83.83-.83-.83L10 3.67l.83.83-.83.83L11.17 6.5l.83-.83.83.83L14 5.33l-.83-.83.83-.83L12.83 2.5z"/>
            </svg>
            <span className="font-medium">App Store</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-card/80 backdrop-blur rounded-lg border border-border hover:border-primary transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-11c-.83 0-1.5-.67-1.5-1.5zm13-1.5v-14h-8v14h8z"/>
            </svg>
            <span className="font-medium">Android</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-card/80 backdrop-blur rounded-lg border border-border hover:border-primary transition-colors">
            <span className="font-bold text-primary">TapTap</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
