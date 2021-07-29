import Entity from './entity';
class FakeEntity extends Entity {

}

describe("Entity", () => {
  describe("Entity:get()", function () {

    it('should be able to create entity with rawData', () => {
      expect(new Entity({ raw: { abc: 1 }, entityType: FakeEntity}).rawData).toEqual({ abc: 1 });
    });
    it('should be provide entity type', () => {
      expect(new Entity({ raw: { abc: 1 }, entityType: FakeEntity }).entityType).toBe(FakeEntity);
    });
  });
});