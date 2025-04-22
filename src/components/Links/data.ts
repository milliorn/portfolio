import type { SocialLink } from "./types";
import { url } from "../../config";

export const socialLinks: SocialLink[] = [
  {
    href: url.github,
    text: "Github",
  },
  {
    href: url.linkedin,
    text: "Linkedin",
  },
  {
    href: url.twitter,
    text: "Twitter",
  },
];
