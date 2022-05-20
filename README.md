# Ebtyr Task Manager - BackEnd

## Variáveis de ambiente

- `DB_USER`: Usuário do MySQL
- `DB_PASSWORD`: Senha do MySQL
- `DB_HOST`: MySQL host
- `DB_PORT`: Porta onde está rodando o MySQL
- `DB_NAME`: Nome do schema MySQL
- `DATABASE_URL`: Variável de conexão do prisma com o MySQL criada a partir das variáveis acima

Veja o [.env.example](./.env.example)

## Endpoints

### Lista todas as tasks

```plaintext
GET /task
```

Resposta:

**Array de**

| Atributo     | tipo   | Descrição                                            |
| :----------- | :----- | :--------------------------------------------------- |
| `id`         | string | Id da task                                           |
| `content`    | string | Conteúdo da task                                     |
| `status`     | string | Status da task: `PENDING` \| `IN_PROGRESS` \| `DONE` |
| `created_at` | string | Momento de criação da task no formato ISO 8601       |

Exemplo de requisição:

```shell
curl --request GET \
  --url http://localhost:3001/task
```

Exemplo de resposta:

```json
[
  {
    "id": "2af7ef13-b213-41c5-a9a3-0adfb6f79c23",
    "content": "Code the frontend",
    "status": "IN_PROGRESS",
    "createdAt": "2022-05-18T17:32:30.226Z"
  },
  {
    "id": "ac55b916-3807-4f9f-9cbd-fdd3e77b392e",
    "content": "Code the backend",
    "status": "DONE",
    "createdAt": "2022-05-17T03:17:47.875Z"
  }
]
```

### Cadastra uma nova task

```plaintext
POST /task
```

Parâmetros suportados:

| Atributo  | Tipo   |    Obrigatório     | Descrição        |
| :-------- | :----- | :----------------: | :--------------- |
| `content` | string | :heavy_check_mark: | Conteúdo da task |

Resposta:

| Atributo     | tipo   | Descrição                                      |
| :----------- | :----- | :--------------------------------------------- |
| `id`         | string | Id da task                                     |
| `content`    | string | Conteúdo da task                               |
| `status`     | string | Status da task: `PENDING`                      |
| `created_at` | string | Momento de criação da task no formato ISO 8601 |

Exemplo de requisição:

```shell
curl --request POST \
  --url http://localhost:3001/task \
  --header 'Content-Type: application/json' \
  --data '{"content":"Nova task"}'
```

Exemplo de resposta:

```json
{
  "id": "8fea5488-4e79-4be2-8443-7551bbce13b6",
  "content": "Nova task",
  "status": "PENDING",
  "createdAt": "2022-05-19T00:30:17.668Z"
}
```

### Atualiza uma task

```plaintext
PATCH /task/:id
```

Parâmetros suportados:

| Atributo  | Tipo   | Obrigatório | Descrição                                            |
| :-------- | :----- | :---------: | :--------------------------------------------------- |
| `content` | string |     :x:     | Conteúdo da task                                     |
| `status`  | string |     :x:     | Status da task: `PENDING` \| `IN_PROGRESS` \| `DONE` |

Resposta:

| Atributo     | tipo   | Descrição                                            |
| :----------- | :----- | :--------------------------------------------------- |
| `id`         | string | Id da task                                           |
| `content`    | string | Conteúdo da task                                     |
| `status`     | string | Status da task: `PENDING` \| `IN_PROGRESS` \| `DONE` |
| `created_at` | string | Momento de criação da task no formato ISO 8601       |

Exemplo de requisição:

```shell
curl --request PATCH \
  --url http://localhost:3001/task/8fea5488-4e79-4be2-8443-7551bbce13b6 \
  --header 'Content-Type: application/json' \
  --data '{"content":"Updated","status": "DONE"}'
```

Exemplo de resposta:

```json
{
  "id": "8fea5488-4e79-4be2-8443-7551bbce13b6",
  "content": "Nova task",
  "status": "PENDING",
  "createdAt": "2022-05-19T00:30:17.668Z"
}
```

### Deleta uma task

Este método retorna apenas status 204.

```plaintext
DELETE /task/:id
```

Exemplo de requisição:

```shell
curl --request DELETE \
  --url http://localhost:3001/task/8fea5488-4e79-4be2-8443-7551bbce13b6
```
