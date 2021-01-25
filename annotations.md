> Init backend

1. Add dependencies express | -D typescript ts-node-dev @types/express
2. Create tsconfig.json _yarn tsc --init_
3. Configure outDir and rootDir in tsconfig.json
4. Create src/server.ts
5. Inlcude scripts in package.json

> Configure debug

1. Create .vscode/launch.json
2. Add --inspect flag in script of the package.json
3. app.use(express.json()) in server.ts

> Appointments register (Cadastro de Agendamentos)

1. Create routes
2. yarn add shortid

> Date validation (Validado a data)

1. yarn add date-fns
2. Implement date validation

> Appointment Model (Model de Agendamento)

1. Create Appointment Model
2. Use in appointments.routes.ts

> Create Repositories (Criando repositórios)

1. Create AppointmentsRepository
2. feature of creating an appointment passes to the repository

> Appointment List (Listando Agendamentos)

1. Create all() method
