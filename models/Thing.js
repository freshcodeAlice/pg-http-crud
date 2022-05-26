class Thing {
  static _client = null;
  static _tableName = 'things';

  static _attributes = {
    body: 'string'
  };

  static async create (values) {
    const insertAttrs = Object.entries(this._attributes)
      .filter(([attr, domain]) => attr in values)
      .map(([attr]) => attr);

    const insertSchemaStr = insertAttrs.map(attr => `"${attr}"`).join(',');

    const insertValueStr = insertAttrs
      .map(attr => {
        const value = values[attr];
        return typeof value === 'string' ? `'${value}'` : value;
      })
      .join(',');

    const { rows } = await this._client.query(`
    INSERT INTO ${this._tableName}
    (${insertSchemaStr}) VALUES 
    (${insertValueStr});
    RETURNING *;
    `);
    return rows;
  }

  static async updateByPK (pkValue, values) {
    const insertAttrs = Object.entries(this._attributes)
      .filter(([attr, domain]) => attr in values)
      .map(([attr]) => attr);

    const updateSchemaStr = insertAttrs
      .map(attr => {
        const value = values[attr];
        const valueStr = typeof value === 'string' ? `'${value}'` : value;
        return `"${attr}" = ${valueStr}`;
      })
      .join(',');

    const { rows } = await this._client.query(`
      UPDATE ${this._tableName}
      SET ${updateSchemaStr},
      "updated_at" = '${new Date().toISOString()}'
      RETURNING *;
      `);
    return rows;
  }

  static async findAll () {
    const { rows } = await this._client.query(`
    SELECT * 
    FROM ${this._tableName}
    `);
    return rows;
  }

  static async findByPK (pkValue) {
    const { rows } = await this._client.query(`
    SELECT * 
    FROM ${this._tableName}
    WHERE "id" = ${pkValue}
    `);
    return rows;
  }

  static async deleteByPK (pkValue) {
    const { rows } = await this._client.query(`
    DELETE
    FROM ${this._tableName}
    WHERE "id" = ${pkValue}
    RETURNING *;
    `);
    return rows;
  }
}

module.exports = Thing;
