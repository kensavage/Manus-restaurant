/**
 * ROI Quiz Component — Config-Driven
 *
 * A multi-question interactive quiz + email capture that navigates to /results
 * page after submission. All questions and labels come from the config.
 *
 * Design: Deep navy (#10264c) + warm cream (#f5efe6) + electric teal (#75e0f3)
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { config } from "@/config";
import { getIcon } from "@/config/icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function RoiQuiz({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { quiz } = config;
  const questions = quiz.questions;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showEmailStep, setShowEmailStep] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [, navigate] = useLocation();

  const totalSteps = questions.length + 1;
  const currentQuestion = questions[step];
  const progress = showEmailStep ? 100 : ((step + 1) / totalSteps) * 100;

  const selectAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setShowEmailStep(true);
      }
    }, 300);
  };

  const goBack = () => {
    if (showEmailStep) {
      setShowEmailStep(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSubmitted(true);

    // Build query params from all answers + email
    const params = new URLSearchParams({ e: email });
    for (const q of questions) {
      params.set(q.id, String(answers[q.id] || 0));
    }

    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => {
        navigate(`/results?${params.toString()}`);
        setStep(0);
        setAnswers({});
        setShowEmailStep(false);
        setEmail("");
        setEmailSubmitted(false);
      }, 200);
    }, 800);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setStep(0);
        setAnswers({});
        setShowEmailStep(false);
        setEmail("");
        setEmailSubmitted(false);
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="!max-w-lg !p-0 !rounded-2xl !border-[#d0c4b7]/60 overflow-hidden !bg-[#fefefe] !gap-0"
      >
        <DialogTitle className="sr-only">ROI Calculator Quiz</DialogTitle>
        <DialogDescription className="sr-only">
          Answer a few questions to see how much money AI can save your business
        </DialogDescription>

        {showEmailStep ? (
          <div className="flex flex-col">
            <div className="h-1.5 bg-[#f5efe6] w-full">
              <div className="h-full bg-[#75e0f3] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={goBack} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5efe6] transition-colors text-[#10264c]/60 hover:text-[#10264c]" aria-label="Go back">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#10264c]/40">Last step</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#10264c] flex items-center justify-center text-[#75e0f3]">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <div className="px-6 pb-2">
              <h3 className="text-xl sm:text-2xl text-[#10264c] leading-snug" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {quiz.emailHeadline}
              </h3>
              <p className="text-sm text-[#5f6f88] mt-1.5">{quiz.emailSubtitle}</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="px-6 pt-4 pb-6">
              {!emailSubmitted ? (
                <>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#10264c]/30" />
                    <input
                      type="email"
                      required
                      placeholder={quiz.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 pl-12 pr-5 rounded-xl border-2 border-[#d0c4b7]/50 bg-white text-[#10264c] text-[15px] placeholder:text-[#10264c]/30 focus:outline-none focus:border-[#75e0f3] transition-colors"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full h-14 mt-4 rounded-xl bg-[#75e0f3] text-[#10264c] font-bold text-[15px] hover:brightness-95 active:scale-[0.98] transition-all duration-200"
                  >
                    See Results
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-xs text-[#5f6f88] mt-3">
                    No spam. We'll send your savings report and that's it.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <div className="w-14 h-14 rounded-full bg-[#75e0f3]/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7 text-[#10264c]" />
                  </div>
                  <p className="text-lg font-semibold text-[#10264c]">Calculating your savings...</p>
                  <p className="text-sm text-[#5f6f88] mt-1">Just a moment</p>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="h-1.5 bg-[#f5efe6] w-full">
              <div className="h-full bg-[#75e0f3] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button onClick={goBack} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5efe6] transition-colors text-[#10264c]/60 hover:text-[#10264c]" aria-label="Go back">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <span className="text-xs font-semibold tracking-wider uppercase text-[#10264c]/40">
                  Question {step + 1} of {totalSteps}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#10264c] flex items-center justify-center text-[#75e0f3]">
                {(() => { const Icon = getIcon(currentQuestion.iconName); return <Icon className="w-5 h-5" />; })()}
              </div>
            </div>

            <div className="px-6 pb-2">
              <h3 className="text-xl sm:text-2xl text-[#10264c] leading-snug" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {currentQuestion.question}
              </h3>
              <p className="text-sm text-[#5f6f88] mt-1.5">{currentQuestion.subtitle}</p>
            </div>

            <div className="px-6 pt-3 pb-6 space-y-2.5">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.label}
                    onClick={() => selectAnswer(option.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 group ${
                      isSelected
                        ? "border-[#75e0f3] bg-[#75e0f3]/10 text-[#10264c]"
                        : "border-[#d0c4b7]/50 bg-white text-[#10264c] hover:border-[#75e0f3]/60 hover:bg-[#f5efe6]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[15px]">{option.label}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected ? "border-[#75e0f3] bg-[#75e0f3]" : "border-[#d0c4b7] group-hover:border-[#75e0f3]/60"
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#10264c]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
