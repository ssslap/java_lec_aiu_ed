# Введение в программирование на Java — статический сайт лекций

Простой статический сайт с 15 лекциями по предмету "Введение в программирование на Java".

Особенности:
- 15 вкладок — по одной на каждую лекцию
- Переключение языка: русский (ru) и казахский (kk)
- Современный UI и анимации (GSAP + CSS)

Как запустить локально:

1. Откройте `index.html` в браузере напрямую (работает как статический файл).
2. Рекомендуется запуск через локальный сервер (чтобы fetch i18n.json работал корректно):

```bash
# из корня проекта
python3 -m http.server 8000
# затем открыть http://localhost:8000
```

Как сменить язык по умолчанию: откройте devtools -> Application -> localStorage и поменяйте ключ `lang` на `ru` или `kk`.

Дальнейшие улучшения (опционально):
- добавить markdown-файлы для содержания лекций и рендерер markdown
- добавить систему заметок, задания и хранение прогресса
- добавить переключение темы (тёмная/светлая)


## Deploy to GitHub Pages

Recommended simple workflow:

- Push the repository to GitHub (e.g., `origin/main`).
- In the repository Settings → Pages, set the source to `main` branch and `/ (root)` directory, or publish from `gh-pages` branch.
- If publishing as a project site (https://username.github.io/repo), links are relative so the site will work from the repo root.

Notes:
- If you host at a project path (not user site), GitHub Pages will serve the repo under `/repo/` — the site uses relative links by default and should work without changes.
- Add `CNAME` to the root if you want a custom domain.
