/* Лекция 6 RU: Наследование и полиморфизм (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 6: Наследование и полиморфизм</h2>

  <h3>Наследование (Inheritance)</h3>
  <p>Наследование — это один из столпов ООП, позволяющий одному классу (дочернему) унаследовать поля и методы другого класса (родительского). Это способствует повторному использованию кода и построению иерархии классов.</p>
  <p>В Java для этого используется ключевое слово <code>extends</code>. Класс может наследовать только от одного другого класса (нет множественного наследования классов).</p>
  
  <h4>Ключевое слово <code>super</code></h4>
  <p><code>super</code> — это ссылка на родительский класс. Она используется для:</p>
  <ul>
    <li><strong>Вызова конструктора родителя:</strong> <code>super(arguments);</code>. Это должно быть первым оператором в конструкторе дочернего класса.</li>
    <li><strong>Обращения к методам родителя:</strong> <code>super.methodName();</code>. Это полезно, когда нужно расширить, а не полностью заменить поведение родительского метода.</li>
  </ul>
  <pre><code class="lang-java">// Родительский класс
public class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public String getInfo() {
        return "Это фигура с именем " + name;
    }
}

// Дочерний класс
public class Circle extends Shape {
    private double radius;

    public Circle(String name, double radius) {
        super(name); // Вызов конструктора родительского класса
        this.radius = radius;
    }

    @Override // Аннотация, указывающая на переопределение метода
    public String getInfo() {
        // Вызов родительского метода и добавление своей информации
        return super.getInfo() + " и радиусом " + radius;
    }
}</code></pre>

  <h3>Полиморфизм (Polymorphism)</h3>
  <p>Полиморфизм дословно означает "много форм". В программировании это способность объекта использовать методы родительского класса, но с реализацией, специфичной для его собственного типа. Это позволяет писать более гибкий и универсальный код.</p>
  <p>Ключевой механизм полиморфизма в Java — это <strong>переопределение методов (method overriding)</strong>. Когда метод вызывается через ссылку на родительский класс, JVM во время выполнения определяет фактический тип объекта и вызывает соответствующую версию метода.</p>
  
  <h3>Интерактивный пример: Полиморфное поведение</h3>
  <p>Здесь мы создаем массив ссылок типа <code>Shape</code>, но помещаем в него объекты разных дочерних типов (<code>Circle</code>, <code>Rectangle</code>). При вызове метода <code>getInfo()</code> для каждого элемента будет выполняться его собственная, переопределенная версия.</p>
  <div class="code-example">
      <pre><code class="lang-java">public class GeometryDemo {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[2];
        shapes[0] = new Circle("Круг", 5.0);
        shapes[1] = new Rectangle("Прямоугольник", 4.0, 6.0);

        for (Shape shape : shapes) {
            // Вызывается реализация метода, соответствующая реальному типу объекта
            System.out.println(shape.getInfo());
        }
    }
}</code></pre>
      <div class="interactive-controls">
        <button class="run-java-sim">Выполнить демонстрацию</button>
      </div>
      <div class="output">
          <p><strong>Результат выполнения:</strong></p>
          <pre class="result-output">Результат: (примерный вывод)</pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const output = container.querySelector('.result-output');
      
      btn.addEventListener('click', () => {
        let log = '';
        log += 'Это фигура с именем Круг и радиусом 5.0\\n';
        log += 'Это фигура с именем Прямоугольник, шириной 4.0 и высотой 6.0'; // Предполагаемая реализация для Rectangle
        output.textContent = log;
      });
    })();
  </script>

  <h3>Спецификатор <code>final</code></h3>
  <p>Ключевое слово <code>final</code> накладывает ограничения на наследование и переопределение:</p>
  <ul>
    <li><strong><code>final class</code>:</strong> Запрещает создавать дочерние классы от этого класса. Класс <code>String</code>, например, является <code>final</code>.</li>
    <li><strong><code>final method</code>:</strong> Запрещает переопределять данный метод в классах-наследниках. Это используется для методов, реализация которых не должна меняться в иерархии.</li>
  </ul>
</div>
`;
  window.__LECTURES_ru_6 = html;
})();
