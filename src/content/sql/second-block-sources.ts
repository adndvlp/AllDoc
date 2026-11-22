import type {SqlDialectId,SqlSource} from './contracts.ts';
const versions={"sqlite": "SQLite 3.54.1", "postgresql": "PostgreSQL 19", "mysql": "MySQL 9.7", "sqlserver": "SQL Server 2025 (17.x)", "mariadb": "MariaDB 12.3", "oracle": "Oracle Database 26"};
const urls={
  "sqlite": {
    "text": [
      "https://sqlite.org/lang_corefunc.html",
      "https://sqlite.org/lang_expr.html"
    ],
    "numeric": [
      "https://sqlite.org/lang_corefunc.html",
      "https://sqlite.org/lang_expr.html"
    ],
    "aggregate": [
      "https://sqlite.org/lang_aggfunc.html"
    ],
    "query": [
      "https://sqlite.org/lang_select.html"
    ],
    "write": [
      "https://sqlite.org/lang_insert.html",
      "https://sqlite.org/lang_update.html",
      "https://sqlite.org/lang_delete.html",
      "https://sqlite.org/lang_conflict.html"
    ],
    "ddl": [
      "https://sqlite.org/lang_createtable.html",
      "https://sqlite.org/foreignkeys.html"
    ]
  },
  "postgresql": {
    "text": [
      "https://www.postgresql.org/docs/19/functions-string.html"
    ],
    "numeric": [
      "https://www.postgresql.org/docs/19/functions-math.html"
    ],
    "aggregate": [
      "https://www.postgresql.org/docs/19/functions-aggregate.html"
    ],
    "query": [
      "https://www.postgresql.org/docs/19/sql-select.html"
    ],
    "write": [
      "https://www.postgresql.org/docs/19/sql-insert.html",
      "https://www.postgresql.org/docs/19/sql-update.html",
      "https://www.postgresql.org/docs/19/sql-delete.html"
    ],
    "ddl": [
      "https://www.postgresql.org/docs/19/sql-createtable.html",
      "https://www.postgresql.org/docs/19/ddl-constraints.html"
    ]
  },
  "mysql": {
    "text": [
      "https://dev.mysql.com/doc/refman/9.7/en/string-functions.html"
    ],
    "numeric": [
      "https://dev.mysql.com/doc/refman/9.7/en/mathematical-functions.html",
      "https://dev.mysql.com/doc/refman/9.7/en/arithmetic-functions.html"
    ],
    "aggregate": [
      "https://dev.mysql.com/doc/refman/9.7/en/aggregate-functions.html"
    ],
    "query": [
      "https://dev.mysql.com/doc/refman/9.7/en/select.html"
    ],
    "write": [
      "https://dev.mysql.com/doc/refman/9.7/en/insert.html",
      "https://dev.mysql.com/doc/refman/9.7/en/update.html",
      "https://dev.mysql.com/doc/refman/9.7/en/delete.html",
      "https://dev.mysql.com/doc/refman/9.7/en/replace.html"
    ],
    "ddl": [
      "https://dev.mysql.com/doc/refman/9.7/en/create-table.html",
      "https://dev.mysql.com/doc/refman/9.7/en/create-table-foreign-keys.html"
    ]
  },
  "mariadb": {
    "text": [
      "https://mariadb.com/docs/server/reference/sql-functions/string-functions/char_length",
      "https://mariadb.com/docs/server/reference/sql-functions/string-functions/substring",
      "https://mariadb.com/docs/server/reference/sql-functions/string-functions/concat"
    ],
    "numeric": [
      "https://mariadb.com/docs/server/reference/sql-functions/numeric-functions/round",
      "https://mariadb.com/docs/server/reference/sql-functions/numeric-functions/abs"
    ],
    "aggregate": [
      "https://mariadb.com/docs/server/reference/sql-functions/aggregate-functions/group_concat",
      "https://mariadb.com/docs/server/reference/sql-functions/aggregate-functions/count"
    ],
    "query": [
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/select"
    ],
    "write": [
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/inserting-loading-data/insert-ignore",
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/changing-deleting-data/replace",
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/changing-deleting-data/update",
      "https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/changing-deleting-data/delete"
    ],
    "ddl": [
      "https://mariadb.com/docs/server/server-usage/tables/create-table",
      "https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/optimization-and-indexes/foreign-keys"
    ]
  },
  "sqlserver": {
    "text": [
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/len-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/substring-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/concat-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/string-functions-transact-sql?view=sql-server-ver17"
    ],
    "numeric": [
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/round-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/abs-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/divide-transact-sql?view=sql-server-ver17"
    ],
    "aggregate": [
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/string-agg-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/functions/avg-transact-sql?view=sql-server-ver17"
    ],
    "query": [
      "https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17"
    ],
    "write": [
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/queries/update-transact-sql?view=sql-server-ver17",
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql?view=sql-server-ver17"
    ],
    "ddl": [
      "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17"
    ]
  },
  "oracle": {
    "text": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Character-Functions-Returning-Character-Values.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SUBSTR.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/LENGTH.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Concatenation-Operator.html"
    ],
    "numeric": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/ROUND-number.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/ABS.html"
    ],
    "aggregate": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Aggregate-Functions.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/LISTAGG.html"
    ],
    "query": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SELECT.html"
    ],
    "write": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/INSERT.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/UPDATE.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/DELETE.html"
    ],
    "ddl": [
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/CREATE-TABLE.html",
      "https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/constraint.html"
    ]
  }
};
export type SqlSourceFamily='text'|'numeric'|'aggregate'|'query'|'write'|'ddl';
export function secondBlockSources(dialect:SqlDialectId,family:SqlSourceFamily):readonly SqlSource[]{
 return urls[dialect][family].map(url=>({url,targetVersion:versions[dialect],checkedAt:'2026-11-21'}));
}
