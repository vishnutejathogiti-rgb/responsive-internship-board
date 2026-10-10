const listElement = document.querySelector("#internship-list");
const searchInput = document.querySelector("#search");
const domainSelect = document.querySelector("#domain");
const modeSelect = document.querySelector("#mode");
const clearButton = document.querySelector("#clear-filters");
const resultCount = document.querySelector("#result-count");
const statusElement = document.querySelector("#status");

let internships = [];

function showStatus(title, message, isError = false) {
  statusElement.hidden = false;
  statusElement.classList.toggle("error", isError);
  statusElement.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = title;
  const description = document.createElement("span");
  description.textContent = message;
  statusElement.append(heading, description);
}

function hideStatus() {
  statusElement.hidden = true;
  statusElement.classList.remove("error");
  statusElement.replaceChildren();
}

function createCard(internship) {
  const article = document.createElement("article");
  article.className = "internship-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const mark = document.createElement("div");
  mark.className = "company-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = internship.company.split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = internship.domain;
  top.append(mark, badge);

  const title = document.createElement("h3");
  title.textContent = internship.title;
  const company = document.createElement("p");
  company.className = "company";
  company.textContent = internship.company;
  const description = document.createElement("p");
  description.className = "description";
  description.textContent = internship.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  [internship.location, internship.mode, internship.duration, internship.stipend].forEach(value => {
    const chip = document.createElement("span");
    chip.className = "meta-chip";
    chip.textContent = value;
    meta.append(chip);
  });
  article.append(top, title, company, description, meta);
  return article;
}

function getFilteredInternships() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const domain = domainSelect.value;
  const mode = modeSelect.value;

  return internships.filter(item => {
    const searchableText = [item.title, item.company, item.domain, item.description, item.location, item.skills.join(" ")].join(" ").toLocaleLowerCase();
    return (!query || searchableText.includes(query)) &&
      (domain === "all" || item.domain === domain) &&
      (mode === "all" || item.mode === mode);
  });
}

function renderInternships() {
  const filtered = getFilteredInternships();
  listElement.replaceChildren();
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"} found`;
  listElement.setAttribute("aria-busy", "false");

  if (filtered.length === 0) {
    showStatus("No internships found", "Try another keyword or clear one or more filters to see more opportunities.");
    return;
  }
  hideStatus();
  const fragment = document.createDocumentFragment();
  filtered.forEach(item => fragment.append(createCard(item)));
  listElement.append(fragment);
}

async function loadInternships() {
  listElement.setAttribute("aria-busy", "true");
  try {
    const response = await fetch("./internships.json");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.some(item => !item.title || !item.company || !item.domain)) {
      throw new Error("The internship data format is invalid.");
    }
    internships = data;
    renderInternships();
  } catch (error) {
    listElement.setAttribute("aria-busy", "false");
    resultCount.textContent = "Internships could not be loaded";
    showStatus("Unable to load listings", "Please check your connection and make sure internships.json is in the same project folder. If you opened index.html directly, run a local server or use the deployed preview.", true);
    console.error("Internship loading error:", error);
  }
}

[searchInput, domainSelect, modeSelect].forEach(control => {
  control.addEventListener("input", renderInternships);
  control.addEventListener("change", renderInternships);
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  domainSelect.value = "all";
  modeSelect.value = "all";
  renderInternships();
  searchInput.focus();
});

loadInternships();
