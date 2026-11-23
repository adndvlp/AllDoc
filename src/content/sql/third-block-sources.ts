import type {SqlDialectId,SqlSource} from './contracts.ts';
const versions={"sqlite": "SQLite 3.54.1", "postgresql": "PostgreSQL 19", "mysql": "MySQL 9.7", "sqlserver": "SQL Server 2025 (17.x)", "mariadb": "MariaDB 12.3", "oracle": "Oracle Database 26"};
const urls={
  "sqlite": {
    "alter": [
      "https://sqlite.org/lang_altertable.html"
    ],
    "drop": [
      "https://sqlite.org/lang_droptable.html"
    ],
    "views": [
      "https://sqlite.org/lang_createview.html",
      "https://sqlite.org/lang_dropview.html"
    ],
    "indexes": [
      "https://sqlite.org/lang_createindex.html",
      "https://sqlite.org/lang_dropindex.html",
      "https://sqlite.org/optoverview.html#skipscan"
    ],
    "query": [
      "https://sqlite.org/lang_select.html",
      "https://sqlite.org/lang_with.html"
    ],
    "window": [
      "https://sqlite.org/windowfunctions.html"
    ],
    "transactions": [
      "https://sqlite.org/lang_transaction.html",
      "https://sqlite.org/lang_conflict.html",
      "https://sqlite.org/lang_corefunc.html#changes"
    ]
  },
  "postgresql": {
    "alter": [
      "https://www.postgresql.org/docs/19/sql-altertable.html"
    ],
    "drop": [
      "https://www.postgresql.org/docs/19/sql-droptable.html",
      "https://www.postgresql.org/docs/19/infoschema-tables.html"
    ],
    "views": [
      "https://www.postgresql.org/docs/19/sql-createview.html",
      "https://www.postgresql.org/docs/19/sql-dropview.html",
      "https://www.postgresql.org/docs/19/infoschema-views.html"
    ],
    "indexes": [
      "https://www.postgresql.org/docs/19/sql-createindex.html",
      "https://www.postgresql.org/docs/19/sql-dropindex.html",
      "https://www.postgresql.org/docs/19/view-pg-indexes.html"
    ],
    "query": [
      "https://www.postgresql.org/docs/19/queries-union.html",
      "https://www.postgresql.org/docs/19/queries-with.html",
      "https://www.postgresql.org/docs/19/functions-subquery.html"
    ],
    "window": [
      "https://www.postgresql.org/docs/19/functions-window.html",
      "https://www.postgresql.org/docs/19/tutorial-window.html"
    ],
    "transactions": [
      "https://www.postgresql.org/docs/19/tutorial-transactions.html",
      "https://www.postgresql.org/docs/19/plpgsql-control-structures.html",
      "https://www.postgresql.org/docs/19/sql-do.html"
    ]
  },
  "mysql": {
    "alter": [
      "https://dev.mysql.com/doc/refman/9.7/en/alter-table.html"
    ],
    "drop": [
      "https://dev.mysql.com/doc/refman/9.7/en/drop-table.html"
    ],
    "views": [
      "https://dev.mysql.com/doc/refman/9.7/en/create-view.html",
      "https://dev.mysql.com/doc/refman/9.7/en/drop-view.html"
    ],
    "indexes": [
      "https://dev.mysql.com/doc/refman/9.7/en/create-index.html",
      "https://dev.mysql.com/doc/refman/9.7/en/drop-index.html",
      "https://dev.mysql.com/doc/refman/9.7/en/information-schema-statistics-table.html"
    ],
    "query": [
      "https://dev.mysql.com/doc/refman/9.7/en/union.html",
      "https://dev.mysql.com/doc/refman/9.7/en/intersect.html",
      "https://dev.mysql.com/doc/refman/9.7/en/except.html",
      "https://dev.mysql.com/doc/refman/9.7/en/with.html",
      "https://dev.mysql.com/doc/refman/9.7/en/subqueries.html"
    ],
    "window": [
      "https://dev.mysql.com/doc/refman/9.7/en/window-functions-frames.html",
      "https://dev.mysql.com/doc/refman/9.7/en/window-function-descriptions.html"
    ],
    "transactions": [
      "https://dev.mysql.com/doc/refman/9.7/en/commit.html",
      "https://dev.mysql.com/doc/refman/9.7/en/implicit-commit.html",
      "https://dev.mysql.com/doc/refman/9.7/en/create-procedure.html",
      "https://dev.mysql.com/doc/refman/9.7/en/declare-handler.html",
      "https://dev.mysql.com/doc/refman/9.7/en/signal.html"
    ]
  },
  "sqlserver": {
    "alter": [
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-table-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-rename-transact-sql?view=sql-server-ver17"
    ],
    "drop": [
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/drop-table-transact-sql?view=sql-server-ver17"
    ],
    "views": [
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/drop-view-transact-sql?view=sql-server-ver17"
    ],
    "indexes": [
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-index-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/drop-index-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-indexes-transact-sql?view=sql-server-ver17"
    ],
    "query": [
      "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-union-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql?view=sql-server-ver17"
    ],
    "window": [
      "https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/ranking-functions-transact-sql?view=sql-server-ver17"
    ],
    "transactions": [
      "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/begin-transaction-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/set-implicit-transactions-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/rowcount-transact-sql?view=sql-server-ver17"
    ]
  },
  "mariadb": {
    "alter": [
      "https://mariadb.com/docs/server/reference/sql-statements/data-definition/alter/alter-table"
    ],
    "drop": [
      "https://mariadb.com/docs/server/reference/sql-statements/data-definition/drop/drop-table"
    ],
    "views": [
      "https://mariadb.com/docs/server/server-usage/views/create-view",
      "https://mariadb.com/docs/server/server-usage/views/drop-view"
    ],
    "indexes": [
      "https://mariadb.com/docs/server/reference/sql-statements/data-definition/create/create-index",
      "https://mariadb.com/docs/server/reference/sql-statements/data-definition/drop/drop-index",
      "https://mariadb.com/docs/server/reference/system-tables/information-schema/information-schema-tables/information-schema-statistics-table"
    ],
    "query": [
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/joins-subqueries/union",
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/joins-subqueries/intersect",
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/joins-subqueries/except",
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/common-table-expressions/with"
    ],
    "window": [
      "https://mariadb.com/docs/server/reference/sql-functions/special-functions/window-functions/window-functions-overview"
    ],
    "transactions": [
      "https://mariadb.com/docs/server/reference/sql-statements/transactions/start-transaction",
      "https://mariadb.com/docs/server/reference/sql-statements/transactions/sql-statements-that-cause-an-implicit-commit",
      "https://mariadb.com/docs/server/reference/sql-statements/programmatic-compound-statements/declare-handler"
    ]
  },
  "oracle": {
    "alter": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/ALTER-TABLE.html"
    ],
    "drop": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/DROP-TABLE.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/refrn/USER_TABLES.html"
    ],
    "views": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/CREATE-VIEW.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/DROP-VIEW.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/refrn/USER_VIEWS.html"
    ],
    "indexes": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/CREATE-INDEX.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/DROP-INDEX.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/refrn/USER_INDEXES.html"
    ],
    "query": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/The-UNION-ALL-INTERSECT-MINUS-Operators.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SELECT.html"
    ],
    "window": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Analytic-Functions.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/ROW_NUMBER.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/RANK.html"
    ],
    "transactions": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/lnpls/transaction-processing-and-control.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/lnpls/cursors-overview.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/COMMIT.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/ROLLBACK.html"
    ]
  }
};
export type ThirdBlockFamily='alter'|'drop'|'views'|'indexes'|'query'|'window'|'transactions';
export function thirdBlockSources(dialect:SqlDialectId,family:ThirdBlockFamily):readonly SqlSource[]{return urls[dialect][family].map(url=>({url,targetVersion:versions[dialect],checkedAt:'2026-11-23'}));}
