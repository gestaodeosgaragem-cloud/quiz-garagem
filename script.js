const webhookUrl = "https://webhook.garagem.dev.br/webhook/ffe16338-8f37-455b-b9d0-f77f9b8c3b65";

// Full Question List
const rawQuestions = [
    // Easy
    { type: 'mc', text: 'Um desenvolvedor precisa testar um sistema em 3 ambientes diferentes: desenvolvimento, homologação e produção. Se ele sempre testa primeiro em desenvolvimento, qual será a ÚLTIMA etapa de testes?', options: ['Desenvolvimento', 'Homologação', 'Produção', 'Não é possível determinar'], correct: 2, weight: 1 },
    { type: 'mc', text: 'Se TODO usuário cadastrado possui um e-mail, e João está cadastrado no sistema, então:', options: ['João pode ou não ter e-mail', 'João definitivamente possui um e-mail', 'João não possui e-mail', 'Não há informação suficiente'], correct: 1, weight: 1 },
    { type: 'mc', text: 'Uma API retorna erro 404. O que isso geralmente significa?', options: ['O servidor está fora do ar', 'O recurso solicitado não foi encontrado', 'Houve erro de permissão', 'A requisição foi bem-sucedida'], correct: 1, weight: 1 },
    { type: 'mc', text: 'Complete a sequência: 2, 4, 6, 8, __', options: ['9', '10', '12', '16'], correct: 1, weight: 1 },
    { type: 'mc', text: 'Em um sistema de cadastro, qual campo é ESSENCIAL para identificar unicamente cada usuário?', options: ['Nome completo', 'Data de nascimento', 'ID único (chave primária)', 'Telefone'], correct: 2, weight: 1 },

    // Medium
    { type: 'mc', text: 'Se A é verdadeiro OU B é verdadeiro, e sabemos que A é falso, o que podemos concluir?', options: ['B definitivamente é verdadeiro', 'B definitivamente é falso', 'B pode ser verdadeiro ou falso, mas se for falso toda a expressão será falsa', 'Não há informação suficiente'], correct: 2, weight: 3 },
    { type: 'mc', text: 'Um webhook precisa ser chamado sempre que um pagamento for aprovado. Se em um dia houve 50 pagamentos aprovados, quantas vezes o webhook deve ser acionado?', options: ['1 vez (ao final do dia)', '25 vezes (metade dos pagamentos)', '50 vezes (uma para cada pagamento)', 'Depende da configuração'], correct: 2, weight: 3 },
    { type: 'mc', text: 'Observe o padrão: A1, B2, C3, D4, __. Qual é o próximo elemento?', options: ['E5', 'E4', 'D5', 'F5'], correct: 0, weight: 3 },

    // Hard
    { type: 'mc', text: 'Em um sistema, se o processo A deve acontecer ANTES do processo B, e o processo B deve acontecer ANTES do processo C, mas o processo D pode acontecer a qualquer momento (inclusive simultaneamente com outros), qual sequência está INCORRETA?', options: ['A → B → C, com D acontecendo durante B', 'D → A → B → C', 'B → A → C', 'A → D → B → C'], correct: 2, weight: 5 },
    { type: 'mc', text: 'Três servidores (X, Y, Z) processam requisições. X processa em 2 segundos, Y em 3 segundos, e Z em 4 segundos. Se você precisa processar 1 requisição e quer o menor tempo possível, qual servidor escolhe? Agora, se você precisa processar 10 requisições e pode distribuir entre os servidores, qual estratégia é MAIS eficiente?', options: ['Servidor X; Distribuir igualmente entre todos', 'Servidor X; Enviar todas para X', 'Servidor X; Distribuir proporcionalmente (mais para X, menos para Z)', 'Qualquer um; Distribuir igualmente entre todos'], correct: 2, weight: 5 } // Corrected Option C from 'Servidor Z' to 'Servidor X' based on logic
];

const textQuestions = [
    { type: 'text', text: 'Conte um problema real que você resolveu e como decidiu o que testar primeiro.', weight: 0 },
    { type: 'text', text: '"Tem um processo dando errado": liste perguntas antes de corrigir; diga as primeiras e por quê.', weight: 0 },
    { type: 'text', text: 'Modele um hábito seu como um "algoritmo", "sistema" (gatilhos, passos, exceções, como medir sucesso).', weight: 0 },
    { type: 'text', text: 'Crie um método em alguns passos para resolver um problema desconhecido.', weight: 0 },
    { type: 'text', text: 'Como decidiria com o time entre duas soluções diferentes, de forma justa e objetiva?', weight: 0 }
];

// Organized Sequence: 3 Easy -> Mixed -> Text
const questions = [
    rawQuestions[0], rawQuestions[1], rawQuestions[2], // 3 Easy
    rawQuestions[5], // Medium
    rawQuestions[8], // Hard
    rawQuestions[3], // Easy
    rawQuestions[6], // Medium
    rawQuestions[4], // Easy
    rawQuestions[9], // Hard
    rawQuestions[7], // Medium
    ...textQuestions
];

let currentStep = 0;
let userAnswers = {}; // { questionIndex: answerValue }
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    // app init
    const app = document.getElementById('app');
    if (app) {
        renderStartScreen();
    }
});

function renderStartScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="intro">
            <h1>Teste de Lógica <br><span>Garagem</span></h1>
            <p>Este teste avaliará seu raciocínio lógico e resolução de problemas.</p>
            <p>São 15 perguntas. Boa sorte!</p>
            <button onclick="startQuiz()">Começar</button>
        </div>
    `;
}

function startQuiz() {
    currentStep = 0;
    renderStep();
}

function renderStep() {
    const app = document.getElementById('app');

    // Check if finished
    if (currentStep >= questions.length) {
        renderLeadForm();
        return;
    }

    const q = questions[currentStep];
    const isText = q.type === 'text';
    const progress = Math.round(((currentStep) / questions.length) * 100);

    let html = `
        <div class="step-header">
            <span>Questão ${currentStep + 1} de ${questions.length}</span>
            <div class="progress-bar"><div class="fill" style="width: ${progress}%"></div></div>
        </div>
        <h2>${q.text}</h2>
        <div class="question-body">
    `;

    if (isText) {
        html += `
            <textarea id="answer-text" rows="6" placeholder="Sua resposta..."></textarea>
            <button onclick="nextStepText()">Próxima</button>
        `;
    } else {
        html += `<div class="options-grid">`;
        q.options.forEach((opt, idx) => {
            html += `
                <button class="option-btn" onclick="selectOption(${idx})">
                    ${opt}
                </button>
            `;
        });
        html += `</div>`;
    }

    html += `</div>`;
    app.innerHTML = html;
}

function selectOption(idx) {
    // Prevent double clicks
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);
    btns[idx].classList.add('selected');

    userAnswers[currentStep] = idx;

    // Delay for animation
    setTimeout(() => {
        transitionToNext();
    }, 400);
}

function nextStepText() {
    const text = document.getElementById('answer-text').value;
    if (!text.trim()) {
        alert("Por favor, escreva uma resposta.");
        return;
    }
    userAnswers[currentStep] = text;
    transitionToNext();
}

function transitionToNext() {
    const app = document.getElementById('app');

    // Fade out
    app.classList.add('fade-out');

    // Wait for fade out
    setTimeout(() => {
        currentStep++;
        renderStep();
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // Clean up fade-in class
        setTimeout(() => app.classList.remove('fade-in'), 500);
    }, 300);
}

function renderLeadForm() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Parabéns!</h1>
        <p>Você concluiu o teste. Preencha seus dados para finalizar.</p>
        <div class="form-group">
            <input type="text" id="nome" placeholder="Nome Completo">
            <input type="email" id="email" placeholder="E-mail">
            <input type="text" id="whatsapp" placeholder="WhatsApp (DDD + Número)">
            <label class="checkbox-container">
                <input type="checkbox" id="aceite">
                <span>Aceito ser contatado pelo Garagem</span>
            </label>
            <button onclick="submitForm()">Enviar Respostas</button>
        </div>
    `;
}

function submitForm() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const aceite = document.getElementById('aceite').checked;

    if (!nome || !email || !whatsapp || !aceite) {
        alert("Por favor, preencha todos os campos e aceite o contato.");
        return;
    }

    submitQuiz({ nome, email, whatsapp, aceite });
}

// Easter Egg
console.log('%cSe você soube chegar até aqui, mande "easter egg" no número "+55 (11) 93418-2212"', 'color: #800020; font-size: 16px; font-weight: bold; background: #000; padding: 10px; border-radius: 5px;');

function calculateScore() {
    let total = 0;
    questions.forEach((q, index) => {
        if (q.type === 'mc') {
            // Assuming q.correct is the index of the correct option
            if (userAnswers[index] === q.correct) {
                total += q.weight || 0;
            }
        }
    });
    return total;
}

async function submitQuiz(userData) {
    const totalScore = calculateScore();
    const payload = {
        nomeCandidato: userData.nome,
        emailCandidato: userData.email,
        whatsappCandidato: userData.whatsapp,
        aceiteGaragem: userData.aceite,
        respostas: userAnswers,
        pontuacaoTotal: totalScore,
        data_preenchimento: new Date().toISOString()
    };

    // Send to Webhook (Garagem) - This is the source of truth
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Enviado com sucesso!');
        } else {
            alert('Enviado!');
        }
    } catch (error) {
        console.error('Erro webhook:', error);
        alert('Erro ao enviar. Tente novamente.');
    }
}
