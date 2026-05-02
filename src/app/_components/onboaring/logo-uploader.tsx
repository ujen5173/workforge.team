"use client";

import { Cancel01Icon, ImageUploadIcon } from "hugeicons-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const LogoUploader = ({
  preview,
  companyName,
  onChange,
}: {
  preview: File | null;
  companyName: string;
  onChange: (file: File | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB.");
      return;
    }
    onChange(file);
  };

  const initials = companyName
    ? companyName
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "WF";

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative flex justify-center items-center bg-primary/10 hover:opacity-80 border-2 border-border rounded-xl w-16 h-16 overflow-hidden transition-all cursor-pointer shrink-0"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <Image
            src={URL.createObjectURL(preview)}
            alt="Company logo"
            fill
            className="object-cover"
          />
        ) : (
          <span className="font-bold text-primary text-lg tracking-tight select-none">
            {initials}
          </span>
        )}
      </div>

      <div
        className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-3 text-center transition-all ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-slate-50"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        <ImageUploadIcon className="w-5 h-5 text-muted-foreground" />
        <p className="text-muted-foreground text-xs">
          <span className="font-medium text-primary">Click to upload</span> or
          drag & drop
        </p>
        <p className="text-[11px] text-muted-foreground">
          PNG, JPG, Webp, SVG · max 2 MB
        </p>
      </div>

      {preview && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
          aria-label="Remove logo"
        >
          <Cancel01Icon className="w-4 h-4" />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default LogoUploader;
