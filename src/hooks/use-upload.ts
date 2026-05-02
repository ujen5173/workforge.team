import axios from "axios";
import { useState } from "react";

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

interface UseUploadOptions {
  folder?: string;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}

export function useUpload(options: UseUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File): Promise<UploadResult | null> {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (options.folder) formData.append("folder", options.folder);

      const res = await axios.post<UploadResult>("/api/uploads", formData);

      if (!res.data) {
        const msg = "No data returned from server";
        setError(msg);
        options.onError?.(msg);
        return null;
      }

      options.onSuccess?.(res.data);
      return res.data;
    } catch (err: unknown) {
      let msg = "Network error during upload";

      if (axios.isAxiosError(err)) {
        if (
          err.response?.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
        ) {
          const data = err.response.data as Record<string, unknown>;
          msg = typeof data.message === "string" ? data.message : err.message;
        } else {
          msg = err.message;
        }
      } else if (err instanceof Error) {
        msg = err.message;
      }

      setError(msg);
      options.onError?.(msg);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  return { upload, isUploading, error };
}
