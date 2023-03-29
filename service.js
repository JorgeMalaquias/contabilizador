const validarEntradaDeDados = (lancamento) => {

   let validacaoResultado = validarCpf(lancamento.cpf);

   validacaoResultado += validarValor(lancamento.valor);

   return (validacaoResultado === "") ? null : validacaoResultado;

}

const recuperarSaldosPorConta = (lancamentos) => {

   // hash para salvar os cpfs(chave), e seus respectivos saldos
   const saldos = gerarHashSaldos(lancamentos);

   const saldosArray = [];

   for (let i in saldos) {
      saldosArray.push({ cpf: i, valor: saldos[i] });
   }

   return saldosArray;

}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {

   //array para salvar menor valor no índice zero e maior no índice 1
   const maiorMenorRegistrosCpf = [{ valor: Infinity }, { valor: -Infinity }];

   for (let i = 0; i < lancamentos.length; i++) {
      if (lancamentos[i].cpf === cpf) {
         if (maiorMenorRegistrosCpf[0].valor > lancamentos[i].valor) {
            maiorMenorRegistrosCpf[0] = lancamentos[i];
         }
         if (maiorMenorRegistrosCpf[1].valor < lancamentos[i].valor) {
            maiorMenorRegistrosCpf[1] = lancamentos[i];
         }
      }
   }

   return maiorMenorRegistrosCpf;

}

const recuperarMaioresSaldos = (lancamentos) => {

   const saldos = gerarHashSaldos(lancamentos);

   const tresMaioresSaldosArray = mapearMaiores(saldos);

   return tresMaioresSaldosArray;

}

const recuperarMaioresMedias = (lancamentos) => {

   const medias = gerarHashMedias(lancamentos);

   //iterando sob a hash para calcular e salvar a média de cada cpf
   for (let i in medias) {
      medias[i] = medias[i].valor / medias[i].numeroLancamentos;
   }

   const tresMaioresMediasArray = mapearMaiores(medias);

   return tresMaioresMediasArray;

}

// funções auxiliares


const mapearMaiores = (registros) => {

   const tresMaioresRegistrosArray = [];

   for (let i in registros) {
      if (tresMaioresRegistrosArray.length === 3) {
         for (let j = 0; j < 3; j++) {
            if (registros[i] > tresMaioresRegistrosArray[j].valor) {
               const registro = { cpf: i, valor: registros[i] };
               tresMaioresRegistrosArray.splice(j, 0, registro);
               tresMaioresRegistrosArray.pop();
               break;
            }
         }
      }
      else if (tresMaioresRegistrosArray.length > 0) {
         const tamanhoInicial = tresMaioresRegistrosArray.length;
         for (let j = 0; j < tresMaioresRegistrosArray.length; j++) {
            if (registros[i] > tresMaioresRegistrosArray[j].valor) {
               const registro = { cpf: i, valor: registros[i] };
               tresMaioresRegistrosArray.splice(j, 0, registro);
               break;
            }
         }
         if (tresMaioresRegistrosArray.length === tamanhoInicial) {
            const registro = { cpf: i, valor: registros[i] };
            tresMaioresRegistrosArray.push(registro);
         }
      }
      else {
         const registro = { cpf: i, valor: registros[i] };
         tresMaioresRegistrosArray.push(registro);
      }
   }

   return tresMaioresRegistrosArray;

}

const gerarHashSaldos = (lancamentos) => {

   // hash para salvar os cpfs(chave), e seus respectivos saldos
   const saldos = {};

   for (let i = 0; i < lancamentos.length; i++) {
      if ((saldos[lancamentos[i].cpf])) {
         saldos[lancamentos[i].cpf] += lancamentos[i].valor;
      }
      else {
         saldos[lancamentos[i].cpf] = lancamentos[i].valor;
      }
   }
   return saldos;

}

const gerarHashMedias = (lancamentos) => {

   //hash para salvar os cpfs(chave), seus respectivos saldos e quantidade de lançamentos
   const medias = {};

   for (let i = 0; i < lancamentos.length; i++) {
      if ((medias[lancamentos[i].cpf])) {
         medias[lancamentos[i].cpf].valor += lancamentos[i].valor;
         medias[lancamentos[i].cpf].numeroLancamentos++;
      }
      else {
         medias[lancamentos[i].cpf] = { valor: lancamentos[i].valor, numeroLancamentos: 1 };
      }
   }

   return medias;

}

const validarCpf = (cpf) => {

   let validacaoResultado = "";
   const valorRegex = /^[0-9]{11}$/;

   if (!valorRegex.test(cpf)) {
      validacaoResultado += "* Devem ser informados somente números no campo CPF, totalizando 11 dígitos!" + "\n";
   }
   if (!validarDigitosCpf(cpf)) {
      validacaoResultado += "* Dígitos verificadores do cpf informado inválidos!" + "\n";;
   }

   return validacaoResultado;

}

//função retirada de https://www.geradorcpf.com/javascript-validar-cpf.htm
const validarDigitosCpf = (cpf) => {

   // remove eventuais máscaras
   cpf = cpf.replace(/[^\d]+/g, '');

   // Valida 1o digito	
   let add = 0;
   for (i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
   }

   let rev = 11 - (add % 11);
   if (rev == 10 || rev == 11) {
      rev = 0;
   }

   if (rev != parseInt(cpf.charAt(9))) {
      return false;
   }

   // Valida 2o digito	
   add = 0;
   for (i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
   }

   rev = 11 - (add % 11);
   if (rev == 10 || rev == 11) {
      rev = 0;
   }

   if (rev != parseInt(cpf.charAt(10))) {
      return false;
   }

   return true;

}

const validarValor = (valor) => {

   let validacaoResultado = "";

   if (typeof valor !== "number") {
      validacaoResultado += "* O dado informado no campo VALOR deve ser numérico!" + "\n";;
   }
   if (valor > 15000 || valor < -2000) {
      validacaoResultado += "* O valor do lançamento não pode ser superior a 15000.00 e nem inferior a -2000.00!" + "\n";
   }

   return validacaoResultado;

}