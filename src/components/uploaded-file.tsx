"use client";

import { RefreshCwIcon, StopCircleIcon, TrashIcon } from "lucide-react";
import { Progress } from "./progress";
import axios, { CancelTokenSource } from "axios";
import { useEffect, useRef, useState } from "react";

function UploadedFile({
  file,
  onDelete,
}: {
  file: File;
  onDelete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const startUpload = async () => {
    try {
      if (isUploading) return;
      setIsUploading(true);
      setIsCanceled(false);
      setIsErrorUpload(false);
      setProgress(0);

      cancelTokenRef.current = axios.CancelToken.source();
      await axios.postForm(
        "http://localhost:5001/api/upload/images",
        {
          file,
        },
        {
          cancelToken: cancelTokenRef?.current?.token,
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress((prev) =>
                percent === 100 ? 99 : percent > prev ? percent : prev
              );
            }
          },
        }
      );

      setProgress(100);
    } catch (error) {
      setIsErrorUpload(true);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Upload dibatalkan.");
      setProgress(0);
      setIsUploading(false);
      setIsCanceled(true);
    }
  };

  useEffect(() => {
    startUpload();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border w-[30rem]">
      <p className="text-gray-500 text-sm">{file.name}</p>
      {isUploading && <Progress value={progress} />}

      <div className="flex justify-between">
        {isCanceled ? (
          <p className="text-xs text-red-500">Canceled!</p>
        ) : isErrorUpload ? (
          <p className="text-xs text-red-500">Upload failed!</p>
        ) : isUploading ? (
          <p className="text-xs text-gray-400">{progress}% Completed</p>
        ) : (
          progress === 100 && <p className="text-xs text-green-400">Uploaded</p>
        )}
        <div className="flex items-center gap-2">
          {(isCanceled || isErrorUpload) && (
            <>
              <RefreshCwIcon
                className="w-4 h-4 text-blue-500 cursor-pointer"
                onClick={startUpload}
              />
              <TrashIcon
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={onDelete}
              />
            </>
          )}
          {!isUploading && progress === 100 && (
            <TrashIcon
              className="w-4 h-4 text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          )}

          {isUploading && (
            <StopCircleIcon
              className="w-4 h-4 text-red-500 cursor-pointer"
              onClick={cancelUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadedFile;
