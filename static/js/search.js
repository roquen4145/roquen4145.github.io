(() => {
  const input = document.getElementById("search-input");
  const resultsBox = document.getElementById("search-results");
  if (!input || !resultsBox) return;

  let index = [];

  const render = (items) => {
    if (!items.length) {
      resultsBox.classList.remove("active");
      resultsBox.innerHTML = "";
      return;
    }
    resultsBox.innerHTML = items
      .slice(0, 8)
      .map(
        (item) =>
          `<div class="search-result">
             <p class="eyebrow">${item.section}</p>
             <a href="${item.relpermalink}">${item.title}</a>
             <p class="summary">${item.summary}</p>
           </div>`
      )
      .join("");
    resultsBox.classList.add("active");
  };

  const loadIndex = async () => {
    if (index.length) return index;
    const metaTag = document.querySelector('meta[name="search-index"]');
    const indexPath = metaTag ? metaTag.getAttribute("content") : "/index.json";
    const resp = await fetch(indexPath, { cache: "no-store" });
    if (resp.ok) {
      index = await resp.json();
    }
    return index;
  };

  const search = (term) => {
    const q = term.trim().toLowerCase();
    if (!q) {
      render([]);
      return;
    }
    const scored = index
      .map((item) => {
        const haystack = `${item.title} ${item.summary} ${item.tags.join(" ")} ${item.section}`.toLowerCase();
        const match = haystack.includes(q);
        return match ? item : null;
      })
      .filter(Boolean);
    render(scored);
  };

  input.addEventListener("input", async (e) => {
    await loadIndex();
    search(e.target.value);
  });

  document.addEventListener("click", (e) => {
    if (!resultsBox.contains(e.target) && e.target !== input) {
      resultsBox.classList.remove("active");
    }
  });
})();
