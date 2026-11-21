
import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = `${title} | StudyFlow`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
