import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  export function mensagemSucesso(mensagem) {
    toastr['success'](mensagem, 'Sucesso')
  }

  export function mensagemAlerta(mensagem) {
    toastr['warning'](mensagem, 'Alerta')
  }

  export function mensagemErro(mensagem) {
    toastr['error'](mensagem, 'Erro')
  }