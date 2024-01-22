# technical task | EN

Technology Stack: React | Vite | TypeScript

Task.

Create a web application with the following hierarchical structure of pages (tables):
Accounts => Profiles => Campaigns

Table [Accounts] {
"accountId", "email", "authToken", "creationDate"
}
Table [Profiles of selected account] {
"profileId", "country", "marketplace"
}
Table [Campaigns of selected profile] {
"campaignId", "clicks", "cost", "date"
}

3 clickable tables that, when you click on one of the rows, move to the selected entity by structure.
Implement sorting, filtering and pagination for each of the tables.

You can use Bootstrap modules for page/table design.
Set the data set with constants in the code. (or use any methods of simulating data output from the backend)
Any initiatives to add functionality to the application are welcome.



# Технічне завдання | UA


Стек технологій: React | Vite | TypeScript

Завдання.

Створити веб-застосунок із такою ієрархічною структурою сторінок(таблиць):
Accounts => Profiles => Campaigns

Table [Accounts] {
"accountId", "email", "authToken", "creationDate"
}
Table [Profiles of selected account] {
"profileId", "country", "marketplace"
}
Table [Campaigns of selected profile] {
"campaignId", "clicks", "cost", "date"
}

3 клікабельні таблиці, які при кліку по одному з рядків - переходять по структурі у вибрану entity.
Реалізувати сортування, фільтрування та пагінацію до кожної з таблиць.

Можна використовувати Bootstrap модулі для дизайну сторінок/таблиць.
Набір даних задати константами в коді. (або використати будь-які методи імітування виводу даних із бекенду)
Будь-які проявлені ініціативи по додавання функціоналу в застосунок - вітаються.
