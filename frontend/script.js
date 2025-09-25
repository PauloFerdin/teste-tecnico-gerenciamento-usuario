// ==================================================
// CONSTANTES E VARIÁVEIS GLOBAIS
// ==================================================
const API_URL = 'http://localhost:8081/api/users';
let userModal; // Variável para a instância do modal do Bootstrap

let currentPage = 1;
const recordsPerPage = 20; // <<< ADICIONE OU VERIFIQUE ESTA LINHA
let totalPages = 1;

// ==================================================
// SELETORES DE ELEMENTOS DO DOM
// ==================================================
const userTableBody = document.getElementById('user-table-body');
const userForm = document.getElementById('user-form');
const feedbackMessage = document.getElementById('feedback-message');
const modalTitle = document.getElementById('modal-title');
const addUserBtn = document.getElementById('add-user-btn');

// Seletores para o preenchimento por CEP
const zipCodeInput = document.getElementById('zipCode');
const streetInput = document.getElementById('addressStreet');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const numberInput = document.getElementById('addressNumber');

const paginationControls = document.getElementById('pagination-controls');


// ==================================================
// FUNÇÕES PRINCIPAIS DA APLICAÇÃO
// ==================================================

async function fetchUsers(page = 1) {
    currentPage = page;
    // A API do Spring é base 0, então subtraímos 1.
    const url = `${API_URL}?page=${currentPage - 1}&size=${recordsPerPage}&sort=name,asc`;

    userTableBody.innerHTML = '<tr><td colspan="5">Carregando usuários...</td></tr>';
    paginationControls.innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha na resposta da rede.');

        const pageData = await response.json();
        const users = pageData.content;
        totalPages = pageData.totalPages;

        userTableBody.innerHTML = '';

        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="5">Nenhum usuário cadastrado.</td></tr>';
            return;
        }

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.document}</td>
                    <td>${user.city}</td>
                    <td class="text-end">
                        <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">
                            <i class="fa-solid fa-pencil"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                            <i class="fa-solid fa-trash-can"></i> Deletar
                        </button>
                    </td>
                </tr>
            `;
            userTableBody.innerHTML += row;
        });

        renderPaginationControls();

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        userTableBody.innerHTML = '<tr><td colspan="5">Erro ao carregar usuários.</td></tr>';
    }
}

function renderPaginationControls() {
    paginationControls.innerHTML = '';
    if (totalPages <= 1) return;

    let paginationHTML = '<ul class="pagination justify-content-center">';

    paginationHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Anterior</a></li>`;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    }

    paginationHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Próximo</a></li>`;
    paginationHTML += '</ul>';
    paginationControls.innerHTML = paginationHTML;
}

function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }
    fetchUsers(page); // Faz a chamada para a nova página
}


async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Usuário não encontrado.');
        const user = await response.json();

        // Preenche o formulário
        userForm.reset();
        document.getElementById('userId').value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('birthDate').value = user.birthDate;
        document.getElementById('document').value = user.document;
        document.getElementById('addressStreet').value = user.addressStreet;
        document.getElementById('addressNumber').value = user.addressNumber;
        document.getElementById('city').value = user.city;
        document.getElementById('state').value = user.state;
        document.getElementById('zipCode').value = user.zipCode;

        modalTitle.textContent = `Editando Usuário: ${user.name}`;
        userModal.show();
    } catch (error) {
        console.error('Erro ao buscar usuário para edição:', error);
        showFeedback('Não foi possível carregar os dados do usuário.', 'error');
    }
}

async function deleteUser(id) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            showFeedback('Usuário deletado com sucesso!', 'success');
            // Recarrega a página atual. Idealmente, se for o último item da página,
            // deveria voltar para a página anterior.
            fetchUsers(currentPage);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            showFeedback('Erro ao deletar usuário.', 'error');
        }
    }
}

function showFeedback(message, type) {
    feedbackMessage.className = `feedback alert alert-${type === 'success' ? 'success' : 'danger'}`;
    feedbackMessage.textContent = message;
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
    }, 3000);
}


// ==================================================
// INICIALIZAÇÃO E EVENT LISTENERS
// ==================================================

function init() {
    userModal = new bootstrap.Modal(document.getElementById('user-modal'));

    IMask(document.getElementById('document'), { mask: '000.000.000-00' });
    IMask(document.getElementById('zipCode'), { mask: '00000-000' });

    addUserBtn.addEventListener('click', () => {
        userForm.reset();
        document.getElementById('userId').value = '';
        modalTitle.textContent = 'Adicionar Novo Usuário';
    });

    zipCodeInput.addEventListener('blur', async () => {
        const cep = zipCodeInput.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (cep.length !== 8) return;

        streetInput.value = '...';
        cityInput.value = '...';
        stateInput.value = '...';

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
                streetInput.value = ''; cityInput.value = ''; stateInput.value = '';
                return;
            }

            streetInput.value = data.logradouro;
            cityInput.value = data.localidade;
            stateInput.value = data.uf;
            numberInput.focus();
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            alert('Não foi possível buscar o CEP.');
            streetInput.value = ''; cityInput.value = ''; stateInput.value = '';
        }
    });

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearFormErrors();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            displayFormErrors(validationErrors);
            return; 
        }

        const saveButton = document.getElementById('save-button');
        const buttonText = document.getElementById('save-button-text');
        const spinner = document.getElementById('spinner');

        saveButton.disabled = true;
        buttonText.textContent = 'Salvando...';
        spinner.classList.remove('d-none');

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
            if (!response.ok) throw new Error('A resposta da rede não foi OK');

            userModal.hide();
            showFeedback(`Usuário ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');
            fetchUsers();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            alert('Erro ao salvar usuário. Verifique os dados e tente novamente.');
        } finally {
            saveButton.disabled = false;
            buttonText.textContent = 'Salvar';
            spinner.classList.add('d-none');
        }
    });

    fetchUsers();
}

function validateForm() {
    const errors = [];
    const name = document.getElementById('name').value;
    const birthDate = document.getElementById('birthDate').value;
    const documentInput = document.getElementById('document').value;
    const street = document.getElementById('addressStreet').value;
    const number = document.getElementById('addressNumber').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;

    if (name.trim().length < 3) {
        errors.push('O nome deve ter pelo menos 3 caracteres.');
    }
    if (!birthDate) {
        errors.push('A data de nascimento é obrigatória.');
    } else if (new Date(birthDate) >= new Date()) {
        errors.push('A data de nascimento deve ser no passado.');
    }
    if (documentInput.replace(/\D/g, '').length !== 11) {
        errors.push('O documento (CPF) deve ter 11 dígitos.');
    }
    if (!street.trim()) errors.push('A rua é obrigatória.');
    if (!number.trim()) errors.push('O número é obrigatório.');
    if (!city.trim()) errors.push('A cidade é obrigatória.');
    if (state.trim().length !== 2) errors.push('O estado deve ser uma sigla com 2 caracteres.');
    if (zipCode.replace(/\D/g, '').length !== 8) errors.push('O CEP deve ter 8 dígitos.');

    return errors;
}

function displayFormErrors(errors) {
    const errorContainer = document.getElementById('form-errors');
    errorContainer.innerHTML = '<strong>Por favor, corrija os seguintes erros:</strong><ul>' +
        errors.map(error => `<li>${error}</li>`).join('') +
        '</ul>';
    errorContainer.classList.remove('d-none'); // Torna o container de erro visível
}

function clearFormErrors() {
    const errorContainer = document.getElementById('form-errors');
    errorContainer.classList.add('d-none'); // Esconde o container
}

document.addEventListener('DOMContentLoaded', init);