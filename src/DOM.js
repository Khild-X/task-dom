/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.innerHTML = content;
        document.body.append(element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    //Сначала создаю родительский элемент
    const parentElement = document.createElement('div');
    parentElement.className = 'item_1';
    //Вспомогательная функция для создания дочерних элементов
    let createChildElements = function (parentElement, childrenCount, level) {
        for (let i = 0; i < childrenCount; i++) {
            let childElement = parentElement.appendChild(
                document.createElement('div'),
            );
            childElement.className = 'item_' + level;
        }
    };
    //Создаю второй уровень дерева
    createChildElements(parentElement, childrenCount, 2);
    //По названию класса ищу элеметы и создаю у них дочерние элементы
    for (let i = 3; i <= level; i++) {
        let childrenElements = parentElement.querySelectorAll(
            '.item_' + (i - 1),
        );
        for (let childElement of childrenElements) {
            createChildElements(childElement, childrenCount, i);
        }
    }
    return parentElement;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let nodes = tree.querySelectorAll('.item_2');
    //Вспомогательная функция для перемещения всех дочерних элементов заменямого узла в новый узел
    let replaceChildren = function (node) {
        let section = document.createElement('SECTION');
        while (node.firstChild) {
            section.appendChild(node.firstChild);
            section.className = node.className;
        }
        tree.replaceChild(section, node);
    };
    for (let node of nodes) {
        replaceChildren(node);
    }
    return tree;
}
