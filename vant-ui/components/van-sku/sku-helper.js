import { UNSELECTED_SKU_VALUE_ID } from './constants';

export const normalizeSkuTree = (skuTree) => {
  const normalizedTree = {};
  skuTree.forEach((treeItem) => {
    normalizedTree[treeItem.k_s] = treeItem.v;
  });
  return normalizedTree;
};

export const normalizePropList = (propList) => {
  const normalizedProp = {};
  propList.forEach((item) => {
    const itemObj = {};
    item.v.forEach((it) => {
      itemObj[it.id] = it;
    });
    normalizedProp[item.k_id] = itemObj;
  });
  return normalizedProp;
};

// 判断是否所有的sku都已经选中
export const isAllSelected = (skuTree, selectedSku) => {
  // 筛选selectedSku对象中key值不为空的值
  const selected = Object.keys(selectedSku).filter(
    (skuKeyStr) => selectedSku[skuKeyStr] !== UNSELECTED_SKU_VALUE_ID
  );
  return skuTree.length === selected.length;
};

// 根据已选择的 sku 获取 skuComb
export const getSkuComb = (skuList, selectedSku) => {
  const skuComb = skuList.filter((item) =>
    Object.keys(selectedSku).every(
      (skuKeyStr) => String(item[skuKeyStr]) === String(selectedSku[skuKeyStr])
    )
  );
  return skuComb[0];
};

// 获取已选择的sku名称
export const getSelectedSkuValues = (skuTree, selectedSku) => {
  const normalizedTree = normalizeSkuTree(skuTree);
	
  return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
	 console.log('skuKeyStr', skuKeyStr);
    const skuValues = normalizedTree[skuKeyStr];
    const skuValueId = selectedSku[skuKeyStr];

    if (skuValueId !== UNSELECTED_SKU_VALUE_ID) {
      const skuValue = skuValues.filter((value) => value.id === skuValueId)[0];
      skuValue && selectedValues.push(skuValue);
    }
    return selectedValues;
  }, []);
};

// 判断sku是否可选
export const isSkuChoosable = (skuList, selectedSku, skuToChoose) => {
  const { key, valueId } = skuToChoose;

  // 先假设sku已选中，拼入已选中sku对象中
  const matchedSku = {
    ...selectedSku,
    [key]: valueId,
  };

  // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中
  const skusToCheck = Object.keys(matchedSku).filter(
    (skuKey) => matchedSku[skuKey] !== UNSELECTED_SKU_VALUE_ID
  );

  const filteredSku = skuList.filter((sku) =>
    skusToCheck.every(
      (skuKey) => String(matchedSku[skuKey]) === String(sku[skuKey])
    )
  );

  const stock = filteredSku.reduce((total, sku) => {
    total += sku.stock_num;
    return total;
  }, 0);
  return stock > 0;
};

export const getSelectedPropValues = (propList, selectedProp) => {
  const normalizeProp = normalizePropList(propList);
  return Object.keys(selectedProp).reduce((acc, cur) => {
    selectedProp[cur].forEach((it) => {
      acc.push({
        ...normalizeProp[cur][it],
      });
    });
    return acc;
  }, []);
};

export const getSelectedProperties = (propList, selectedProp) => {
  const list = [];
  (propList || []).forEach((prop) => {
    if (selectedProp[prop.k_id] && selectedProp[prop.k_id].length > 0) {
      const v = [];
      prop.v.forEach((it) => {
        if (selectedProp[prop.k_id].indexOf(it.id) > -1) {
          v.push({ ...it });
        }
      });
      list.push({
        ...prop,
        v,
      });
    }
  });
  return list;
};

export default {
  normalizeSkuTree,
  getSkuComb,
  getSelectedSkuValues,
  isAllSelected,
  isSkuChoosable,
  getSelectedPropValues,
  getSelectedProperties,
};