# Примеры

## Клиент для тестовой площадки

Клиент подготовленный для работы на Тест. площадке

* ПриложениеИд - Идентификатор вашего приложения
* ПриложениеКлюч - Секретный ключ вашего приложения
* Пользователь, Пароль - Ваша учетная запись на тестовой площадке.

[Подробнее о получении доступа к тестовой площадке](https://docs-ke.readthedocs.io/ru/latest/#id11)

```bsl
&НаСервере
Функция Клиент() Экспорт

    Клиент = Обработки.КеЛибКлиент.Создать().Инит();
    
    Сборка = Клиент.Определения.ПараметрыСборкиКлиента();
        
    // Настройка авторизации
    
    Сборка.Авторизация.КлиентOidcИд = ПриложениеИд;
    Сборка.Авторизация.КлиентOidcКлюч = ПриложениеКлюч;
    Сборка.Авторизация.Пользователь = Пользователь;
    Сборка.Авторизация.Пароль = Пароль;
    
    // Настройка подключения к сервисам тестовой площадки КЭ 
    // замените testkontur.ru на kontur.ru для настроек сетевых экранов

    Сборка.КлючExternApi = ПриложениеКлюч;
    Сборка.ХостExternApi = "https://extern-api.testkontur.ru/v1";
    Сборка.ХостIdentity = "https://identity.testkontur.ru";
    Сборка.ХостContacts = "https://api.testkontur.ru/dc.contacts/v1";
    Сборка.ХостAuth = "https://api.testkontur.ru/auth/v5.16";
    Сборка.ХостEnigma = "https://api.testkontur.ru/enigma/v1.3";        
    
    Клиент.Собрать(Сборка);
    
    Возврат Клиент;
    
КонецФункции
```

## Аккаунты

Методы для работы с учетными записями

```bsl
&НаСервере
Процедура Аккаунты() Экспорт
    
    Клиент = Клиент();    

    // Выборка
    
    Список = Клиент.Аккаунты.Список();
    Для Каждого Аккаунт Из Список.Аккаунты Цикл
        
        // Для работы с дочерними сущностями необходимо:
        // * выбрать текущий Аккаунт (Учетную запись)
        
        Клиент.УстановитьАккаунт(Аккаунт);
        
    КонецЦикла;
    
КонецПроцедуры
```

## Организации

Методы для работы с организациями

```bsl
&НаСервере
Процедура Организации() Экспорт
    
    Клиент = Клиент().УстановитьАккаунт();    
    
    // Выборка
    
    Список = Клиент.Организации.Список();
    Для Каждого Организация Из Список.Организации Цикл
        Продолжить;        
    КонецЦикла;    
    
    // Поиск
    
    Отбор = Клиент.Определения.ОтборОрганизации();
    Отбор.ИНН = "7709860400";
    
    Список = Клиент.Организации.Список(Отбор);
    
    // Получение
    
    Организация = Клиент.Организации.Получить(Организация.Ид);    

КонецПроцедуры
```

## Документообороты

Методы для работы с документооборотами

```bsl
&НаСервере
Процедура Документообороты() Экспорт
          
    Клиент = Клиент().УстановитьАккаунт();    
    
    // Выборка
    
    Список = Клиент.Документообороты.Список();
    Для Каждого До Из Список.Документообороты Цикл
        Продолжить;        
    КонецЦикла;    
    
    // Поиск
    
    Отбор = Клиент.Определения.ОтборДо();
    Отбор.Тип = Новый Массив;
    Отбор.Тип.Добавить("fns534-demand");
    
    Требования = Клиент.Документообороты.Список(Отбор);
    
    // Получение
    
    До = Клиент.Документообороты.Получить(До.Ид);    
        
КонецПроцедуры
```

## Контенты

Методы для работы с данными документов

```bsl
&НаСервере
Процедура Контенты() Экспорт

    Клиент = Клиент().УстановитьАккаунт();

    // Обратимся к документообороту чтобы узнать идентификатор контента
    
    Требование = Клиент.Документообороты.Получить("2241b68e-4b7a-4229-8b6f-a17025b0621e");
    Для Каждого Документ Из Требование.Документы Цикл
        Если Документ.Описание.Тип = "urn:document:fns534-demand-attachment" Тогда
            ИдентификаторКонтента = Документ.Контент.ЗашифрованныйКонтент.Ид;
        КонецЕсли;            
    КонецЦикла;
    
    // Требование о представлении документов (информации)
    
    Данные = Клиент.Контенты.ПолучитьДвоичныеДанные(ИдентификаторКонтента);    
    
КонецПроцедуры
```

## Контролирующие органы

Методы для работы с контактной информацией контролирующих органов

```bsl
&НаСервере
Процедура Контакты() Экспорт
    
    Клиент = Клиент();

    // Контролирующий орган, подробнее см. Определения.КонтактнаяИнформацияКО
    
    ИФНС_0087 = Клиент.Контакты.ПолучитьКО("0087");
    ФСГС_6600 = Клиент.Контакты.ПолучитьКО("66-00");
    ПФР_66600 = Клиент.Контакты.ПолучитьКО("666-000");    
    ФСС = Клиент.Контакты.ПолучитьКО("fss");
    
КонецПроцедуры
```

## Криптография

Методы для работы с доп. функциями криптографии

```bsl
&НаСервере
Процедура Крипто() Экспорт
    
    Клиент = Клиент();

    // Проверка подписи
  
    ПодписьВерна = Клиент.Крипто.ПроверитьПодпись(ИсходныеДанные, ДанныеПодписи);
    
    // Извлечение сертификатов из подписи

    Сертификаты = Клиент.Крипто.ПолучитьСертификатыИзПодписи(ДанныеПодписи);
    
    // Извлечение сертификатов из зашифрованных данных
    
    Сертификаты = Клиент.Крипто.ПолучитьСертификатыИзCMS(ШифрованныеДанные);    
    
КонецПроцедуры
```
