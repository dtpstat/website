import { types } from 'mobx-state-tree';

const CategoryItem = types.model('CategoryItem', {
    preview: types.string,
    value: types.number,
});

export const CategoryFilter = types.model('CategoryFilter', {
    name: types.string,
    label: types.string,
    multiple: types.boolean,
    values: types.array(CategoryItem),
});
