# Témata Fullstack aplikací

Fulltext zadání je na MS Teams, téma si registrujete [zde](https://docs.google.com/spreadsheets/d/1UV1aWBZd9Ea79YVq9Ztd8zeMQ-6hb5Lp/edit?usp=sharing&ouid=113674919573128162089&rtpof=true&sd=true)

## Povinná struktura

Na GitHubu nechci vidět žádné `node_modules`, `.vscode`, `package-lock.json`, ...

```js
nazev-projektu
│   README.md
│   .gitignore
│   package.json
│
└───public
│   │   index.html
│   │   další html soubory
│   │
│   └───assets
│       │   místo pro obrázky, styles.css...
│   
└───api
│   │   nějaký js soubor s routováním
│   
└───database
│   │   db.js       // Database connection logic
│   │   schema.sql  // Schema definition
│   │   seed.js     // Script for seeding the database
│   │   seed.sql    // Seed data (INSERT statements)
│   
│   server.js
```

- `README.md` - popis projektu, jak ho spustit, co dělá, ...
- `.gitignore` - ignorujeme všechny složky, které nechceme commitovat
- `package.json` - dependencies, scripts, ...
- `public` - statické soubory, které chceme poslat klientovi
  - `index.html` - hlavní stránka
  - `další html soubory` - další stránky
  - `assets` - obrázky, styles.css, ...
- `api` - složka pro backend
  - `nějaký js soubor s routováním` - soubor, který obsahuje všechny routy
- `database` - složka pro databázi
  - `db.js` - soubor, který obsahuje logiku pro připojení k databázi
  - `schema.sql` - soubor, který obsahuje definici schématu databáze
  - `seed.js` - soubor, který obsahuje logiku pro naplnění databáze daty
  - `seed.sql` - soubor, který obsahuje samotná data pro naplnění databáze
- `server.js` - hlavní spouštěcí soubor, který obsahuje všechny routy a nastavení serveru

## Témata
Každé z témat je víceméně nějaký uživatelský formulář který dovoluje dělat CRUDL operace na cca 2 tabulkách. Tabulky jsou vždy propojeny cizím klíčem, je potřeba správně určit datové typy polí a přidat primární klíče. Při spuštění aplikace se databáze inicializuje (vytvoří se tabulky). Tabulky se naplní nějakými ukázkovými daty až při spuštění npm run seed.

CRUDL znamená, že má uživatel možnost vykonat operace
- Create
- Read
- Update
- Delete
- List (Read All)


---


### 1. Rezervační systém na sportoviště
Uživatelé mohou rezervovat sportoviště v různých časech.

- **Tabulka 1** - `sport_locations` - seznam sportovišť
  - `name`
  - `location`
- **Tabulka 2** - `reservations` - rezervace
  - `firstname`
  - `lastname`
  - `date`
  - `time_slot`
- **Tabulka 3** - `sports` - seznam sportů, ze kterých je možné vybírat při rezervaci
  - `name`

- **CRUDL (editovatelné z UI)**: sport_locations, reservations
- **Neměnitelná tabulka (seedovaná při seeding)**: sports


### 2. Správa jídelníčku ve školní jídelně
Školní jídelna si potřebuje vytvářet databázi kategorií a různých jídel, které dokáže připravovat.

- **Tabulka 1** - `meals`
  - `name`
  - `description`
  - `weight`
- **Tabulka 2** - `categories`
  - `name`

- **CRUDL (editovatelné z UI)**: meals, categories
- **Vztah M:N**: jídlo spadá do více kategorií, kategorie má více jídel


### 3. Evidence návštěvníků muzea
Muzeum potřebuje mít možnost ukládat seznam návštěvníků a jejich návštěv jednotlivých expozic spolu s datem jejich návštěv.

- **Tabulka 1** - `visitors`
  - `firstname`
  - `lastname`
- **Tabulka 2** - `exhibits`
  - `name`
  - `description`
- **Tabulka 3 hint** - `visits`
  - `visitor_id`
  - `exhibit_id`
  - `date`

- **CRUDL (editovatelné)**: visitors, exhibits
- **Vztah M:N**: návštěvník mohl navštívit více expozic, expozici navštěvuje více zákazníků. Každá návštěvy má konkrétní datum.


### 4. Správa domácích mazlíčků v útulku
Útulek potřebuje evidovat zvířátka a jejich případné majitele (pokud si je někdo adoptuje) a čím bylo které zvířátko očkované.

- **Tabulka 1** - `pets`
  - `name`
  - `species`
- **Tabulka 2** - `owners`
  - `firstname`
  - `lastname`
  - `phone`
- **Tabulka 3** - `vaccinations`
  - `name`
  - `date`

- **CRUDL (editovatelné)**: pets, owners, vaccinations


### 5. Správa kurzů v jazykové škole
Vysoká škola potřebuje plán kurzů, jednotlivých lekcí ze kterých se kurz skládá a aktivit, které se vybírají z banky existujících aktivit.

- **Tabulka 1** - `courses`
  - `name`
  - `code`
- **Tabulka 2** - `lectures`
  - `date`
  - `topic`
- **Tabulka 3** - `activities`
  - `name`
  - `description`

- **CRUDL (editovatelné)**: courses, lectures
- **Neměnitelná tabulka (seedovaná při spuštění)**: activities


### 6. Správa aut v autopůjčovně
Správce půjčovny eviduje auta, zákazníky a výpůjčky. Samotná výpůjčka je vždy svázána s jedním z aut a probíhá vždy v termínu od-do.

- **Tabulka 1** - `cars`
  - `make`
  - `model`
- **Tabulka 2** - `customers`
  - `firstname`
  - `lastname`
  - `driver_license`
- **Tabulka 3 hint** - `rentals`
  - `car_id`
  - `customer_id` 
  - `rental_date`
  - `return_date`

- **CRUDL (editovatelné)**: visitors, exhibits
- **Vztah M:N**: při výpůjčce je zadáno který zákazník si půjčuje které auto


### 7. Sklad náhradních dílů
Autoservis potřebuje evidovat sklad dílů, své dodavatele a objednávky konkrétních dílů.

- **Tabulka 1** - `parts`
  - `name`
  - `part_number`
- **Tabulka 2** - `suppliers`
  - `name`
  - `contact`
- **Tabulka 3 hint** - `orders`
  - `part_id`
  - `supplier_id`
  - `order_date`

- **CRUDL (editovatelné)**: parts, suppliers
- **Vztah M:N**: různé díly mohou být objednávány od různých dodavatelů


### 8. Systém hodnocení restaurací
Uživatelé hodnotí restaurace v České Lípě a přidávají komentáře. V systému je mimo jiné vidět, které restaurace jsou nejlépe hodnocené.

- **Tabulka 1** - `restaurants`
  - `name`
  - `address`
- **Tabulka 2** - `reviews`
  - `user_name`
  - `rating`
  - `comment`

- **CRUDL (editovatelné)**: restaurants, reviews


### 9. Správa inventáře kanceláře
Malá zmrzlinárna potřebuje sledovat stav svých zásob, přiřazovat jim kategorie a dodavatele.

- **Tabulka 1** - `items`
  - `name`
  - `quantity`
- **Tabulka 2** - `categories`
  - `name`
- **Tabulka 3** - `suppliers`
  - `name`
  - `contact`

- **CRUDL (editovatelné)**: items
- **Neměnitelná tabulka (seedovaná při spuštění)**: suppliers, categories


### 10. Evidence úkolů v týmu
Projektový manažer potřebuje správovat projektové úkoly a přiřazovat je k členům týmu.

- **Tabulka 1** - `tasks`
  - `title`
  - `description`
  - `status`
- **Tabulka 2** - `team_members`
  - `firstname`
  - `lastname`
  - `emails`

- **CRUDL (editovatelné)**: tasks, team_members
- **Vztah M:N**: úkoly mohou být přiřazeny k více členům týmu, člen může mít více úkolů


### 11. Správa parkovacích míst v garáži
Parkovací centrum potřebuje spravovat rezervace a správa parkovacích míst.

- **Tabulka 1** - `parking_spots`
  - `number`
  - `level`
- **Tabulka 2** - `reservations`
  - `vehicle_plate`
  - `reservation_date`
  - `firstname`
  - `lastname`
  - `email`

- **CRUDL (editovatelné)**: parking_spots, reservations


### 12. Katalog filmů a hodnocení
Nová platforma a lá ČSFD chce evidovat filmy a uživatelská hodnocení.

- **Tabulka 1** - `movies`
  - `title`
  - `year`
- **Tabulka 2** - `ratings`
  - `username`
  - `rating`
- **Tabulka 3** - `genres`
  - `name`

- **CRUDL (editovatelné)**: movies, ratings
- **Neměnitelná tabulka (seedovaná při spuštění)**: genres


### 13. Správa fitness centra
Záznam členů, cvičebních plánů a rezervací lekcí.

- **Tabulka 1** - `members`
  - `firstname`
  - `lastname`
- **Tabulka 2** - `workout_plans`
  - `name`
  - `description`

- **CRUDL (editovatelné)**: members, workout_plans
- **Vztah M:N**: člen může mít přiřazeno více workout plánů, workout plán má více členů


### 14. Evidence návštěv v zoo
Záznam návštěvníků a zvířat, která viděli.

- **Tabulka 1** - `visitors`
  - `firstname`
  - `lastname`
- **Tabulka 2** - `animals`
  - `name`
  - `species`
- **Tabulka 3 hint** - `visits`
  - `visitor_id`
  - `animal_id`
  - `visit_date`

- **CRUDL (editovatelné)**: visitors, animals
- **Vztah M:N**: návštěvníci vidí více zvířat, zvířata jsou viděna více návštěvníky


### 15. Správa knih v antikvariátu
Místní antikvariát potřebuje systém pro evidování knih, autorů a žánrů.

- **Tabulka 1** - `books`
  - `title`
  - `year`
  - `language`
- **Tabulka 2** - `authors`
  - `firstname`
  - `lastname`
- **Tabulka 3** - `genres`
  - `name`

- **CRUDL (editovatelné)**: books, authors
- **Neměnitelná tabulka (seedovaná při spuštění)**: genres


### 16. Systém správy konferencí
Evidence konferencí, řečníků a účastníků.

- **Tabulka 1** - `conferences`
  - `name`
  - `date`
- **Tabulka 2** - `speakers`
  - `firstname`
  - `lastname`
- **Tabulka 3** - `attendees`
  - `conference`
  - `attendee_name`

- **CRUDL (editovatelné)**: conferences, speakers, attendees


### 17. Zasedací pořádek
Učitelé potřebují systém, kde mohou spravovat zasedací pořídek. Počítejte, že učitel učí pouze v jedné třídě, která má pevně daný počet míst (bude nakrmeno při seedingu)

- **Tabulka 1** - `subjects` - seznam předmětů
  - `name` - název předmětu
  - `code` - zkratka předmětu
- **Tabulka 2** - `places` - seznam míst v třídě
  - `name` - název místa
  - `row` - řádek
  - `column` - sloupec
- **Tabulka 3** - `seating_plans` - seznam zasedání žáků na místech
  - `firstname` - jméno žáka
  - `lastname` - příjmení žáka
    
- **CRUDL (editovatelné):** subjects, seating_plans
- **Neměnitelná tabulka (seedovaná při spuštění):** places


### 18. Knihovna
Knihovna potřebuje systém, kde mohou:
Počítejte, že žánry jsou pevně dané a nebudou se měnit.

- **Tabulka 1** - `books` - seznam knih
  - `title` - název knihy
- **Tabulka 2** - `authors` - seznam autorů
  - `firstname` - jméno autora
  - `lastname` - příjmení autora
  - `nationality` - národnost autora
- **Tabulka 3** - `genres` - seznam žánrů
  - `name` - název žánru
    
- **CRUDL (editovatelné):** books, authors
- **Neměnitelná tabulka (seedovaná při spuštění):** genres

