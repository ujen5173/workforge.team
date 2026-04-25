import { Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { siteConfig } from "~/lib/site";

const faqItems = [
  {
    question: `What is ${siteConfig.name}?`,
    answer:
      "${siteConfig.name} is an all-in-one employee management portal for small teams to run tasks, performance, leave, payroll, rewards, and collaboration from one place.",
  },
  {
    question: `Can my team manage tasks and projects in ${siteConfig.name}?`,
    answer:
      "Yes. Teams can assign tasks, set deadlines, track progress, and view project status in real time with manager visibility built in.",
  },
  {
    question: `How does leave management work in ${siteConfig.name}?`,
    answer:
      "Employees submit leave requests, managers approve or reject them, and HR gets a centralized record of balances, history, and policy compliance.",
  },
  {
    question: `Can employees see salary details and payment history in ${siteConfig.name}?`,
    answer:
      "Yes. ${siteConfig.name} provides payroll visibility for employees, including salary breakdowns, deductions, and payment records, while HR controls payroll operations.",
  },
  {
    question: `Does ${siteConfig.name} support rewards and recognition?`,
    answer:
      "Absolutely. You can run points-based leaderboards and automate rewards tied to performance metrics to keep teams motivated.",
  },
  {
    question: `How do I track employee performance in ${siteConfig.name}?`,
    answer:
      "Managers and leadership can monitor completion rates, workload balance, and output trends through lightweight performance insights.",
  },
  {
    question: `Can ${siteConfig.name} handle multiple teams or tenants?`,
    answer: `Yes. ${siteConfig.name} is designed as a multi-tenant platform, so each organization gets isolated data and a dedicated workspace experience.`,
  },
  {
    question: `Does ${siteConfig.name} integrate with existing workflows?`,
    answer: `${siteConfig.name} is built to fit modern team operations, and supports practical workflows for HR, managers, and employees in one shared system.`,
  },
  {
    question: `Is ${siteConfig.name} secure for company data?`,
    answer: `Yes. ${siteConfig.name} follows secure-access and role-based patterns so sensitive employee and payroll information stays protected.`,
  },
];

export default function FaqSection() {
  return (
    <section className="mt-16 border-t border-neutral-200 pt-10">
      <div className="grid gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">
            FAQs
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-4 text-sm font-medium text-neutral-800 hover:no-underline md:text-[20px] [&>[data-slot=accordion-trigger-icon]]:hidden">
                <span className="pr-6">{item.question}</span>
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <Plus className="h-4 w-4 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-base leading-7 text-neutral-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
