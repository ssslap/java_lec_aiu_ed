/* Лекция 15 KK: Жобалау үлгілері (Кеңейтілген нұсқа) */
(function(){
  'use strict';
  var html = `
<div class="lecture-card">
  <h2>Дәріс 15: Жобалау үлгілері</h2>

  <h3>Жобалау үлгілеріне кіріспе</h3>
  <p><strong>Жобалау үлгілері (паттерндері)</strong> — бұл бағдарламалық қамтамасыз етуді жобалауда жиі кездесетін мәселелердің талғампаз, уақытпен тексерілген және қайта пайдалануға болатын шешімдері. Олар дайын код емес, керісінше, архитектураның икемділігін, оқылуын және қолдауын арттыру үшін нақты тапсырмаға бейімделуі мүмкін жалпы тұжырымдама.</p>

  <h3>Үлгілердің жіктелуі (GoF - "Төртеудің бандасы")</h3>
  <p>Классикалық түрде үлгілер үш негізгі санатқа бөлінеді:</p>
  <ol>
    <li><strong>Жасаушы (Creational):</strong> Объектілерді құру процесін басқарады, жүйені қандай объектілердің, қалай және қашан жасалатынына қатысты икемді етеді.
        <ul>
            <li><strong>Singleton (Жалғыз):</strong> Сыныптың тек бір ғана данасы болатынына кепілдік береді.</li>
            <li><strong>Factory Method (Фабрикалық әдіс):</strong> Объектіні құруға арналған интерфейсті анықтайды, бірақ ішкі сыныптарға қай сыныпты инстанциялау керектігін шешуге мүмкіндік береді.</li>
            <li><strong>Builder (Құрастырушы):</strong> Күрделі объектілерді қадам-қадаммен құруға мүмкіндік береді.</li>
        </ul>
    </li>
    <li><strong>Құрылымдық (Structural):</strong> Үлкенірек және күрделі құрылымдарды қалыптастыру үшін сыныптар мен объектілерді қалай біріктіруге болатынын анықтайды.
        <ul>
            <li><strong>Adapter (Адаптер):</strong> Үйлесімсіз интерфейстері бар объектілерге бірге жұмыс істеуге мүмкіндік береді.</li>
            <li><strong>Decorator (Декоратор):</strong> Объектілерге жаңа функционалдылықты динамикалық түрде қосуға мүмкіндік береді.</li>
            <li><strong>Facade (Қасбет):</strong> Ішкі сыныптардың күрделі жүйесіне қарапайым біріздендірілген интерфейс ұсынады.</li>
        </ul>
    </li>
    <li><strong>Мінез-құлықтық (Behavioral):</strong> Объектілер арасындағы өзара әрекеттесу және жауапкершілікті бөлу алгоритмдері мен тәсілдерін анықтайды.
        <ul>
            <li><strong>Strategy (Стратегия):</strong> Алгоритмдер тобын анықтайды, олардың әрқайсысын инкапсуляциялайды және оларды өзара алмастырылатын етеді.</li>
            <li><strong>Observer (Бақылаушы):</strong> Бір объектілерге басқа объектілерде болып жатқан оқиғаларды бақылауға және оларға жауап беруге мүмкіндік беретін жазылу механизмін жасайды.</li>
        </ul>
    </li>
  </ol>

  <h3>Интерактивті мысал: "Стратегия" үлгісі</h3>
  <p>"Стратегия" үлгісі бағдарламаның орындалуы кезінде тапсырманы орындау алгоритмін өзгертуге мүмкіндік береді. Бізде әртүрлі тасымалдау әдістерін (автомобиль, велосипед, дрон) қолдана алатын жеткізу жүйесі бар деп елестетейік. <code>if-else</code> жазудың орнына, біз әрбір әдісті жеке стратегия-сыныбына инкапсуляциялаймыз.</p>
  <div class="code-example">
      <pre><code class="lang-java">// 1. Стратегия интерфейсі
public interface DeliveryStrategy {
    void deliver(String parcel);
}

// 2. Нақты Стратегиялар
public class RoadDelivery implements DeliveryStrategy {
    public void deliver(String parcel) { /* Жолмен жеткізу логикасы */ }
}
public class DroneDelivery implements DeliveryStrategy {
    public void deliver(String parcel) { /* Дронмен жеткізу логикасы */ }
}

// 3. Стратегияны қолданатын контекст
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
        <p>Жеткізу әдісін таңдаңыз:</p>
        <select class="java-input-kk">
          <option value="road">Автомобиль</option>
          <option value="drone">Дрон</option>
          <option value="bike">Велосипед</option>
        </select>
        <button class="run-java-sim-kk">Сәлемдемені жіберу</button>
      </div>
      <div class="output">
          <p><strong>Жеткізу журналы:</strong></p>
          <pre class="result-output-kk"></pre>
      </div>
  </div>
  <script>
    (function() {
      const container = document.currentScript.closest('.code-example');
      const btn = container.querySelector('.run-java-sim-kk');
      const select = container.querySelector('select');
      const output = container.querySelector('.result-output-kk');
      
      const deliveryLogs = {
        road: "Сәлемдеме автомобильмен жолдар арқылы жіберілді.",
        drone: "Дрон сәлемдемемен мақсатқа қарай ұшты.",
        bike: "Велокурьер қала көшелерімен сәлемдемені алып кетті."
      };

      function deliver() {
        const strategy = select.value;
        let log = 'Стратегияны орнату: ' + strategy + '\\n';
        log += 'Жеткізуді орындау...\\n';
        log += deliveryLogs[strategy];
        output.textContent = log;
      }
      
      btn.addEventListener('click', deliver);
      deliver();
    })();
  </script>
  <p>Жобалау үлгілерін зерттеу — тіл негіздерін меңгергеннен кейінгі келесі маңызды қадам, ол сізге кәсіби, ауқымды және қолдауға оңай код жазуға көмектеседі.</p>
</div>
`;
  window.__LECTURES_kk_15 = html;
})();
