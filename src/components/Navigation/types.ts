export type NavLink = {
  href: string;
  label: string;
  ariaLabel?: string;
  icon?: string; // Optional icon name or path
  external?: boolean; // Useful for opening external links in new tabs
};
