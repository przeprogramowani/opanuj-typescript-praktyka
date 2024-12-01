export interface DataAccess {
  query<T extends { id?: number }>(query: string, values?: unknown[]): Promise<{ rows: T[] }>;
}

export class MockDataAccess implements DataAccess {
  private data: { [tableName: string]: any[] } = {
    users: [],
    products: [],
  };

  async query<T extends { id?: number }>(
    query: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }> {
    if (query.includes('SELECT')) {
      const tableName = this.extractTableName(query);
      const rows = this.data[tableName] as T[];

      if (query.includes('WHERE id = $1') && values?.length === 1) {
        const id = values[0];
        return { rows: rows.filter((row) => row.id === id) };
      }

      return { rows };
    } else if (query.includes('INSERT')) {
      const tableName = this.extractTableName(query);
      const columnMatch = query.match(/\((.*?)\)/);
      const columns = columnMatch ? columnMatch[1].split(',').map((col) => col.trim()) : [];

      const existingItems = this.data[tableName] || [];
      const nextId =
        existingItems.length > 0 ? Math.max(...existingItems.map((item) => item.id)) + 1 : 1;

      const newItem = columns.reduce(
        (obj, col, index) => {
          obj[col] = values?.[index];
          return obj;
        },
        { id: nextId } as Record<string, unknown>,
      ) as T;

      this.data[tableName].push(newItem);
      return { rows: [newItem] };
    } else {
      return { rows: [] };
    }
  }

  private extractTableName(query: string): string {
    const regex = /(FROM|INTO)\s+(\w+)/i;
    const match = query.match(regex);
    return match ? match[2] : '';
  }
}
