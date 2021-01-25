> Init backend
1. Add dependencies express | -D typescript ts-node-dev @types/express
3. Create tsconfig.json *yarn tsc --init*
4. Configure outDir and rootDir in tsconfig.json
5. Create src/server.ts
6. Inlcude scripts in package.json
> Configure debug
1. Create .vscode/launch.json
2. Add --inspect flag in script of the package.json
3. app.use(express.json()) in server.ts