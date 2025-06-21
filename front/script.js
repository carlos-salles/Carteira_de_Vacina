// Função para cadastrar usuário
document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar se o email ou CPF já estão cadastrados
            const usuarioExistente = usuarios.find(user => user.email === email || user.cpf === cpf);
            if (usuarioExistente) {
                alert('Email ou CPF já cadastrado.');
                return;
            }

            usuarios.push({
                id: Date.now(),
                nome,
                cpf,
                dataNascimento,
                email,
                senha
            });

            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const loginEmail = document.getElementById('loginEmail').value;
            const loginSenha = document.getElementById('loginSenha').value;

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

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
