const questions = [
  { id: "age", text: "What is your age?", type: "number" },
  { id: "income", text: "What is your annual income?", type: "number" },
  {
    id: "coverage",
    text: "Do you prefer low monthly costs or lower deductibles?",
    type: "radio",
    options: ["Low monthly costs", "Lower deductibles"],
  },
  {
    id: "doctor",
    text: "Do you have a preferred doctor or hospital network?",
    type: "text",
  },
  {
    id: "prescriptions",
    text: "Do you regularly take prescription medications?",
    type: "radio",
    options: ["Yes", "No"],
  },
];

export default questions;
