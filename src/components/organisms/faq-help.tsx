import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

export interface FAQLink {
  href: string;
  text: string;
  className?: string;
}

export interface FAQItem {
  value?: string;
  title: string;
  content: string | ReactNode;
  link?: FAQLink;
  afterLink?: string;
}

interface HelpSectionProps {
  title?: string;
  items: FAQItem[];
  containerClassName?: string;
  cardClassName?: string;
  isSticky?: boolean;
}

export default function HelpSection({
  title = "Need help?",
  items,
  containerClassName = "",
  cardClassName = "",
}: HelpSectionProps): JSX.Element {
  return (
    <div
      className={`flex-1 bg-white p-8 flex items-start justify-center pt-16 ${containerClassName}`}
    >
      <Card className={`w-[456px] py-10 mt-3 bg-white shadow-sm border-0 ${cardClassName}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-[700] text-[#181817]">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue={items[0]?.value} className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value || `item-${index}`}
                value={item.value || `item-${index}`}
                className="border-b"
              >
                <AccordionTrigger
                  value={item?.value}
                  className="text-sm font-[500] text-[#181817] hover:no-underline"
                >
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-[12px] text-gray-600 pb-4">
                  {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
                  {item.link && (
                    <a
                      href={item.link.href}
                      className={`font-medium ${
                        item.link.className || "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      {item.link.text}
                    </a>
                  )}
                  {item.afterLink && <span>{item.afterLink}</span>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
