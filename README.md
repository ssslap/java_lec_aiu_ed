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

## Быстрая проверка изменений (автовывод результатов и мобильное меню)

1) Запустите локальный сервер в каталоге проекта:

```bash
python3 -m http.server 8000
```

2) Откройте в браузере http://localhost:8000/index.html

3) Что проверить:
- Перейдите в любую лекцию — блоки вывода (`pre.result-output`, `pre.result-output-kk`, и т.д.) должны быть заполнены заранее (это подготовленные результаты, не требующие компиляции).
- На мобильном разрешении нажмите гамбургер — сайдбар должен выезжать, overlay затемнение появляется; нажмите затемнение или ESC чтобы закрыть.
- Кнопки запуска (`.run-java-sim*`, `.run-js*`) скрыты и не запускают компиляцию.

Если где-то всё ещё пусто — откройте DevTools → Console и пришлите ошибки или скопируйте HTML проблемного `code-example` блока: я поправлю его вручную.
