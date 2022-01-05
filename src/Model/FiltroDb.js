import db from "../services/SQLiteDataBase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE filtro;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS filtro (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, loteria TEXT, qtadepar INTEGER, 
        qtadeimpar INTEGER, qtadedezenas INTEGER, soma TEXT, maiorocorrencia BOOL, menorocorrencia BOOL, maioratraso BOOL, 
        menoratraso BOOL, valoraposta TEXT, ultimosconcurso INTEGER);`
  );
});

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO filtro (nome, loteria, qtadepar, qtadeimpar, qtadedezenas, soma, maiorocorrencia, menorocorrencia, maioratraso, menoratraso, valoraposta) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        [obj.nome, obj.loteria, obj.qtadepar, obj.qtadeimpar, obj.qtadedezenas, obj.soma, obj.maiorocorrencia, obj.menorocorrencia, obj.maioratraso, obj.menoratraso, obj.valoraposta],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export const insertFiltro = (nome, loteria, qtadepar, qtadeimpar, qtadedezenas, soma, maiorocorrencia, menorocorrencia, maioratraso, menoratraso, valoraposta, ultimosconcurso) => {
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO filtro (nome, loteria, qtadepar, qtadeimpar, qtadedezenas, soma, maiorocorrencia, menorocorrencia, maioratraso, menoratraso, valoraposta, ultimosconcurso) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [nome, loteria, qtadepar, qtadeimpar, qtadedezenas, soma, maiorocorrencia, menorocorrencia, maioratraso, menoratraso, valoraposta, ultimosconcurso],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `UPDATE filtro SET nome=?, loteria=?, qtadepar=?, qtadeimpar=?, qtadedezenas=?, soma=?, maiorocorrencia=?, menorocorrencia=?, maioratraso=?, menoratraso=?, valoraposta=?, ultimosconcurso=?  WHERE id=?;`
        [obj.nome, obj.loteria, obj.qtadepar, obj.qtadeimpar, obj.qtadedezenas, obj.soma, obj.maiorocorrencia, obj.menorocorrencia, obj.maioratraso, obj.menoratraso, obj.valoraposta, obj.ultimosconcurso, id],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id); // nenhum registro alterado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM filtro WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: id=" + id); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DA MARCA (brand)
 * - Recebe a marca do carro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByloteria = (loteria) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM filtro WHERE loteria LIKE ?;",
        [loteria],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows);
          else reject("Obj not found: loteria=" + loteria); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM filtro;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM filtro WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve("deletado ", rowsAffected);
        },
        (_, error) => reject("Error ao deletar !! ", error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findByloteria,
  all,
  remove,
};
