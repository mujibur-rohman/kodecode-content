"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState("");

  const generateImage = async () => {
    try {
      if (pdfRef?.current) {
        // Clone Element
        const clonedElement = pdfRef.current.cloneNode(true) as HTMLDivElement;
        clonedElement.style.display = "flex";

        // Set width nya dengan ukuran A4
        clonedElement.style.width = "1240px";

        // Buat element yang di kloning agar tidak terlihat di user interface
        clonedElement.style.position = "absolute";
        clonedElement.style.left = "-999999px";

        // Masukkan element ke body
        document.body.appendChild(clonedElement);

        // Buat image canvas
        const canvas = await html2canvas(clonedElement, { scale: 2 });
        const imageData = canvas.toDataURL("image/png");

        // Remove element dari body
        document.body.removeChild(clonedElement);
        setImageData(imageData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const generatePDF = async () => {
    // Inisiasi PDF
    const pdf = new jsPDF("portrait", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = 297;
    // Masukkan gambar ke dalam PDF
    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
    // Download
    pdf.save("cv.pdf");
  };

  useEffect(() => {
    generateImage();
  }, [pdfRef]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Download CV
      </button>

      {!imageData ? (
        <p>No Preview</p>
      ) : (
        <Image
          src={imageData}
          width={500}
          height={300}
          alt="curriculum-vitae"
        />
      )}

      <div
        ref={pdfRef}
        className="p-6 border bg-white shadow-lg rounded-lg w-full max-w-[800px] aspect-[21/29.7] hidden flex-col"
      >
        <div className="flex items-center gap-4 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">John Doe</h1>
            <p className="text-gray-600">Front-End Developer</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold border-b pb-2">
              Personal Info
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>Email:</strong> john@example.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +62 812-3456-7890
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> Jakarta, Indonesia
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>React.js, Next.js, TypeScript</li>
              <li>Tailwind CSS & UI/UX Design</li>
              <li>Performance Optimization</li>
              <li>SEO & Web Accessibility</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
          <div className="mt-3">
            <h3 className="font-semibold">
              Front-End Developer - PT Maju Mundur
            </h3>
            <p className="text-gray-500 text-sm">2024 - Present</p>
            <p className="text-gray-700 text-sm">
              Maintaining web applications for finance-related projects.
            </p>
          </div>
          <div className="mt-3">
            <h3 className="font-semibold">
              Front-End Developer - PT Mundur Maju
            </h3>
            <p className="text-gray-500 text-sm">2023 - 2024</p>
            <p className="text-gray-700 text-sm">
              Worked on financial projects, improving UI/UX performance.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
          <p className="mt-2 text-gray-700">
            <strong>Informatics - SMK 14</strong> (2023)
          </p>
        </div>
      </div>
    </main>
  );
}
