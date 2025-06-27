// Função para cadastrar usuário
document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');
    const cpfInput = document.getElementById('cpf');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value;

            // Remove tudo o que não for dígito
            value = value.replace(/\D/g, '');

            // Limita a 11 dígitos
            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            // Aplica a máscara de CPF
            // xxx.xxx.xxx-xx
            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
            }

            e.target.value = value;
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. Obtenção dos valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value; // CPF é lido como texto
            const dataNascimento = document.getElementById('dataNascimento').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value; // Campo Confirmar Senha readicionado

            const tipoSanguineo = document.getElementById('tipoSanguineo').value;
            const fotoCarteira = document.getElementById('fotoCarteira').files[0]; // Pega o arquivo selecionado

            // 2. Carrega os usuários existentes ANTES de qualquer validação ou push
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // 3. Validações devem vir ANTES de adicionar o usuário ao array
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return; // Importante: parar a execução se as senhas não coincidirem
            }

            // 4. Verificar se o CPF já está cadastrado (ajustado para apenas CPF no cadastro)
            const usuarioExistente = usuarios.find(user => user.cpf === cpf);
            if (usuarioExistente) {
                alert('CPF já cadastrado.');
                return;
            }

            // 5. Adiciona o novo usuário com os campos corretos e consistentes
            usuarios.push({
                id: Date.now(),
                nome,
                cpf,
                dataNascimento,
                senha, // A senha principal é armazenada
                tipoSanguineo,
                // Armazena apenas metadados do arquivo (nome, tamanho, tipo)
                // O conteúdo real da imagem não é salvo no localStorage
                fotoCarteira: fotoCarteira ? { name: fotoCarteira.name, size: fotoCarteira.size, type: fotoCarteira.type } : null
            });

            // 6. Salva o array de usuários atualizado no localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'telaPrincipal.html'; // Redireciona para a página de login
        });
    }

    // O código para a tela de login (loginForm)
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const loginEmail = document.getElementById('loginEmail').value;
            const loginSenha = document.getElementById('loginSenha').value;

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // A lógica de login ainda permite entrar com email OU CPF
            const usuarioLogado = usuarios.find(user =>
                (user.email === loginEmail || user.cpf === loginEmail) && user.senha === loginSenha
            );

            if (usuarioLogado) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                alert('Login realizado com sucesso!');
                // Redirecionar para a tela da carteira de vacinação (exemplo)
                window.location.href = 'carteira.html';
            } else {
                alert('Email/CPF ou senha incorretos.');
            }
        });
    }
});