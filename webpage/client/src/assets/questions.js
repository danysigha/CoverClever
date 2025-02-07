const questions = [
  { id: "age", text: "What is your age?", type: "number" },
  { id: "income", text: "What is your annual income?", type: "number" },
  {
    id: "coverage",
    text: "How much do you want to spend on health insurance?",
    type: "number",
  },
  {
    id: "prescriptions",
    text: "Do you regularly take prescription medications?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "preexisting",
    text: "Do you have any pre-existing medical conditions?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "family",
    text: "How many family members need coverage?",
    type: "number"
  },
  {
    id: "specialist",
    text: "Do you frequently visit specialists?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "vision",
    text: "Do you need vision coverage?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "dental",
    text: "Do you need dental coverage?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "emergency",
    text: "Have you had any emergency room visits in the past year?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "other",
    text: "Use this space to tell us about any other factors that may affect your health insurance needs.",
    type: "textarea"
  }
];

export default questions;
