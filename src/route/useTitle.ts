import { useEffect } from "react";

type Segment = string | number | undefined | null;
const SEPARATOR = "•";
const SUFFIX = "Note App";

export function useTitle(...parts: Segment[]) {
  useEffect(() => {
    const defined = parts.filter(Boolean);
    const fullParts = [...defined, SUFFIX];
    const title = fullParts.join(` ${SEPARATOR} `);
    document.title = title;
  }, [parts]);
}
