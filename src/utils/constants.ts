import { get } from "lodash";

export const QUESTION_TYPES = {
  SHORT_ANSWER: "SHORT_ANSWER",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  CHECKBOXES: "CHECKBOXES",
};

export const TYPE_WITH_ANSWERS = new Set(["MULTIPLE_CHOICE", "CHECKBOXES"]);

export const QUESTION_TYPES_TITLES = {
  SHORT_ANSWER: "Short Answer",
  MULTIPLE_CHOICE: "Multiple Choice",
  CHECKBOXES: "Checkboxes",
};

export const QUESTION_TYPES_OPTIONS = Object.keys(QUESTION_TYPES).map((key) => ({
  value: get(QUESTION_TYPES, key),
  label: get(QUESTION_TYPES_TITLES, key),
}));
