const API_URL = 'http://localhost:8081/api/users';

// Seleciona o corpo da tabela no HTML
const userTableBody = document.querySelector('#user-table tbody');

async function fetchUsers() {
    // Mostra a mensagem de "Carregando..." limpando qualquer conteúdo anterior
    userTableBody.innerHTML = '<tr id="loading-row"><td colspan="4">Carregando usuários...</td></tr>';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Falha na resposta da rede.');
        }
        const users = await response.json();

        // Limpa a tabela (remove o "Carregando...")
        userTableBody.innerHTML = '';

        // Se não houver usuários, exibe uma mensagem amigável
        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="4">Nenhum usuário cadastrado.</td></tr>';
            return;
        }

        // Preenche a tabela com os usuários
        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.document}</td>
                    <td>${user.city}</td>
                    <td>
                        <button onclick="editUser(${user.id})"><i class="fa-solid fa-pencil"></i> Editar</button>
                        <button class="secondary" onclick="deleteUser(${user.id})"><i class="fa-solid fa-trash-can"></i> Deletar</button>
                    </td>
                </tr>
            `;
            userTableBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        // Em caso de erro, exibe uma mensagem de erro na tabela
        userTableBody.innerHTML = '<tr><td colspan="4">Erro ao carregar usuários. Tente novamente.</td></tr>';
    }
}

document.addEventListener('DOMContentLoaded', fetchUsers);

// Função de edição
async function editUser(id) {
    try {
        // 1. Busca os dados completos do usuário na API
        const response = await fetch(`${API_URL}/${id}`);
        const user = await response.json();

        // 2. Preenche o formulário com os dados do usuário
        document.getElementById('userId').value = user.id; // <-- Ponto chave!
        document.getElementById('name').value = user.name;
        document.getElementById('birthDate').value = user.birthDate;
        document.getElementById('document').value = user.document;
        document.getElementById('addressStreet').value = user.addressStreet;
        document.getElementById('addressNumber').value = user.addressNumber;
        document.getElementById('city').value = user.city;
        document.getElementById('state').value = user.state;
        document.getElementById('zipCode').value = user.zipCode;

        // Bônus: Rola a página para o topo, onde está o formulário
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Erro ao buscar usuário para edição:', error);
        showFeedback('Não foi possível carregar os dados do usuário.', 'error');
    }
}

const userForm = document.getElementById('user-form');
const feedbackMessage = document.getElementById('feedback-message');

// Adiciona um "escutador" para o evento de SUBMIT do formulário
userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('userId').value;
    const user = {
        name: document.getElementById('name').value,
        birthDate: document.getElementById('birthDate').value,
        document: document.getElementById('document').value,
        addressStreet: document.getElementById('addressStreet').value,
        addressNumber: document.getElementById('addressNumber').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
    };

    // Decide se a requisição será POST (criar) ou PUT (atualizar)
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('A resposta da rede não foi OK');
        }

        // Mensagem de sucesso dinâmica
        showFeedback(`Usuário ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');

        userForm.reset(); // Limpa o formulário
        document.getElementById('userId').value = ''; // Limpa o ID oculto
        fetchUsers(); // Atualiza a lista

    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        showFeedback('Erro ao salvar usuário.', 'error');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const documentInput = document.getElementById('document');
    const zipCodeInput = document.getElementById('zipCode');

    const documentMask = IMask(documentInput, {
        mask: '000.000.000-00'
    });

    const zipCodeMask = IMask(zipCodeInput, {
        mask: '00000-000'
    });
});

function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback ${type}`; // Adiciona a classe de estilo

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback';
    }, 3000);
}

async function deleteUser(id) {
    // Pede confirmação ao usuário
    const confirmation = confirm('Tem certeza que deseja deletar este usuário?');

    if (confirmation) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            showFeedback('Usuário deletado com sucesso!', 'success');
            fetchUsers(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            showFeedback('Erro ao deletar usuário.', 'error');
        }
    }
}