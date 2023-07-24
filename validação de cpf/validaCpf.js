class Validacpf {
  constructor(cpfLimpo) {
    this.cpfLimpo = cpfLimpo.replace(/\D+/g, "");
  }
  digito1() {
    const novoArray = Array.from(this.cpfLimpo.slice(0, -2));
    let index = 11;
    const total = novoArray.reduce(function (ac, valor) {
      index--;
      ac += Number(valor * index);
      return ac;
    }, 0);
    const numero = 11 - (total % 11);
    return numero;
  }
  digito2() {
    const novoArray = Array.from(this.cpfLimpo.slice(0, -2));

    novoArray.push(this.digito1());
    let index = 12;
    const total = novoArray.reduce(function (ac, valor) {
      index--;
      ac += Number(valor * index);
      return ac;
    }, 0);
    const numero = 11 - (total % 11);
    return numero;
  }

  validacpf() {
    //if (this.cpfLimpo !== 11) return false;
    const numero1 = this.digito1();
    const numero2 = this.digito2();
    const resultado = String(this.cpfLimpo.slice(0, -2) + numero1 + numero2);
    return resultado === this.cpfLimpo;
  }
}
