const BaseRepository = require('../BaseRepository');
const { datetime, path } = require('../utils');

class ContentRepository extends BaseRepository {
  constructor(options) {
    super({
      ...options,
      collection: 'contents',
    });
  }

  extractPath(origPath) {
    const array = origPath.split('/');
    const parentArray = [...array].splice(0, array.length - 1);
    const rootPath = path.ensureNoSlashAtEnd(
      path.ensureSlashAtStart(origPath.split('/')[1])
    );
    const parentPath = path.ensureNoSlashAtEnd(
      path.ensureSlashAtStart(`${parentArray.join('/')}`)
    );
    return {
      path: origPath,
      rootPath,
      parentPath,
    };
  }

  async create(data) {
    const pathVars = this.extractPath(`/content/${data.path}`);
    return await this.insert({
      ...data,
      ...pathVars,
      status: 'DRAFT',
      createdOn: datetime.now().date(),
    });
  }

  async getByPath(path) {
    const result = await this.findOne({
      path,
    });
    return result && result.toObject();
  }

  addItemToTree(tree = [], items) {
    if (items.length > 1) {
      var result = tree.filter((i) => i.path === items[0]);
      if (result.length > 0) {
        items.splice(0, 1);
        result[0].children = this.addItemToTree(result[0].children, items);
      } else {
        tree.push({
          path: items[0],
          children: [],
        });
        items.splice(0, 1);
        tree[tree.length - 1].children = this.addItemToTree(
          tree[tree.length - 1].children,
          items
        );
      }
    }
    return tree;
  }

  async getAllTreeNodes() {
    const result = await this.find({});
    let tree = [];
    result.forEach((item) => {
      tree = this.addItemToTree(
        tree,
        item.path.split('/').filter((i) => !!i)
      );
    });
    return tree[0];
  }
  async getAllPages(parentPath) {
    const result = await this.find({ parentPath });
    return result;
  }

  async saveDraft(data) {
    return await this.update({
      ...data,
    });
  }
  async publishPage(data) {
    return await this.update({
      ...data,
      createdOn: datetime.now().date(),
    });
  }
}

module.exports = { ContentRepository };
