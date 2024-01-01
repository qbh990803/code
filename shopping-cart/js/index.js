class UIGoods {
  constructor(data) {
    this.data = data;
    this.choose = 0;
  }

  getTotalPrice() {
    return this.choose * this.data.price;
  }

  isChoose() {
    return Boolean(this.choose);
  }

  increase() {
    this.choose++;
  }

  decrease() {
    if (this.choose === 0) return;
    this.choose--;
  }
}

const good = new UIGoods(goods[0]);

class UIData {
  constructor(data) {
    this.goods = data.map((i) => new UIGoods(i));
    this.deliveryPrice = 5;
    this.deliveryThreshold = 30;
  }

  getTotalPrice() {
    const totalPrice = this.goods.reduce(
      (prev, next) => prev + next.getTotalPrice(),
      0
    );

    return totalPrice;
  }

  increase(index) {
    this.goods[index].increase();
  }

  decrease(index) {
    this.goods[index].decrease();
  }

  getChooseGoodsNumber() {
    const chooseGoods = this.goods.reduce(
      (prev, next) => prev + next.choose,
      0
    );

    return chooseGoods;
  }

  hasGoodsInCar() {
    return this.getChooseGoodsNumber() > 0;
  }

  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }

  isChoose(index) {
    return this.goods[index].isChoose();
  }
}

class UI {
  constructor(data) {
    this.uiData = new UIData(data);
    this.doms = {
      goodsContainer: document.querySelector(".goods-list"),
      footerCarTip: document.querySelector(".footer-car-tip"),
      footerPay: document.querySelector(".footer-pay"),
      footerPayInnerSpan: document.querySelector(".footer-pay span"),
      footerCarTotal: document.querySelector(".footer-car-total"),
      footerCar: document.querySelector(".footer-car"),
      badge: document.querySelector(".footer-car-badge"),
    };
    this.createHTML();
    this.updateFooter();
    console.log("this.uiData", this.uiData);
  }

  createHTML() {
    let html = "";
    this.uiData.goods.forEach((good) => {
      html += `
      <div class="goods-item">
        <img src="${good.data.pic}" alt="" class="goods-pic" />
        <div class="goods-info">
          <h2 class="goods-title">${good.data.title}</h2>
          <p class="goods-desc">
            ${good.data.desc}
          </p>
          <p class="goods-sell">
            <span>月售 ${good.data.sellNumber}</span>
            <span>好评率${good.data.favorRate}%</span>
          </p>
          <div class="goods-confirm">
            <p class="goods-price">
              <span class="goods-price-unit">￥</span>
              <span>${good.data.price}</span>
            </p>
            <div class="goods-btns">
              <i class="iconfont i-jianhao"></i>
              <span>${good.choose}</span>
              <i class="iconfont i-jiajianzujianjiahao"></i>
            </div>
          </div>
        </div>
      </div>
      `;
    });

    this.doms.goodsContainer.innerHTML = html;
  }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodItem(index);
    this.updateFooter();
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodItem(index);
    this.updateFooter();
  }

  updateGoodItem(index) {
    const goodDom = this.doms.goodsContainer.children[index];
    if (this.uiData.isChoose(index)) {
      goodDom.classList.add("active");
    } else {
      goodDom.classList.remove("active");
    }

    const countDom = goodDom.querySelector(".goods-btns span");
    countDom.textContent = this.uiData.goods[index].choose;
  }

  updateFooter() {
    const totalPrice = this.uiData.getTotalPrice();
    this.doms.footerCarTip.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    this.doms.footerCarTotal.textContent = totalPrice.toFixed(2);

    if (this.uiData.isCrossDeliveryThreshold()) {
      this.doms.footerPay.classList.add("active");
    } else {
      this.doms.footerPay.classList.remove("active");
      const dis = this.uiData.deliveryThreshold - totalPrice;
      this.doms.footerPayInnerSpan.textContent = `还差￥${Math.round(
        dis
      )}元起送`;
    }

    if (this.uiData.hasGoodsInCar()) {
      this.doms.footerCar.classList.add("active");
    } else {
      this.doms.footerCar.classList.remove("active");
    }

    this.doms.badge.textContent = this.uiData.getChooseGoodsNumber();
  }
}

const ui = new UI(goods);
