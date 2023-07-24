(function () {
  class ValidaForm {
    constructor() {
      this.formulario = document.querySelector(".formulario");
      this.eventos();
    }

    eventos() {
      this.formulario.addEventListener("submit", (e) => {
        this.handleSubmit(e);
      });
    }
    handleSubmit(evento) {
      evento.preventDefault();
      const camposValidos = this.camposSaoValidos();
      const senhasValidas = this.senhasValidas();
      if (camposValidos && senhasValidas) {
        alert("foi enviado");
        this.formulario.submit();
      }
    }

    senhasValidas() {
      let valid = true;

      const senha = this.formulario.querySelector(".senha");
      const repetirSenha = this.formulario.querySelector(".repetir-senha");
      if (senha.value.lenght < 6 || senha.value.lenght > 12) {
        this.criaErro(senha, "A senha deve conter 6 a 12 caracteres");
        valid = false;
      }
      if (senha.value !== repetirSenha.value) {
        this.criaErro(senha, "A senha e repetir senha precisam ser iguais");
        this.criaErro(
          repetirSenha,
          "A senha e repetir senha precisam ser iguais"
        );
        valid = false;
      }

      return valid;
    }
    camposSaoValidos() {
      let valid = true;

      for (let error of this.formulario.querySelectorAll(".error-text")) {
        error.remove();
      }
      for (let campo of this.formulario.querySelectorAll(".valida")) {
        let valor = campo.previousElementSibling.innerHTML;
        if (!campo.value) {
          this.criaErro(campo, `O campo "${valor}" está vazio`);
          valid = false;
        }
        if (campo.classList.contains("cpf")) {
          if (!this.validaCpf(campo)) {
            valid = false;
          }
        }
        if (campo.classList.contains("usuario")) {
          if (!this.validaUsuario(campo)) {
            valid = false;
          }
        }
      }
      return valid;
    }
    validaUsuario(campo) {
      let valid = true;
      let aux = campo.value;
      if (aux.length < 3 || aux.length > 12) {
        this.criaErro(campo, "O usuário deve ter entre 6 e 12 caracteres");
        valid = false;
      }
      if (!aux.match(/[a-zA-Z0-9]+/g)) {
        this.criaErro(
          campo,
          "Nome do usuário precisa conter apenas letras ou numeros"
        );
        valid = false;
      }

      return valid;
    }
    validaCpf(campo) {
      const valida = new Validacpf(campo.value);

      if (!valida.validacpf()) {
        this.criaErro(campo, "O cpf está inválido");
        return false;
      }
      return true;
    }

    criaErro(campo, msg) {
      const div = document.createElement("div");
      div.innerHTML = msg;
      div.classList.add("error-text");
      campo.insertAdjacentElement("afterend", div);
    }
  }

  const validaForm = new ValidaForm();
})();
