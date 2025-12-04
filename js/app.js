// js/app.js

const STORAGE_KEY = "lawyer_platform_lawyers";

// Load lawyers from localStorage
function loadLawyers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading lawyers from storage", e);
    return [];
  }
}

// Save lawyers to localStorage
function saveLawyers(lawyers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lawyers));
}

// Seed demo lawyers if none exist
function seedDemoLawyers() {
  const existing = loadLawyers();
  if (existing.length > 0) return;

  const demo = [
    {
      id: "1",
      name: "أ. محمد العبدالله",
      email: "mohammed@example.com",
      specialty: "قضايا تجارية وشركات",
      city: "الرياض",
      bio: "خبرة 8 سنوات في تأسيس الشركات والعقود التجارية وتمثيل العملاء أمام الجهات القضائية."
    },
    {
      id: "2",
      name: "أ. نورة السبيعي",
      email: "noura@example.com",
      specialty: "الأحوال الشخصية والمواريث",
      city: "جدة",
      bio: "متخصصة في قضايا الأحوال الشخصية، صياغة الاتفاقيات الأسرية وحل النزاعات بالتراضي."
    },
    {
      id: "3",
      name: "أ. خالد الحربي",
      email: "khalid@example.com",
      specialty: "القانون العمالي",
      city: "حائل",
      bio: "خبرة في أنظمة العمل والعمال، تمثيل الشركات والموظفين في النزاعات العمالية."
    }
  ];

  saveLawyers(demo);
}

// Update hero stats
function updateHeroStats() {
  const stat = document.getElementById("statLawyers");
  if (!stat) return;
  const lawyers = loadLawyers();
  stat.textContent = "+" + lawyers.length;
}

// Register page handler
function initRegisterForm() {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("registerMessage");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    const lawyer = {
      id: Date.now().toString(),
      name: formData.get("name"),
      email: formData.get("email"),
      specialty: formData.get("specialty") || "",
      city: formData.get("city") || "",
      bio: formData.get("bio") || ""
    };

    const lawyers = loadLawyers();
    lawyers.push(lawyer);
    saveLawyers(lawyers);

    form.reset();
    if (message) {
      message.textContent = "تم تسجيل المحامي بنجاح (محفوظ محليًا في المتصفح).";
      message.className = "form-message success";
    }
  });
}

// Lawyers list page handler
function initLawyersList() {
  const listEl = document.getElementById("lawyersList");
  const noMsg = document.getElementById("noLawyersMessage");
  const searchInput = document.getElementById("searchInput");
  if (!listEl) return;

  const lawyers = loadLawyers();

  function render(filterText) {
    const query = (filterText || "").toLowerCase();
    listEl.innerHTML = "";

    const filtered = lawyers.filter(function (l) {
      const text = (l.name || "") + " " + (l.specialty || "") + " " + (l.city || "");
      return text.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      if (noMsg) noMsg.style.display = "block";
      return;
    } else if (noMsg) {
      noMsg.style.display = "none";
    }

    filtered.forEach(function (l) {
      const card = document.createElement("article");
      card.className = "lawyer-card";
      card.innerHTML =
        '<div class="lawyer-header">' +
        "<div>" +
        "<h3>" + l.name + "</h3>" +
        '<div class="lawyer-tagline">' + (l.specialty || "بدون تخصص محدد") + "</div>" +
        "</div>" +
        '<div class="rating">★ ★ ★ ★ ☆</div>' +
        "</div>" +
        '<div class="lawyer-meta">' +
        '<span class="meta-pill">' + (l.city || "مدينة غير محددة") + "</span>" +
        '<span class="meta-pill">' + l.email + "</span>" +
        "</div>" +
        (l.bio ? '<p class="lawyer-bio">' + l.bio + "</p>" : "") +
        '<div class="card-footer">' +
        "<span>استشارة مبدئية · سيتم تفعيل الأسعار لاحقًا</span>" +
        '<button class="btn btn-outline" type="button">طلب استشارة</button>' +
        "</div>";

      listEl.appendChild(card);
    });
  }

  render("");

  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      render(e.target.value);
    });
  }
}

// Login demo handler
function initLoginForm() {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    if (message) {
      message.textContent =
        "تم استقبال بيانات الدخول (واجهة فقط، لا يوجد تحقق Back-end بعد). البريد: " +
        email;
      message.className = "form-message success";
    }
  });
}

// Boot
document.addEventListener("DOMContentLoaded", function () {
  seedDemoLawyers();
  updateHeroStats();
  initRegisterForm();
  initLawyersList();
  initLoginForm();
});
