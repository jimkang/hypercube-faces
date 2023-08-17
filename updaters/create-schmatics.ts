import { Vector } from '../types';
import { range } from 'd3-array';

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
