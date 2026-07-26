"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { materialMeta, type Material } from "@/content/collections";
import { cn } from "@/lib/utils";

type Option = { label: string; hint?: string; value: string };

const steps: { key: "size" | "room" | "look"; question: string; options: Option[] }[] = [
  {
    key: "size",
    question: "How big are you going?",
    options: [
      { label: "Desk piece", hint: "A5", value: "A5" },
      { label: "Wall standard", hint: "A4", value: "A4" },
      { label: "Statement build", hint: "A3", value: "A3" },
      { label: "Not sure yet", value: "" },
    ],
  },
  {
    key: "room",
    question: "Where will it live?",
    options: [
      { label: "Living room", value: "living" },
      { label: "Bedroom", value: "bedroom" },
      { label: "Office or desk", value: "office" },
      { label: "Man cave / garage", value: "garage" },
    ],
  },
  {
    key: "look",
    question: "Which badge speaks to you?",
    options: [
      { label: "Precision German", hint: "Porsche", value: "porsche" },
      { label: "Quattro clean", hint: "Audi", value: "audi" },
      { label: "Hypercar money", hint: "Bugatti", value: "bugatti" },
      { label: "Raging bull", hint: "Lamborghini", value: "lamborghini" },
    ],
  },
];

export function FrameFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const reduce = useReducedMotion();

  const done = step >= steps.length;
  const material = (answers.look || "porsche") as Material;
  const size = answers.size;
  const href = `/shop?material=${material}${size ? `&size=${size}` : ""}`;

  function choose(value: string) {
    const key = steps[step].key;
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  const anim = reduce
    ? {}
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-carbon-800 bg-carbon-850 p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow text-race-500">Frame Finder</span>
        <div className="flex gap-1.5" aria-hidden>
          {steps.map((_, i) => (
            <span key={i} className={cn("h-1.5 rounded-full transition-all", i <= Math.min(step, steps.length - 1) && !done ? "w-5 bg-race-500" : i < step ? "w-5 bg-race-500" : "w-1.5 bg-carbon-700")} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div key={step} {...anim}>
              <h3 className="font-heading text-2xl font-medium text-carbon-50">{steps[step].question}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt.value + opt.label}
                    type="button"
                    onClick={() => choose(opt.value)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-carbon-800 bg-background px-4 py-3.5 text-left transition-colors hover:border-race-400 hover:bg-race-500/10"
                  >
                    <span>
                      <span className="block font-medium text-carbon-50">{opt.label}</span>
                      {opt.hint && <span className="block text-sm text-carbon-400">{opt.hint}</span>}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-carbon-500 transition-all group-hover:translate-x-0.5 group-hover:text-race-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" {...anim} className="flex h-full flex-col justify-center">
              <p className="text-eyebrow text-race-500">Your match</p>
              <h3 className="mt-2 font-heading text-3xl font-medium text-carbon-50">Start with {materialMeta[material].label}.</h3>
              <p className="mt-3 text-carbon-200">
                {materialMeta[material].label} suits what you described. We have pulled the builds that fit{size ? " in your size" : ""}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={href}>See {materialMeta[material].label} builds</Link>
                </Button>
                <Button type="button" variant="ghost" onClick={reset}>
                  <RotateCcw className="size-4" />
                  Start over
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step > 0 && !done && (
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="mt-6 inline-flex items-center gap-1.5 self-start text-sm text-carbon-400 transition-colors hover:text-carbon-100"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      )}
    </div>
  );
}
