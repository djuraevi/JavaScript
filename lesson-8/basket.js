'use strict';

// получаем элементы корзины
const countIconBasket = document.querySelector('.cartIconWrap__count');
const totalPriceBasket = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const totalBasketEl = document.querySelector('.basketTotal');

const basketObj = {};

// обработчик на открытие/закрытие корзины
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

// обработчик на добавление информации о добавленном товаре
document.querySelector('.featuredItems')
    .addEventListener('click', ({target}) => {
        if (!target.closest('.addToCart')){
            return;
        }
        // получаем данные из data атрибутов
        const featuredItemEl = target.closest('.featuredItem');
        const id = +featuredItemEl.dataset.id;
        const name = featuredItemEl.dataset.name;
        const price = +featuredItemEl.dataset.price;

        // вызываем функцию
        addToCart(id, name, price);
    });

/**
 * собирает данные о добавленых товарах в обьект и заполняет
 * ячейки корзины
 * @param {number} id - id товара
 * @param {string} name - название товара
 * @param {number} price - цена товара
 */
function addToCart(id, name, price) {
    if (!(id in basketObj)) {
        basketObj[id] = {id, name, price, count: 0};
    }
    basketObj[id].count++;
    countIconBasket.textContent = getAllCountClick();
    totalPriceBasket.textContent = getAllSumProducts();
    renderRowProduct(id);
}

/**
 * считает у каждого товара колличество нажатий на него
 * @return {number} возвращает общее колличиство кликов
 */
function getAllCountClick() {
    const products = Object.values(basketObj);
    let count = 0;
    for (const product of products) {
        count += product.count;
    }
    return count;
}

/**
 * считает сумму всех добавленых товаров
 * @return {number} возвращает сумму всех продутов добавленых в корзину
 */
function getAllSumProducts() {
    const products = Object.values(basketObj);
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.count * product.price;
    }
    return totalPrice;
}

/**
 * проверяет стороку на уникальность id товара, и отрисовывает ее
 
 * @param {number} productId - id товара
 */
function renderRowProduct(productId) {
    const rowBasket = basketEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!rowBasket) {
        renderNewRowProduct(productId);
        return;
    } 
    const product = basketObj[productId];
    rowBasket.querySelector('.productCount').textContent = product.count;
    rowBasket
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count);   
}

/**
 * отрисовывавет сточки товара в корзине с полученными данными
 * @param {number} productId - id товара
 */
function renderNewRowProduct(productId) {
    const rowProduct = `
        <div class="basketRow" data-id="${productId}">
            <div>${basketObj[productId].name}</div>
            <div>
                <span class="productCount">${basketObj[productId].count}</span>
                шт.
            </div>
            <div>$${basketObj[productId].price}</div>
            <div>
                $<span class="productTotalRow">${(basketObj[productId].price *
                    basketObj[productId].count)}</span>
            </div>
        </div>    
    `;
    totalBasketEl.insertAdjacentHTML("beforebegin", rowProduct);
}