// Limita a quantidade de dígitos nos inputs
function limitDigits(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}

// Função para calcular a gorjeta
function calculateTip(tipPercentage = null) {
    const bill = parseFloat(document.getElementById('bill').value) || 0;
    const nPeopleInput = document.getElementById('nPeople');
    const billInput = document.getElementById('bill');
    const nPeople = parseInt(nPeopleInput.value) || 0; // Evita divisão por 0
    let tip;

    // Verifica se foi usada uma porcentagem customizada ou um botão de porcentagem
    if (tipPercentage === null) {
        tip = parseFloat(document.getElementById('custom').value) || 0;
    } else {
        tip = tipPercentage;
    }

    const errorMessagePeople = document.getElementById('error-message-people');
    const errorMessageBill = document.getElementById('error-message-bill');

    // Se o número de pessoas for 0 ou vazio, exibe erro
    if (nPeople === 0) {
        errorMessagePeople.style.visibility = 'visible'; // Mostra a mensagem de erro
        nPeopleInput.classList.add('error');  // Adiciona a classe de erro ao input
    } else {
        errorMessagePeople.style.visibility = 'hidden'; // Esconde a mensagem de erro
        nPeopleInput.classList.remove('error'); // Remove a classe de erro
    }

    // Se o valor da conta for 0 ou vazio, exibe erro
    if (bill === 0) {
        errorMessageBill.style.visibility = 'visible'; // Mostra a mensagem de erro
        billInput.classList.add('error');  // Adiciona a classe de erro ao input
    } else {
        errorMessageBill.style.visibility = 'hidden'; // Esconde a mensagem de erro
        billInput.classList.remove('error'); // Remove a classe de erro
    }

    // Só faz o cálculo se os inputs forem válidos
    if (nPeople > 0 && bill > 0) {
        const tipAmount = (bill * tip) / 100;
        const total = bill + tipAmount;
        const tipPerson = tipAmount / nPeople;
        const totalPerson = total / nPeople;

        // Atualiza os valores na tela
        document.querySelector('.tipPerson').textContent = `$${tipPerson.toFixed(2)}`;
        document.querySelector('.totalPerson').textContent = `$${totalPerson.toFixed(2)}`;
    }
}

// Impede que letras e sinais matemáticos sejam inseridos nos inputs do tipo number
function preventInvalidInput(event) {
    const invalidChars = ['-', '+', 'e', 'E'];
    if (invalidChars.includes(event.key)) {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Aplica a função em todos os inputs numéricos
    document.querySelectorAll('input[type="number"]').forEach(input => {
        // Bloqueia letras e sinais matemáticos
        input.addEventListener('keydown', preventInvalidInput);
    });

    // Adiciona eventos aos botões de porcentagem
    document.querySelectorAll('.porcentagem').forEach(button => {
        button.addEventListener('click', function () {
            const tipValue = parseFloat(this.textContent); // Extrai a porcentagem do texto do botão
            calculateTip(tipValue); // Chama a função com a porcentagem
        });
    });

    // Evento para input customizado
    document.getElementById('custom').addEventListener('input', function () {
        calculateTip();
    });

    // Evento para o botão Reset
    document.querySelector('.reset').addEventListener('click', function () {
        // Limpa os campos e valores
        document.getElementById('bill').value = '';
        document.getElementById('nPeople').value = '';
        document.getElementById('custom').value = '';
        document.querySelector('.tipPerson').textContent = `$0.00`;
        document.querySelector('.totalPerson').textContent = `$0.00`;

        // Remove erro e reseta mensagem
        document.getElementById('error-message-people').style.visibility = 'hidden';
        document.getElementById('nPeople').classList.remove('error');

        document.getElementById('error-message-bill').style.visibility = 'hidden';
        document.getElementById('bill').classList.remove('error');
    });
});
