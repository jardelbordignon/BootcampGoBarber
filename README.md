> # Requisitos do sistema

## Recurepação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail
- O usuário deve receber um e-mail com instruções para recuperar a senha
- O usuário deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev
- Utilizar Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano (backgroud job)

**RN**

- O link enviado por email para resetar a senha deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar

## Atualização do perfil

**RF**

- O usuário deve poder atualizar nome, e-mail e senha

**RN**

- O usuário não pode alterar seu e-mail para um já existente
- Para atualizar a senhal, o usuário deve informar a senha antiga
- Para atualizar a senhal, o usuário precisa confirmar a nova

## Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser envidas em tempo-real com Socket.io
  **RN**
- A notificação deve ter um status de lida ou não-lida

## Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço
- O usuário deve poder listar os dias de um mês com horários disponíveis de um prestador
- O usuário deve poder listar os horários disponíveis em um dia de um determinado prestador
- O usuário deve poder realizar um agendamento com um prestador
  **RNF**
- A listagem de um prestadores deve ser armazeanada em cache

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h e 18h (primeiro às 8h, último as 17h)
- O usuário não pode agendar em um horário já reservado
- O usuário não pode agendar em um serviço consigo mesmo

O arquivo tmp/base.css é uma dark style para os Jest coverage reports, basta substituir no path
node_modules/istanbul-reports/lib/html/assets/base.css
