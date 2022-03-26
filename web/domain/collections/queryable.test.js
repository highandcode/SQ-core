import Queryable from './queryable';
function TestEntity(data) {
  return Object.assign(this, data);
}

describe('domain:Queryable', () => {
  describe('Queryable basic', function () {
    it('should be defined', async () => {
      expect(Queryable).toBeDefined();
    });
  });
  describe('Queryable sortOrder', function () {
    it('should return sortable object', async () => {
      expect(new Queryable([], { entityType: TestEntity }).sortOrder('id')).toBeDefined();
    });
  });

  describe('sortBy() with sort "asc & desc"', () => {
    let queryObj;
    beforeEach(() => {
      queryObj = new Queryable(
        [
          { uid: 'u1', text: 'Abc' },
          { uid: 'u2', text: 'A1c' },
          { uid: 'u3', text: 'DD' },
          { uid: 'u3', text: 'Acord' },
        ],
        TestEntity
      );
    });

    it('should return sorted data by 1 field "text"', () => {
      const result = queryObj.sortBy('text');
      expect(result.rData).toEqual([
        { uid: 'u2', text: 'A1c' },
        { uid: 'u1', text: 'Abc' },
        { uid: 'u3', text: 'Acord' },
        { uid: 'u3', text: 'DD' },
      ]);
    });
    it('should return sorted data by 2 field "text"', () => {
      const result = queryObj.sortOrder('uid').sortBy('text');
      expect(result.rData).toEqual([
        { uid: 'u1', text: 'Abc' },
        { uid: 'u2', text: 'A1c' },
        { uid: 'u3', text: 'Acord' },
        { uid: 'u3', text: 'DD' },
      ]);
    });
    it('should return sorted data by 2 field "text" desc', () => {
      const result = queryObj.sortOrder('uid', 'desc').sortBy('text');
      expect(result.rData).toEqual([
        { uid: 'u3', text: 'Acord' },
        { uid: 'u3', text: 'DD' },
        { uid: 'u2', text: 'A1c' },
        { uid: 'u1', text: 'Abc' },
      ]);
    });
    it('should return sorted data by 2 field "text"', () => {
      const result = queryObj.sortOrder('uid').sortBy('text', 'desc');
      expect(result.rData).toEqual([
        { uid: 'u1', text: 'Abc' },
        { uid: 'u2', text: 'A1c' },
        { uid: 'u3', text: 'DD' },
        { uid: 'u3', text: 'Acord' },
      ]);
    });
  });

});
