import { Vector, Pt } from '../types';
import { range } from 'd3-array';
import { getCartesianProduct } from 'probable';

export function createCameraVectors({
  dimensions,
}: {
  dimensions: number;
}): Vector[] {
  return [-1, 1].map(getVectorsForHotValue).flat();

  function getVectorsForHotValue(hotValue: number): number[][] {
    return range(dimensions).map(getOneHotWithActivePosition);

    function getOneHotWithActivePosition(hotIndex: number): number[] {
      return range(dimensions).map((index: number) =>
        index === hotIndex ? hotValue : 0
      );
    }
  }
}

export function createFacePointedAtByVector(oneHot: Vector): Pt[] {
  const hotIndex = oneHot.findIndex((val) => val !== 0);
  // If oneHot is the left vector [-1, 0, 0], then all of the points in the
  // face it points at will be [1, x, x].
  const hotVal = -1 * oneHot[hotIndex];
  var cartesianFactors = [];
  for (let i = 0; i < oneHot.length - 1; ++i) {
    cartesianFactors.push([-1, 1]);
  }
  var cornerCombinations = getCartesianProduct(cartesianFactors);
  if (!cornerCombinations) {
    return [[hotVal]];
  }
  // TODO: This is wrong for the 2D case.
  if (cornerCombinations.length > 0 && !Array.isArray(cornerCombinations[0])) {
    return [cornerCombinations];
  }
  cornerCombinations.forEach((combo: Pt) => combo.splice(hotIndex, 0, hotVal));
  return cornerCombinations;
}
