"use client";

import * as React from "react";
import {
  FormFeedback as PageSpeedFormFeedback,
  type FormFeedbackProps as PageSpeedFormFeedbackProps,
} from "@page-speed/forms";

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
  const feedbackProps: PageSpeedFormFeedbackProps = {
    successMessage: isSubmitted ? successMessage : undefined,
    submissionError,
    successMessageClassName,
    errorMessageClassName,
  };

  return <PageSpeedFormFeedback {...feedbackProps} />;
};

export default FormFeedback;
