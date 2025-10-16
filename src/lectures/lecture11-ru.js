/* Лекция 11 RU: Дополнительные возможности ООП (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 11: Дополнительные возможности ООП</h2>

  <h3>Перечисления (Enums)</h3>
  <p><strong>Перечисление (enum)</strong> — это специальный тип данных, который позволяет переменной быть одной из предопределенного набора констант. Использование enums делает код более безопасным с точки зрения типов и самодокументируемым.</p>
  <p>В Java <code>enum</code> — это больше, чем просто набор констант. Это особый вид класса, который может иметь свои поля, методы и конструкторы.</p>
  <pre><code class="lang-java">public enum Planet {
    MERCURY (3.303e+23, 2.4397e6),
    VENUS   (4.869e+24, 6.0518e6),
    EARTH   (5.976e+24, 6.37814e6);

    private final double mass;   // в килограммах
    private final double radius; // в метрах

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    public double surfaceGravity() {
        // Формула гравитационного ускорения
        return 6.67300E-11 * mass / (radius * radius);
    }
}

// Использование:
// Planet.EARTH.surfaceGravity() вернет гравитацию Земли.</code></pre>

  <h3>Шаблоны (Generics)</h3>
  <p><strong>Generics (обобщения или шаблоны)</strong> — это мощный механизм, который позволяет писать гибкий, переиспользуемый код, работающий с разными типами данных, при этом сохраняя строгую проверку типов во время компиляции. Основная идея — создание "параметризованных типов".</p>
  <p>Это позволяет избежать необходимости постоянно выполнять приведение типов и помогает отлавливать ошибки несоответствия типов на этапе компиляции, а не во время выполнения.</p>
  <pre><code class="lang-java">// Обобщенный класс "Box"
public class Box<T> {
    private T content;

    public void setContent(T content) {
        this.content = content;
    }

    public T getContent() {
        return content;
    }
}

// Использование с разными типами
Box<String> stringBox = new Box<>();
stringBox.setContent("Текст в коробке");

Box<Integer> integerBox = new Box<>();
integerBox.setContent(123);</code></pre>

  <h3>Вложенные классы (Nested Classes)</h3>
  <p>Java позволяет определять класс внутри другого класса. Такие классы называются вложенными и служат для инкапсуляции и логической группировки.</p>
  
  <h4>Основные типы:</h4>
  <ul>
    <li><strong>Статический вложенный класс (Static Nested Class):</strong> Связан с внешним классом, а не с его экземпляром. Не имеет доступа к нестатическим членам внешнего класса. Используется как обычный класс, но "спрятанный" внутри другого.</li>
    <li><strong>Внутренний класс (Inner Class):</strong> Связан с экземпляром внешнего класса. Имеет доступ ко всем (включая <code>private</code>) полям и методам своего "родительского" объекта.</li>
    <li><strong>Локальный класс (Local Class):</strong> Класс, определенный внутри метода. Его область видимости ограничена этим методом.</li>
    <li><strong>Анонимный класс (Anonymous Class):</strong> Локальный класс без имени. Используется для однократного создания экземпляра класса с "небольшим" переопределением поведения (часто для обработчиков событий).</li>
  </ul>

  <h3>Интерактивный пример: Анонимный класс для сортировки</h3>
  <p>Анонимные классы часто используются для реализации интерфейсов "на лету". В этом примере мы создаем компаратор для сортировки строк по длине, не создавая для этого отдельный именованный класс.</p>
  <div class="code-example">
      <pre><code class="lang-java">import java.util.Arrays;
import java.util.Comparator;

public class SortExample {
    public static void main(String[] args) {
        String[] names = {"Alice", "Bob", "Charlie", "Dave"};

        // Создание анонимного класса, реализующего Comparator
        Arrays.sort(names, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return Integer.compare(a.length(), b.length());
            }
        });

        System.out.println(Arrays.toString(names));
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim">Выполнить сортировку</button>
      </div>
      <div class="output">
          <p><strong>Результат:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const output = container.querySelector('.result-output');
      
      btn.addEventListener('click', () => {
        const names = ["Alice", "Bob", "Charlie", "Dave"];
        names.sort((a, b) => a.length - b.length);
        output.textContent = '[' + names.join(', ') + ']';
      });
    })();
  </script>
</div>
`;
  window.__LECTURES_ru_11 = html;
})();
