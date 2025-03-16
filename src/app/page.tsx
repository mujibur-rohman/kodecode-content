"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const generatePDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("document.pdf");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Download CV
      </button>

      <div
        id="pdf-content"
        className="p-6 border bg-white shadow-lg rounded-lg w-full max-w-[800px] aspect-[21/29.7] flex flex-col"
      >
        <div className="flex items-center gap-4 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">John Doe</h1>
            <p className="text-gray-600">Front-End Developer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
