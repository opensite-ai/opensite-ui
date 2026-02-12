import { useState, useCallback } from "react";

export interface FileUploadProgress {
  [fileName: string]: number; // 0-100
}

export interface UseFileUploadReturn {
  uploadTokens: string[];
  uploadProgress: FileUploadProgress;
  isUploading: boolean;
  uploadFiles: (files: File[]) => Promise<void>;
  removeFile: (file: File, index: number) => void;
  resetUpload: () => void;
}

/**
 * Hook for handling file uploads to DashTrack API
 *
 * @example
 * ```tsx
 * const { uploadTokens, uploadProgress, isUploading, uploadFiles, removeFile } = useFileUpload({
 *   onError: (error) => console.error(error)
 * });
 * ```
 */
export function useFileUpload(options?: {
  onError?: (error: Error) => void;
  endpoint?: string;
}): UseFileUploadReturn {
  const [uploadTokens, setUploadTokens] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<FileUploadProgress>({});
  const [isUploading, setIsUploading] = useState(false);

  const endpoint = options?.endpoint || "https://api.dashtrack.com/contacts/_/contact_form_uploads";

  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      setIsUploading(true);

      try {
        const tokens: string[] = [];

        for (const file of files) {
          // Build FormData for upload
          const formData = new FormData();
          formData.append("contact_form_upload[file_upload]", file);
          formData.append("contact_form_upload[title]", file.name);
          formData.append("contact_form_upload[file_name]", file.name);
          formData.append("contact_form_upload[file_size]", String(file.size));

          // Upload file
          const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          if (data.contact_form_upload?.token) {
            tokens.push(`upload_${data.contact_form_upload.token}`);
          }

          // Update progress
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
        }

        setUploadTokens(tokens);
      } catch (error) {
        console.error("File upload error:", error);
        options?.onError?.(error as Error);
      } finally {
        setIsUploading(false);
      }
    },
    [endpoint, options]
  );

  const removeFile = useCallback((file: File, index: number) => {
    setUploadTokens((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[file.name];
      return newProgress;
    });
  }, []);

  const resetUpload = useCallback(() => {
    setUploadTokens([]);
    setUploadProgress({});
  }, []);

  return {
    uploadTokens,
    uploadProgress,
    isUploading,
    uploadFiles,
    removeFile,
    resetUpload,
  };
}
