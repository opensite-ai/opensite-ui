"use client";

import * as React from "react";
import { cn } from "@/src";

type Props = {
  isSubmitted?: boolean;
  successMessageClassName?: string;
  successMessage?: React.ReactNode;
  submissionError?: React.ReactNode;
  errorMessageClassName?: string;
};

const FormFeedback = ({
  isSubmitted,
  successMessageClassName,
  successMessage,
  submissionError,
  errorMessageClassName,
}: Props) => {
  // Show nothing if no feedback to display
  if (!isSubmitted && !submissionError) return null;

  return (
    <>
      {/* Success Message */}
      {isSubmitted && !submissionError && (
        <div
          className={cn(
            "mb-6 p-4 bg-primary/10 border border-primary rounded-md",
            successMessageClassName,
          )}
        >
          {typeof successMessage === "string" ? (
            <p className="text-sm text-primary-foreground/90 text-center">{successMessage}</p>
          ) : (
            successMessage
          )}
        </div>
      )}

      {/* Error Message */}
      {submissionError && (
        <div
          className={cn(
            "mb-6 p-4 bg-destructive/10 border border-destructive rounded-md",
            errorMessageClassName,
          )}
        >
          {typeof submissionError === "string" ? (
            <p className="text-sm text-destructive text-center">
              {submissionError}
            </p>
          ) : (
            submissionError
          )}
        </div>
      )}
    </>
  );
};

export default FormFeedback;
