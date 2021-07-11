// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input'); // поле с наименьшим весом
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с наибольшим весом
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "class": "fruit_violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "class": "fruit_green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "class": "fruit_carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "class": "fruit_yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "class": "fruit_lightbrown"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let newFruits = [];
fruits.forEach((value, index) => {newFruits[index] = value});

let minW = 0, maxW = 10000000, kind = '', color = '', weight = '', start = 0, end = 0;

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.textContent = null;

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    if (+minW <= fruits[i].weight && +maxW >= fruits[i].weight) {
      let li = document.createElement('li');
      let div_total = document.createElement('div');
      let div_index = document.createElement('div');
      let div_kind = document.createElement('div');
      let div_color = document.createElement('div');
      let div_weight = document.createElement('div');
  
      li.className = "fruit__item " + fruits[i].class;
      div_total.className = "fruit__info";
      div_index.textContent = "index: " + i;
      div_kind.textContent = "kind: " + fruits[i].kind;
      div_color.textContent = "color: " + fruits[i].color;
      div_weight.textContent = "weight (кг): " + fruits[i].weight;
  
      fruitsList.append(li);
      li.append(div_total);
      div_total.append(div_index);
      div_total.append(div_kind);
      div_total.append(div_color);
      div_total.append(div_weight);
    }
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазон и перемешивание массива
const shuffleFruits = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

shuffleButton.addEventListener('click', () => {
  for (let i = 0; i < 100000; i++) {
    shuffleFruits(fruits);
  }
  display();
  if (fruits === newFruits) {
    alert("Порядок не изменился");
  }
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
minWeightInput.addEventListener('input', 
(event) => {
    minW = event.target.value;    
});

maxWeightInput.addEventListener('input', 
(event) => {
    maxW = event.target.value    
});

filterButton.addEventListener('click', () => {
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKindLabel.textContent === sortKind) {
    sortKindLabel.textContent = 'quickSort';
  }
  else {
    sortKindLabel.textContent = sortKind;
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  if (sortKindLabel.textContent == sortKind) {
    start = new Date().getTime();
    const n = fruits.length - 1;
    // внешняя итерация по элементам
    for (let i = 0; i < n; i++) { 
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < n - i; j++) { 
        // сравниваем элементы
        if (fruits[j].color > fruits[j + 1].color) { 
          // делаем обмен элементов
          let temp = fruits[j + 1].color; 
          fruits[j + 1].color = fruits[j].color; 
          fruits[j].color = temp; 
        }
      }
    }
  end = new Date().getTime();
  }
  else {
    start = new Date().getTime();
    fruits.sort(function(a, b) {
      // TODO: допишите функцию быстрой сортировки
      var nameA = a.color.toUpperCase(); // ignore upper and lowercase
      var nameB = b.color.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }  
      // names must be equal
      return 0;
    });
    end = new Date().getTime();
  }
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = `${end - start} ms`;
});

/*** ДОБАВИТЬ ФРУКТ ***/
kindInput.addEventListener('input', 
(event) => {
  kind = event.target.value;    
});

colorInput.addEventListener('input', 
(event) => {
  color = event.target.value    
});

weightInput.addEventListener('input', 
(event) => {
  weight = event.target.value;    
});

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kind != '' && color != '' && +weight > 0) {
    fruits.push({"kind": kind, "color": color, "weight": +weight, "class": fruits[Math.floor(Math.random() * 5)].class});
    newFruits = [];
    fruits.forEach((value, index) => {newFruits[index] = value});
    display();
  }
  else {
    alert("Добавлены не все характеристики фрукта");
  }
});