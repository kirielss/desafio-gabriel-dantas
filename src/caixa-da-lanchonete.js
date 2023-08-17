class CaixaDaLanchonete {
  cardapio = {
    cafe: 3.0,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2.0,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
  };

  calcularValorDaCompra(metodoDePagamento, itens) {
    let price = 0;
    let cafeCheck = false;
    let sanduicheCheck = false;
    let finalPrice = 0;

    if (!itens || itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (
      metodoDePagamento !== "dinheiro" &&
      metodoDePagamento !== "debito" &&
      metodoDePagamento !== "credito"
    ) {
      return "Forma de pagamento inválida!";
    }

    for (let i = 0; i < itens.length; i++) {
        const elements = itens[i].split(",");
        const item = elements[0];
        const quantidade = parseInt(elements[1]);

        if (!this.cardapio[item]) {
          return "Item inválido!";
        }

        if (quantidade <= 0 || typeof(quantidade) !== "number" || isNaN(quantidade)) {
          return "Quantidade inválida!";
        }


        if (this.cardapio[item] && quantidade > 0) {
          price = price + parseFloat(this.cardapio[item] * quantidade);

          switch (item) {
            case "cafe":
              cafeCheck = true;
              break;
            case "sanduiche":
              sanduicheCheck = true;
              break;
            case "chantily":
              if (!cafeCheck) {
                return "Item extra não pode ser pedido sem o principal";
              }
            case "queijo":
              if (!sanduicheCheck) {
                return "Item extra não pode ser pedido sem o principal";
              }
          }
        }

    }

    switch (metodoDePagamento) {
      case "dinheiro":
        finalPrice = price - price * 0.05;
        break;
      case "credito":
        finalPrice = price + price * 0.03;
        break;
      case "debito":
        finalPrice = price;
        break;
    }

    const result = Number(finalPrice.toFixed(2)).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return result;
  }
}

export { CaixaDaLanchonete };
