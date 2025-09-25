const API_URL = 'http://localhost:8080/api/users';

const userForm = document.getElementById('user-form');
const userTableBody = document.querySelector('#user-table tbody');
const feedbackMessage = document.getElementById('feedback-message');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

// Função para buscar e exibir os usuários
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        userTableBody.innerHTML = ''; // Limpa a tabela
        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.document}</td>
                    <td>${user.city}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Editar</button>
                    </td>
                </tr>
            `;
            userTableBody.innerHTML += row;
        });
    } catch (error) {
        showFeedback('Erro ao carregar usuários.', 'error');
        console.error('Erro:', error);
    }
}

// Função para salvar (criar ou atualizar) um usuário
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

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

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('A resposta da rede não foi OK');
        }

        showFeedback(`Usuário ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');
        userForm.reset();
        document.getElementById('userId').value = '';
        cancelEditBtn.style.display = 'none';
        fetchUsers();
    } catch (error) {
        showFeedback('Erro ao salvar usuário.', 'error');
        console.error('Erro:', error);
    }
});

// Função para preencher o formulário para edição
async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const user = await response.json();

        document.getElementById('userId').value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('birthDate').value = user.birthDate;
        document.getElementById('document').value = user.document;
        document.getElementById('addressStreet').value = user.addressStreet;
        document.getElementById('addressNumber').value = user.addressNumber;
        document.getElementById('city').value = user.city;
        document.getElementById('state').value = user.state;
        document.getElementById('zipCode').value = user.zipCode;

        cancelEditBtn.style.display = 'inline-block';
        window.scrollTo(0, 0); // Rola para o topo da página
    } catch (error) {
        showFeedback('Erro ao buscar dados do usuário para edição.', 'error');
        console.error('Erro:', error);
    }
}

// Função para cancelar a edição
cancelEditBtn.addEventListener('click', () => {
    userForm.reset();
    document.getElementById('userId').value = '';
    cancelEditBtn.style.display = 'none';
});

// Função para exibir feedback
function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback ${type}`; // 'success' ou 'error'
    setTimeout(() => {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback';
    }, 3000);
}

// Carrega os usuários quando a página é iniciada
document.addEventListener('DOMContentLoaded', fetchUsers);