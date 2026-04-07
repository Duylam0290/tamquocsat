"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  Eye,
  Send,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image,
  Video,
  List,
  Palette,
  ChevronDown,
  ChevronUp,
  Calendar,
  X,
  Upload,
  Type,
} from "lucide-react";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSection({ title, children, defaultOpen = true }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#4a4238] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#352d22] hover:bg-[#3d352a] transition-colors"
      >
        <span className="font-medium text-[#e8e0d0]">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#c9a227]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#c9a227]" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-[#2a2218]">
          {children}
        </div>
      )}
    </div>
  );
}

interface TagPillProps {
  tag: string;
  onRemove?: () => void;
  isRemovable?: boolean;
  onClick?: () => void;
}

function TagPill({ tag, onRemove, isRemovable = false, onClick }: TagPillProps) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm 
        ${isRemovable 
          ? "bg-[#c9a227] text-[#1a1410]" 
          : "bg-[#352d22] text-[#c9a227] border border-[#4a4238] cursor-pointer hover:bg-[#3d352a]"
        }`}
    >
      {tag}
      {isRemovable && onRemove && (
        <button type="button" onClick={onRemove} className="hover:text-[#1a1410]/70">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  title?: string;
}

function ToolbarButton({ icon, onClick, active = false, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-[#4a4238] transition-colors ${
        active ? "bg-[#4a4238] text-[#c9a227]" : "text-[#e8e0d0]"
      }`}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-[#4a4238] mx-1" />;
}

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [permalink, setPermalink] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const suggestedTags = ["Cap nhat", "Su kien", "Hoat dong", "Bao tri", "Giai dau"];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSuggestedTagClick = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnail(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnail(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#1a1410]">
      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-[#2a2218] border-b border-[#4a4238]">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 text-[#c9a227] hover:text-[#e0c060] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Quay lai</span>
            </button>
            <div className="w-px h-6 bg-[#4a4238] hidden sm:block" />
            <h1 className="text-[#e8e0d0] font-medium text-sm sm:text-base">
              Soan bai viet moi
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg border border-[#4a4238] bg-[#352d22] text-[#e8e0d0] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Xem truoc</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#e0c060] text-[#1a1410] font-medium hover:from-[#d4ad32] hover:to-[#e8c870] transition-all shadow-lg shadow-[#c9a227]/20"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Dang bai</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto">
          {/* Left Column - Editor (75%) */}
          <div className="w-full lg:w-3/4 space-y-4">
            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tieu de bai viet..."
              className="w-full bg-transparent text-2xl sm:text-3xl font-serif font-bold text-[#e8e0d0] placeholder-[#8a8070] border-b-2 border-[#4a4238] focus:border-[#c9a227] outline-none pb-4 transition-colors"
            />

            {/* Toolbar */}
            <div className="bg-[#352d22] border border-[#4a4238] rounded-lg p-2 flex flex-wrap items-center gap-1">
              <ToolbarButton
                icon={<Undo2 className="w-4 h-4" />}
                onClick={() => execCommand("undo")}
                title="Hoan tac"
              />
              <ToolbarButton
                icon={<Redo2 className="w-4 h-4" />}
                onClick={() => execCommand("redo")}
                title="Lam lai"
              />

              <ToolbarDivider />

              {/* Font selector */}
              <div className="relative">
                <select
                  className="appearance-none bg-[#2a2218] border border-[#4a4238] rounded px-2 py-1.5 text-sm text-[#e8e0d0] cursor-pointer hover:border-[#c9a227] focus:outline-none focus:border-[#c9a227] pr-6"
                  onChange={(e) => execCommand("fontName", e.target.value)}
                >
                  <option value="inherit">Font chu</option>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
                <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-[#8a8070] pointer-events-none" />
              </div>

              {/* Font size selector */}
              <div className="relative">
                <select
                  className="appearance-none bg-[#2a2218] border border-[#4a4238] rounded px-2 py-1.5 text-sm text-[#e8e0d0] cursor-pointer hover:border-[#c9a227] focus:outline-none focus:border-[#c9a227] pr-6"
                  onChange={(e) => execCommand("fontSize", e.target.value)}
                >
                  <option value="3">Co chu</option>
                  <option value="1">Nho</option>
                  <option value="2">Vua</option>
                  <option value="3">Binh thuong</option>
                  <option value="4">Lon</option>
                  <option value="5">Rat lon</option>
                  <option value="6">Tieu de</option>
                </select>
                <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-[#8a8070] pointer-events-none" />
              </div>

              <ToolbarDivider />

              <ToolbarButton
                icon={<Bold className="w-4 h-4" />}
                onClick={() => execCommand("bold")}
                title="In dam (Ctrl+B)"
              />
              <ToolbarButton
                icon={<Italic className="w-4 h-4" />}
                onClick={() => execCommand("italic")}
                title="In nghieng (Ctrl+I)"
              />
              <ToolbarButton
                icon={<Underline className="w-4 h-4" />}
                onClick={() => execCommand("underline")}
                title="Gach chan (Ctrl+U)"
              />

              <ToolbarDivider />

              {/* Text color */}
              <div className="relative">
                <input
                  type="color"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => execCommand("foreColor", e.target.value)}
                />
                <div className="p-2 rounded hover:bg-[#4a4238] transition-colors text-[#e8e0d0] flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  <div className="w-4 h-1 bg-[#c9a227] rounded-full" />
                </div>
              </div>

              <ToolbarDivider />

              <ToolbarButton
                icon={<AlignLeft className="w-4 h-4" />}
                onClick={() => execCommand("justifyLeft")}
                title="Can trai"
              />
              <ToolbarButton
                icon={<AlignCenter className="w-4 h-4" />}
                onClick={() => execCommand("justifyCenter")}
                title="Can giua"
              />
              <ToolbarButton
                icon={<AlignRight className="w-4 h-4" />}
                onClick={() => execCommand("justifyRight")}
                title="Can phai"
              />

              <ToolbarDivider />

              <ToolbarButton
                icon={<Link2 className="w-4 h-4" />}
                onClick={() => {
                  const url = prompt("Nhap URL:");
                  if (url) execCommand("createLink", url);
                }}
                title="Chen lien ket"
              />
              <ToolbarButton
                icon={<Image className="w-4 h-4" />}
                onClick={() => {
                  const url = prompt("Nhap URL hinh anh:");
                  if (url) execCommand("insertImage", url);
                }}
                title="Chen hinh anh"
              />
              <ToolbarButton
                icon={<Video className="w-4 h-4" />}
                onClick={() => {
                  const url = prompt("Nhap URL video:");
                  if (url) {
                    execCommand(
                      "insertHTML",
                      `<iframe src="${url}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`
                    );
                  }
                }}
                title="Chen video"
              />
              <ToolbarButton
                icon={<List className="w-4 h-4" />}
                onClick={() => execCommand("insertUnorderedList")}
                title="Danh sach"
              />
            </div>

            {/* Editor Body */}
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              className="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-[#f5f0e8] text-[#1a1410] p-4 sm:p-6 rounded-lg border-2 border-[#4a4238] focus:border-[#c9a227] outline-none transition-colors prose prose-lg max-w-none"
              style={{ lineHeight: 1.8 }}
            />
          </div>

          {/* Right Column - Settings Sidebar (25%) */}
          <aside className="w-full lg:w-1/4 space-y-4">
            {/* Category */}
            <AccordionSection title="Cai dat bai dang">
              <div className="space-y-3">
                <label className="block text-sm text-[#8a8070]">Chuyen muc</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none bg-[#1a1410] border border-[#4a4238] rounded-lg px-4 py-3 text-[#e8e0d0] cursor-pointer hover:border-[#c9a227] focus:outline-none focus:border-[#c9a227] transition-colors"
                  >
                    <option value="">Chon chuyen muc...</option>
                    <option value="news">Tin tuc</option>
                    <option value="announcement">Cao thi</option>
                    <option value="event">Su kien</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8070] pointer-events-none" />
                </div>
              </div>
            </AccordionSection>

            {/* Tags */}
            <AccordionSection title="Nhan (Tags)">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Nhap tag..."
                    className="flex-1 bg-[#1a1410] border border-[#4a4238] rounded-lg px-3 py-2 text-[#e8e0d0] placeholder-[#8a8070] focus:outline-none focus:border-[#c9a227] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-[#c9a227] text-[#1a1410] rounded-lg hover:bg-[#d4ad32] transition-colors font-medium"
                  >
                    Them
                  </button>
                </div>

                {/* Selected tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <TagPill
                        key={tag}
                        tag={tag}
                        isRemovable
                        onRemove={() => handleRemoveTag(tag)}
                      />
                    ))}
                  </div>
                )}

                {/* Suggested tags */}
                <div>
                  <p className="text-xs text-[#8a8070] mb-2">Goi y:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags
                      .filter((tag) => !tags.includes(tag))
                      .map((tag) => (
                        <TagPill
                          key={tag}
                          tag={tag}
                          onClick={() => handleSuggestedTagClick(tag)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* Publish Date */}
            <AccordionSection title="Xuat ban vao">
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full bg-[#1a1410] border border-[#4a4238] rounded-lg px-4 py-3 text-[#e8e0d0] focus:outline-none focus:border-[#c9a227] transition-colors [color-scheme:dark]"
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8070] pointer-events-none" />
                </div>
              </div>
            </AccordionSection>

            {/* Permalink */}
            <AccordionSection title="Lien ket co dinh (Permalink)">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm text-[#8a8070]">
                  <span>tamquocsat.com/tin-tuc/</span>
                </div>
                <input
                  type="text"
                  value={permalink}
                  onChange={(e) =>
                    setPermalink(
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")
                    )
                  }
                  placeholder="url-bai-viet"
                  className="w-full bg-[#1a1410] border border-[#4a4238] rounded-lg px-4 py-3 text-[#e8e0d0] placeholder-[#8a8070] focus:outline-none focus:border-[#c9a227] transition-colors"
                />
              </div>
            </AccordionSection>

            {/* Thumbnail */}
            <AccordionSection title="Hinh anh dai dien (Thumbnail)">
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {thumbnail ? (
                  <div className="relative group">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-40 object-cover rounded-lg border border-[#4a4238]"
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnail(null)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-full h-40 border-2 border-dashed border-[#4a4238] rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#c9a227] hover:bg-[#352d22]/50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-[#8a8070]" />
                    <p className="text-sm text-[#8a8070] text-center px-4">
                      Keo tha anh bia hoac click de tai len
                    </p>
                  </div>
                )}
              </div>
            </AccordionSection>
          </aside>
        </div>
      </main>
    </div>
  );
}
