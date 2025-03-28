# Розроблення функціональних вимог до системи

## Модель прецедентів

## Загальна схема

<center style="
   border-radius:4px;
   border: 1px solid #cfd7e6;
   box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
   padding: 1em;"
>

![Diagram](http://www.plantuml.com/plantuml/png/dLNDQXDH5DxFKnpgGWLZDovBg8Y2e21KTsucpJMEJUQ6cGdTk4WQVroKjaXimH-GzWNIcB5fVj9NEFUD_Ev9qfdRq2uaS9bxVhvppdVEkLcF4pzA6hMg5sy5OTsF_1g5Eb5FT9WyqbKTqVRR856UvsyckApmRvxogJaqEppX0GzNo8y9XbM_f2CV9fxdDMArwSUALjPAnOsW4ZuDrrPBnTSX7t7ND3ar7TCoEwPfsjo3P8S7kEyBqipSGNYcAvS09zmpXtnkNOXxP5hM5RUKnwOj0DRQzN_fnrlF_T2lg3d8TqxpiOdFk8jB7-U49sQVnpmGhCpJ0NnS3f9NiOfcS20a5Ty_UKW1CuV4GvwYPCbohl_CNK5Vm82mF7zKY0h51G-keW45wbkILo7FSbrsoeVoFDjTAkaaqJNIRyYnfbiFbFrv7X5TRJNn68A_d99f4r_WksThv7CeODMKSgzoEqBjN-02tY0SGTmIjF4rn5jIRN1uTmbY71UMGDXEXBpKkfkFnESyjLrVGe5EfcI2jE3HMQIDJAnSEh4BV9YCp2uo7Y2Uv7Tcwm34tcNwrjX-chPfsSpeJgBBUZK8gHxfIgJYUBMiGsK5aTeErFRT-__BNCyQGZDnnWZQ8w61-xQg5fnGb7JxDeIMHK2AyuKrug5ftvCKW6LBXcx6uDHqe4JLKkel_iO_-O0_41_p9tp-mDdX0w7VKs6PGftV-cC9FCBPdws6ycjLvPVTPNyHwNTgCxbvsoGPJcqojeC2vpWwa3RGpNX3YoBDxwF8FS7Bl33mYrofK7G3vJIoGhWjAHg5zqLdHp9E3X1G1cO-L4t92EkUVvSMRyd3SYq8NRRiHZgbdGWt66OXMeRvcWVa4ZR3M8BUQDJhEahcs5y1WJd3BWxoRJZbqUpnlEcbog5vdXH21V2LnNQ4cUrCAXHc0xEEuSBVpJy0)

@startuml

    skinparam noteFontColor white

    actor "Робітник" as Collaborator


    usecase "<b>SignIn</b>\nЗареєструватися" as SignIn
    usecase "<b>LogIn</b>\nУвійти в систему" as LogIn
    usecase "<b>TaskManage</b>\nКерувати завданнями" as TaskManage
    usecase "<b>EditUser</b>\nРедагувати дані користувача" as EditUser


    Collaborator -r-> SignIn
    Collaborator -u-> LogIn
    Collaborator -l-> TaskManage
    Collaborator -u-> EditUser




    note bottom of Collaborator  #4e4e4e

       Робітник може у повній мірі керувати лише <b>власними завданнями</b>
       та на призначених йому завданнях він має можливість тільки
       <b>змінювати статус</b> (todo/in progress/done/in rewiew).
       Робітник може у повній мірі виконувати дії над всіма Task'ами у випадку,
       коли в проєкті <b>НЕМАЄ ТІМЛІДА</b>

    end note

    actor "Тімлід" as Teamlead

    usecase "<b>ProjectManage</b>\nКерувати проектом" as ProjectManage
    usecase "<b>TeamManage</b>\nКерувати командою" as TeamManage


    Teamlead -> ProjectManage
    Teamlead -l-> TeamManage
    Teamlead -u-|> Collaborator

    actor "Адміністратор системи" as Admin

    usecase "<b>DataManage</b>\nУправління користувачами" as UserManage
    usecase "<b>UserSupport</b>\nВирішити проблему користувача" as UserSupport

    Admin --> UserManage
    Admin --> UserSupport
    Admin -u-|> Teamlead

@enduml


</center>

## Робітник

<center style="
   border-radius:4px;
   border: 1px solid #cfd7e6;
   box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
   padding: 1em;"
>


@startuml

    skinparam noteFontColor white

    actor "Робітник" as Collaborator

    usecase "<b>SignIn</b>\nРеєстрація" as SignIn
    usecase "<b>UserSignIn</b>\nРеєстрація користувача" as UserSignIn
    usecase "<b>UserGitHubSignIn</b>\nРеєстрація користувача за допомогою GitHub" as UserGitHubSignIn
    usecase "<b>LogIn</b>\nВхід" as LogIn
    usecase "<b>UserLogIn</b>\nВхід користувача" as UserLogIn
    usecase "<b>UserGitHubLogIn</b>\nВхід користувача за допомогою GitHub" as UserGitHubLogIn
    usecase "<b>EditUser</b>\nРедагувати дані користувача" as EditUser
    usecase "<b>TaskManage</b>\nКерувати завданнями" as TaskManage
    usecase "<b>CreateTask</b>\nСтворити завдання" as CreateTask
    usecase "<b>EditTask</b>\nРедагувати завдання" as EditTask
    usecase "<b>DeleteTask</b>\nВидалити завдання" as DeleteTask
    usecase "<b>FilterTask</b>\nВідфільтрувати завдання" as FilterTask
    usecase "<b>CommentTask</b>\nКоментувати завдання" as CommentTask

    Collaborator -l-> SignIn
    SignIn <.u. UserGitHubSignIn:extends
    SignIn <.d. UserSignIn:extends
    Collaborator -r-> LogIn
    LogIn <.u. UserGitHubLogIn:extends
    LogIn <.d. UserLogIn:extends
    Collaborator --d-> EditUser
    Collaborator -u-> TaskManage
    TaskManage <.u. CommentTask:extends
    TaskManage <.u. FilterTask:extends
    TaskManage <.u. DeleteTask:extends
    TaskManage <.u. EditTask:extends
    TaskManage <.u. CreateTask:extends

    note bottom of Collaborator #4e4e4e

       Робітник може у повній мірі керувати лише <b>власними завданнями</b>
       та на призначених йому завданнях він має можливість тільки
       <b>змінювати статус</b> (todo/in progress/done/in rewiew).
       <b>Фільтрувати</b> та <b>коментувати</b> робітник може <b>всі</b>
       <b>завдання проекту</b>.
       Робітник може у повній мірі виконувати дії над всіма Task'ами у випадку,
       коли в проєкті <b>НЕМАЄ ТІМЛІДА</b>

    end note

@enduml


</center>

## Тімлід

<center style="
   border-radius:4px;
   border: 1px solid #cfd7e6;
   box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
   padding: 1em;"
>


@startuml

    actor "Тімлід" as Lead

    usecase "<b>TeamManage</b>\nКерувати командою" as TeamManage
    usecase "<b>AddMember</b>\nДодати користувача" as AddMember
    usecase "<b>DeleteMember</b>\nВидалити користувача" as DeleteMember
    
    usecase "<b>ProjectManage</b>\nКерувати проєктом" as ProjectManage
    usecase "<b>CreateProject</b>\nСтворити проект" as CreateProject
    usecase "<b>DeleteProject</b>\nВидалити проект" as DeleteProject
    
    usecase "<b>SprintManage</b>\nКерувати Спрінтом" as SprintManage
    usecase "<b>CreateSprint</b>\nСтворити спринт" as CreateSprint
    usecase "<b>FinishSprint</b>\nЗавершити спринт" as FinishSprint
    
    Lead -d-> TeamManage
    AddMember .u.> TeamManage:extends
    DeleteMember .u.> TeamManage:extends
    
    Lead -u-> ProjectManage
    CreateProject .u.> ProjectManage:extends
    DeleteProject .u.> ProjectManage:extends
    
    Lead -u-> SprintManage
    CreateSprint .u.> SprintManage:extends
    FinishSprint .u.> SprintManage:extends

@enduml


</center>

## Адміністратор системи

<center style="
   border-radius:4px;
   border: 1px solid #cfd7e6;
   box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
   padding: 1em;"
>


@startuml

    actor "Адміністратор системи" as Admin
    usecase "<b>DataManage</b>\nКерувати даними системи" as DataManage
    usecase "<b>BanUser</b>\nЗаблокувати користувача" as BanUser
    usecase "<b>UnBanUser</b>\nРозблокувати користувача" as UnBanUser
    usecase "<b>UserSupport</b>\nВирішити проблему користувача" as UserSupport

    Admin -d-> DataManage
    Admin -u-> UserSupport
    BanUser .u.> DataManage:extends
    UnBanUser .u.> DataManage:extends

@enduml


</center>

## Сценарії використання



| ID                 | <span id=UserSignIn>`UserSignIn`</span>                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Зареєструвати користувача (Sign In)                                                                                                                                                                                                                                                                                                                                                                                                 |
| Учасники:          | Користувач (тімлід, або розробник), система                                                                                                                                                                                                                                                                                                                                                                                         |
| Передумови:        | - Користувач не має облікового запису  в системі                                                                                                                                                                                                                                                                                                                                                                                                 |
| Результат:         | Створений обліковий запис користувача                                                                                                                                                                                                                                                                                                                                                                                             |
| Виключні ситуації: | Користувач не заповнив усі обов'язкові поля форми для реєстрації <font color="red">NullReferenceException</font><br> Обліковий запис вже існує у системі <font color="red">UserAlreadyExistsException</font><br> Користувач увів пароль, який не відповідає всім вимогам "надійного паролю" (A-Z, a-z, 0-9, !-*, мінімум 8 символів) <font color="red">NotStrongPasswordException</font>                                            |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Створити обліковий запис";

    |Система|
        : Виводить форму реєстрації;

    |Користувач|
    : Вводить реєстраційні дані;
    : Натискає кнопку "Зареєструватися";
    note right #ffaaaa
    <b> Можливі
    <b> NullReferenceException
    <b> NotStrongPasswordException
    end note
    
    |Система|
    : Перевіряє наявність облікового запису користувача;
    note right #ffaaaa
    <b> Можлива
    <b> UserAlreadyExistsException
    end note
    
    : Створює новий обліковий запис;
    
    |Користувач|
    : Переходить у щойностворений обліковий запис;
    stop;
@enduml

| ID                 | <span id=UserGitHubSignIn>`UserGitHubSignIn`</span>                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Зареєструвати користувача (Sign In) за допомогою GitHubApi                                                                                                                                                                                                                                                                                                                                                                                             |
| Учасники:          | Користувач (тімлід, або розробник), система                                                                                                                                                                                                                                                                                                                                                                                                            |
| Передумови:        | - Користувач не має облікового запису в системі                                                                                                                                                                                                                                                                                                                                                                                                        |
| Результат:         | Створений обліковий запис користувача (через інформацію, отриману з GitHub профілю користувача)                                                                                                                                                                                                                                                                                                                                                      |
| Виключні ситуації: | Користувач не має облікового запису GitHub (У даному випадку помилки обробляються самим GitHubApi)<br> Обліковий запис (створений за допомогою GitHubApi) вже існує в системі <font color="red">UserAlreadyExistsException</font><br>                                                                                                                                                                                                                  |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Створити обліковий запис";

     |Система|
        : Виводить форму реєстрації;

    |Користувач|
    : Обирає варіант "Зареєструватися за допомогою GitHub";
    : Натискає на свій обліковий запис GitHub \n (або вводить дані облікового запису в GitHubApi);
    
    |Система|
    : Перевіряє наявність облікового запису користувача;
    note right #ffaaaa
    <b> Можлива
    <b> UserAlreadyExistsException
    end note
    
    : Створює новий обліковий запис;
    
    |Користувач|
    : Переходить у щойностворений обліковий запис;
    stop;

@enduml

| ID                 | <span id=UserLogIn>`UserLogIn`</span>|
| :----------------- | :----------- |
| Назва:             | Авторизувати користувача (Log In)|
| Учасники:          | Користувач (тімлід, або робітник), система|
| Передумови:        | - Користувач зареєстрований у системі<br>- Користувач не авторизований у системі|
| Результат:         |  Новий сеанс роботи користувача|
| Виключні ситуації: | У формі авторизації не заповнені одне, або більше полів <font color="red">NullReferenceException</font><br>Користувач не зареєстрований у системі <font color="red">NullInstanceException</font><br>Користувач ввів неправильний пароль <font color="red">WrongPasswordException</font>|

@startuml

    |Користувач|
    start;

     |Система|
        : Виводить форму авторизації;

    |Користувач|
    : Вводить дані авторизації;
    : Натискає кнопку "Увійти";
    note right #ffaaaa
    <b> Можлива NullReferenceException
    end note
    
    |Система|
    : Перевіряє наявність облікового запису користувача;
    note right #ffaaaa
    <b> Можлива
    <b> NullInstanceException
    end note
    
    : Перевіряє отримані дані, введені користувачем;
    note right #ffaaaa
    <b> Можлива
    <b> WrongPasswordException
    end note
    : Авторизує користувача;
    
    |Користувач|
        stop;

@enduml

| ID                 | <span id=UserGitHubLogIn>`UserGitHubLogIn`</span>|
| :----------------- | :----------- |
| Назва:             | Авторизувати користувача (Log In) за допомогою GitHubApi|
| Учасники:          | Користувач (тімлід, або робітник), система|
| Передумови:        | - Користувач зареєстрований у системі (за допомогою GitHubApi)<br>- Користувач не авторизований у системі|
| Результат:         |  Новий сеанс роботи користувача|
| Виключні ситуації: | Користувач не зареєстрований у системі <font color="red">NullInstanceException</font><br> Облікового запису GitHub не існує (У даному випадку помилки обробляються самим GitHubApi)|

@startuml

    |Користувач|
    start;

    |Система|
        : Виводить форму авторизації;

    |Користувач|
    : Натискає на "Увійти за допомогою GitHub";
    : Натискає на свій обліковий запис GitHub \n (або вводить дані облікового запису в GitHubApi);
    
    |Система|
    : Перевіряє наявність облікового запису користувача;
    note right #ffaaaa
    <b> Можлива
    <b> NullInstanceException
    end note
    
    : Авторизує користувача;
    
    |Користувач|
        stop;

@enduml

| ID                 | <span id=EditUser>`EditUser`</span>                                                                                                                                                                                                                                                                                                                                                                                                      |
| :----------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Редагувати дані користувача                                                                                                                                                                                                                                                                                                                                                                                                              |
| Учасники:          | Користувач (адміністратор системи, тімлід, або робітник), система                                                                                                                                                                                                                                                                                                                                                                        |
| Передумови:        | - Користувач зареєстрований у системі з даними, введеним при реєстрації (що б змінити дані користувача, який реєструвався за допомогою GitHubApi, йому потрібно змінити ці дані у самому GitHub)<br>- Користувач бажає змінити дані облікового запису<br>- Користувач авторизований у системі                                                                                                                                            |
| Результат:         | Користувач має відредагований профіль                                                                                                                                                                                                                                                                                                                                                                                                |
| Виключні ситуації: | Користувач змінив пароль на інший, який не відповідає всім вимогам "надійного паролю" (A-Z, a-z, 0-9, !-*, мінімум 8 символів) <font color="red">NotStrongPasswordException</font><br> Користувач змінив дані у будь-якому полі на пусті (null) <font color="red">NullReferenceException</font>                                                                                                                                          |

@startuml

    |Користувач|
    start;
    : Натискає на "Редагувати профіль";

    |Система|
        :відкриває форму для редагування профілю;

    |Користувач|
    : Обирає потрібне йому поле для зміни \n (Ім'я, Прізвище, Вік, Стать, Компанія, Місце навчання, Пароль);
    : Змінює дані у будь-якому із цих полів і \n натискає на кнопку "Зберегти зміни";
    note right #ffaaaa
    <b> Можливі
    <b> NotStrongPasswordException та
    <b> NullReferenceException
    end note
    
    |Система|
    : Записує зміни у профіль користувача;
    
    |Користувач|
    : Переходить до оновленого облікового запису;
    stop;

@enduml

| ID                 | <span id=CreateTask>`CreateTask`</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Створити завдання                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Учасники:          | Користувач (тімлід, або робітник), система                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Передумови:        | - Користувач авторизований<br>- Користувач обрав проект                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Результат:         | Завдання створене                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Виключні ситуації: | У формі створення завдання не заповнені обов'язкові поля <font color="red">NoEssentialDataException</font>                                                                                                                                                                                                                                                                                                                                                                                         |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Створити завдання";

    |Система|
        : Виводить форму для створення завдання;

    |Користувач|
    : Вводить назву завдання (обов'язково),\n опис, статус (todo/in progress/done/in review), \nкому призначене завдання, дедлайн;
    : Натискає кнопку "Створити";
    
    
    |Система|
    : Перевіряє наявність обов'язкових полів;
    note right #ffaaaa
    <b> Можлива
    <b> NoEssentialDataException
    end note
    : Створює і відображає завдання у відповідному розділі проєкту;
    : Повідомляє інформацію про завдання користувачам,\n яким воно було призначене;

     |Користувач|
        stop;
@enduml

| ID                 | <span id=EditTask>`EditTask`</span>                                                                                                                                                                                                                                                                                                                                                                                                       |
| :----------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Редагувати завдання                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Учасники:          | Користувач (тімлід, або робітник), система                                                                                                                                                                                                                                                                                                                                                                                                |
| Передумови:        | - Користувач авторизований<br>- Користувач обрав завдання                                                                                                                                                                                                                                                                                                                                                                                 |
| Результат:         | Завдання відредаговане                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Виключні ситуації: | У формі редагування завдання не заповнені обов'язкові поля <font color="red">NoEssentialDataException</font><br>Під час редагування, завдання було видалено <font color="red">TaskNotExistException</font>                                                                                                                                                                                                                                |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Редагувати завдання";

    |Система|
        : Виводить форму для редагування завдання;

    |Користувач|
    : Редагує завдання;
    : Натискає кнопку "Зберегти";
    note right #ffaaaa
    <b> Можлива
    <b> TaskNotExistException
    end note
    
    
    |Система|
    : Перевіряє наявність обов'язкових полів;
    note right #ffaaaa
    <b> Можлива
    <b> NoEssentialDataException
    end note
    : Зберігає внесені користувачем зміни та \n відображає відредаговане завдання;
    : Повідомляє інформацію про завдання користувачам, \n яким воно було призначене;

    |Користувач|
        stop;
@enduml

| ID                 | <span id=DeleteTask>`DeleteTask`</span>                                                                                                                                                                                                            |
| :----------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Видалити завдання                                                                                                                                                                                                                                  |
| Учасники:          | Користувач (тімлід, або робітник), система                                                                                                                                                                                                         |
| Передумови:        | - Користувач авторизований<br>- Користувач обрав завдання                                                                                                                                                                                          |
| Результат:         | Завдання видалене                                                                                                                                                                                                                                  |
| Виключні ситуації: | Користувач натиснув кнопку "Скасувати" <font color="red">CancelException</font><br>Користувач не має прав на видалення цього завдання <font color="red">AccessDeniedException</font>                                                               |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Видалити завдання";

    |Система|
        : Виводить вікно для підтвердження видалення;

    |Користувач|
    : Натискає кнопку "Підтвердити";
    note right #ffaaaa
    <b> Можлива
    <b> CancelException
    end note
    
    
    |Система|
    : Видаляє завдання;
    note right #ffaaaa
    <b> Можлива
    <b> AccessDeniedException
    end note

    |Користувач|
        stop;
@enduml

| ID                 | <span id=FilterTask>`FilterTask`</span>                                 |
| :----------------- |:------------------------------------------------------------------------|
| Назва:             | Відфільтрувати завдання                                                 |
| Учасники:          | Користувач (тімлід, або робітник), система                              |
| Передумови:        | - Користувач авторизований<br>- Користувач обрав проєкт<br>             |
| Результат:         | Відфільтровані завдання                                                 |
| Виключні ситуації: | У проєкті нема жодних завдань <font color="red">NoTasksException</font> |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Використати фільтр";
    note right #ffaaaa
    <b> Можлива
    <b> NoTasksException
    end note

    |Система|
        : Виводить вікно для встановлення фільтрів;

    |Користувач|
    : Обирає параметри для фільтрування;
    : Натискає кнопку "Підтвердити";
    
    |Система|
    : Відображає відфільтровані завдання;

    |Користувач|
        stop;
@enduml

| ID                 | <span id=CommentTask>`CommentTask`</span>                                                                                                                                         |
| :----------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Коментувати завдання                                                                                                                                                              |
| Учасники:          | Користувач (тімлід, або робітник), система                                                                                                                                        |
| Передумови:        | - Користувач авторизований<br>- Користувач обрав проект<br>- Користувач обрав завдання                                                                                            |
| Результат:         | Коментар до завдання                                                                                                                                                              |
| Виключні ситуації: | Під час написання коментарію завдання було видалене <font color="red">TaskNoExistException</font><br>Користувач скасував операцію <font color="red">CancelCommentException</font> |

@startuml

    |Користувач|
    start;
    : Натискає кнопку "Додати коментар";

    |Система|
        : Виводить вікно для додання коментарів;

    |Користувач|
    : Пише коментар;
    note right #ffaaaa
    <b> Можлива
    <b> CancelCommentException
    end note
    : Натискає кнопку "Надіслати";
    note right #ffaaaa
    <b> Можлива
    <b> TaskNoExistException
    end note
    
    |Система|
    : Зберігає коментар;
    : Повідомляє інших учасників цього завдання \n про новий коментар;

    |Користувач|
        stop;
@enduml

| ID                 | <span id=CreateProject>`CreateProject`</span>                                                                                                                                                                                                                                                            |
| :----------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Створити проєкт                                                                                                                                                                                                                                                                                          |
| Учасники:          | Користувач (тімлід), система                                                                                                                                                                                                                                                                             |
| Передумови:        | - Користувач авторизований<br>                                                                                                                                                                                                                                                                           |
| Результат:         | Новий проєкт                                                                                                                                                                                                                                                                                             |
| Виключні ситуації: | Проєкт з таким іменем вже створений <font color="red">NotUniqueProjectName</font>                                                                                                                                                                                                                        |

@startuml

    |Користувач|
    start;
    : Заходить в меню управління проєктами;

    |Система|
        : Виводить вікно управління проєктами;

    |Користувач|
    : Натискає кнопку "Створити новий проєкт";
    
    |Система|
    : Виводить форму для створення нового проєкту;

    |Користувач|
    : Заповнює поля з інформацією проєкту;
    : Натискає кнопку "Створити";
    note right #ffaaaa
    <b> Можлива
    <b> NotUniqueProjectName
    end note

    |Система|
    : Створює проєкт;
    : Відкриває новостворений проект;

    |Користувач|
        stop;
@enduml

| ID                 | <span id=DeleteProject>`DeleteProject`</span>                                                                                                                                                                                                                                                                                                   |
| :----------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Видалити проєкт                                                                                                                                                                                                                                                                                                                                 |
| Учасники:          | Користувач (тімлід), система                                                                                                                                                                                                                                                                                                                    |
| Передумови:        | - Проєкт не був видалений до цього                                                                                                                                                                                                                                                                                                              |
| Результат:         | Проєкт є видалений                                                                                                                                                                                                                                                                                                                              |
| Виключні ситуації: | Користувач не проходить перевірку на підтвердження вибору (Captcha) <font color="red">NotConfirmedActionException</font><br> Користувач натиснув кнопку скасувати <font color="red">CancelException</font>                                                                                                                                      |

@startuml

    |Користувач|
    start;
    : Заходить в меню управління проєктами;

    |Система|
        : Виводить вікно управління проєктами;

    |Користувач|
    : Обирає меню дій над потрібним проєктом;
    
    |Система|
    : Виводить меню дій над проєктом;

    |Користувач|
    : Натискає кнопку "Видалити проект";

    |Система|
    : Відкриває вікно з підтвердженням видалення;
    note right #ffaaaa
    <b> Можлива
    <b> NotConfirmedActionException,
    <b> CancelException
    end note

    |Користувач|
    : Натискає кнопку "Видалити";

    |Система|
    : Видаляє проєкт;

    |Користувач|
        stop;
@enduml

| ID                 | <span id=AddMember>`AddMember`</span>                                                                                                                                                                                                                                                                                                                                    |
|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Додати робітника до проєкту                                                                                                                                                                                                                                                                                                                                              |
| Учасники:          | Користувач (тімлід), система                                                                                                                                                                                                                                                                                                                                             |
| Передумови:        | - Користувач авторизований<br> - Користувач обрав проект<br> - Користувач має необхідні права доступу до функціоналу системи                                                                                                                                                                                                                                             |
| Результат:         | Користувач стає учасником проєкту                                                                                                                                                                                                                                                                                                             |
| Виключні ситуації: | Такого користувача не існує <font color="red">UserNotExistException</font>  <br> Користувач вже є учасником проєкту <font color="red">UserAlreadyProjectMemberException</font>                                                                                                                                                                                            |

@startuml

    |Користувач|
    start;
    : Заходить в меню управління проєктами;

    |Система|
        : Виводить вікно управління проєктами;

    |Користувач|
    : Обирає меню дій над потрібним проєктом;
    
    |Система|
    : Виводить меню дій над проєктом;

    |Користувач|
    : Натискає кнопку "Додати робітника";

    |Система|
    : Відкриває вікно з інформаційними полями;
    note right #ffaaaa
    <b> Можлива
    <b> UserAlreadyProjectMemberException,
    <b> UserNotExistException
    end note

    |Користувач|
    : Натискає кнопку "Додати";

    |Система|
    : Додає учасника;
    : Відображає користувача у списку учасників проекту;

    |Користувач|
        stop;
@enduml

| ID                 | <span id=DeleteMember>`DeleteMember`</span>                                                                                                                                                                                                                                                                                                                          |
|:-------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Видалити робітника з проєкту                                                                                                                                                                                                                                                                                                                                         |
| Учасники:          | Користувач (тімлід), система                                                                                                                                                                                                                                                                                                                                         |
| Передумови:        | - Користувач авторизований<br> - Користувач має необхідні права доступу до функціоналу системи <br> - Існують інші учасники проекту                                                                                                                                                                                                                                  |
| Результат:         | Користувач більше не учасник проєкту                                                                                                                                                                                                                                                                                                                                      |
| Виключні ситуації: | Натиснута кнопка "Скасувати" <font color="red">CancelDeleteMemberException</font>  <br> Користувач не є робітником проєкту <font color="red">UserIsNotProjectMemberException</font>                                                                                                                                                                                  |
@startuml

    |Користувач|
    start;
    : Заходить в меню управління проєктами;

    |Система|
    : Виводить вікно управління проєктами;

    |Користувач|
    : Обирає меню дій над потрібним проєктом;

    |Система|
    : Виводить меню дій над проєктом;

    |Користувач|
    : Натискає кнопку "Видалити робітника";

    |Система|
    : Відкриває вікно з інформаційними полями;
    note right #ffaaaa
    <b> Можлива
    <b> UserIsNotProjectMemberException,
    <b> CancelDeleteMemberException
    end note

    |Користувач|
    : Підтверджує видалення учасника;

    |Система|
    : Не відображає користувача у списку учасників проекту;

    |Користувач|
    stop;
    
@enduml

| ID                 | <span id=CreateSprint>`CreateSprint`</span>                                                                                                                                                                                                                                                                                                                                           |
|:-------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Створити [Sprint]                                                                                                                                                                                                                                                                                                                                                                     |
| Учасники:          | Користувач (тімлід), система                                                                                                                                                                                                                                                                                                                                                          |
| Передумови:        | - Користувач авторизований<br>- Попередній Спрінт вже закінчився                                                                                                                                                                                                                                                                                                                      |
| Результат:         | Спринт створений                                                                                                                                                                                                                                                                                                                                                                       |
| Виключні ситуації: | Номер/назва Спрінта не є унікальною <font color="red">NotUniqueSpringNameException</font> <br> Натиснута кнопка "Скасувати" <font color="red">CancelException</font>                                                                                                                                                                                                                  |

@startuml

    |Користувач|
    start;
    : Заходить в меню управління проєктами;

    |Система|
    : Виводить вікно управління проєктами;

    |Користувач|
    : Обирає меню дій над потрібним проєктом;

    |Система|
    : Виводить меню дій над проєктом; 

    |Користувач|
    : Натискає кнопку "Створити та почати новий Спрінт";

    |Система|
    : Відкриває вікно з інформаційними полями;
    note right #ffaaaa
    <b> Можлива
    <b> NotUniqueSpringNameException,
    <b> CancelException
    end note

    |Користувач|
    : Заповнює поля;

    |Система|
    : Повідомляє учасникам спринту інформацію про спринт;

    |Користувач|
    stop;
@enduml

| ID                 | <span id=FinishSprint>`FinishSprint`</span>                                                                                                                                                                                                                                                                                                                                |
|:-------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Закінчити [Sprint]                                                                                                                                                                                                                                                                                                                                                         |
| Учасники:          | Користувач (тімлід), система                                                                                                                                                                                                                                                                                                                                               |
| Передумови:        | - Користувач авторизований<br> - Поточний Спрінт вже наближається до кінця                                                                                                                                                                                                                                                                                                 |
| Результат:         | Спрінт закінчений                                                                                                                                                                                                                                                                                                                                                          |
| Виключні ситуації: | Користувач не проходить перевірку на підтвердження вибору (Captcha) <font color="red">NotConfirmedActionException</font> <br> Натиснута кнопка "Скасувати" <font color="red">CancelException</font>                                                                                                                                                                        |

@startuml

    |Користувач|
    start;
    : Заходить в меню управління проєктами;

    |Система|
    : Виводить вікно управління проєктами;

    |Користувач|
    : Обирає меню дій над потрібним проєктом;

    |Система|
    : Виводить меню дій над проєктом;

    |Користувач|
    : Натискає кнопку "Закінчити Спрінт";

    |Система|
    : Відкриває вікно з підтвердженням вибору;
    note right #ffaaaa
    <b> Можлива
    <b> NotConfirmedActionException,
    <b> CancelException
    end note

    |Користувач|
    : Виконує підтвердження;

    |Система|
    : Повідомляє учасників спринта про його завершення;   

    |Користувач|
    stop;
@enduml

| ID                 | <span id=BanUser>`BanUser`</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Блокувати користувача                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Учасники:          | Користувач (адміністратор системи, тімлід, або робітник), система                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Передумови:        | - Користувач порушив угоди використання програмного забезпечення<br>- Забезпечення безпеки системи                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Результат:         | Блокування користувача                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Виключні ситуації: | Користувача вже заблоковано <font color="red">UserIsBannedException</font><br> Користувача з введеними даними не існує <font color="red">NullInstanceException</font>                                                                                                                                                                                                                                                                                                                                                                    |

@startuml

    |Адміністратор|
    start;
    : Отримав достатню кількість скарг для огляду діяльності користувача;

    |Адміністратор|
    :Робить висновок щодо блокування користувача;

    |Адміністратор|
    :Натискає на кнопку "Дії з користувачем";
    note right #ffaaaa
    <b> Можлива
    <b> NullInstanceException
    end note

    |Система|
    : Виводить вікно управління користувачами;

    |Адміністратор|
    : Натискає на кнопку "Заблокувати користувача";
    note right #ffaaaa
    <b> Можлива
    <b> UserIsBannedException
    end note

    |Система|
    : Відкриває вікно з формою для блокування;

    |Адміністратор|
    : Заповнює форму для блокування (причина, тривалість);

    |Система|
    : Відкриває вікно з підтвердженням вибору;

    |Адміністратор|
    : Натискає на "Заблокувати користувача";

    |Система|
    : Блокує користувача та надсилає йому інформацію про блокування;

    |Адміністратор|
    :Оцінює результат блокування;

    |Адміністратор|
    stop;
@enduml

| ID                 | <span id=UnBanUser>`UnBanUser`</span>|
| :----------------- | :---------------------------------- |
| Назва:             | Розблокувати користувача|
| Учасники:          | Користувач (адміністратор системи, тімлід, або робітник), система|
| Передумови:        | - Користувач заблокований|
| Результат:         | Розблокування профілю користувача|
| Виключні ситуації: | Користувача вже розблоковано <font color="red">UserIsUnBannedException</font><br> Користувача з введеними даними не існує <font color="red">NullInstanceException</font>|

@startuml

    |Адміністратор|
    start;
    : Знаходить заблокованого користувача;
    
    |Адміністратор|
    :Визначає причину розблокування;

    |Адміністратор|
    :Натискає на кнопку "Дії з користувачем";
    note right #ffaaaa
    <b> Можлива
    <b> NullInstanceException
    end note

    |Система|
    : Виводить вікно управління користувачами;

    |Адміністратор|
    : Натискає на "Розблокувати користувача";
    note right #ffaaaa
    <b> Можлива
    <b> UserIsUnBannedException
    end note

    |Система|
    : Розблоковує доступ користувачу та повідомляє йому інформацію \n про розблокування (надіславши лист на пошту);

    |Адміністратор|
    :Оцінює результат розблокування;   

    |Адміністратор|
    stop;
@enduml

| ID                 | <span id=UserSupport>`UserSupport`</span>                                                                                                                                                                                                                                                                                                                                          |
| :----------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Назва:             | Вирішити проблему користувача                                                                                                                                                                                                                                                                                                                                                      |
| Учасники:          | Користувач (адміністратор системи, тімлід, або робітник), система                                                                                                                                                                                                                                                                                                                  |
| Передумови:        | - Користувач бажає написати повідомлення до технічної підтримки                                                                                                                                                                                                                                                                                                                    |
| Результат:         | Вирішення проблеми користувача                                                                                                                                                                                                                                                                                                                                                     |
| Виключні ситуації: | Користувач не авторизований в системі <font color="red">UserIsNotLoggedInException</font>                                                                                                                                                                                                                                                                                          |

@startuml

    |Користувач|
    start;
    : Натискає на "Користувацька підтримка";

    |Система|
    : Перекидає користувача на сторінку F.A.Q.;

    |Користувач|
    : Натискає на "Звʼязатися з адміністрацією";
    note right #ffaaaa
    <b> Можлива
    <b> UserIsNotLoggedInException
    end note

    |Система|
    : Відкриває вікно з формою для написання повідомлення;

    |Користувач|
    : Пише повідомлення й надсилає його;

    |Система|
    : Надсилає це повідомлення до профілю адміністрації;

    |Адміністратор|
    :Вирішує проблему користувача;

    |Користувач|
    stop;
@enduml
