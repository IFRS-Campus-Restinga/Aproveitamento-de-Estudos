# Aproveitamento-de-Estudos
Posso Editar

## Tecnologias utilizadas

- [Node 16.14.2](https://nodejs.org/dist/v16.14.2/)
- [NPM 8.5.0](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Front-end

- [Angular v15](https://devdocs.io/angular~15/)
```shell
npm install -g @angular/cli@15.2.9
```

### Back-end

- [Java 17](https://download.oracle.com/java/17/archive/jdk-17.0.7_windows-x64_bin.exe)
- [Spring Boot 3.1.4](https://spring.io/projects/spring-boot)


### Execução do projeto

#### Front-end

1. Certifique-se de ter o Node.js e o NPM instalados em sua máquina. Se não os tiver, siga as instruções nos links fornecidos na seção de Tecnologias Utilizadas.
2. Abra o terminal e execute o seguinte comando para instalar o Angular CLI globalmente:
```shell
npm install -g @angular/cli@15.2.9
```
3. Navegue até o diretório do front-end do projeto.
4. Execute o seguinte comando para instalar as dependências do projeto:
```shell
npm install
```
5. Para executar o servidor de desenvolvimento do Angular, use o seguinte comando:
```shell
ng serve
```
Isso iniciará o servidor de desenvolvimento em http://localhost:4200/. Abra o navegador e navegue até esse endereço para visualizar a aplicação.

#### Back-end
1. Verifique se o Java 17 está instalado em sua máquina, caso contrário, siga as instruções no link fornecido na seção de Tecnologias Utilizadas.
2. Baixe e instale o Spring Boot 3.1.4 conforme o link fornecido na seção de Tecnologias Utilizadas.
3. Navegue até o diretório do back-end do projeto.
4. Execute o seguinte comando para compilar e executar o aplicativo Spring Boot:
```shell
./mvnw spring-boot:run
```
O servidor back-end será executado na porta padrão, e as APIs estarão acessíveis em http://localhost:8080/.

Certifique-se de que tanto o servidor back-end quanto o servidor front-end estejam em execução para usar o sistema corretamente.