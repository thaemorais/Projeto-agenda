function realizarLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    if (username === 'carla' && password === '2803') {
        alert('Login bem-sucedido!');
        window.location.href = 'agenda.html';
    } else {
        alert('Falha no login. Verifique suas credenciais.');
    }
}
