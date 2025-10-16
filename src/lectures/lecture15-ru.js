/* Лекция 15 RU: Шаблоны проектирования (Расширенная версия) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Лекция 15: Шаблоны проектирования</h2>

  <h3>Введение в шаблоны проектирования</h3>
  <p><strong>Шаблоны (паттерны) проектирования</strong> — это элегантные, проверенные временем и переиспользуемые решения для часто возникающих проблем в проектировании программного обеспечения. Они представляют собой не готовый код, а скорее общую концепцию, которую можно адаптировать под конкретную задачу для повышения гибкости, читаемости и поддерживаемости архитектуры.</p>

  <h3>Классификация шаблонов (GoF - "Банда четырех")</h3>
  <p>Классически шаблоны делят на три основные категории:</p>
  <ol>
    <li><strong>Порождающие (Creational):</strong> Управляют процессом создания объектов, делая систему более гибкой в вопросе того, какие объекты, как и когда создаются.
        <ul>
            <li><strong>Singleton (Одиночка):</strong> Гарантирует, что у класса будет только один экземпляр.</li>
            <li><strong>Factory Method (Фабричный метод):</strong> Определяет интерфейс для создания объекта, но позволяет подклассам решать, какой класс инстанцировать.</li>
            <li><strong>Builder (Строитель):</strong> Позволяет создавать сложные объекты пошагово.</li>
        </ul>
    </li>
    <li><strong>Структурные (Structural):</strong> Определяют, как классы и объекты могут быть скомпонованы для образования более крупных и сложных структур.
        <ul>
            <li><strong>Adapter (Адаптер):</strong> Позволяет объектам с несовместимыми интерфейсами работать вместе.</li>
            <li><strong>Decorator (Декоратор):</strong> Позволяет динамически добавлять объектам новую функциональность.</li>
            <li><strong>Facade (Фасад):</strong> Предоставляет простой унифицированный интерфейс к сложной системе подклассов.</li>
        </ul>
    </li>
    <li><strong>Поведенческие (Behavioral):</strong> Определяют алгоритмы и способы взаимодействия и распределения ответственности между объектами.
        <ul>
            <li><strong>Strategy (Стратегия):</strong> Определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми.</li>
            <li><strong>Observer (Наблюдатель):</strong> Создает механизм подписки, позволяющий одним объектам следить и реагировать на события, происходящие в других объектах.</li>
        </ul>
    </li>
  </ol>

  <h3>Интерактивный пример: Шаблон "Стратегия"</h3>
  <p>Шаблон "Стратегия" позволяет менять алгоритм выполнения задачи во время выполнения программы. Представим, что у нас есть система доставки, которая может использовать разные способы транспортировки (автомобиль, велосипед, дрон). Вместо того чтобы писать <code>if-else</code>, мы инкапсулируем каждый способ в отдельный класс-стратегию.</p>
  <div class="code-example">
      <pre><code class="lang-java">// 1. Интерфейс Стратегии
public interface DeliveryStrategy {
    void deliver(String parcel);
}

// 2. Конкретные Стратегии
public class RoadDelivery implements DeliveryStrategy {
    public void deliver(String parcel) { /* Логика доставки по дороге */ }
}
public class DroneDelivery implements DeliveryStrategy {
    public void deliver(String parcel) { /* Логика доставки дроном */ }
}

// 3. Контекст, который использует стратегию
public class DeliveryContext {
    private DeliveryStrategy strategy;

    public void setStrategy(DeliveryStrategy strategy) {
        this.strategy = strategy;
    }

    public void executeDelivery(String parcel) {
        strategy.deliver(parcel);
    }
}</code></pre>
      <div class="interactive-controls">
        <p>Выберите способ доставки:</p>
        <select class="java-input">
          <option value="road">Автомобиль</option>
          <option value="drone">Дрон</option>
          <option value="bike">Велосипед</option>
        </select>
        <button class="run-java-sim">Отправить посылку</button>
      </div>
      <div class="output">
          <p><strong>Лог доставки:</strong></p>
          <pre class="result-output"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim');
      const select = container.querySelector('select');
      const output = container.querySelector('.result-output');
      
      const deliveryLogs = {
        road: "Посылка отправлена автомобилем по дорогам.",
        drone: "Дрон взлетел с посылкой к цели.",
        bike: "Велокурьер выехал с посылкой по городским улицам."
      };

      function deliver() {
        const strategy = select.value;
        let log = 'Установка стратегии: ' + strategy + '\\n';
        log += 'Выполнение доставки...\\n';
        log += deliveryLogs[strategy];
        output.textContent = log;
      }
      
      btn.addEventListener('click', deliver);
      deliver();
    })();
  </script>
  <p>Изучение шаблонов проектирования — это следующий важный шаг после освоения основ языка, который поможет вам писать профессиональный, масштабируемый и поддерживаемый код.</p>
</div>
`;
  window.__LECTURES_ru_15 = html;
})();
