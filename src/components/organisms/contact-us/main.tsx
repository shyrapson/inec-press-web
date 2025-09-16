"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import {
  HaveQuestionCard,
  HowToApplyCard,
  NewApplicantCard,
} from "../how-to-apply/sidebar-card";

export default function ContactPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const representatives = [
    { name: "ADAEZE", phone: "09127675926" },
    { name: "BUHARI", phone: "07083613700" },
    { name: "BOLAJI", phone: "08059653879" },
  ];

  const handleCopy = (phone: string, idx: number) => {
    navigator.clipboard.writeText(phone);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000); // reset after 2s
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Call Representatives
              </h1>

              <p className="text-[#607087] mb-8 leading-relaxed">
                For enquiries or complaints, contact the numbers below between
                the hours of 10Am and 8PM.
              </p>

              <div className="space-y-6">
                {representatives.map((rep, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <p className="font-medium">{rep.name}</p>
                      <p className="text-sm text-gray-500">{rep.phone}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(rep.phone, idx)}
                      className="flex items-center space-x-1 border rounded px-3 py-1 text-sm hover:bg-gray-100"
                    >
                      <Copy className="h-4 w-4 text-green-600" />
                      <span>{copiedIndex === idx ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <HowToApplyCard />
            <NewApplicantCard />
            <HaveQuestionCard />
          </div>
        </div>
      </div>
    </div>
  );
}
