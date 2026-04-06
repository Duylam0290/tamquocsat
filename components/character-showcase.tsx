"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const characters = [
  {
    id: 1,
    name: "Tan Hien Anh",
    title: "Tri Giam Phu Nhan",
    faction: "Nguy",
    factionColor: "bg-blue-700",
    image: "/role_img2.png",
    nameImage: "/role_name2.png",
    avatar: "/thumbs_role2.png",
    avatarActive: "/thumbs_checked_role2.png",
    stats: { attack: 75, defense: 85, health: 90 },
    description:
      "Tan Hien Anh, nguoi Dinh Xuyen Duong Tra, con gai cua danh si Tan Bi thoi Tao Nguy. Ba la nguoi phu nu co tai va tam nhin xa trong thoi Tam Quoc. Ba tung du doan chinh xac cac su kien trong Tao Nguy, nhieu lan giup gia dinh tranh hoa.",
  },
  {
    id: 2,
    name: "Quan Vu",
    title: "Vo Thanh",
    faction: "Thuc",
    factionColor: "bg-green-700",
    image: "/role_img1.png",
    nameImage: "/role_name1.png",
    avatar: "/thumbs_role1.png",
    avatarActive: "/thumbs_checked_role1.png",
    stats: { attack: 95, defense: 80, health: 85 },
    description:
      "Quan Vu, tu Van Truong, la mot trong ngu ho tuong cua Thuc Han. Ong noi tieng voi long trung nghia va vo cong tuyet luan. Thanh Long Yen Nguyet Dao cua ong da tro thanh huyen thoai.",
  },
  {
    id: 3,
    name: "Dieu Thuyen",
    title: "Tu Dai My Nhan",
    faction: "Quan",
    factionColor: "bg-yellow-600",
    image: "/role_img3.png",
    nameImage: "/role_name3.png",
    avatar: "/thumbs_role3.png",
    avatarActive: "/thumbs_checked_role3.png",
    stats: { attack: 60, defense: 70, health: 75 },
    description:
      "Dieu Thuyen la mot trong tu dai my nhan cua Trung Quoc co dai. Nang co sac dep khuynh quoc khuynh thanh, duoc vi nhu la nguoi dep lam nghe ca nghieng nuoc.",
  },
  {
    id: 4,
    name: "Chu Du",
    title: "Dai Do Doc",
    faction: "Ngo",
    factionColor: "bg-red-700",
    image: "/role_img5.png",
    nameImage: "/role_name5.png",
    avatar: "/thumbs_role5.png",
    avatarActive: "/thumbs_checked_role5.png",
    stats: { attack: 85, defense: 75, health: 80 },
    description:
      "Chu Du, tu Cong Can, la danh tuong kiet xuat cua Dong Ngo. Ong da chi huy quan Ngo danh bai quan Tao Tao trong tran Xich Bich luong danh.",
  },
  {
    id: 5,
    name: "Gia Cat Luong",
    title: "Ngu Long",
    faction: "Thuc",
    factionColor: "bg-green-700",
    image: "/role_img6.png",
    nameImage: "/role_name6.png",
    avatar: "/thumbs_role6.png",
    avatarActive: "/thumbs_checked_role6.png",
    stats: { attack: 70, defense: 90, health: 85 },
    description:
      "Gia Cat Luong, tu Khong Minh, la quan su tai ba bac nhat thoi Tam Quoc. Ong duoc menh danh la Ngu Long Tien Sinh voi tri tue sieu pham va tai dung binh nhu than.",
  },
];

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-primary font-medium">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function CharacterShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const character = characters[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="characters" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/role_bg-CeFezcmw.png')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gold-gradient mb-4">
            DANH TUONG XUAT TRAN
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Character Info */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Name */}
            <div>
              <Image
                src={character.nameImage}
                alt={character.name}
                width={300}
                height={120}
                className="w-auto h-24 md:h-32 object-contain"
              />
              <div className="flex items-center gap-4 mt-4">
                <span
                  className={cn(
                    "px-4 py-1.5 text-white font-bold rounded",
                    character.factionColor
                  )}
                >
                  {character.faction}
                </span>
                <span className="text-xl text-primary font-serif">
                  [{character.title}]
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Thu Xuat
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-border text-foreground rounded-lg hover:border-primary transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-foreground/80 leading-relaxed text-lg">
              {character.description}
            </p>

            {/* Stats */}
            <div className="space-y-4 p-6 bg-card/50 rounded-lg border border-border">
              <h4 className="text-lg font-bold text-primary mb-4">Chi So</h4>
              <StatBar label="Cong Kich" value={character.stats.attack} />
              <StatBar label="Phong Thu" value={character.stats.defense} />
              <StatBar label="Sinh Luc" value={character.stats.health} />
            </div>
          </div>

          {/* Character Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-contain drop-shadow-2xl transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Character Selector */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="p-3 bg-primary/20 hover:bg-primary/40 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <div className="flex items-center gap-3 overflow-x-auto px-4 py-2">
            {characters.map((char, index) => (
              <button
                key={char.id}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0",
                  selectedIndex === index
                    ? "border-primary scale-110 glow-gold"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Image
                  src={selectedIndex === index ? char.avatarActive : char.avatar}
                  alt={char.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 bg-primary/20 hover:bg-primary/40 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
