HelpDesk — Backend

Backend для сервиса управления заявками (HelpDesk). Написан на Node.js с использованием фреймворка Koa. Развёрнут на Vercel.

Стек

- *Node.js* — среда выполнения
- *Koa* — веб-фреймворк
- *@koa/cors* — обработка CORS-запросов
- *koa-body* — парсинг тела запроса (JSON, urlencoded, multipart)
- *uuid* — генерация уникальных идентификаторов

API

Базовый URL: https://helpdesk-backend-kappa.vercel.app

Все методы вызываются через query-параметр `?method=`.

| Метод | Endpoint | Описание |

| `GET` | `?method=allTickets` | Список всех тикетов (без `description`) |
| `GET` | `?method=ticketById&id=<id>` | Полное описание тикета по `id` |
| `POST` | `?method=createTicket` | Создание тикета |
| `POST` | `?method=updateById&id=<id>` | Обновление тикета по `id` |
| `GET` | `?method=deleteById&id=<id>` | Удаление тикета (ответ `204 No Content`) |

Формат данных

Ticket:

```json
{
  "id": "уникальный идентификатор (uuid)",
  "name": "краткое описание",
  "status": false,
  "description": "полное описание",
  "created": 1699999999999
}
