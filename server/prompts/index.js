import anshumanPrompt from "./anshuman.js";
import abhimanyuPrompt from "./abhimanyu.js";
import kshitijPrompt from "./kshitij.js";

export function getSystemPromptForPersona(persona) {
  switch (persona) {
    case "anshuman":
      return anshumanPrompt;
    case "abhimanyu":
      return abhimanyuPrompt;
    case "kshitij":
      return kshitijPrompt;
    default:
      return null;
  }
}

