
# ==========================================
# ORGANIZADOR DE ESTUDOS
# Arquivo principal do servidor
# ==========================================

# Importa ferramentas nativas do Python
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

# Define a pasta onde está o projeto
BASE_DIR = Path(__file__).resolve().parent

# Define a porta do servidor
PORTA = 8000


# ==========================================
# CONFIGURAÇÃO DO SERVIDOR
# ==========================================

class AppHandler(SimpleHTTPRequestHandler):

    # Define a pasta principal do site
    def __init__(self, *args, **kwargs):
        super().__init__(
            *args,
            directory=str(BASE_DIR),
            **kwargs
        )

    # Personaliza a página inicial
    def do_GET(self):

        # Abre a página inicial ao acessar a raiz
        if self.path == "/":
            self.path = "/index.html"

        # Continua o carregamento normal das páginas
        super().do_GET()

    # Mostra mensagens de acesso no terminal
    def log_message(self, format, *args):
        print("[SERVIDOR]", format % args)


# ==========================================
# INICIALIZAÇÃO DO APLICATIVO
# ==========================================

def iniciar_app():

    servidor = HTTPServer(
        ("127.0.0.1", PORTA),
        AppHandler
    )

    print("====================================")
    print("   ORGANIZADOR DE ESTUDOS")
    print("====================================")
    print("Servidor iniciado com sucesso!")
    print(f"Acesse: http://127.0.0.1:{PORTA}")
    print("Pressione CTRL + C para encerrar.")
    print("====================================")

    try:
        servidor.serve_forever()

    except KeyboardInterrupt:
        print("\nServidor encerrado.")

    finally:
        servidor.server_close()


# ==========================================
# EXECUTA O APLICATIVO
# ==========================================

if __name__ == "__main__":
    iniciar_app()
