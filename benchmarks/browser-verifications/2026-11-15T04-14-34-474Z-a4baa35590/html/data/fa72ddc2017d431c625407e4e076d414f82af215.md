# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: practice-flow.spec.ts >> [FLOW-02] editor y tabla desplazan solo su región
- Location: tests/cross-browser/practice-flow.spec.ts:21:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 7000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Saltar al contenido principal":
    - link "Saltar al contenido principal" [ref=e3] [cursor=pointer]:
      - /url: "#__docusaurus_skipToContent_fallback"
  - navigation "Principal" [ref=e4]:
    - generic [ref=e5]:
      - button "Alternar barra lateral" [ref=e7] [cursor=pointer]
      - group [ref=e11]:
        - 'button "Elegir área: Análisis de datos" [ref=e12] [cursor=pointer]':
          - generic [ref=e13]: Análisis de datos
      - generic [ref=e16]:
        - button "Buscar un concepto" [ref=e17] [cursor=pointer]
        - group [ref=e21]:
          - 'generic "Elegir color de texto: Azul" [ref=e22] [cursor=pointer]':
            - generic [aria-hidden] [ref=e23]: Aa
  - generic [ref=e26]:
    - generic [ref=e27]:
      - main "Contenido del apunte" [ref=e28]:
        - generic [ref=e32]:
          - article [ref=e33]:
            - navigation "Rastro de navegación" [ref=e34]:
              - list [ref=e35]:
                - listitem [ref=e36]:
                  - link "Página de Inicio" [ref=e37] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e40]:
                  - generic [ref=e41]: SQL
                - listitem [ref=e42]:
                  - generic [ref=e43]: SELECT
            - generic [ref=e44]:
              - generic [ref=e45]:
                - heading "SELECT" [level=1] [ref=e46]
                - button "Guardar en favoritos" [ref=e47] [cursor=pointer]
                - status
              - region "SELECT" [ref=e50]:
                - paragraph [ref=e51]: Consulta una tabla y elige qué columnas ver.
                - generic [ref=e52]:
                  - generic [ref=e53]:
                    - generic [ref=e54]:
                      - heading "Todas las columnas" [level=2] [ref=e55]
                      - 'button "Probar este ejemplo: Todas las columnas" [ref=e56] [cursor=pointer]': Probar
                    - generic [ref=e58]:
                      - code [ref=e60]:
                        - generic [ref=e61]: SELECT * FROM productos;
                      - button "Copiar código" [ref=e63] [cursor=pointer]
                    - paragraph [ref=e69]: El asterisco (*) pide todas.
                    - group [ref=e70]:
                      - generic "Ver resultado 3 filas" [ref=e71] [cursor=pointer]:
                        - text: Ver resultado
                        - generic [ref=e72]: 3 filas
                  - generic [ref=e73]:
                    - generic [ref=e74]:
                      - heading "Columnas concretas" [level=2] [ref=e75]
                      - 'button "Probar este ejemplo: Columnas concretas" [ref=e76] [cursor=pointer]': Probar
                    - generic [ref=e78]:
                      - code [ref=e80]:
                        - generic [ref=e81]: SELECT nombre, precio FROM productos;
                      - button "Copiar código" [ref=e83] [cursor=pointer]
                    - paragraph [ref=e89]: Escribe sus nombres separados por comas.
                    - group [ref=e90]:
                      - generic "Ver resultado 3 filas" [ref=e91] [cursor=pointer]:
                        - text: Ver resultado
                        - generic [ref=e92]: 3 filas
                - paragraph [ref=e93]: SELECT elige las columnas. FROM indica la tabla.
          - navigation "Página del documento" [ref=e94]:
            - link "Siguiente WHERE »" [ref=e95] [cursor=pointer]:
              - /url: /apuntes/analisis-de-datos/sql/where
              - generic [ref=e96]: Siguiente
              - generic [ref=e97]: WHERE »
      - button "Practicar SQL" [expanded] [ref=e98] [cursor=pointer]:
        - generic [aria-hidden] [ref=e99]: </>
        - generic [aria-hidden] [ref=e100]: Practicar SQL
    - dialog "Práctica SQL" [ref=e101]:
      - generic [ref=e102]:
        - banner [ref=e103]:
          - heading [level=2] [ref=e104]:
            - text: Práctica
            - strong [ref=e105]: SQL
          - generic [ref=e106]:
            - button "Buscar un concepto" [ref=e107] [cursor=pointer]
            - button "Abrir temas" [ref=e111] [cursor=pointer]
            - button "Volver al apunte" [ref=e114] [cursor=pointer]
        - generic [ref=e118]:
          - generic [ref=e119]: consulta.sql
          - button "Ejecutar" [ref=e120] [cursor=pointer]
          - button "Reiniciar entorno" [ref=e121] [cursor=pointer]
          - group [ref=e122]:
            - button "Opciones de código" [ref=e123] [cursor=pointer]:
              - generic [aria-hidden] [ref=e124]: ⋯
        - tablist "Contenido de práctica" [ref=e125]:
          - tab "Código" [ref=e126] [cursor=pointer]
          - tab "Datos" [ref=e127] [cursor=pointer]
          - tab "Resultados" [active] [selected] [ref=e128] [cursor=pointer]
        - tabpanel "Resultados" [ref=e130]:
          - region "Tabla de resultado 2" [ref=e132]:
            - table "Resultado 2" [ref=e133]:
              - caption [ref=e134]: Resultado 2
              - rowgroup [ref=e135]:
                - row [ref=e136]:
                  - columnheader "texto" [ref=e137]
              - rowgroup [ref=e138]:
                - row [ref=e139]:
                  - cell "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001" [ref=e140]
                - row [ref=e141]:
                  - cell "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001" [ref=e142]
                - row [ref=e143]:
                  - cell "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001" [ref=e144]
          - status [ref=e145]: Ejecución completada
        - generic [ref=e146]:
          - generic [ref=e147]: Guardado local
          - generic [ref=e148]: SQLite · Sugerencias del esquema actual
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {caseTitle} from '../../scripts/lib/browser-cases';
  3  | import {profiles,panel,code,openPractice,ready,fillCode,execute,expectCode,expectNoExecution,savedCode,searchTo} from './practice-helpers';
  4  | import {reader,noOverflow,scrollRegion} from './application-helpers';
  5  | const [sql,python]=profiles;
  6  | test(caseTitle('FLOW-01'),async({page})=>{
  7  |   test.setTimeout(120_000);
  8  |   await openPractice(page,sql); await execute(page,sql,'UPDATE productos SET precio=1; SELECT precio FROM productos;');
  9  |   const sqlDraft='SELECT precio FROM productos;'; await fillCode(page,sql,sqlDraft); await savedCode(page,sql,sqlDraft);
  10 |   await searchTo(page,'WHERE'); await ready(page,sql); await expectCode(page,sql,sqlDraft);
  11 |   await execute(page,sql,sqlDraft); await expect(panel(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1']);
  12 |   await searchTo(page,'DataFrame'); await ready(page,python); await execute(page,python,'productos[["precio"]]');
  13 |   await expect(panel(page).getByRole('table')).toContainText('500');
  14 |   const pythonDraft='productos.head(2)'; await fillCode(page,python,pythonDraft); await savedCode(page,python,pythonDraft);
  15 |   await page.reload({waitUntil:'networkidle'}); await expect(panel(page)).toBeHidden();
  16 |   await page.getByRole('button',{name:'Practicar pandas',exact:true}).click(); await ready(page,python); await expectCode(page,python,pythonDraft); await expectNoExecution(page);
  17 |   await searchTo(page,'SELECT'); await ready(page,sql); await expectCode(page,sql,sqlDraft); await expectNoExecution(page);
  18 |   await execute(page,sql,sqlDraft); await expect(panel(page).getByRole('table')).toContainText('500');
  19 | });
  20 | 
  21 | test(caseTitle('FLOW-02'),async({page},info)=>{
  22 |   await openPractice(page,sql); const position=await reader(page).evaluate(el=>el.scrollTop), navbar=await page.locator('.navbar').boundingBox();
  23 |   await code(page,sql).fill(Array.from({length:180},(_,i)=>'-- apunte '+i).join('\n')+'\nSELECT 1;');
  24 |   await code(page,sql).press('ControlOrMeta+Home');
  25 |   const scroller=panel(page).locator('.cm-scroller'); await expect.poll(()=>scroller.evaluate(el=>el.scrollHeight-el.clientHeight)).toBeGreaterThan(0);
  26 |   await scrollRegion(page,scroller,0,1000,info); await expect.poll(()=>scroller.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
  27 |   expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(position); expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
  28 |   await execute(page,sql,"SELECT printf('%0300d',1) AS texto FROM productos;");
  29 |   const table=panel(page).getByRole('region',{name:/^Tabla de resultado/});
> 30 |   await expect.poll(()=>table.evaluate(el=>el.scrollWidth-el.clientWidth)).toBeGreaterThan(0);
     |                                                                            ^ Error: expect(received).toBeGreaterThan(expected)
  31 |   await scrollRegion(page,table,900,0,info); await expect.poll(()=>table.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
  32 |   expect(await reader(page).evaluate(el=>el.scrollTop)).toBe(position); await noOverflow(page);
  33 | });
  34 | 
```