## Projeto de Leitura de Dados da ESP32 para Frontend usando Express.js e Socket.io

### Pré-requisitos

- Node.js e npm instalados no seu sistema.
- Placa ESP32 configurada e conectada à mesma rede que o servidor.

### Como funciona

ESP32 envia dados para o Servidor:A ESP32 está configurada para enviar dados (por exemplo, leituras do sensor) para o servidor via uma solicitação HTTP ou outra forma de comunicação.

Servidor Recebe Dados usando Express.js:O servidor Express.js atua como um middleware que recebe os dados da ESP32 e os processa.

Transmissão dos Dados para o Frontend usando Socket.io:O servidor utiliza o Socket.io para transmitir os dados recebidos em tempo real para o frontend. Os clientes conectados ao servidor através de Socket.io receberão automaticamente esses dados e poderão atualizar a interface do usuário em conformidade.


