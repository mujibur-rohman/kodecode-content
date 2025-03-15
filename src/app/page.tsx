"use client";

import UploadedFile from "@/components/uploaded-file";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [fileData, setFileData] = useState<null | File>(null);

  const onChangeUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileData(file);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        {!fileData ? (
          <div>
            <input
              type="file"
              onChange={onChangeUpload}
              className="hidden"
              multiple
              id={"upload-file"}
            />
            <label
              htmlFor={"upload-file"}
              className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Upload File
            </label>
          </div>
        ) : (
          <UploadedFile file={fileData} onDelete={() => setFileData(null)} />
        )}
      </div>
    </main>
  );
}
