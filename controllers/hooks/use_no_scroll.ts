export const useNoScroll = () => {
  const set = () => {
    if (typeof window !== "undefined") {
      document.addEventListener("wheel", function (event) {
        // @ts-ignore
        if (document.activeElement.type === "number" &&
          document.activeElement.classList.contains("noscroll")) {
          // @ts-ignore
          document.activeElement.blur();
        }
      });
    }
  };

  return { set }
}