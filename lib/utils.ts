import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The shadcn class helper. Every component under components/ui/ expects it at
 * exactly this path — `@/lib/utils` — which is why it lives here rather than
 * somewhere tidier.
 *
 * clsx flattens conditionals and arrays; twMerge then resolves Tailwind
 * conflicts by LAST WINS, so a `className` passed in by a caller beats the
 * component's own default instead of the two both landing in the class list
 * and the winner being decided by stylesheet order. `cn("p-5", "p-2")` is
 * "p-2", not "p-5 p-2".
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
